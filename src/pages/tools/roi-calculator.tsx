import React, { useMemo, useState } from 'react';

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input {...props} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400 dark:bg-black/20" />
);

export default function ROICalcPage() {
  const [emails, setEmails] = useState(40000);
  const [deal, setDeal] = useState(1200);
  const [open, setOpen] = useState(0.34);
  const [automation, setAutomation] = useState(0.25); // time saved
  const [close, setClose] = useState(0.07);

  const result = useMemo(() => {
    const savedHours = emails * automation * 0.05; // rough minutes saved → hours
    const qualified = Math.round(emails * open * 0.04);
    const sales = Math.round(qualified * close);
    const revenue = sales * deal;
    return { savedHours, qualified, sales, revenue };
  }, [emails, deal, open, automation, close]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold">Marketing Automation ROI Calculator</h1>
      <p className="mt-2 opacity-80">Estimate savings and lift from automating your lifecycle and analytics stack.</p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <label className="text-sm">Monthly Emails <Input type="number" value={emails} onChange={e=>setEmails(+e.target.value||0)} /></label>
        <label className="text-sm">Avg Deal Size ($) <Input type="number" value={deal} onChange={e=>setDeal(+e.target.value||0)} /></label>
        <label className="text-sm">Open Rate (0–1) <Input type="number" step="0.01" value={open} onChange={e=>setOpen(+e.target.value||0)} /></label>
        <label className="text-sm">Time Saved (0–1) <Input type="number" step="0.01" value={automation} onChange={e=>setAutomation(+e.target.value||0)} /></label>
        <label className="text-sm">Close Rate (0–1) <Input type="number" step="0.01" value={close} onChange={e=>setClose(+e.target.value||0)} /></label>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 dark:bg-black/20">
          <div className="text-sm opacity-80">Estimated Hours Saved / mo</div>
          <div className="text-2xl font-bold text-cyan-400">{Math.round(result.savedHours)}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 dark:bg-black/20">
          <div className="text-sm opacity-80">Projected New Revenue / mo</div>
          <div className="text-2xl font-bold text-cyan-400">${result.revenue.toLocaleString()}</div>
        </div>
      </div>
    </main>
  );
}
