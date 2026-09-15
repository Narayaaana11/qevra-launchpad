import { createFileRoute } from "@tanstack/react-router";

import { Nav } from "@/components/qevra/Nav";
import { Hero } from "@/components/qevra/Hero";
import { Simulator } from "@/components/qevra/Simulator";
import { Capabilities } from "@/components/qevra/Capabilities";
import { DownloadSetup } from "@/components/qevra/DownloadSetup";
import { Shortcuts } from "@/components/qevra/Shortcuts";
import { Roadmap } from "@/components/qevra/Roadmap";
import { Waitlist } from "@/components/qevra/Waitlist";
import { FaqFeedback } from "@/components/qevra/FaqFeedback";
import { Footer } from "@/components/qevra/Footer";
import { ClickSpark } from "@/components/reactbits";

const title = "QEVRA Desktop — Local-first AI voice-to-action for Windows";
const description =
  "Hold Right Alt, speak, and paste instantly at your cursor. Local-first ambient dictation and context-aware copilot for Windows 10/11, powered by Groq Whisper-large-v3.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <ClickSpark sparkColor="#38bdf8" sparkSize={12} sparkRadius={22} sparkCount={9} duration={450}>
      <div className="min-h-screen bg-background relative selection:bg-cyan/30 selection:text-cyan">
        <Nav />
        <main className="relative z-10">
          <Hero />
          <Simulator />
          <Capabilities />
          <DownloadSetup />
          <Shortcuts />
          <Roadmap />
          <Waitlist />
          <FaqFeedback />
        </main>
        <Footer />
      </div>
    </ClickSpark>
  );
}

export default Index;
