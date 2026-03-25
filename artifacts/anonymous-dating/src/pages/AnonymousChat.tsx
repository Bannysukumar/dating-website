import { useLocation } from "wouter";
import { useSEO } from "@/hooks/use-seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { FAQSection } from "@/components/seo/FAQSection";
import { Lock, EyeOff, MessageCircle, Trash2, RefreshCw, ShieldCheck } from "lucide-react";

const faqs = [
  {
    q: "What makes a chat truly anonymous?",
    a: "True anonymous chat requires no registration, stores no personal data, and deletes all messages when the session ends. Aura meets all three criteria — we never know who you are.",
  },
  {
    q: "Are my anonymous chat messages saved anywhere?",
    a: "No. All messages exist only in your browser session. The moment either user disconnects, all chat history is permanently deleted. There's no server-side message storage.",
  },
  {
    q: "Can I be traced while using anonymous chat?",
    a: "Aura never collects your IP address for identification, stores no account data, and uses peer-to-peer WebRTC for video (meaning video never passes through our servers).",
  },
  {
    q: "Is anonymous chat legal?",
    a: "Yes, anonymous chat is completely legal. However, users are required to follow our Terms of Service. Harmful, illegal, or abusive behavior can be reported and results in a ban.",
  },
  {
    q: "Can I use anonymous chat to practice languages?",
    a: "Absolutely! Many users use Aura to practice speaking with native speakers of different languages. It's a great, pressure-free environment since there's no long-term account.",
  },
];

export default function AnonymousChat() {
  const [, setLocation] = useLocation();

  useSEO({
    title: "Anonymous Chat Online - Free & Private | No Signup | Aura",
    description: "Chat anonymously online with strangers. No email, no account, no data stored. Private anonymous text and video chat that auto-deletes. 100% free.",
    keywords: "anonymous chat, anonymous chat online, private chat no signup, anonymous text chat, chat without registration, anonymous messaging, secret chat online",
    canonical: "https://aura.app/anonymous-chat",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Anonymous Chat Online - Free & Private",
      "description": "Chat anonymously with strangers online. No signup, no data stored. Private and free.",
      "url": "https://aura.app/anonymous-chat",
    },
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="relative pt-32 pb-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-background to-primary/10 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-semibold mb-6">
            <Lock className="w-4 h-4" /> Zero Data Collection · Auto-Delete on Disconnect
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Anonymous Chat Online —<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-primary">Truly Private</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
            Chat with real people without revealing your identity. No account, no email, no phone number. Your anonymity is guaranteed — messages vanish the moment you leave.
          </p>
          <Button size="lg" onClick={() => setLocation("/")} className="text-lg px-10 h-16 rounded-2xl">
            💬 Start Anonymous Chat Free
          </Button>
          <p className="mt-4 text-white/40 text-sm">Zero tracking · Messages auto-delete · No registration</p>
        </div>
      </section>

      <section className="py-8 border-y border-white/5 bg-white/2">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-3 gap-6 text-center">
          {[
            { value: "0", label: "Data Stored About You" },
            { value: "100%", label: "Anonymous Guarantee" },
            { value: "Instant", label: "Message Deletion" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-violet-400">{s.value}</div>
              <div className="text-white/50 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">The Power of Anonymous Chat</h2>
          <p className="text-white/70 text-lg leading-relaxed mb-6">
            Anonymous chat strips away the social performance of modern social media. When no one knows who you are, you can speak <strong className="text-white">more honestly, more openly, and more authentically</strong> than you ever could on a platform where your real identity is attached.
          </p>
          <p className="text-white/70 text-lg leading-relaxed mb-6">
            Research shows that people disclose more genuine emotions and thoughts in anonymous environments. This makes anonymous chat uniquely powerful for making real connections, getting unbiased advice, or simply having an interesting conversation without social filters.
          </p>
          <p className="text-white/70 text-lg leading-relaxed">
            Aura takes anonymous chat to the next level with <strong className="text-white">live video alongside text</strong>, so you can see the real human behind the conversation while still maintaining your anonymous alias. It's the perfect balance of privacy and genuine connection.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white/2">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">How Aura Protects Your Anonymity</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: EyeOff, title: "No Registration", desc: "We never ask for your email, phone, real name, or any personal identifier. Just an alias you choose." },
              { icon: Trash2, title: "Auto-Delete Chats", desc: "All messages are deleted the instant a session ends. There's no chat history, no logs, no archives." },
              { icon: Lock, title: "No Data Storage", desc: "We store zero personal data. Sessions exist in-memory only and are wiped on disconnect." },
              { icon: MessageCircle, title: "P2P Video", desc: "Video calls are peer-to-peer via WebRTC — your video stream never passes through our servers." },
              { icon: RefreshCw, title: "Fresh Every Time", desc: "Each session is completely new. There's no persistent identity linking your past conversations." },
              { icon: ShieldCheck, title: "Report & Block", desc: "If someone behaves inappropriately, report and skip instantly. Your safety matters." },
            ].map((f) => (
              <div key={f.title} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-colors">
                <f.icon className="w-8 h-8 text-violet-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Who Uses Anonymous Chat?</h2>
          <div className="space-y-6">
            {[
              { emoji: "🌍", title: "Language Learners", desc: "Practice speaking a foreign language with native speakers without fear of judgment. Anonymous chat removes the pressure of making mistakes." },
              { emoji: "💭", title: "People Seeking Honest Opinions", desc: "Get unfiltered, genuine feedback on ideas, decisions, or life situations from someone with no stake in the outcome." },
              { emoji: "🤝", title: "Lonely or Isolated Individuals", desc: "Connect with a real human being when you're feeling isolated. Sometimes talking to a stranger is easier than talking to people you know." },
              { emoji: "🎭", title: "Creative Explorers", desc: "Explore different personas, practice social skills, or engage in creative roleplay in a safe, temporary environment." },
              { emoji: "💕", title: "People Looking for Connection", desc: "Meet someone genuinely compatible through our gender-matched anonymous chat system. Real connections happen every day on Aura." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-3xl shrink-0">{item.emoji}</span>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 text-center bg-gradient-to-br from-violet-900/20 via-background to-primary/20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4">Start Your Anonymous Chat Now</h2>
          <p className="text-white/60 text-lg mb-8">No signup, no tracking, no strings attached. Just click and connect.</p>
          <Button size="lg" onClick={() => setLocation("/")} className="text-lg px-10 h-16 rounded-2xl">
            💬 Chat Anonymously — Free Forever
          </Button>
        </div>
      </section>

      <FAQSection faqs={faqs} title="Anonymous Chat FAQs" />
      <Footer />
    </div>
  );
}
