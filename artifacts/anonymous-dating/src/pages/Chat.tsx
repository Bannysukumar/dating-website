import { useEffect, useState, useRef, useCallback } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Video, VideoOff, PhoneOff, Send, MessageSquare, AlertOctagon, UserX, UserSearch, User as UserIcon, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MessageBubble, type Message } from "@/components/chat/MessageBubble";
import { useAppStore } from "@/store/use-app-store";
import { getSocket } from "@/lib/socket";
import { useWebRTC } from "@/hooks/use-webrtc";
import { useMatchTimer } from "@/hooks/use-match-timer";
import { useSounds } from "@/hooks/use-sounds";
import { useNotifications } from "@/hooks/use-notifications";
import { filterProfanity } from "@/utils/profanity";

export default function Chat() {
  const [, setLocation] = useLocation();
  const { user, currentMatch, setMatch, setIsQueueing, addRecentMatch } = useAppStore();
  const socket = getSocket();

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isPartnerTyping, setIsPartnerTyping] = useState(false);
  const [partnerDisconnected, setPartnerDisconnected] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const matchStartRef = useRef<number>(currentMatch?.startTime ?? Date.now());

  const { localVideoRef, remoteVideoRef, isMuted, isVideoOff, toggleMute, toggleVideo } = useWebRTC();
  const timer = useMatchTimer(matchStartRef.current);
  const { playMatchFound, playMessageReceived, playDisconnect } = useSounds();
  const { requestPermission, notify } = useNotifications();

  // Play match sound & request notification permission on mount
  useEffect(() => {
    playMatchFound();
    requestPermission();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Redirect if no match
  useEffect(() => {
    if (!user || !currentMatch) {
      setLocation("/");
    }
  }, [user, currentMatch, setLocation]);

  // Save recent match when leaving
  const saveRecentMatch = useCallback(() => {
    if (!currentMatch) return;
    const duration = Math.floor((Date.now() - matchStartRef.current) / 1000);
    addRecentMatch({
      name: currentMatch.partner.name,
      gender: currentMatch.partner.gender as any,
      interests: currentMatch.partner.interests,
      matchedAt: matchStartRef.current,
      duration,
    });
  }, [currentMatch, addRecentMatch]);

  // Socket Event Listeners
  useEffect(() => {
    if (!currentMatch) return;

    setMessages([{
      id: "sys-1",
      text: `You matched with ${currentMatch.partner.name} (${currentMatch.partner.gender})${
        currentMatch.partner.interests?.length
          ? ` · Interests: ${currentMatch.partner.interests.slice(0, 3).join(", ")}`
          : ""
      }`,
      sender: "system",
      timestamp: Date.now(),
    }]);

    const handleReceiveMessage = (data: { name: string; message: string; timestamp: number }) => {
      const filtered = filterProfanity(data.message);
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substr(2, 9),
          text: filtered,
          sender: "partner",
          timestamp: data.timestamp,
        },
      ]);
      playMessageReceived();
      notify(`${data.name} sent a message`, filtered);
    };

    const handlePartnerTyping = () => setIsPartnerTyping(true);
    const handlePartnerStoppedTyping = () => setIsPartnerTyping(false);

    const handlePartnerDisconnected = () => {
      setPartnerDisconnected(true);
      playDisconnect();
      setMessages((prev) => [
        ...prev,
        {
          id: "sys-disc",
          text: `${currentMatch.partner.name} has left the chat.`,
          sender: "system",
          timestamp: Date.now(),
        },
      ]);
      saveRecentMatch();
    };

    socket.on("receive_message", handleReceiveMessage);
    socket.on("partner_typing", handlePartnerTyping);
    socket.on("partner_stopped_typing", handlePartnerStoppedTyping);
    socket.on("partner_disconnected", handlePartnerDisconnected);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("partner_typing", handlePartnerTyping);
      socket.off("partner_stopped_typing", handlePartnerStoppedTyping);
      socket.off("partner_disconnected", handlePartnerDisconnected);
    };
  }, [currentMatch, socket, playMessageReceived, playDisconnect, notify, saveRecentMatch]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isPartnerTyping]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || !currentMatch || partnerDisconnected) return;

    const msgText = filterProfanity(inputValue.trim());
    const timestamp = Date.now();

    setMessages((prev) => [
      ...prev,
      { id: Math.random().toString(36).substr(2, 9), text: msgText, sender: "me", timestamp },
    ]);
    socket.emit("send_message", { roomId: currentMatch.roomId, message: msgText, timestamp });
    setInputValue("");
    socket.emit("stop_typing", { roomId: currentMatch.roomId });
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (!currentMatch || partnerDisconnected) return;
    socket.emit("typing", { roomId: currentMatch.roomId });
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop_typing", { roomId: currentMatch.roomId });
    }, 1500);
  };

  const handleSkip = () => {
    saveRecentMatch();
    if (currentMatch) socket.emit("skip_user", { roomId: currentMatch.roomId });
    setMatch(null);
    setIsQueueing(true);
    setLocation("/matching");
  };

  const handleEnd = () => {
    saveRecentMatch();
    if (currentMatch && !partnerDisconnected) socket.emit("disconnect_partner", { roomId: currentMatch.roomId });
    setMatch(null);
    setLocation("/");
  };

  const handleReport = (reason: string) => {
    if (currentMatch) socket.emit("report_user", { roomId: currentMatch.roomId, reason });
    setShowReportDialog(false);
    handleEnd();
  };

  if (!currentMatch) return null;

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-background overflow-hidden">
      {/* LEFT: Video Area */}
      <div className="relative w-full lg:w-3/5 h-[40vh] lg:h-full bg-black flex flex-col border-b lg:border-b-0 lg:border-r border-white/10">
        {/* Remote Video */}
        <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />

        {/* Partner disconnected overlay */}
        {partnerDisconnected && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
            <UserX className="w-16 h-16 text-white/40 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Partner Disconnected</h3>
            <p className="text-white/60 mb-6">Want to find someone else?</p>
            <div className="flex gap-4">
              <Button variant="outline" onClick={handleEnd}>Back Home</Button>
              <Button onClick={handleSkip}><UserSearch className="w-4 h-4 mr-2" />Find New Match</Button>
            </div>
          </div>
        )}

        {/* Local PiP */}
        <div className="absolute bottom-4 right-4 w-24 h-32 sm:w-32 sm:h-48 bg-gray-900 rounded-xl overflow-hidden border-2 border-white/20 shadow-2xl z-10">
          <video
            ref={localVideoRef}
            autoPlay playsInline muted
            className={`w-full h-full object-cover -scale-x-100 ${isVideoOff ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
          />
          {isVideoOff && (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
              <UserIcon className="w-8 h-8 text-white/20" />
            </div>
          )}
        </div>

        {/* Top Info Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent flex justify-between items-center z-10">
          <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2.5">
            <div className={`w-2 h-2 rounded-full ${partnerDisconnected ? "bg-red-500" : "bg-green-500 animate-pulse"}`} />
            <span className="text-sm font-bold text-white">{currentMatch.partner.name}</span>
            <span className="text-xs text-white/50 bg-white/10 px-2 py-0.5 rounded-md">{currentMatch.partner.gender}</span>
            {currentMatch.partner.interests?.slice(0, 2).map((i) => (
              <span key={i} className="hidden sm:inline-flex items-center gap-0.5 text-xs text-primary/80 bg-primary/10 px-2 py-0.5 rounded-md">
                <Tag className="w-2.5 h-2.5" />{i}
              </span>
            ))}
          </div>

          {/* Session Timer */}
          <div className="flex items-center gap-3">
            <div className="glass-card px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-mono text-white/70">
              <Clock className="w-3 h-3 text-primary" /> {timer}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowReportDialog(true)}
              className="text-white/50 hover:text-red-400 bg-black/20 backdrop-blur-md rounded-full"
            >
              <AlertOctagon className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Video Controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10 glass-card p-2 rounded-full">
          <Button
            variant="ghost"
            size="iconLg"
            onClick={toggleMute}
            className={`rounded-full transition-colors ${isMuted ? "bg-red-500/20 text-red-500" : "hover:bg-white/10 text-white"}`}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </Button>
          <Button
            variant="ghost"
            size="iconLg"
            onClick={toggleVideo}
            className={`rounded-full transition-colors ${isVideoOff ? "bg-red-500/20 text-red-500" : "hover:bg-white/10 text-white"}`}
          >
            {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
          </Button>
          <div className="w-px h-8 bg-white/10 mx-1" />
          <Button
            variant="destructive"
            size="iconLg"
            onClick={handleEnd}
            className="rounded-full shadow-[0_0_15px_rgba(220,38,38,0.4)]"
          >
            <PhoneOff className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* RIGHT: Chat Panel */}
      <div className="w-full lg:w-2/5 h-[60vh] lg:h-full flex flex-col bg-card/40 backdrop-blur-3xl relative">
        {/* Chat Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between shrink-0 bg-white/5">
          <h2 className="font-display font-semibold text-lg flex items-center gap-2 text-white">
            <MessageSquare className="w-5 h-5 text-primary" /> Live Chat
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSkip}
            className="rounded-full text-xs h-8 px-4 border-primary/50 hover:bg-primary/20 hover:text-white text-white/80"
          >
            Skip & Next
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {isPartnerTyping && (
            <div className="flex justify-start my-2">
              <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/5 rounded-tl-sm flex gap-1 items-center h-[44px]">
                <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-white/40 rounded-full" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-black/20 border-t border-white/10 shrink-0">
          <form onSubmit={handleSendMessage} className="relative flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={handleTyping}
              disabled={partnerDisconnected}
              placeholder={partnerDisconnected ? "Chat ended..." : "Type a message..."}
              className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-5 pr-14 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!inputValue.trim() || partnerDisconnected}
              className="absolute right-1.5 rounded-full h-11 w-11"
            >
              <Send className="w-5 h-5 -ml-0.5" />
            </Button>
          </form>
        </div>
      </div>

      {/* Report Dialog */}
      <AnimatePresence>
        {showReportDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowReportDialog(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel w-full max-w-md rounded-3xl p-6 relative z-10 border border-white/10"
            >
              <h3 className="text-xl font-bold text-white mb-2">Report User</h3>
              <p className="text-white/60 text-sm mb-6">Why are you reporting? They'll be disconnected immediately.</p>
              <div className="space-y-3">
                {["Inappropriate behavior", "Harassment or bullying", "Spam", "Nudity / explicit content", "Underage user", "Other"].map((reason) => (
                  <button
                    key={reason}
                    onClick={() => handleReport(reason)}
                    className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white transition-colors font-medium text-sm"
                  >
                    {reason}
                  </button>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4 text-white/50" onClick={() => setShowReportDialog(false)}>
                Cancel
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
