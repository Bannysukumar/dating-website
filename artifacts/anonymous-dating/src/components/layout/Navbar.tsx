import { Link } from "wouter";
import { Heart, Sparkles, Sun, Moon, Globe, User, HelpCircle, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAppStore } from "@/store/use-app-store";

export function Navbar() {
  const { user, theme, toggleTheme, language, setLanguage } = useAppStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 px-4 py-3 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-2.5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent">
            <Heart className="w-4 h-4 text-white fill-white group-hover:scale-110 transition-transform duration-300" />
            <Sparkles className="w-2.5 h-2.5 text-white absolute -top-0.5 -right-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
            Aura
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          <Link href="/about" className="px-3 py-1.5 text-sm font-medium text-white/60 hover:text-white transition-colors rounded-xl hover:bg-white/5">
            About
          </Link>
          <Link href="/faq" className="px-3 py-1.5 text-sm font-medium text-white/60 hover:text-white transition-colors rounded-xl hover:bg-white/5">
            FAQ
          </Link>
          <Link href="/contact" className="px-3 py-1.5 text-sm font-medium text-white/60 hover:text-white transition-colors rounded-xl hover:bg-white/5">
            Contact
          </Link>
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === "en" ? "te" : "en")}
            title="Toggle language"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-all text-xs font-semibold"
          >
            <Globe className="w-3.5 h-3.5" />
            {language === "en" ? "EN" : "తె"}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title="Toggle theme"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-all"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Profile */}
          {user ? (
            <Link
              href="/profile"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-all"
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xs">
                {user.name[0]?.toUpperCase()}
              </div>
              <span className="text-sm font-medium text-white">{user.name}</span>
            </Link>
          ) : (
            <Link
              href="/profile"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-all text-sm"
            >
              <User className="w-4 h-4" /> Profile
            </Link>
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white/60"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden mt-2 mx-0 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 space-y-1">
          <Link href="/about" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 text-sm font-medium">
            About
          </Link>
          <Link href="/faq" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 text-sm font-medium">
            <HelpCircle className="w-4 h-4" /> FAQ
          </Link>
          <Link href="/contact" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 text-sm font-medium">
            Contact
          </Link>
          <Link href="/profile" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 text-sm font-medium">
            <User className="w-4 h-4" /> {user ? user.name : "Profile"}
          </Link>
        </div>
      )}
    </header>
  );
}
