import { motion } from "framer-motion";
import AnchorTOC from "../components/ui/AnchorTOC";
import ProgressBar from "../components/ui/ProgressBar";
import HighlightChips from "../sections/HighlightChips";
import PrinciplesGrid from "../sections/PrinciplesGrid";
import StackTiles from "../sections/StackTiles";
import TimelineVertical from "../sections/TimelineVertical";
import Partnerships from "../sections/Partnerships";
import TestimonialsCarousel from "../sections/TestimonialsCarousel";
import CTACluster from "../sections/CTACluster";
import { fadeIn, slideUp, staggerContainer } from "../styles/animations";

export default function About() {
  return (
    <main className="min-h-screen bg-background-dark text-secondary">
      <ProgressBar />
      {/* HERO */}
      <section id="story" className="relative pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[240px_1fr] gap-8">
          <div className="hidden lg:block"><AnchorTOC /></div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-6">
            <motion.h1 variants={slideUp} className="text-4xl sm:text-5xl font-heading font-bold">
              Where Marketing Vision <span className="text-primary-400">Meets Technical Reality</span>
            </motion.h1>

            <motion.p variants={fadeIn} className="font-body text-secondary/70 max-w-3xl">
              Great marketing ideas often break at the handoff—the critical point where a creative vision meets the complex reality of technical execution. My entire career has been built to solve this problem.
            </motion.p>

            <motion.p variants={fadeIn} className="font-body text-secondary/70 max-w-3xl">
              I&apos;m Jacob Darling, a marketing leader who operates as both a brand strategist and a systems architect. On one side, I direct bold rebrands and craft compelling narratives. On the other, I personally engineer the underlying technical infrastructure—the CRM logic, marketing automation workflows, and full-stack web architecture—that makes those campaigns scalable, measurable, and sustainable.
            </motion.p>

            <motion.p variants={fadeIn} className="font-body text-secondary/70 max-w-3xl">
              With a deep proficiency in data analysis and a validated expertise in teamwork, my hybrid approach creates integrated solutions that don&apos;t just look good, but function brilliantly. Whether migrating from Mailchimp to a tag-based FluentCRM system with 400+ automations or launching an OpenAI-powered assistant, I turn abstract goals into revenue-focused engines.
            </motion.p>

            <div className="flex flex-wrap gap-3">
              <a href="/contact" className="px-4 py-2 rounded-xl bg-secondary/10 hover:bg-secondary/20 font-body font-medium text-secondary transition-all duration-300 hover:shadow-brand">Schedule a Call</a>
              <a href="/resume" className="px-4 py-2 rounded-xl bg-secondary/10 hover:bg-secondary/20 font-body font-medium text-secondary transition-all duration-300 hover:shadow-brand">Download Résumé</a>
            </div>

            <HighlightChips chips={[
              "70% support ticket reduction",
              "40% e-commerce lift",
              "86% cache hit rate",
              "Unified data pipeline (web → LMS → CRM → analytics)"
            ]} />
          </motion.div>
        </div>
      </section>

      {/* Mobile TOC */}
      <div className="lg:hidden max-w-6xl mx-auto px-6">
        <AnchorTOC />
      </div>

      {/* PRINCIPLES */}
      <section id="principles" className="py-16 border-t border-secondary/10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-semibold mb-6 text-secondary">The Principles That Drive My Work</h2>
          <PrinciplesGrid />
        </div>
      </section>

      {/* STACK */}
      <section id="stack" className="py-16 border-t border-secondary/10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-semibold mb-2 text-secondary">My Interactive MarTech Stack</h2>
          <p className="font-body text-secondary/70 mb-6">I don&apos;t just use tools—I build integrated ecosystems.</p>
          <StackTiles />
        </div>
      </section>

      {/* JOURNEY */}
      <section id="journey" className="py-16 border-t border-secondary/10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-semibold mb-6 text-secondary">Professional Journey & Impact</h2>
          <TimelineVertical />
        </div>
      </section>

      {/* PARTNERSHIPS */}
      <section id="partnerships" className="py-16 border-t border-secondary/10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-semibold mb-6 text-secondary">Ongoing Strategic Partnerships</h2>
          <Partnerships />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-16 border-t border-secondary/10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-semibold mb-6 text-secondary">What Colleagues & Clients Say</h2>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-16 border-t border-secondary/10">
        <div className="max-w-6xl mx-auto px-6">
          <CTACluster />
        </div>
      </section>
    </main>
  );
}
