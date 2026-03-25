import type { Server, Socket } from "socket.io";
import { logger } from "./lib/logger";

// ── Profanity Filter ──────────────────────────────────────────────────────────
const PROFANITY_LIST = [
  "fuck", "shit", "asshole", "bitch", "bastard", "cunt", "dick", "pussy",
  "faggot", "nigger", "whore", "slut", "retard",
];
const profanityRe = new RegExp(`\\b(${PROFANITY_LIST.join("|")})\\b`, "gi");
function filterMessage(text: string): string {
  return text.replace(profanityRe, (m) => m[0] + "*".repeat(m.length - 1));
}

// ── Inactivity timeout (30 min) ───────────────────────────────────────────────
const INACTIVITY_MS = 30 * 60 * 1000;

// ── Types ─────────────────────────────────────────────────────────────────────
interface UserData {
  socketId: string;
  name: string;
  gender: "male" | "female";
  interests?: string[];
  roomId?: string;
  lastActivity: number;
}

interface Room {
  id: string;
  users: [string, string];
  createdAt: Date;
}

// ── State ─────────────────────────────────────────────────────────────────────
const maleQueue: UserData[] = [];
const femaleQueue: UserData[] = [];
const connectedUsers = new Map<string, UserData>();
const rooms = new Map<string, Room>();
const reportCount = new Map<string, number>();
const blockedPairs = new Set<string>(); // "socketA:socketB"

export function getStats() {
  return {
    onlineUsers: connectedUsers.size,
    activeMatches: rooms.size,
    waitingUsers: maleQueue.length + femaleQueue.length,
  };
}

function generateRoomId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function blockKey(a: string, b: string): string {
  return [a, b].sort().join(":");
}

function countSharedInterests(a: UserData, b: UserData): number {
  if (!a.interests?.length || !b.interests?.length) return 0;
  return a.interests.filter((i) => b.interests!.includes(i)).length;
}

function findBestMatch(candidate: UserData, queue: UserData[]): number {
  let bestIdx = -1;
  let bestScore = -1;

  for (let i = 0; i < queue.length; i++) {
    const other = queue[i];
    // Skip blocked pairs
    if (blockedPairs.has(blockKey(candidate.socketId, other.socketId))) continue;

    const score = countSharedInterests(candidate, other);
    if (score > bestScore) {
      bestScore = score;
      bestIdx = i;
    }
  }

  // Fallback: first available unblocked user
  if (bestIdx === -1) {
    bestIdx = queue.findIndex(
      (u) => !blockedPairs.has(blockKey(candidate.socketId, u.socketId)),
    );
  }

  return bestIdx;
}

function tryMatch(io: Server): void {
  while (maleQueue.length > 0 && femaleQueue.length > 0) {
    const maleCandidate = maleQueue[0];

    // Find best female for this male
    const femaleIdx = findBestMatch(maleCandidate, femaleQueue);
    if (femaleIdx === -1) {
      maleQueue.shift(); // No valid female for this male right now
      break;
    }

    const male = maleQueue.shift()!;
    const [female] = femaleQueue.splice(femaleIdx, 1);

    const maleSocket = io.sockets.sockets.get(male.socketId);
    const femaleSocket = io.sockets.sockets.get(female.socketId);

    if (!maleSocket || !femaleSocket) {
      if (!maleSocket && femaleSocket) femaleQueue.unshift(female);
      if (!femaleSocket && maleSocket) maleQueue.unshift(male);
      continue;
    }

    const roomId = generateRoomId();
    rooms.set(roomId, { id: roomId, users: [male.socketId, female.socketId], createdAt: new Date() });

    male.roomId = roomId;
    female.roomId = roomId;
    male.lastActivity = Date.now();
    female.lastActivity = Date.now();
    connectedUsers.set(male.socketId, male);
    connectedUsers.set(female.socketId, female);

    maleSocket.join(roomId);
    femaleSocket.join(roomId);

    const sharedInterests = male.interests?.filter((i) => female.interests?.includes(i)) ?? [];

    maleSocket.emit("matched", {
      roomId,
      partner: { name: female.name, gender: female.gender, interests: female.interests },
      isInitiator: true,
      sharedInterests,
    });
    femaleSocket.emit("matched", {
      roomId,
      partner: { name: male.name, gender: male.gender, interests: male.interests },
      isInitiator: false,
      sharedInterests,
    });

    logger.info(
      { roomId, male: male.name, female: female.name, sharedInterests },
      "Users matched",
    );
  }
}

function leaveCurrentRoom(io: Server, socket: Socket, userData: UserData): void {
  if (userData.roomId) {
    const room = rooms.get(userData.roomId);
    if (room) {
      const partnerId = room.users.find((id) => id !== socket.id);
      if (partnerId) {
        const partnerSocket = io.sockets.sockets.get(partnerId);
        if (partnerSocket) {
          partnerSocket.emit("partner_disconnected", {});
          const partner = connectedUsers.get(partnerId);
          if (partner) {
            partner.roomId = undefined;
            connectedUsers.set(partnerId, partner);
          }
        }
      }
      rooms.delete(userData.roomId);
    }
    socket.leave(userData.roomId);
    userData.roomId = undefined;
    connectedUsers.set(socket.id, userData);
  }
}

function removeFromQueue(socketId: string): void {
  const mi = maleQueue.findIndex((u) => u.socketId === socketId);
  if (mi !== -1) maleQueue.splice(mi, 1);
  const fi = femaleQueue.findIndex((u) => u.socketId === socketId);
  if (fi !== -1) femaleQueue.splice(fi, 1);
}

// ── Inactivity sweeper (runs every 5 min) ─────────────────────────────────────
function startInactivitySweeper(io: Server) {
  setInterval(() => {
    const now = Date.now();
    for (const [socketId, userData] of connectedUsers.entries()) {
      if (userData.roomId && now - userData.lastActivity > INACTIVITY_MS) {
        const sock = io.sockets.sockets.get(socketId);
        if (sock) {
          sock.emit("inactivity_disconnect", {});
          leaveCurrentRoom(io, sock, userData);
          removeFromQueue(socketId);
          connectedUsers.delete(socketId);
          sock.disconnect(true);
          logger.info({ socketId }, "Disconnected inactive user");
        }
      }
    }
  }, 5 * 60 * 1000);
}

// ── Socket Handlers ───────────────────────────────────────────────────────────
export function setupSocketHandlers(io: Server): void {
  startInactivitySweeper(io);

  io.on("connection", (socket: Socket) => {
    logger.info({ socketId: socket.id }, "Socket connected");

    socket.on(
      "join_queue",
      (data: { name: string; gender: string; interests?: string[] }) => {
        const gender = data.gender?.toLowerCase();
        if (gender !== "male" && gender !== "female") {
          socket.emit("error", { message: "Invalid gender" });
          return;
        }
        if (!data.name || data.name.trim().length === 0) {
          socket.emit("error", { message: "Name is required" });
          return;
        }

        const existing = connectedUsers.get(socket.id);
        if (existing) {
          leaveCurrentRoom(io, socket, existing);
          removeFromQueue(socket.id);
        }

        const interests = Array.isArray(data.interests)
          ? data.interests.map((i) => String(i).toLowerCase().trim()).filter(Boolean).slice(0, 8)
          : [];

        const userData: UserData = {
          socketId: socket.id,
          name: data.name.trim().substring(0, 50),
          gender: gender as "male" | "female",
          interests,
          lastActivity: Date.now(),
        };
        connectedUsers.set(socket.id, userData);

        if (gender === "male") maleQueue.push(userData);
        else femaleQueue.push(userData);

        socket.emit("queued", {
          position: gender === "male" ? maleQueue.length : femaleQueue.length,
        });
        logger.info(
          { socketId: socket.id, name: userData.name, gender, interests },
          "User joined queue",
        );
        tryMatch(io);
      },
    );

    socket.on("leave_queue", () => {
      removeFromQueue(socket.id);
      socket.emit("queue_left", {});
    });

    socket.on(
      "send_message",
      (data: { roomId: string; message: string; timestamp: number }) => {
        const user = connectedUsers.get(socket.id);
        if (!user || user.roomId !== data.roomId) return;
        if (!data.message || data.message.trim().length === 0) return;

        user.lastActivity = Date.now();
        const message = filterMessage(data.message.substring(0, 1000));
        socket.to(data.roomId).emit("receive_message", {
          name: user.name,
          message,
          timestamp: data.timestamp || Date.now(),
        });
      },
    );

    socket.on("typing", (data: { roomId: string }) => {
      const user = connectedUsers.get(socket.id);
      if (!user || user.roomId !== data.roomId) return;
      user.lastActivity = Date.now();
      socket.to(data.roomId).emit("partner_typing", {});
    });

    socket.on("stop_typing", (data: { roomId: string }) => {
      const user = connectedUsers.get(socket.id);
      if (!user || user.roomId !== data.roomId) return;
      socket.to(data.roomId).emit("partner_stopped_typing", {});
    });

    socket.on("disconnect_partner", () => {
      const user = connectedUsers.get(socket.id);
      if (!user) return;
      leaveCurrentRoom(io, socket, user);
    });

    socket.on("skip_user", (data: { roomId: string }) => {
      const user = connectedUsers.get(socket.id);
      if (!user || user.roomId !== data.roomId) return;

      const room = rooms.get(data.roomId);
      if (room) {
        const partnerId = room.users.find((id) => id !== socket.id);
        if (partnerId) {
          const partnerSocket = io.sockets.sockets.get(partnerId);
          const partner = connectedUsers.get(partnerId);
          if (partnerSocket && partner) {
            partnerSocket.emit("partner_disconnected", {});
            partner.roomId = undefined;
            connectedUsers.set(partnerId, partner);
            if (partner.gender === "male") maleQueue.push(partner);
            else femaleQueue.push(partner);
          }
          rooms.delete(data.roomId);
          partnerSocket?.leave(data.roomId);
        }
      }

      socket.leave(data.roomId);
      user.roomId = undefined;
      connectedUsers.set(socket.id, user);
      if (user.gender === "male") maleQueue.push(user);
      else femaleQueue.push(user);

      socket.emit("queued", {
        position: user.gender === "male" ? maleQueue.length : femaleQueue.length,
      });
      tryMatch(io);
    });

    socket.on("report_user", (data: { roomId: string; reason: string }) => {
      const user = connectedUsers.get(socket.id);
      if (!user || user.roomId !== data.roomId) return;

      const room = rooms.get(data.roomId);
      if (room) {
        const partnerId = room.users.find((id) => id !== socket.id);
        if (partnerId) {
          const count = (reportCount.get(partnerId) || 0) + 1;
          reportCount.set(partnerId, count);
          // Temporary block this pair
          blockedPairs.add(blockKey(socket.id, partnerId));
          logger.info({ reportedId: partnerId, reason: data.reason, count }, "User reported");
          if (count >= 3) {
            const bannedSocket = io.sockets.sockets.get(partnerId);
            bannedSocket?.emit("banned", { reason: "Multiple reports received" });
            bannedSocket?.disconnect(true);
          }
        }
      }
      socket.emit("report_sent", { success: true });
    });

    // WebRTC relay
    socket.on("webrtc_offer", (data: { roomId: string; offer: RTCSessionDescriptionInit }) => {
      const user = connectedUsers.get(socket.id);
      if (!user || user.roomId !== data.roomId) return;
      socket.to(data.roomId).emit("webrtc_offer", { offer: data.offer });
    });

    socket.on("webrtc_answer", (data: { roomId: string; answer: RTCSessionDescriptionInit }) => {
      const user = connectedUsers.get(socket.id);
      if (!user || user.roomId !== data.roomId) return;
      socket.to(data.roomId).emit("webrtc_answer", { answer: data.answer });
    });

    socket.on(
      "webrtc_ice_candidate",
      (data: { roomId: string; candidate: RTCIceCandidateInit }) => {
        const user = connectedUsers.get(socket.id);
        if (!user || user.roomId !== data.roomId) return;
        socket.to(data.roomId).emit("webrtc_ice_candidate", { candidate: data.candidate });
      },
    );

    socket.on("get_stats", () => {
      socket.emit("stats_update", getStats());
    });

    socket.on("disconnect", () => {
      logger.info({ socketId: socket.id }, "Socket disconnected");
      const user = connectedUsers.get(socket.id);
      if (user) {
        leaveCurrentRoom(io, socket, user);
        removeFromQueue(socket.id);
        connectedUsers.delete(socket.id);
      }
    });
  });
}
