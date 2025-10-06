import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { marked } from "marked";
import fm from "front-matter";
import { ArrowLeft, Clock, TrendingUp, ExternalLink, ChevronRight } from "lucide-react";
import AnchorTOC from "../components/ui/AnchorTOC";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import rawCaseStudies from "../data/caseStudies.json";
import type { CaseStudy, FrontMatterMetadata } from "../types/content";

const caseStudiesData = rawCaseStudies as CaseStudy[];

export default function DeepDive({ slug: propSlug }: Readonly<{ slug?: string }>) {
  const params = useParams<{ slug: string }>();
  const slug = propSlug ?? params.slug;
  const [html, setHtml] = useState("");
  const [frontMatter, setFrontMatter] = useState<FrontMatterMetadata>({});

  useEffect(() => {
    if (!slug) return;

    const fetchContent = async () => {
      try {
        const res = await fetch(`/content/deep-dives/${slug}.md`);
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
  const markdown = await res.text();

  const content = fm<FrontMatterMetadata>(markdown);
        setFrontMatter(content.attributes);

        const rawHtml = await marked.parse(content.body);

        const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

        const parser = new DOMParser();
        const doc = parser.parseFromString(rawHtml, 'text/html');
        const headings = doc.querySelectorAll('h2, h3');

        headings.forEach((heading, i) => {
          const text = heading.textContent || '';
          heading.id = `${slugify(text)}-${i}`;
        });

        setHtml(doc.body.innerHTML);

      } catch (error) {
        console.error('Failed to fetch or parse markdown:', error);
        setHtml('<p>Error loading content.</p>');
      }
    };

    fetchContent();
  }, [slug]);

  // Find current case study data
  const currentCaseStudy = caseStudiesData.find((cs) => cs.slug === slug);

  // Get related case studies (same category, excluding current)
  const relatedCaseStudies = caseStudiesData
    .filter((cs) => cs.category === currentCaseStudy?.category && cs.slug !== slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Enhanced Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Breadcrumbs />

          <div className="flex items-center gap-4 mb-8 mt-8">
            <Link
              to="/case-studies"
              className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Case Studies</span>
            </Link>
          </div>

          {frontMatter.title && (
            <div className="mb-8">
              <motion.div
                className="inline-block px-4 py-2 bg-cyan-400/10 border border-cyan-400/20 rounded-full text-cyan-400 text-sm font-semibold mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                📖 Deep Dive Case Study
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {frontMatter.title}
              </h1>

              {frontMatter.summary && (
                <p className="text-xl text-slate-300 mb-6 leading-relaxed max-w-4xl">
                  {frontMatter.summary}
                </p>
              )}

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>8-12 min read</span>
                </div>
                {currentCaseStudy && (
                  <>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-green-400">{currentCaseStudy.impact}</span>
                    </div>
                    <div className="px-3 py-1 bg-white/10 rounded-full">
                      {currentCaseStudy.category}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_280px] gap-12">
          {/* Main Content */}
          <motion.article
            className="prose prose-invert prose-lg max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div
              className="deep-dive-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </motion.article>

          {/* Sidebar */}
          <motion.aside
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Table of Contents */}
            <div className="sticky top-8">
              <AnchorTOC />

              {/* Toolbox Links */}
              {currentCaseStudy?.details?.toolboxLinks && currentCaseStudy.details.toolboxLinks.length > 0 && (
                <div className="mt-8 p-6 bg-gradient-to-br from-lime-500/10 to-green-600/10 border border-lime-500/20 rounded-xl">
                  <h3 className="text-lg font-bold mb-4 text-lime-400">Related Toolbox Items</h3>
                  <div className="space-y-3">
                    {currentCaseStudy.details.toolboxLinks.map((toolboxItem, index) => (
                      <Link
                        key={`${toolboxItem}-${index}`}
                        to="/toolbox"
                        className="group block p-3 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-lime-400 rounded-full"></div>
                            <h4 className="text-sm font-semibold text-white group-hover:text-lime-400 transition-colors">
                              {toolboxItem}
                            </h4>
                          </div>
                          <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-lime-400 transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-xs text-slate-400">
                      Explore my technical toolkit and methodologies
                    </p>
                  </div>
                </div>
              )}

              {/* Related Case Studies */}
              {relatedCaseStudies.length > 0 && (
                <div className="mt-8 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                  <h3 className="text-lg font-bold mb-4 text-cyan-400">Related Case Studies</h3>
                  <div className="space-y-3">
                    {relatedCaseStudies.map((related) => (
                      <Link
                        key={related.slug}
                        to={`/deep/${related.slug}`}
                        className="group block p-3 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                              {related.title}
                            </h4>
                            <p className="text-xs text-slate-400 mt-1">
                              {related.subtitle}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Call to Action */}
              <div className="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-xl">
                <h3 className="text-lg font-bold mb-2 text-cyan-400">Interested in Similar Work?</h3>
                <p className="text-sm text-slate-300 mb-4">
                  Let's discuss how I can help solve your technical challenges.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors text-sm font-semibold"
                >
                  <span>Get in Touch</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </main>
  );
}
