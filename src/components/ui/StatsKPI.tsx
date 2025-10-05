import React from 'react';

const items = [
  { value: '70%', label: 'Support Ticket Reduction' },
  { value: '400+', label: 'CRM Workflows Built' },
  { value: '40%', label: 'Checkout Conversion Lift' },
  { value: '35%', label: 'Increase in Qualified Leads' },
];

const StatsKPI: React.FC = () => {
  return (
    <section className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-4 py-12 sm:grid-cols-4">
      {items.map((it) => (
        <div key={it.label} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center dark:bg-black/20">
          <div className="text-2xl font-bold text-cyan-400">{it.value}</div>
          <div className="text-xs opacity-80">{it.label}</div>
        </div>
      ))}
    </section>
  );
};

export default StatsKPI;
