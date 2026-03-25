import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col pt-24 pb-12">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 w-full">
        <h1 className="text-4xl font-display font-bold text-white mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert prose-purple max-w-none text-white/70">
          <p className="lead text-white/90">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-white font-display mt-8 mb-4">1. Information We Collect</h2>
          <p>
            Aura is designed to be as anonymous as possible. We do not require accounts, passwords, or emails. The only information we temporarily process is:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>The alias (name) you provide.</li>
            <li>Your selected gender preference for matchmaking.</li>
            <li>Technical data required for WebRTC connections (IP addresses via STUN servers to establish peer-to-peer video).</li>
          </ul>

          <h2 className="text-white font-display mt-8 mb-4">2. Video and Audio Data</h2>
          <p>
            Your video and audio streams are transmitted peer-to-peer directly to your match using WebRTC technology. <strong>We do not intercept, record, or store your video or audio chats on our servers.</strong>
          </p>

          <h2 className="text-white font-display mt-8 mb-4">3. Text Chat Messages</h2>
          <p>
            Text messages are routed through our servers to deliver them to your partner. They are kept in memory only for the duration of the connection and are <strong>not stored in any database</strong>. Once you disconnect, the chat history is permanently lost.
          </p>

          <h2 className="text-white font-display mt-8 mb-4">4. Local Storage</h2>
          <p>
            We use your browser's Local Storage to save your chosen alias and gender so you don't have to re-enter them on your next visit. You can clear this by clearing your browser data.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
