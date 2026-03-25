import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Sparkles, Shield, Zap } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col pt-24 pb-12 relative">
      <Navbar />
      
      <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3"></div>
      </div>

      <main className="flex-1 max-w-4xl mx-auto px-4 w-full z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">About Aura</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            The modern way to meet new people instantly without the hassle of profiles, swiping, or waiting.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="glass-card p-6 rounded-3xl">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Instant Matches</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Enter your name, pick your gender, and get matched with someone in seconds. No endless swiping.
            </p>
          </div>
          
          <div className="glass-card p-6 rounded-3xl">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Anonymous</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              No accounts, no history, no strings attached. What happens on Aura stays on Aura. Close the tab and it's gone.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Real Connections</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              High-quality peer-to-peer video and audio chat lets you see and hear your match clearly in real-time.
            </p>
          </div>
        </div>
        
        <div className="glass-panel p-8 md:p-12 rounded-3xl text-center border-t border-white/10">
          <h2 className="text-2xl font-display font-bold text-white mb-4">Ready to find your spark?</h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">Join thousands of users online right now making real connections.</p>
          <a href="/" className="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 h-14 px-10 text-base bg-gradient-to-r from-primary to-accent text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 box-glow">
            Start Chatting Now
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
