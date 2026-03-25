import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore, type Match } from "@/store/use-app-store";
import { getSocket } from "@/lib/socket";

export default function Matching() {
  const [, setLocation] = useLocation();
  const { user, isQueueing, setIsQueueing, setMatch } = useAppStore();

  useEffect(() => {
    if (!user || !isQueueing) {
      setLocation("/");
      return;
    }

    const socket = getSocket();

    // Join queue on mount
    socket.emit("join_queue", { name: user.name, gender: user.gender });

    // Listen for match
    const handleMatch = (data: { roomId: string; partner: any; isInitiator: boolean }) => {
      setMatch({
        roomId: data.roomId,
        partner: data.partner,
        isInitiator: data.isInitiator,
        startTime: Date.now()
      });
      setIsQueueing(false);
      setLocation("/chat");
    };

    socket.on("matched", handleMatch);

    return () => {
      socket.off("matched", handleMatch);
    };
  }, [user, isQueueing, setLocation, setIsQueueing, setMatch]);

  const handleCancel = () => {
    const socket = getSocket();
    socket.emit("leave_queue");
    setIsQueueing(false);
    setLocation("/");
  };

  const targetGender = user?.gender === "Male" ? "Female" : "Male";

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[80px]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Pulsing Avatar/Radar */}
        <div className="relative w-48 h-48 mb-12 flex items-center justify-center">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/30"
            animate={{ scale: [1, 1.5, 2], opacity: [0.8, 0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0 }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/40"
            animate={{ scale: [1, 1.5, 2], opacity: [0.8, 0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-accent/50"
            animate={{ scale: [1, 1.5, 2], opacity: [0.8, 0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
          />
          
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent shadow-[0_0_30px_rgba(247,37,133,0.5)] flex items-center justify-center overflow-hidden p-1">
            <img 
              src={`${import.meta.env.BASE_URL}images/avatar-placeholder.png`}
              alt="You"
              className="w-full h-full rounded-full object-cover bg-black"
            />
          </div>
        </div>

        <h2 className="text-3xl font-display font-bold text-white mb-3">
          Searching...
        </h2>
        <p className="text-white/60 font-medium text-lg mb-10 max-w-sm">
          Looking for a <span className="text-primary">{targetGender}</span> to connect with. This usually takes just a few seconds.
        </p>

        <Button 
          variant="outline" 
          size="lg" 
          onClick={handleCancel}
          className="rounded-full px-8"
        >
          <X className="w-5 h-5 mr-2" />
          Cancel Search
        </Button>
      </div>
    </div>
  );
}
