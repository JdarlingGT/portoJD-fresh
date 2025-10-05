import React, { useMemo, useState } from 'react';
import data from '../data/case-studies.json';

type Item = typeof data.items[number];

const Pill: React.FC<{active?:boolean, onClick:()=>void, label:string}> = ({active,onClick,label}) => (
  <button onClick={onClick} className={`rounded-full border px-3 py-1 text-sm ${active?'bg-cyan-500 text-black border-transparent':'border-white/20 hover:bg-white/10'}`}>{label}</button>
);

export default function CaseStudiesPage() {
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all');
  const items = data.items as Item[];

  const view = useMemo(() => {
    return items.filter(it => 
      (filter==='all' || it.category.includes(filter as any)) &&
      (q==='' || (it.title+it.summary+it.subtitle).toLowerCase().includes(q.toLowerCase()))
    );
  }, [q, filter, items]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-3xl font-bold">Case Studies</h1>
      <p className="mt-2 opacity-80">Proof of impact. Filter by focus and search by keyword.</p>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <Pill label="All" onClick={()=>setFilter('all')} active={filter==='all'} />
        <Pill label="Automation" onClick={()=>setFilter('automation')} active={filter==='automation'} />
        <Pill label="Analytics" onClick={()=>setFilter('analytics')} active={filter==='analytics'} />
        <Pill label="E‑commerce" onClick={()=>setFilter('ecommerce')} active={filter==='ecommerce'} />
        <Pill label="Branding" onClick={()=>setFilter('branding')} active={filter==='branding'} />
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search…" className="ml-auto rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-400 dark:bg-black/20" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {view.map(it => (
          <a id={it.id} key={it.id} href={`#${it.id}`} className="group rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/60 hover:bg-white/10 dark:bg-black/20">
            <div className="text-sm opacity-70">{it.subtitle}</div>
            <h3 className="mt-1 text-xl font-semibold">{it.title}</h3>
            <p className="mt-2 text-sm opacity-80">{it.summary}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {it.impact.slice(0,2).map(s => <span key={s} className="rounded-full bg-cyan-400/10 px-2 py-0.5 text-xs text-cyan-300 ring-1 ring-cyan-400/30">{s}</span>)}
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
