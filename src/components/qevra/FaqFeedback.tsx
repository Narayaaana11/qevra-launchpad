import { MessageSquare, Star, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Does QEVRA steal focus when recording?",
    a: "No. It uses Win32 native foreground preservation, so your caret never leaves the editor — the capsule renders as a non-activating overlay.",
  },
  {
    q: "Is my voice stored or trained on?",
    a: "Never. Audio streams strictly to Groq Cloud for instant transcription and is discarded immediately afterwards. No recordings, no training sets.",
  },
  {
    q: "Can I change the hotkey?",
    a: "Yes — Right Alt, F8, Fn, Right Ctrl, Left Alt or a fully custom combination, remappable from the settings overlay.",
  },
];

export function FaqFeedback() {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-5 py-24">
      <p className="font-mono text-[11px] tracking-[0.2em] text-subtle">FAQ</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">Straight answers</h2>

      <div className="mt-10 rounded-2xl surface px-6 py-2">
        <Accordion type="single" collapsible>
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`f${i}`} className={i === faqs.length - 1 ? "border-none" : "border-border"}>
              <AccordionTrigger className="text-left text-sm hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Floating expo feedback */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border border-border-strong bg-background/90 px-4 py-2.5 text-xs backdrop-blur-md transition-colors hover:border-[color-mix(in_oklab,var(--cyan)_45%,transparent)]"
      >
        <MessageSquare className="h-3.5 w-3.5 text-cyan" /> Give Expo Feedback
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-background/70 p-4 backdrop-blur-sm sm:items-center">
          <div className="rise w-full max-w-sm rounded-2xl surface-raised p-6 glow-ring">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium">How was QEVRA at the expo?</h3>
                <p className="mt-1 text-xs text-subtle">30 seconds, max.</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="text-subtle hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 flex gap-1.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => setRating(n)} aria-label={`${n} stars`}>
                  <Star
                    className={`h-6 w-6 transition-colors ${
                      n <= rating ? "fill-emerald text-emerald" : "text-subtle/50"
                    }`}
                  />
                </button>
              ))}
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              placeholder="What felt great? What broke?"
              className="mt-4 w-full resize-none rounded-lg border border-input bg-canvas px-3 py-2.5 text-sm outline-none placeholder:text-subtle/70 focus:border-[color-mix(in_oklab,var(--cyan)_50%,transparent)]"
            />

            <button
              onClick={() => {
                if (!rating) {
                  toast.error("Pick a star rating first");
                  return;
                }
                setOpen(false);
                setRating(0);
                setText("");
                toast.success("Feedback received", { description: "Thank you — this shapes the next build." });
              }}
              className="mt-4 w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Send feedback
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
