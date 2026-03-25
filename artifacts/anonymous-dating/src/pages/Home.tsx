import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { User as UserIcon, Activity, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore, type Gender } from "@/store/use-app-store";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useGetStats } from "@workspace/api-client-react";
import { getSocket } from "@/lib/socket";

export default function Home() {
  const [, setLocation] = useLocation();
  const { user, setUser, setIsQueueing } = useAppStore();
  
  const [name, setName] = useState(user?.name || "");
  const [gender, setGender] = useState<Gender | "">(user?.gender || "");
  
  const { data: stats } = useGetStats({
    query: { refetchInterval: 5000 } // Auto refetch every 5s
  });

  // Ensure socket is disconnected when on home page
  useEffect(() => {
    const socket = getSocket();
    socket.emit("leave_queue"); // just in case
  }, []);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !gender) return;
    
    setUser({ name: name.trim(), gender: gender as Gender });
    setIsQueueing(true);
    setLocation("/matching");
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12">
      <Navbar />
      
      {/* Background Image */}
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        <img 
          src={`${import.meta.env.BASE_URL}images/dark-romance-bg.png`}
          alt="Abstract Background"
          className="w-full h-full object-cover opacity-60 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]"></div>
      </div>

      <main className="flex-1 w-full max-w-lg mx-auto px-4 flex flex-col items-center justify-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full"
        >
          <div className="text-center mb-10">
            <h1 className="text-5xl sm:text-6xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-4 drop-shadow-xl">
              Meet someone <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent text-glow">right now.</span>
            </h1>
            <p className="text-lg text-white/70 font-medium">
              Anonymous video & text chat. No signups. Just instant connections.
            </p>
          </div>

          <form onSubmit={handleStart} className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
            {/* Decorative blurs inside card */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-[50px] pointer-events-none"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/20 rounded-full blur-[50px] pointer-events-none"></div>

            <div className="space-y-2 relative">
              <label className="text-sm font-semibold text-white/90 ml-1">Your Alias</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-white/40" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter a cool name..."
                  className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-medium"
                  maxLength={20}
                  required
                />
              </div>
            </div>

            <div className="space-y-3 relative">
              <label className="text-sm font-semibold text-white/90 ml-1">I am a</label>
              <div className="grid grid-cols-2 gap-4">
                {(["Male", "Female"] as Gender[]).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`relative py-4 rounded-2xl border transition-all duration-300 font-semibold overflow-hidden
                      ${gender === g 
                        ? "bg-white/10 border-primary shadow-[0_0_15px_rgba(247,37,133,0.2)] text-white" 
                        : "bg-black/20 border-white/10 text-white/50 hover:bg-white/5 hover:text-white/80"
                      }
                    `}
                  >
                    {gender === g && (
                      <motion.div 
                        layoutId="active-gender"
                        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{g}</span>
                  </button>
                ))}
              </div>
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full mt-4 text-lg h-16 group"
              disabled={!name.trim() || !gender}
            >
              Find a Match
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          {/* Stats Section */}
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-white/50 font-medium">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>{stats?.onlineUsers || 0} Online</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              <span>{stats?.activeMatches || 0} Active Chats</span>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
