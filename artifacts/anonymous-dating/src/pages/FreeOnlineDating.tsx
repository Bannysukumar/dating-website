import { useLocation } from "wouter";
import { useSEO } from "@/hooks/use-seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { FAQSection } from "@/components/seo/FAQSection";
import { Heart, Sparkles, Clock, CreditCard, Eye, Flame } from "lucide-react";

const faqs = [
  {
    q: "Is Aura really free — no hidden charges?",
    a: "100% free. No premium tier, no pay-to-match, no credits, no subscription. Every feature including video chat, text chat, and unlimited matches is completely free forever.",
  },
  {
    q: "Do I need to create an account to use online dating on Aura?",
    a: "No account required whatsoever. No email, no phone, no social login. Just enter an alias, select your gender, and you're instantly in the matching pool. It takes 10 seconds.",
  },
  {
    q: "How is Aura different from Tinder or Bumble?",
    a: "Aura is completely anonymous with no profiles, no swiping, and no algorithmic gatekeeping. You connect with real people in real-time via live video — far more authentic than profile-based apps.",
  },
  {
    q: "Can I find a real relationship on Aura?",
    a: "Yes! Many users have formed lasting connections and relationships through Aura. The face-to-face video format creates more genuine chemistry than text-based profile browsing.",
  },
  {
    q: "Is Aura only for dating?",
    a: "Not at all. Many users use Aura to make friends, practice languages, or simply have interesting conversations. The romantic potential is there, but it's not required.",
  },
  {
    q: "How does gender matching work for online dating?",
    a: "Aura exclusively pairs male users with female users. This creates a more natural dating dynamic and prevents same-gender matching unless that changes in a future update.",
  },
];

const comparisonData = [
  { feature: "Signup Required", aura: "❌ No", others: "✅ Yes" },
  { feature: "Monthly Cost", aura: "❌ $0", others: "✅ $10-30/mo" },
  { feature: "Profile Required", aura: "❌ No", others: "✅ Yes" },
  { feature: "Live Video Chat", aura: "✅ Yes", others: "❌ Premium" },
  { feature: "Anonymous", aura: "✅ Yes", others: "❌ No" },
  { feature: "Instant Match", aura: "✅ < 5 seconds", others: "❌ Hours/Days" },
  { feature: "Message Storage", aura: "❌ None", others: "✅ Stored" },
];

export default function FreeOnlineDating() {
  const [, setLocation] = useLocation();

  useSEO({
    title: "Free Online Dating No Signup Required - Meet People Now | Aura",
    description: "Find dates online completely free with no signup or registration. Anonymous online dating with instant video matching. Meet real people right now on Aura.",
    keywords: "free online dating no signup, online dating without registration, free dating site no account, anonymous dating online, free video dating, instant dating online",
    canonical: "https://aura.app/free-online-dating-no-signup",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Free Online Dating No Signup",
      "description": "Free online dating with no signup required. Anonymous, instant video matching.",
      "url": "https://aura.app/free-online-dating-no-signup",
      "mainEntity": {
        "@type": "FAQPage",
        "mainEntity": faqs.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      },
    },
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="relative pt-32 pb-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-900/20 via-background to-primary/10 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-semibold mb-6">
            <Heart className="w-4 h-4 fill-rose-400" /> Free Forever · No Signup · No Credit Card
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Free Online Dating —<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-primary">No Signup Ever</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
            Tired of dating apps that charge a fortune and show you curated profiles? Aura connects you face-to-face with real singles instantly — completely free, no account, no algorithms.
          </p>
          <Button size="lg" onClick={() => setLocation("/")} className="text-lg px-10 h-16 rounded-2xl">
            💕 Start Free Dating Now
          </Button>
          <p className="mt-4 text-white/40 text-sm">No credit card · No signup · No profile needed</p>
        </div>
      </section>

      <section className="py-8 border-y border-white/5 bg-white/2">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-3 gap-6 text-center">
          {[
            { value: "$0", label: "Forever Free" },
            { value: "0 sec", label: "Profile Setup Time" },
            { value: "5 sec", label: "To Your First Match" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-rose-400">{s.value}</div>
              <div className="text-white/50 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Online Dating Is Broken. Here's the Fix.</h2>
          <p className="text-white/70 text-lg leading-relaxed mb-6">
            Traditional dating apps are designed to keep you single and paying. They hide matches behind paywalls, throttle your visibility to push premium subscriptions, and reduce human connection to a <strong className="text-white">swipe on a static photo</strong>.
          </p>
          <p className="text-white/70 text-lg leading-relaxed mb-6">
            Aura is built on a radically different philosophy: <strong className="text-white">real connections happen through real-time conversation</strong>, not through profile optimization. When you meet someone face-to-face via live video, you know within seconds if there's genuine chemistry.
          </p>
          <p className="text-white/70 text-lg leading-relaxed">
            No curated photos. No bio anxiety. No algorithm deciding who's "out of your league." Just you, someone compatible, and a conversation that could change everything — completely free, always.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4 bg-white/2">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Aura vs. Traditional Dating Apps</h2>
          <p className="text-white/60 text-center mb-10">Why pay for fake connections when real ones are free?</p>
          <div className="rounded-2xl overflow-hidden border border-white/10">
            <div className="grid grid-cols-3 bg-white/10 px-6 py-4 font-bold text-white text-sm">
              <span>Feature</span>
              <span className="text-center text-primary">Aura</span>
              <span className="text-center text-white/40">Others (Tinder/Bumble)</span>
            </div>
            {comparisonData.map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-3 px-6 py-4 text-sm ${i % 2 === 0 ? "bg-white/3" : ""}`}>
                <span className="text-white/70">{row.feature}</span>
                <span className="text-center font-semibold text-white">{row.aura}</span>
                <span className="text-center text-white/40">{row.others}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Free Online Dating on Aura Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: CreditCard, title: "Truly Free Forever", desc: "Not freemium. Not 'free with limits.' Every single feature is free. Period. Always." },
              { icon: Clock, title: "10-Second Setup", desc: "Enter a name, pick your gender, click start. You're dating in under 10 seconds from your first visit." },
              { icon: Eye, title: "No Profile Anxiety", desc: "No need to agonize over photos, bio, or interests. Let your personality do the talking via live video." },
              { icon: Sparkles, title: "Chemistry First", desc: "Real attraction comes from personality, humor, and energy — things only live conversation reveals." },
              { icon: Flame, title: "Real-Time Spark", desc: "Connect face-to-face and know instantly whether there's chemistry. No more endless texting with no vibe." },
              { icon: Heart, title: "Authentic Matches", desc: "Gender-based matching + live video = more genuine romantic compatibility than any algorithm." },
            ].map((f) => (
              <div key={f.title} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-rose-500/30 transition-colors">
                <f.icon className="w-8 h-8 text-rose-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 text-center bg-gradient-to-br from-rose-900/20 via-background to-primary/20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4">Your Next Great Date Is Already Waiting</h2>
          <p className="text-white/60 text-lg mb-8">No signup. No payment. No profile. Just click and meet someone real in seconds.</p>
          <Button size="lg" onClick={() => setLocation("/")} className="text-lg px-10 h-16 rounded-2xl">
            💕 Meet Someone Now — 100% Free
          </Button>
        </div>
      </section>

      <FAQSection faqs={faqs} title="Free Online Dating FAQs" />
      <Footer />
    </div>
  );
}
