import { useLocation } from "wouter";
import { useSEO } from "@/hooks/use-seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { FAQSection } from "@/components/seo/FAQSection";
import { Globe, Heart, Zap, Smile, MapPin, Clock } from "lucide-react";

const faqs = [
  {
    q: "Is it safe to chat with strangers online?",
    a: "On Aura, yes. All users are anonymous, our platform has a robust reporting system, and you can skip any user instantly. Never share personal information like your real name, location, or phone number.",
  },
  {
    q: "What can I talk about when chatting with strangers?",
    a: "Anything! Music, movies, life advice, travel dreams, current events, or just casual small talk. Many users find that chatting with strangers leads to surprisingly deep and interesting conversations.",
  },
  {
    q: "Can I make friends by chatting with strangers?",
    a: "Absolutely. Many lasting friendships (and even relationships) begin on random chat platforms. While sessions are anonymous, genuine connections happen every day on Aura.",
  },
  {
    q: "What if a stranger is rude or inappropriate?",
    a: "Hit the Skip button to instantly end the chat and find someone new, or use the Report button to flag the user. Reported users receive warnings and bans based on the severity.",
  },
  {
    q: "How many strangers can I chat with per day?",
    a: "Unlimited! There's no daily cap on conversations. Skip freely, meet new people, and chat as much as you like — all completely free.",
  },
  {
    q: "Does Aura filter matching by country?",
    a: "Currently Aura matches globally for the widest pool of connections. Users from all over the world connect on Aura every day.",
  },
];

const testimonials = [
  { name: "Alex M.", text: "Met someone from Brazil who taught me about their culture for 2 hours. Mind blown. 10/10 would recommend.", emoji: "🇧🇷" },
  { name: "Sarah K.", text: "I was skeptical at first but the conversations here are actually way more interesting than Tinder.", emoji: "💫" },
  { name: "James T.", text: "Practice my Spanish every night. Random strangers are surprisingly patient teachers!", emoji: "🇪🇸" },
  { name: "Priya S.", text: "Feeling lonely late at night? This app genuinely helped me feel connected again.", emoji: "🌙" },
];

export default function ChatWithStrangers() {
  const [, setLocation] = useLocation();

  useSEO({
    title: "Chat With Strangers Online Free - Random Chat | Aura",
    description: "Chat with random strangers online for free. Meet new people from around the world via video and text. No signup required. Start chatting with strangers now.",
    keywords: "chat with strangers online free, talk to strangers, meet strangers online, random chat strangers, stranger chat, online chat with random people, free stranger chat",
    canonical: "https://aura.app/chat-with-strangers",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Chat With Strangers Online Free",
      "description": "Meet and chat with random strangers worldwide. Free, anonymous, no signup needed.",
      "url": "https://aura.app/chat-with-strangers",
    },
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="relative pt-32 pb-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-background to-primary/10 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-6">
            <Globe className="w-4 h-4" /> Connect With Strangers Worldwide
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Chat With Strangers —<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary">Online & Free</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
            Meet fascinating people from around the globe via live video and text chat. Every conversation is a new adventure with someone you've never met before.
          </p>
          <Button size="lg" onClick={() => setLocation("/")} className="text-lg px-10 h-16 rounded-2xl">
            🌍 Chat With Strangers Now
          </Button>
          <p className="mt-4 text-white/40 text-sm">Thousands online right now · Match in seconds · Free forever</p>
        </div>
      </section>

      <section className="py-8 border-y border-white/5 bg-white/2">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-3 gap-6 text-center">
          {[
            { value: "180+", label: "Countries Connected" },
            { value: "10M+", label: "Conversations Had" },
            { value: "4.8★", label: "User Satisfaction" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-blue-400">{s.value}</div>
              <div className="text-white/50 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Why Chat With Strangers?</h2>
          <p className="text-white/70 text-lg leading-relaxed mb-6">
            There's a unique magic to talking with someone you've never met. Without pre-existing assumptions, social obligations, or shared history, conversations with strangers often reach <strong className="text-white">surprising depth and honesty</strong> that's hard to find even with close friends.
          </p>
          <p className="text-white/70 text-lg leading-relaxed mb-6">
            Studies in social psychology confirm the "stranger on a train" phenomenon — people confide things to strangers they'd never tell people they know. Chatting with strangers online amplifies this, providing a <strong className="text-white">judgment-free space</strong> for authentic expression.
          </p>
          <p className="text-white/70 text-lg leading-relaxed">
            Beyond therapy-like conversations, chatting with strangers is simply fun. You never know if you'll meet an astronomer in Finland, a chef in Tokyo, or a musician in Buenos Aires. The world is waiting on Aura.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white/2">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">What You Can Do on Aura</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Heart, title: "Find Romantic Connections", desc: "Our gender-based matching creates the ideal environment for sparks to fly between strangers who might never have met otherwise." },
              { icon: Globe, title: "Explore Other Cultures", desc: "Talk to real people from countries you've never visited. Learn customs, languages, and perspectives firsthand." },
              { icon: Smile, title: "Beat Loneliness", desc: "Whether it's 2pm or 2am, there's always someone on Aura to chat with. You're never truly alone." },
              { icon: Zap, title: "Instant Conversations", desc: "Skip the endless swiping and matching. Get into a real conversation within 5 seconds of clicking." },
              { icon: MapPin, title: "No Geographic Limits", desc: "Your next favorite conversation could be with someone 10,000 miles away. Distance is irrelevant on Aura." },
              { icon: Clock, title: "Chat Any Time", desc: "Active users 24/7. Day, night, weekday, or weekend — there's always someone ready to chat." },
            ].map((f) => (
              <div key={f.title} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors">
                <f.icon className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Real Stories From Aura Users</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-white/80 italic mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{t.emoji}</span>
                  <span className="text-white/60 text-sm font-medium">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 text-center bg-gradient-to-br from-blue-900/20 via-background to-primary/20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4">Your Next Interesting Conversation Is One Click Away</h2>
          <p className="text-white/60 text-lg mb-8">Thousands of strangers are waiting to chat right now. What are you waiting for?</p>
          <Button size="lg" onClick={() => setLocation("/")} className="text-lg px-10 h-16 rounded-2xl">
            🌍 Start Chatting With Strangers Free
          </Button>
        </div>
      </section>

      <FAQSection faqs={faqs} title="Chat With Strangers FAQs" />
      <Footer />
    </div>
  );
}
