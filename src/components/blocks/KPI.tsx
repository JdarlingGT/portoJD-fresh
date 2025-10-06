type KpiProps = { label: string; value: string; note?: string };

export default function Kpi({ label, value, note }: KpiProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-2xl font-extrabold">{value}</div>
      <div className="text-sm text-gray-300 mt-1">{label}</div>
      {note && <div className="text-xs text-gray-400 mt-1">{note}</div>}
    </div>
  );
}
