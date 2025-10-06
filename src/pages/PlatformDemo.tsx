import { useEffect, useState } from "react";
import DemoContactGate from "../components/forms/DemoContactGate";

const DEMO_URL = "https://dazzling-tiger-zoom.vercel.app/"; // external demo

export default function PlatformDemo() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    try {
      const gate = localStorage.getItem("demo_contact");
      if (gate) setUnlocked(true);
    } catch (error) {
      console.warn("Unable to read demo contact gate state", error);
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold">Platform Demo</h1>
        <p className="text-gray-300 mt-2">Explore the live prototype. Some data is simulated for privacy.</p>

        {!unlocked ? (
          <div className="mt-8 flex justify-center">
            <DemoContactGate onUnlock={() => setUnlocked(true)} />
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-white/10 overflow-hidden">
            <iframe
              title="Live Platform Demo"
              src={DEMO_URL}
              className="w-full h-[78vh] bg-black"
              allow="clipboard-write; fullscreen; autoplay"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </main>
  );
}
