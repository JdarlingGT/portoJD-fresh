import { motion } from 'framer-motion';
import ThreeBackground from '../components/ui/ThreeBackground';

// Import the required components
import Hero from '../components/sections/Hero';
import BrandLogosCarousel from '../components/visuals/BrandLogosCarousel';
import ProjectCards from '../components/visuals/ProjectCards';
import StatsSection from '../components/visuals/StatsSection';
import TestimonialCarousel from '../components/ui/TestimonialCarousel';
import FeaturedApps from '../components/sections/FeaturedApps';
import Footer from '../components/layout/Footer';

const Home = () => {
	return (
		<div className="min-h-screen bg-background-dark text-secondary relative overflow-hidden">
			{/* Three.js Background */}
			<ThreeBackground />

			{/* Animated Background */}
			<motion.div
				className="absolute inset-0 bg-gradient-to-br from-primary-800/5 via-transparent to-accent-end/5"
				animate={{
					backgroundPosition: ['0% 0%', '100% 100%'],
				}}
				transition={{
					duration: 20,
					repeat: Infinity,
					repeatType: 'reverse',
				}}
				style={{
					backgroundSize: '200% 200%',
				}}
			/>

			{/* Component Order as Specified */}
			<Hero />
			<BrandLogosCarousel />
			<FeaturedApps />
			<ProjectCards />
			<StatsSection />
			<TestimonialCarousel />
			<Footer />
		</div>
	);
};

export default Home;
