import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, Check } from "lucide-react";
import { useSEO } from "@/hooks/use-seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  sentAt: number;
}

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useSEO({
    title: "Contact Us | Aura Anonymous Chat",
    description: "Get in touch with the Aura team. Report issues, ask questions, or send feedback about our anonymous video chat platform.",
    canonical: "https://aura.app/contact",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitting(true);

    // Store locally (no backend needed for MVP)
    const msgs: ContactMessage[] = JSON.parse(
      localStorage.getItem("aura_contact_messages") || "[]",
    );
    msgs.push({ name, email, subject, message, sentAt: Date.now() });
    localStorage.setItem("aura_contact_messages", JSON.stringify(msgs));

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-32 pb-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 pointer-events-none" />
        <div className="max-w-2xl mx-auto relative z-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-white/60 text-lg">Have a question, found a bug, or want to give feedback? We'd love to hear from you.</p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Info Sidebar */}
          <div className="md:col-span-2 space-y-5">
            {[
              { icon: Mail, title: "Email", desc: "support@aura.app", note: "Typically respond within 24 hours" },
              { icon: MessageSquare, title: "In-App Report", desc: "Use the flag button", note: "For urgent safety reports during a chat" },
            ].map((item) => (
              <div key={item.title} className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center mb-3">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-white mb-1">{item.title}</h3>
                <p className="text-primary text-sm font-medium">{item.desc}</p>
                <p className="text-white/40 text-xs mt-1">{item.note}</p>
              </div>
            ))}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="font-bold text-white mb-2">Common Topics</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>🐛 Bug reports</li>
                <li>🛡️ Safety & abuse</li>
                <li>💡 Feature requests</li>
                <li>❓ General questions</li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-3xl p-12 text-center border border-white/10 h-full flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-5">
                  <Check className="w-8 h-8 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">Message Sent!</h2>
                <p className="text-white/60 max-w-xs">We've received your message and will get back to you within 24 hours.</p>
                <Button className="mt-6" onClick={() => setSubmitted(false)} variant="outline">Send Another</Button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass-card rounded-3xl p-8 border border-white/10 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-semibold text-white/80 block mb-2">Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      required
                      className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-white/80 block mb-2">Email *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      required
                      className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-white/80 block mb-2">Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="What's this about?"
                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-white/80 block mb-2">Message *</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us everything..."
                    required
                    rows={6}
                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12"
                  disabled={submitting || !name || !email || !message}
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" /> Send Message
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
