import { Link } from "wouter";
import { Heart } from "lucide-react";
import { SharePanel } from "@/components/SharePanel";

export function Footer() {
  return (
    <footer className="w-full bg-black/30 border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* SEO Link Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2">
              <li><Link href="/random-video-chat" className="text-white/50 hover:text-white text-sm transition-colors">Random Video Chat</Link></li>
              <li><Link href="/anonymous-chat" className="text-white/50 hover:text-white text-sm transition-colors">Anonymous Chat</Link></li>
              <li><Link href="/chat-with-strangers" className="text-white/50 hover:text-white text-sm transition-colors">Chat With Strangers</Link></li>
              <li><Link href="/free-online-dating-no-signup" className="text-white/50 hover:text-white text-sm transition-colors">Free Online Dating</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Features</h4>
            <ul className="space-y-2">
              <li><span className="text-white/50 text-sm">HD Video Calls</span></li>
              <li><span className="text-white/50 text-sm">Real-Time Chat</span></li>
              <li><span className="text-white/50 text-sm">Gender Matching</span></li>
              <li><span className="text-white/50 text-sm">Anonymous Sessions</span></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-white/50 hover:text-white text-sm transition-colors">About Aura</Link></li>
              <li><Link href="/faq" className="text-white/50 hover:text-white text-sm transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-white/50 hover:text-white text-sm transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="text-white/50 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-white/50 hover:text-white text-sm transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Share Aura</h4>
            <SharePanel compact />
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span>© {new Date().getFullYear()} Aura. Connect anonymously. No strings attached.</span>
          </div>
          <p className="text-white/30 text-xs">
            Anonymous Video Chat · Random Chat · Free Online Dating · No Signup
          </p>
        </div>
      </div>
    </footer>
  );
}
