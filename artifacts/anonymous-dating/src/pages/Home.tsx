import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { User as UserIcon, Activity, ArrowRight, Shield, Zap, Video, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore, type Gender } from "@/store/use-app-store";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SharePanel } from "@/components/SharePanel";
import { useSEO } from "@/hooks/use-seo";
import { useGetStats } from "@workspace/api-client-react";
import { getSocket } from "@/lib/socket";

const testimonials = [
  { name: "Alex M.", country: "🇺🇸", text: "Met the most interesting person from Argentina. We talked for 3 hours straight. This app is incredible.", rating: 5 },
  { name: "Priya S.", country: "🇮🇳", text: "I was so nervous to try this but honestly everyone has been kind. It's way better than Tinder lol.", rating: 5 },
  { name: "Marco T.", country: "🇧🇷", text: "Practicing my English every day with random strangers. My fluency went up so fast!", rating: 5 },
  { name: "Emma L.", country: "🇬🇧", text: "Feeling lonely after a breakup. This app genuinely helped me feel like myself again. 10/10.", rating: 5 },
];

const features = [
  { icon: Zap, title: "Match in 5 seconds", desc: "Fastest matchmaking on the web" },
  { icon: Video, title: "HD Video + Text", desc: "See & talk simultaneously" },
  { icon: Shield, title: "100% Anonymous", desc: "Zero data stored, ever" },
];

export default function Home() {
  const [, setLocation] = useLocation();
  const { user, setUser, setIsQueueing } = useAppStore();

  const [name, setName] = useState(user?.name || "");
  const [gender, setGender] = useState<Gender | "">(user?.gender || "");
  const [interests, setInterests] = useState<string[]>(user?.interests || []);
  const [interestInput, setInterestInput] = useState("");
  const [showShare, setShowShare] = useState(false);

  const addInterest = () => {
    const val = interestInput.trim().toLowerCase();
    if (val && !interests.includes(val) && interests.length < 5) {
      setInterests((p) => [...p, val]);
      setInterestInput("");
    }
  };

  useSEO({
    title: "Aura - Anonymous Video Chat & Dating | Meet Strangers Instantly",
    description: "Connect instantly with real people via anonymous video chat and text. No signup required. Free random chat with strangers online. Meet someone new right now.",
    keywords: "anonymous video chat, chat with strangers online free, random video call website, dating without signup, anonymous dating, free online dating no signup",
    canonical: "https://aura.app/",
  });

  const { data: stats } = useGetStats({
    query: { refetchInterval: 5000 },
  });

  useEffect(() => {
    const socket = getSocket();
    socket.emit("leave_queue");
  }, []);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !gender) return;
    setUser({ name: name.trim(), gender: gender as Gender, interests });
    setIsQueueing(true);
    setLocation("/matching");
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />

      {/* Background */}
      <div className="fixed inset-0 z-[-1] overflow-hidden">
        <img
          src={`${import.meta.env.BASE_URL}images/dark-romance-bg.png`}
          alt=""
          aria-hidden="true"
          loading="eager"
          className="w-full h-full object-cover opacity-50 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-background/85 backdrop-blur-[2px]" />
      </div>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-12 px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-lg"
        >
          {/* Trust badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-semibold">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              {stats?.onlineUsers || "..."} people online right now
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-5xl sm:text-6xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-4 drop-shadow-xl leading-tight">
              Meet someone <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">right now.</span>
            </h1>
            <p className="text-lg text-white/70 font-medium">
              Anonymous video & text chat. No signups. Just instant connections.
            </p>
          </div>

          {/* Main Form Card */}
          <form onSubmit={handleStart} className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-[50px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/20 rounded-full blur-[50px] pointer-events-none" />

            <div className="space-y-2 relative">
              <label htmlFor="alias" className="text-sm font-semibold text-white/90 ml-1">Your Alias</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-white/40" />
                </div>
                <input
                  id="alias"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter a cool name..."
                  className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-medium"
                  maxLength={20}
                  required
                  autoComplete="nickname"
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
                      }`}
                  >
                    {gender === g && (
                      <motion.div
                        layoutId="active-gender"
                        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{g === "Male" ? "👨 Male" : "👩 Female"}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="space-y-2 relative">
              <label className="text-sm font-semibold text-white/90 ml-1">
                Interests <span className="text-white/40 font-normal">(optional · up to 5)</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addInterest(); }}}
                  placeholder="music, gaming, travel..."
                  className="flex-1 bg-black/20 border border-white/10 rounded-2xl py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                />
                <button type="button" onClick={addInterest} className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 text-sm font-medium">
                  Add
                </button>
              </div>
              {interests.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {interests.map((i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-white text-xs flex items-center gap-1">
                      {i}
                      <button type="button" onClick={() => setInterests((p) => p.filter((x) => x !== i))} className="ml-1 opacity-60 hover:opacity-100">×</button>
                    </span>
                  ))}
                </div>
              )}
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

          {/* Live Stats */}
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-white/50 font-medium">
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

      {/* Feature Highlights */}
      <section className="z-10 py-12 px-4 border-t border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4">
          {features.map((f) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/5 border border-white/10"
            >
              <f.icon className="w-7 h-7 text-primary mb-2" />
              <p className="text-white font-bold text-sm">{f.title}</p>
              <p className="text-white/50 text-xs mt-1">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="z-10 py-16 px-4 bg-black/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">What People Are Saying</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-5 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="flex mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-white/80 text-sm italic mb-4">"{t.text}"</p>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{t.country}</span>
                  <span className="text-white/50 text-xs font-medium">{t.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Share / Invite Section */}
      <section className="z-10 py-12 px-4">
        <div className="max-w-lg mx-auto">
          {showShare ? (
            <SharePanel onClose={() => setShowShare(false)} />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-white/50 text-sm mb-3">Know someone who'd love this?</p>
              <button
                onClick={() => setShowShare(true)}
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-sm transition-colors"
              >
                Invite friends & grow the community <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* SEO Internal Links */}
      <section className="z-10 py-8 px-4 border-t border-white/5 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <p className="text-white/30 text-xs text-center mb-4 uppercase tracking-wider font-semibold">Popular on Aura</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "Random Video Chat", href: "/random-video-chat" },
              { label: "Anonymous Chat", href: "/anonymous-chat" },
              { label: "Chat With Strangers", href: "/chat-with-strangers" },
              { label: "Free Online Dating No Signup", href: "/free-online-dating-no-signup" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 text-xs font-medium transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
