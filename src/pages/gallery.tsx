import React from 'react';
import { motion } from 'framer-motion';
import { slideUp } from '../styles/animations';

const Gallery: React.FC = () => {
  // Replace with your actual Lightroom album embed URL
  const ALBUM_EMBED_URL = 'https://www.lightroom.com/embed/shares/...'; // Replace with your embed URL

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      <motion.div
        className="pt-32 pb-20 px-6"
        variants={slideUp}
        initial="hidden"
        animate="show"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Design Gallery
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A curated collection of my design work, from branding to UI/UX projects.
            </p>
          </div>

          <div className="bg-black/20 rounded-2xl p-8 backdrop-blur-sm">
            <iframe
              src={ALBUM_EMBED_URL}
              className="w-full h-[600px] rounded-xl border-0"
              title="Design Gallery"
              allowFullScreen
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Gallery;
