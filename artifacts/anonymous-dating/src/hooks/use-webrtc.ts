import { useEffect, useRef, useState, useCallback } from "react";
import { getSocket } from "@/lib/socket";
import { useAppStore } from "@/store/use-app-store";

const STUN_SERVERS = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
  ],
};

export function useWebRTC() {
  const { currentMatch } = useAppStore();
  const socket = getSocket();
  
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const localStream = useRef<MediaStream | null>(null);
  
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callError, setCallError] = useState<string | null>(null);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  // Initialize WebRTC
  useEffect(() => {
    if (!currentMatch) return;

    let isMounted = true;

    const initCall = async () => {
      try {
        // 1. Get local media
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (!isMounted) {
          stream.getTracks().forEach(t => t.stop());
          return;
        }
        
        localStream.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // 2. Create Peer Connection
        const pc = new RTCPeerConnection(STUN_SERVERS);
        peerConnection.current = pc;

        // Add local tracks
        stream.getTracks().forEach(track => {
          if (localStream.current) {
            pc.addTrack(track, localStream.current);
          }
        });

        // Handle incoming tracks
        pc.ontrack = (event) => {
          if (event.streams && event.streams[0]) {
            setRemoteStream(event.streams[0]);
          }
        };

        // Handle ICE candidates
        pc.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("webrtc_ice_candidate", {
              roomId: currentMatch.roomId,
              candidate: event.candidate,
            });
          }
        };

        // 3. If initiator, create offer
        if (currentMatch.isInitiator) {
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          socket.emit("webrtc_offer", {
            roomId: currentMatch.roomId,
            offer,
          });
        }
      } catch (err) {
        console.error("Error accessing media devices.", err);
        setCallError("Could not access camera/microphone. Please allow permissions.");
      }
    };

    initCall();

    // Socket Event Listeners for WebRTC Signaling
    const handleOffer = async ({ offer }: { offer: RTCSessionDescriptionInit }) => {
      const pc = peerConnection.current;
      if (!pc) return;
      try {
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit("webrtc_answer", {
          roomId: currentMatch.roomId,
          answer,
        });
      } catch (e) {
        console.error("Error handling offer:", e);
      }
    };

    const handleAnswer = async ({ answer }: { answer: RTCSessionDescriptionInit }) => {
      const pc = peerConnection.current;
      if (!pc) return;
      try {
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
      } catch (e) {
        console.error("Error handling answer:", e);
      }
    };

    const handleIceCandidate = async ({ candidate }: { candidate: RTCIceCandidateInit }) => {
      const pc = peerConnection.current;
      if (!pc) return;
      try {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (e) {
        console.error("Error adding ice candidate:", e);
      }
    };

    socket.on("webrtc_offer", handleOffer);
    socket.on("webrtc_answer", handleAnswer);
    socket.on("webrtc_ice_candidate", handleIceCandidate);

    return () => {
      isMounted = false;
      socket.off("webrtc_offer", handleOffer);
      socket.off("webrtc_answer", handleAnswer);
      socket.off("webrtc_ice_candidate", handleIceCandidate);
      
      if (localStream.current) {
        localStream.current.getTracks().forEach(track => track.stop());
      }
      if (peerConnection.current) {
        peerConnection.current.close();
      }
    };
  }, [currentMatch, socket]);

  // Bind remote stream to video element when it changes
  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  const toggleMute = useCallback(() => {
    if (localStream.current) {
      const audioTrack = localStream.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  }, []);

  const toggleVideo = useCallback(() => {
    if (localStream.current) {
      const videoTrack = localStream.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOff(!videoTrack.enabled);
      }
    }
  }, []);

  return {
    localVideoRef,
    remoteVideoRef,
    isMuted,
    isVideoOff,
    toggleMute,
    toggleVideo,
    callError
  };
}
