import { useLocation } from "wouter";
import { useSEO } from "@/hooks/use-seo";
import { useAppStore } from "@/store/use-app-store";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { FAQSection } from "@/components/seo/FAQSection";
import { Video, Shield, Zap, Globe, Users, Star } from "lucide-react";

const faqs = [
  {
    q: "Is random video chat completely free?",
    a: "Yes! Aura's random video chat is 100% free with no hidden fees, no premium tiers, and no credit card required. Just enter a name and start chatting instantly.",
  },
  {
    q: "Do I need to create an account for random video chat?",
    a: "No account needed. Aura is fully anonymous — just enter an alias and your gender and you'll be instantly connected to a random stranger for video chat.",
  },
  {
    q: "How does random video chat matching work?",
    a: "Our smart matchmaking system uses gender-based pairing — males match with females only. When two people in the queue are compatible, they're instantly connected to a private video room.",
  },
  {
    q: "Is random video chat safe?",
    a: "We take safety seriously. All chats are anonymous, you can skip or report any user, and sessions auto-delete when either user disconnects. There's no personal data stored.",
  },
  {
    q: "Can I use random video chat on mobile?",
    a: "Absolutely. Aura works on any modern smartphone, tablet, or desktop browser with camera support. No app download required.",
  },
  {
    q: "What makes Aura different from Omegle?",
    a: "Aura offers a modern dark glassmorphism UI, gender-based matching for better compatibility, real-time text chat alongside video, and a safer reporting system than legacy platforms.",
  },
];

export default function RandomVideoChat() {
  const [, setLocation] = useLocation();
  const { setUser, setIsQueueing } = useAppStore();

  useSEO({
    title: "Random Video Chat - Free & Anonymous | No Signup | Aura",
    description: "Start a random video chat instantly. No signup, no registration — just click and connect with real strangers in seconds. Free anonymous video chat online.",
    keywords: "random video chat, random video call website, free random video chat, anonymous video chat online, chat with strangers video, omegle alternative",
    canonical: "https://aura.app/random-video-chat",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Random Video Chat - Free & Anonymous",
      "description": "Start random video chat instantly. No signup required. Connect with strangers via live video.",
      "url": "https://aura.app/random-video-chat",
    },
  });

  const handleStart = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6">
            <Zap className="w-4 h-4" /> Instant Connection — No Signup Needed
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Random Video Chat —<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Free & Anonymous</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
            Connect face-to-face with random strangers around the world instantly. No registration, no fees — just open your camera and start chatting in under 10 seconds.
          </p>
          <Button size="lg" onClick={handleStart} className="text-lg px-10 h-16 rounded-2xl">
            🎥 Start Random Video Chat Free
          </Button>
          <p className="mt-4 text-white/40 text-sm">No account required · Works on any device · 100% private</p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 border-y border-white/5 bg-white/2">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-3 gap-6 text-center">
          {[
            { value: "50K+", label: "Daily Users" },
            { value: "2M+", label: "Chats Started" },
            { value: "< 5s", label: "Average Match Time" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-primary">{s.value}</div>
              <div className="text-white/50 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* What Is Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">What Is Random Video Chat?</h2>
          <p className="text-white/70 text-lg leading-relaxed mb-6">
            Random video chat is a form of online communication where you're instantly connected to a <strong className="text-white">random stranger</strong> via live video and audio. Unlike traditional social media, there's no profile, no follower count, and no curated feed — just raw, genuine human connection.
          </p>
          <p className="text-white/70 text-lg leading-relaxed mb-6">
            Platforms like Aura take this concept further by adding <strong className="text-white">gender-based matching</strong>, ensuring you meet someone of the opposite gender for a more meaningful interaction. Combined with real-time text chat alongside video, you can connect on multiple levels simultaneously.
          </p>
          <p className="text-white/70 text-lg leading-relaxed">
            Random video chat has exploded in popularity as people seek <strong className="text-white">authentic connections</strong> beyond algorithm-filtered social feeds. Whether you want to make new friends, practice a language, or simply have an interesting conversation, random video chat delivers.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-white/2">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Why Choose Aura for Random Video Chat?</h2>
          <p className="text-white/60 text-center mb-12 max-w-2xl mx-auto">Everything you need for the best random video chat experience, completely free.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Instant Matching", desc: "Connect with a stranger in under 5 seconds. No waiting, no queues, no delays." },
              { icon: Shield, title: "100% Anonymous", desc: "No email, no account, no personal data stored. Your privacy is our priority." },
              { icon: Video, title: "HD Video Quality", desc: "Crystal-clear peer-to-peer WebRTC video calls. No server recording your streams." },
              { icon: Globe, title: "Global Reach", desc: "Connect with people from every country in the world, any time of day." },
              { icon: Users, title: "Gender Matching", desc: "Smart matching pairs males with females only for more compatible connections." },
              { icon: Star, title: "Modern Design", desc: "Sleek dark interface that actually feels good to use on any device." },
            ].map((f) => (
              <div key={f.title} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-colors">
                <f.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">How Random Video Chat Works on Aura</h2>
          <div className="space-y-8">
            {[
              { step: "1", title: "Enter Your Alias & Gender", desc: "Pick a fun username and select whether you're male or female. That's all the information we need — no email, phone, or password." },
              { step: "2", title: "Click 'Find a Match'", desc: "Our matchmaking engine instantly searches for an available person of the opposite gender. The average wait time is under 5 seconds." },
              { step: "3", title: "Grant Camera Permission", desc: "Your browser will ask for camera and microphone access. This is peer-to-peer — we never store or record your video stream." },
              { step: "4", title: "Start Your Video Chat", desc: "You're now live! See each other in HD video, chat via text simultaneously, use emoji reactions, or mute/unmute anytime." },
              { step: "5", title: "Skip or Reconnect Freely", desc: "Not feeling the vibe? Hit 'Skip' to instantly find a new match. There's no limit on how many people you can meet." },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 text-white font-bold text-lg">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center bg-gradient-to-br from-primary/20 via-background to-accent/20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your Random Video Chat?</h2>
          <p className="text-white/60 text-lg mb-8">Join thousands of people connecting right now. It's free, it's instant, and it's completely anonymous.</p>
          <Button size="lg" onClick={handleStart} className="text-lg px-10 h-16 rounded-2xl">
            🎥 Start Video Chat Now — It's Free
          </Button>
        </div>
      </section>

      <FAQSection faqs={faqs} title="Random Video Chat FAQs" />
      <Footer />
    </div>
  );
}
