import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { User, Edit3, Save, Trash2, Clock, Users, Tag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useAppStore, type Gender } from "@/store/use-app-store";
import { useSEO } from "@/hooks/use-seo";
import { formatDistanceToNow } from "date-fns";

const INTEREST_SUGGESTIONS = [
  "music", "travel", "gaming", "movies", "cooking", "fitness",
  "art", "photography", "reading", "sports", "tech", "dance",
  "fashion", "anime", "yoga", "hiking", "coding", "pets",
];

export default function Profile() {
  const [, setLocation] = useLocation();
  const { user, setUser, recentMatches, clearRecentMatches, setIsQueueing } = useAppStore();

  const [editing, setEditing] = useState(!user);
  const [name, setName] = useState(user?.name || "");
  const [gender, setGender] = useState<Gender | "">(user?.gender || "");
  const [interests, setInterests] = useState<string[]>(user?.interests || []);
  const [interestInput, setInterestInput] = useState("");

  useSEO({
    title: "Your Profile - Aura Anonymous Chat",
    description: "Edit your alias, gender, and interests. View your recent match history on Aura.",
  });

  const toggleInterest = (tag: string) => {
    setInterests((prev) =>
      prev.includes(tag) ? prev.filter((i) => i !== tag) : [...prev, tag].slice(0, 8),
    );
  };

  const addCustomInterest = () => {
    const val = interestInput.trim().toLowerCase();
    if (val && !interests.includes(val) && interests.length < 8) {
      setInterests((prev) => [...prev, val]);
      setInterestInput("");
    }
  };

  const handleSave = () => {
    if (!name.trim() || !gender) return;
    setUser({ name: name.trim(), gender: gender as Gender, interests });
    setEditing(false);
  };

  const handleStart = () => {
    if (!user) return;
    setIsQueueing(true);
    setLocation("/matching");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <main className="max-w-2xl mx-auto px-4 pt-28 pb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Your Profile</h1>
              <p className="text-white/50 text-sm mt-1">Temporary session — no data stored on servers</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Profile Card */}
          <div className="glass-card rounded-3xl p-6 mb-6 border border-white/10">
            {editing ? (
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-semibold text-white/80 block mb-2">Alias</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your cool name..."
                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    maxLength={20}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-white/80 block mb-2">Gender</label>
                  <div className="grid grid-cols-2 gap-3">
                    {(["Male", "Female"] as Gender[]).map((g) => (
                      <button
                        key={g}
                        onClick={() => setGender(g)}
                        type="button"
                        className={`py-3 rounded-xl border font-semibold text-sm transition-all ${
                          gender === g
                            ? "bg-primary/20 border-primary text-white"
                            : "bg-black/20 border-white/10 text-white/50 hover:bg-white/5"
                        }`}
                      >
                        {g === "Male" ? "👨 Male" : "👩 Female"}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-white/80 block mb-2">
                    Interests <span className="text-white/30 font-normal">(up to 8 — helps find better matches)</span>
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {INTEREST_SUGGESTIONS.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleInterest(tag)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                          interests.includes(tag)
                            ? "bg-primary/20 border-primary/50 text-white"
                            : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={interestInput}
                      onChange={(e) => setInterestInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustomInterest())}
                      placeholder="Add custom interest..."
                      className="flex-1 bg-black/20 border border-white/10 rounded-xl py-2.5 px-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    />
                    <Button variant="outline" size="sm" onClick={addCustomInterest} className="shrink-0">
                      Add
                    </Button>
                  </div>
                  {interests.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {interests.map((i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-white text-xs flex items-center gap-1"
                        >
                          {i}
                          <button onClick={() => setInterests((p) => p.filter((x) => x !== i))} className="ml-1 opacity-60 hover:opacity-100">×</button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-3 pt-2">
                  <Button onClick={handleSave} disabled={!name.trim() || !gender} className="flex-1">
                    <Save className="w-4 h-4 mr-2" /> Save Profile
                  </Button>
                  {user && (
                    <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Alias</p>
                    <p className="text-2xl font-bold text-white">{user?.name}</p>
                  </div>
                  <button
                    onClick={() => setEditing(true)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-all"
                  >
                    <Edit3 className="w-5 h-5" />
                  </button>
                </div>
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Gender</p>
                  <p className="text-white font-semibold">{user?.gender === "Male" ? "👨 Male" : "👩 Female"}</p>
                </div>
                {user?.interests && user.interests.length > 0 && (
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Interests</p>
                    <div className="flex flex-wrap gap-2">
                      {user.interests.map((i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-medium flex items-center gap-1">
                          <Tag className="w-3 h-3" /> {i}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <Button onClick={handleStart} className="w-full mt-2">
                  Start Matching <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </div>

          {/* Recent Matches */}
          <div className="glass-card rounded-3xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" /> Recent Matches
              </h2>
              {recentMatches.length > 0 && (
                <button
                  onClick={clearRecentMatches}
                  className="flex items-center gap-1 text-xs text-white/40 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-3 h-3" /> Clear
                </button>
              )}
            </div>
            {recentMatches.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-10 h-10 text-white/20 mx-auto mb-3" />
                <p className="text-white/40 text-sm">No recent matches yet. Start chatting!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentMatches.map((m, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-white font-bold text-sm">
                        {m.name[0]?.toUpperCase()}
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{m.name}</p>
                        <p className="text-white/40 text-xs">{m.gender} · {formatDistanceToNow(m.matchedAt, { addSuffix: true })}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-white/40 text-xs">{Math.floor(m.duration / 60)}m {m.duration % 60}s</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
