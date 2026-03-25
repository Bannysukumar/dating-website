import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col pt-24 pb-12">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 w-full">
        <h1 className="text-4xl font-display font-bold text-white mb-8">Terms of Service</h1>
        
        <div className="prose prose-invert prose-purple max-w-none text-white/70">
          <h2 className="text-white font-display mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using Aura, you accept and agree to be bound by the terms and provision of this agreement.
          </p>

          <h2 className="text-white font-display mt-8 mb-4">2. Age Restriction</h2>
          <p>
            You must be at least 18 years old to use this service. By using Aura, you represent and warrant that you are of legal age.
          </p>

          <h2 className="text-white font-display mt-8 mb-4">3. User Conduct</h2>
          <p>You agree NOT to use the service to:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, or obscene.</li>
            <li>Transmit any content containing nudity or sexual explicit material.</li>
            <li>Impersonate any person or entity.</li>
            <li>Transmit any material that contains software viruses or any other computer code designed to interrupt or destroy functionality.</li>
          </ul>

          <h2 className="text-white font-display mt-8 mb-4">4. Moderation and Reporting</h2>
          <p>
            While Aura is anonymous and chats are not recorded, users have the ability to report inappropriate behavior. Users who receive multiple reports may be temporarily or permanently banned from using the service based on their IP address.
          </p>

          <h2 className="text-white font-display mt-8 mb-4">5. Disclaimer of Warranties</h2>
          <p>
            This service is provided "as is" and "as available" without any warranties of any kind, whether express or implied. We do not guarantee that the service will be uninterrupted or error-free.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
