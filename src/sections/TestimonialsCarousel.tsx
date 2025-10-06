import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import data from "../data/about.json";

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = data.testimonials;

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-8 text-center shadow-lg"
        >
          <blockquote className="text-lg text-gray-300 mb-6 italic">
            &ldquo;{testimonials[currentIndex].quote}&rdquo;
          </blockquote>

          <div className="space-y-1">
            <div className="font-semibold text-white">{testimonials[currentIndex].author}</div>
            <div className="text-sm text-cyan-400">{testimonials[currentIndex].title}</div>
            <div className="text-xs text-gray-500">{testimonials[currentIndex].meta}</div>
          </div>

          {/* Profile Images */}
          <div className="flex justify-center mt-4">
            <motion.img
              src={`/assets/personal/profile${currentIndex + 1}.png`}
              alt={`Profile ${currentIndex + 1}`}
              className="rounded-full w-16 h-16 border-2 border-cyan-400 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={prev}
          onKeyDown={handleKeyDown}
          className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition-transform transform hover:scale-110 focus:ring-2 focus:ring-pink-400"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-transform transform hover:scale-125 ${
                i === currentIndex ? 'bg-cyan-400' : 'bg-white/20'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          onKeyDown={handleKeyDown}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:ring-2 focus:ring-cyan-400"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="text-center mt-6">
        <a
          href="https://linkedin.com/in/jacobdarling"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-cyan-400 hover:underline"
        >
          View More Recommendations →
        </a>
      </div>
    </div>
  );
}
