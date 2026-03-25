import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="w-full py-8 mt-auto z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-white/40 font-medium">
          © {new Date().getFullYear()} Aura Dating. No strings attached.
        </p>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="text-sm text-white/40 hover:text-white/80 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-sm text-white/40 hover:text-white/80 transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
