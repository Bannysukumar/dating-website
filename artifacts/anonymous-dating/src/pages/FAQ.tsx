import { useLocation } from "wouter";
import { useSEO } from "@/hooks/use-seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { FAQSection } from "@/components/seo/FAQSection";

const allFaqs = [
  {
    category: "Getting Started",
    items: [
      { q: "How do I start chatting on Aura?", a: "Just enter any alias (fake name is fine), select your gender, and click 'Find a Match'. You'll be connected to someone of the opposite gender within seconds. No registration, no email, no password required." },
      { q: "Is Aura completely free?", a: "Yes, 100% free. No hidden costs, no premium tier, no pay-to-unlock features. Every feature including HD video chat, text chat, and unlimited matching is free forever." },
      { q: "Do I need to create an account?", a: "Absolutely not. Aura is designed to be completely accountless. Your only identity is the alias you choose for that session. Close the tab and the session is gone." },
      { q: "What devices does Aura work on?", a: "Aura works on any modern browser with camera support — Chrome, Firefox, Safari, Edge. Works on desktop, laptop, tablet, and mobile. No app download required." },
    ],
  },
  {
    category: "Matching & Chat",
    items: [
      { q: "How does the matching system work?", a: "Aura maintains separate queues for male and female users. When both a male and female user are available simultaneously, they're instantly paired into a private room. If you add interests, Aura tries to match you with someone who shares them first." },
      { q: "Can I match with the same gender?", a: "No. Aura exclusively matches males with females and vice versa. This is a core design decision for the platform's dating/connection focus." },
      { q: "What happens if my match disconnects?", a: "You'll be notified that your partner has left. You can then go back to the home screen or immediately find a new match." },
      { q: "Can I skip a match I don't like?", a: "Yes. The Skip button immediately disconnects you from the current partner and puts both users back into the queue to find new matches." },
      { q: "Are there any limits on how many people I can chat with?", a: "No limits at all. You can skip and match as many times as you want." },
    ],
  },
  {
    category: "Video Calling",
    items: [
      { q: "How does video chat work?", a: "Aura uses WebRTC (Web Real-Time Communication) technology for peer-to-peer video. This means your video stream goes directly to the other person's browser — it never passes through our servers." },
      { q: "Is my video being recorded?", a: "No. Since video is peer-to-peer via WebRTC, Aura's servers never see your video stream. We have no ability to record it even if we wanted to." },
      { q: "Can I use Aura without a camera?", a: "Yes. You can chat via text without enabling your camera. However, your partner may still share their video." },
      { q: "Why isn't my camera working?", a: "Check that your browser has permission to access your camera and microphone. In Chrome, click the camera icon in the address bar. Also ensure no other app is using the camera simultaneously." },
    ],
  },
  {
    category: "Privacy & Safety",
    items: [
      { q: "What data does Aura collect?", a: "We collect nothing personally identifiable. We don't store your name, IP address, chat messages, or video. Sessions exist only in-memory and are wiped when you disconnect." },
      { q: "How do I report an inappropriate user?", a: "Click the flag icon in the video screen during an active chat. Select a reason (inappropriate behavior, harassment, spam, etc.) and the user will be disconnected and flagged. Multiple reports lead to automatic bans." },
      { q: "What if someone is harassing me?", a: "Skip them immediately using the Skip button. You can also use the Report button before skipping to help the community. You'll never be matched with that person again." },
      { q: "Does Aura have a profanity filter?", a: "Yes, basic profanity filtering is applied to text messages. Attempts to bypass the filter are monitored." },
      { q: "How does Aura prevent minors from using the platform?", a: "By using Aura, you confirm you are 18 years or older. The platform is intended for adults only." },
    ],
  },
  {
    category: "Technical",
    items: [
      { q: "What browsers are supported?", a: "Chrome 80+, Firefox 75+, Safari 14+, and Edge 80+. For best video quality, Chrome or Firefox on desktop is recommended." },
      { q: "Why is my video quality poor?", a: "Video quality depends on your internet connection speed. A minimum of 2 Mbps upload/download is recommended for HD video. Try closing other bandwidth-heavy apps." },
      { q: "Can I use Aura on a public WiFi network?", a: "Yes, though some corporate or school networks block WebRTC. If video isn't connecting, your network may be the issue." },
    ],
  },
];

export default function FAQ() {
  const [, setLocation] = useLocation();

  useSEO({
    title: "FAQ - Frequently Asked Questions | Aura Anonymous Chat",
    description: "Find answers to common questions about Aura — how matching works, privacy, video chat, safety, and more. Everything you need to know about anonymous chat.",
    keywords: "aura chat faq, anonymous chat questions, video chat help, how does aura work, chat with strangers help",
    canonical: "https://aura.app/faq",
    schema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: allFaqs.flatMap((cat) =>
        cat.items.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      ),
    },
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">Everything you need to know about Aura. Can't find the answer? Contact us.</p>
        </div>
      </section>

      {/* FAQ Categories */}
      <div className="max-w-3xl mx-auto px-4 pb-8 space-y-4">
        {allFaqs.map((cat) => (
          <div key={cat.category}>
            <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-3 ml-2">{cat.category}</h2>
            <FAQSection faqs={cat.items} title="" />
          </div>
        ))}
      </div>

      {/* CTA */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-xl mx-auto glass-card rounded-3xl p-10 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-3">Still have questions?</h2>
          <p className="text-white/60 mb-6">Our team is here to help. Send us a message.</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => setLocation("/contact")} variant="outline">Contact Us</Button>
            <Button onClick={() => setLocation("/")}>Start Chatting</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
