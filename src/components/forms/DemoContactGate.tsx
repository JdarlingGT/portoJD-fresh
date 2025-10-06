import { useState } from "react";

type DemoContactGateProps = {
  readonly onUnlock: (name: string, email: string) => void;
};

export default function DemoContactGate({ onUnlock }: DemoContactGateProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    try {
      localStorage.setItem("demo_contact", JSON.stringify({ name, email, ts: Date.now() }));
    } catch (error) {
      console.warn("Unable to persist demo contact gate state", error);
    }
    onUnlock(name, email);
  };

  return (
    <form onSubmit={submit} className="rounded-2xl border border-white/10 bg-white/5 p-6 max-w-lg w-full">
      <h2 className="text-xl font-semibold">Access the Live Demo</h2>
      <p className="text-gray-300 text-sm mt-1">Enter your info to launch the embedded demo. We’ll follow up with context if requested.</p>
      <div className="mt-4 grid gap-3">
        <div className="text-sm">
          <label className="block" htmlFor="demo-contact-name">
            Name
          </label>
          <input
            id="demo-contact-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
          />
        </div>
        <div className="text-sm">
          <label className="block" htmlFor="demo-contact-email">
            Email
          </label>
          <input
            id="demo-contact-email"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
          />
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button className="rounded-xl px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors">Launch Demo</button>
        <a href="/contact" className="rounded-xl px-4 py-2 border border-white/15 hover:bg-white/10 transition-colors">Schedule Walkthrough</a>
      </div>
      <p className="text-xs text-gray-400 mt-2">We’ll never sell your info. Unsubscribe anytime.</p>
    </form>
  );
}
