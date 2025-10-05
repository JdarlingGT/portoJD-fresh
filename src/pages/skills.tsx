import tb from '../data/toolbox.json';
import BrandIcon from '../components/ui/BrandIcon';

export default function SkillsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold">Toolbox & Technical Skills</h1>
      <p className="mt-2 opacity-80">Deep capability across marketing technology, analytics, and infrastructure.</p>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        {tb.competencies.map(c => (
          <div key={c.title} className="rounded-xl border border-white/10 bg-white/5 p-6 dark:bg-black/20">
            <h3 className="text-lg font-semibold">{c.title}</h3>
            <p className="mt-2 text-sm opacity-80">{c.desc}</p>
          </div>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Software & Platforms</h2>
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
          {Object.entries(tb.software).map(([k, vals]) => (
            <div key={k} className="rounded-lg border border-white/10 p-4">
              <div className="text-sm font-medium opacity-90">{k}</div>
              <div className="mt-3 flex flex-wrap gap-3">
                {vals.map(v => (
                  <span key={v} className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-sm dark:bg-black/20">
                    <BrandIcon name={v.toLowerCase().replace(/\s|\./g,'')} size={18} />
                    {v}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Languages</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {tb.languages.map(l => <span key={l} className="rounded-full bg-white/5 px-3 py-1 text-sm dark:bg-black/20">{l}</span>)}
        </div>
      </section>
    </main>
  );
}
