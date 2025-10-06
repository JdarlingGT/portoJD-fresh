import React from 'react';
import { motion } from 'framer-motion';

interface FetchCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
}

const FetchCard: React.FC<FetchCardProps> = ({ image, title, description, link }) => {
  return (
    <motion.div
      className="fetch-card bg-white shadow-lg rounded-lg overflow-hidden"
      whileHover={{ scale: 1.05 }}
    >
      <img src={image} alt={title} className="w-full h-32 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <a href={link} className="text-blue-500 hover:underline mt-2 block">
          View More
        </a>
      </div>
    </motion.div>
  );
};

export default FetchCard;