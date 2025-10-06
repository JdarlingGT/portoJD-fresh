import Kpi from "../components/blocks/KPI";
import FeatureList from "../components/blocks/FeatureList";
import ScreenGallery from "../components/blocks/ScreenGallery";
import platformOverviewData from "../data/platform-overview.json";

export default function PlatformOverview() {
  const data = platformOverviewData;

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white">
      <section className="relative">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold">{data.title}</h1>
          <p className="text-gray-300 mt-2">{data.subtitle}</p>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold">{data.hero.headline}</h2>
            <p className="text-gray-300 mt-2">{data.hero.subhead}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={data.hero.primaryCta.href} className="rounded-xl px-4 py-2 bg-white/10 hover:bg-white/20">{data.hero.primaryCta.label}</a>
              <a href={data.hero.secondaryCta.href} className="rounded-xl px-4 py-2 border border-white/15 hover:bg-white/10">{data.hero.secondaryCta.label}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.kpis.map(kpi => (
            <Kpi key={kpi.label} {...kpi} />
          ))}
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <h3 className="text-2xl font-semibold mb-4">What's Inside</h3>
          <FeatureList items={data.features} />
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <h3 className="text-2xl font-semibold mb-4">Screens & Workflows</h3>
          <ScreenGallery shots={data.screens} />
          <p className="text-xs text-gray-400 mt-3">Note: sensitive integrations may be masked in demo mode.</p>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <h3 className="text-2xl font-semibold mb-4">Tech & Architecture</h3>
          <ul className="flex flex-wrap gap-2">
            {data.tech.map(techItem => (
              <li key={techItem} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10">{techItem}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={data.closing.ctaPrimary.href} className="rounded-xl px-4 py-2 bg-white/10 hover:bg-white/20">{data.closing.ctaPrimary.label}</a>
            <a href={data.closing.ctaSecondary.href} className="rounded-xl px-4 py-2 border border-white/15 hover:bg-white/10">{data.closing.ctaSecondary.label}</a>
          </div>
        </div>
      </section>
    </main>
  );
}
