import { MessageSquare, Star, X, Check, HelpCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  SpotlightCard,
  Magnet,
  ShinyText
} from "@/components/reactbits";

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: "Does QEVRA steal window focus when recording?",
    a: "No. QEVRA uses Win32 native GetForegroundWindow and AttachThreadInput preservation. The floating capsule renders as an un-focusable, WS_EX_NOACTIVATE layered window, meaning your active caret in Cursor, VS Code, Slack, or Chrome never loses position.",
  },
  {
    q: "Is my voice recorded, saved, or used to train models?",
    a: "Never. Audio is converted into in-memory 16kHz PCM chunks and streamed directly to Groq Cloud for real-time Whisper-large-v3 transcription. It is immediately freed from RAM once returned. No audio or transcripts are ever stored on cloud servers.",
  },
  {
    q: "Can I customize the push-to-talk hotkey?",
    a: "Yes. In the QEVRA Settings overlay (Ctrl+Shift+Space), you can remap your activation key to Right Alt, F8, Fn, Right Ctrl, Left Alt, or any custom key combination supported by the low-level Windows keyboard hook.",
  },
  {
    q: "What is the difference between Direct Dictation and Smart Copilot?",
    a: "Direct Dictation is pure verbatim speech-to-text without hallucination — what you speak is typed out word-for-word with accurate capitalization and punctuation. Smart Copilot takes your spoken intent and structures it as an engineered prompt for Claude 3.7, ChatGPT, or Cursor Composer.",
  },
  {
    q: "Does QEVRA require Administrator privileges on Windows?",
    a: "No. The installer is configured for user-level installation (perMachine: false in AppData\\Local\\Programs), which allows seamless deployment on both personal and enterprise managed machines without UAC elevation roadblocks.",
  },
];

export function FaqFeedback() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSendFeedback = () => {
    if (!rating) {
      toast.error("Please select a star rating first.");
      return;
    }

    setSubmitted(true);
    toast.success("Thank you for the expo feedback!", {
      description: "Your notes will be reviewed directly by the engineering team.",
    });

    setTimeout(() => {
      setOpenDrawer(false);
      setSubmitted(false);
      setRating(0);
      setFeedbackText("");
    }, 1800);
  };

  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-5 py-24">
      <div className="text-center sm:text-left">
        <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
          FREQUENTLY ASKED QUESTIONS
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.025em] text-foreground sm:text-4xl">
          Straight answers from the builders.
        </h2>
      </div>

      {/* Accordion List wrapped in SpotlightCard */}
      <SpotlightCard
        spotlightColor="rgba(56, 189, 248, 0.15)"
        className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-[#0c0e14]/90 px-6 py-2 shadow-xl backdrop-blur-md"
      >
        <Accordion type="single" collapsible>
          {FAQS.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`faq-${i}`}
              className={i === FAQS.length - 1 ? "border-none" : "border-border"}
            >
              <AccordionTrigger className="text-left text-sm font-medium hover:no-underline py-4 text-foreground">
                <div className="flex items-center gap-2.5">
                  <HelpCircle className="h-4 w-4 shrink-0 text-cyan opacity-80" />
                  <span>{f.q}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground pb-4 pl-6">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SpotlightCard>

      {/* Floating Expo Live Feedback Trigger with Magnet */}
      <div className="fixed bottom-6 right-6 z-40">
        <Magnet padding={40} magnetStrength={3}>
          <button
            onClick={() => setOpenDrawer(true)}
            className="flex items-center gap-2.5 rounded-full border border-white/20 bg-[#0c0e14]/95 px-5 py-3 text-xs font-semibold text-foreground shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all hover:border-cyan/50 hover:shadow-[0_0_25px_-5px_rgba(56,189,248,0.4)] active:scale-95"
          >
            <MessageSquare className="h-4 w-4 text-cyan" />
            <ShinyText
              text="Give Expo Feedback"
              speed={3}
              color="#ffffff"
              shineColor="#38bdf8"
              className="font-medium"
            />
          </button>
        </Magnet>
      </div>

      {/* Expo Live Feedback Modal / Drawer */}
      {openDrawer && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-4 backdrop-blur-md sm:items-center">
          <div className="w-full max-w-md rounded-2xl border border-white/15 bg-[#0e1017] p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  How was QEVRA at the expo?
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  30-second quick feedback for the builders.
                </p>
              </div>
              <button
                onClick={() => setOpenDrawer(false)}
                aria-label="Close"
                className="rounded-lg p-1 text-muted-foreground hover:bg-canvas hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {submitted ? (
              <div className="mt-8 flex flex-col items-center justify-center py-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald/15 text-emerald">
                  <Check className="h-6 w-6" />
                </div>
                <h4 className="mt-3 text-sm font-semibold text-foreground">Feedback Recorded</h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  Thank you for shaping QEVRA Desktop!
                </p>
              </div>
            ) : (
              <>
                {/* 1-5 Star Selector */}
                <div className="mt-6 flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onMouseEnter={() => setHoverRating(n)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(n)}
                      aria-label={`${n} stars`}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-7 w-7 transition-colors ${
                          n <= (hoverRating || rating)
                            ? "fill-emerald text-emerald drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                            : "text-zinc-700 hover:text-zinc-500"
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  rows={3}
                  placeholder="What felt extraordinary? What could be improved?"
                  className="mt-5 w-full resize-none rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-zinc-600 focus:border-cyan focus:ring-1 focus:ring-cyan"
                />

                <button
                  onClick={handleSendFeedback}
                  className="mt-4 flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90 active:scale-[0.99]"
                >
                  Submit Feedback
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default FaqFeedback;
