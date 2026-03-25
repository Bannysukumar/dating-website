import { motion } from "framer-motion";
import { Share2, MessageCircle, Send, Twitter, Copy, Check } from "lucide-react";
import { useState } from "react";

const SHARE_URL = "https://aura.app";
const SHARE_TEXT = "I just found the coolest way to meet people online 🔥 No signup, just instant anonymous video chat. Try Aura:";

interface SharePanelProps {
  onClose?: () => void;
  compact?: boolean;
}

export function SharePanel({ onClose, compact = false }: SharePanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${SHARE_TEXT} ${SHARE_URL}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "from-green-600 to-green-500",
      url: `https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT} ${SHARE_URL}`)}`,
    },
    {
      name: "Telegram",
      icon: Send,
      color: "from-blue-600 to-blue-500",
      url: `https://t.me/share/url?url=${encodeURIComponent(SHARE_URL)}&text=${encodeURIComponent(SHARE_TEXT)}`,
    },
    {
      name: "Twitter / X",
      icon: Twitter,
      color: "from-sky-600 to-sky-500",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${SHARE_TEXT} ${SHARE_URL}`)}`,
    },
  ];

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-white/40 text-xs font-medium flex items-center gap-1">
          <Share2 className="w-3 h-3" /> Share
        </span>
        {shareLinks.map((s) => (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Share on ${s.name}`}
            className={`w-8 h-8 rounded-full bg-gradient-to-br ${s.color} flex items-center justify-center hover:scale-110 transition-transform`}
          >
            <s.icon className="w-4 h-4 text-white" />
          </a>
        ))}
        <button
          onClick={handleCopy}
          title="Copy link"
          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-white/60" />}
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6 border border-white/10"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-white flex items-center gap-2">
          <Share2 className="w-5 h-5 text-primary" /> Invite Friends & Grow the Community
        </h3>
        {onClose && (
          <button onClick={onClose} className="text-white/40 hover:text-white text-xl">×</button>
        )}
      </div>
      <p className="text-white/60 text-sm mb-5">Share Aura with friends. The bigger the community, the faster the matches!</p>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {shareLinks.map((s) => (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-col items-center gap-2 p-3 rounded-xl bg-gradient-to-br ${s.color} hover:opacity-90 transition-opacity`}
          >
            <s.icon className="w-5 h-5 text-white" />
            <span className="text-white text-xs font-semibold">{s.name}</span>
          </a>
        ))}
      </div>
      <button
        onClick={handleCopy}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white/80 text-sm font-medium"
      >
        {copied ? <><Check className="w-4 h-4 text-green-400" /> Link Copied!</> : <><Copy className="w-4 h-4" /> Copy Invite Link</>}
      </button>
    </motion.div>
  );
}
