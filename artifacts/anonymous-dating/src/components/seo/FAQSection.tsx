import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQ {
  q: string;
  a: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
}

export function FAQSection({ faqs, title = "Frequently Asked Questions" }: FAQSectionProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 bg-white/2">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-12">{title}</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 overflow-hidden bg-white/5"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/5 transition-colors"
                aria-expanded={open === i}
              >
                <span className="font-semibold text-white pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-primary shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="px-6 pb-5 text-white/60 leading-relaxed text-sm">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
