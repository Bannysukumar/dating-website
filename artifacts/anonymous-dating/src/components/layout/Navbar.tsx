import { Link } from "wouter";
import { Heart, Sparkles } from "lucide-react";
import { useAppStore } from "@/store/use-app-store";

export function Navbar() {
  const { user } = useAppStore();

  return (
    <header className="fixed top-0 w-full z-50 px-4 py-4 md:px-8 md:py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent box-glow">
            <Heart className="w-5 h-5 text-white fill-white group-hover:scale-110 transition-transform duration-300" />
            <Sparkles className="w-3 h-3 text-white absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-display font-bold text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 tracking-tight">
            Aura
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/about" className="text-sm font-medium text-white/70 hover:text-white transition-colors hidden md:block">
            About
          </Link>
          {user ? (
            <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2 border-white/10">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-medium text-white">{user.name}</span>
            </div>
          ) : (
            <Link href="/about" className="text-sm font-medium text-white/70 hover:text-white transition-colors md:hidden">
              About
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
