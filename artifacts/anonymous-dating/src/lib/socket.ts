import { io, Socket } from "socket.io-client";

let socketInstance: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socketInstance) {
    socketInstance = io(window.location.origin, {
      path: "/api/socket.io",
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
  }
  return socketInstance;
};

export const disconnectSocket = (): void => {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
};
