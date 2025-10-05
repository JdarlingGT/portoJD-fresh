import React, { useState } from 'react';

type Ans = 'automation' | 'analytics' | 'ecommerce' | 'branding';

export default function QuizRecommender() {
  const [role, setRole] = useState<Ans | ''>('');
  const [size, setSize] = useState<'smb'|'mid'|'ent'|''>('');
  const [res, setRes] = useState<string>('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let t = '/case-studies';
    if (role === 'automation') t += '#graston';
    else if (role === 'analytics') t += '#provider-analytics';
    else if (role === 'ecommerce') t += '#gomez-craft-barbecue';
    else if (role === 'branding') t += '#black-letter-legal';
    setRes(`Recommended: ${t}`);
  };

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-white/10 bg-white/5 p-6 dark:bg-black/20">
      <h3 className="text-xl font-semibold">Find Your Perfect Case Study</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="text-sm">What are you exploring?
          <select className="mt-1 w-full rounded-md bg-transparent p-2 outline-none ring-1 ring-white/10" value={role} onChange={e=>setRole(e.target.value as Ans)}>
            <option value="">Select…</option>
            <option value="automation">Automation</option>
            <option value="analytics">Analytics</option>
            <option value="ecommerce">E‑commerce</option>
            <option value="branding">Branding</option>
          </select>
        </label>
        <label className="text-sm">Company size
          <select className="mt-1 w-full rounded-md bg-transparent p-2 outline-none ring-1 ring-white/10" value={size} onChange={e=>setSize(e.target.value as any)}>
            <option value="">Select…</option>
            <option value="smb">Small</option>
            <option value="mid">Mid‑market</option>
            <option value="ent">Enterprise</option>
          </select>
        </label>
      </div>
      <button className="mt-4 rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-black hover:bg-cyan-400">Show Recommendation</button>
      {res && <p className="mt-3 text-sm opacity-90">{res}</p>}
    </form>
  );
}
