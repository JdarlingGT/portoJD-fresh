import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, User, Briefcase, Wrench, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { slideUp, staggerContainer } from '../styles/animations';
import LiveApps from '../sections/LiveApps';

const rotatingTitles = [
	'Brand Architect',
	'Marketing Strategist',
	'Systems Designer',
	'Automation Expert',
];

const valueBlocks = [
	{
		title: 'About',
		description:
			'Marketing strategist meets systems architect. See my journey, principles, and technical expertise.',
		href: '/about',
		icon: User,
		color: 'from-cyan-500 to-blue-600',
	},
	{
		title: 'Case Studies',
		description:
			'Real solutions, measurable impact. From AI automation to security overhauls.',
		href: '/case-studies',
		icon: Briefcase,
		color: 'from-lime-500 to-green-600',
	},
	{
		title: 'Toolbox',
		description:
			'The stack, workflows, and methodologies behind successful marketing systems.',
		href: '/toolbox',
		icon: Wrench,
		color: 'from-coral-500 to-red-600',
	},
];

const testimonials = [
	{
		quote:
			'Jacob transformed our chaotic marketing operations into a streamlined, data-driven system that actually works.',
		author: 'Marketing Director',
		company: 'Healthcare Technology',
	},
	{
		quote:
			'His ability to bridge technical complexity and business strategy is exactly what growing companies need.',
		author: 'VP of Operations',
		company: 'SaaS Platform',
	},
];

const stats = [
	{ label: 'Years Experience', value: '8+' },
	{ label: 'Projects Delivered', value: '150+' },
	{ label: 'Support Ticket Reduction', value: '70%' },
	{ label: 'Cache Hit Rate Achieved', value: '86%' },
];

const Home = () => {
	const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTitleIndex((prev) => (prev + 1) % rotatingTitles.length);
		}, 3000); // Change every 3 seconds

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="min-h-screen bg-[#0F0F0F] text-white relative overflow-hidden">
			{/* Animated Background */}
			<motion.div
				className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5"
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
			{/* Hero Section */}
			<motion.section
				className="pt-32 pb-20 px-6"
				variants={staggerContainer}
				initial="hidden"
				animate="show"
			>
				<div className="max-w-4xl mx-auto text-center">
					<motion.h1
						className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent"
						variants={slideUp}
					>
						Jacob Darling
					</motion.h1>
					<motion.h2
						className="text-xl md:text-2xl text-slate-300 mb-8 font-light"
						variants={slideUp}
					>
						{rotatingTitles[currentTitleIndex]}
					</motion.h2>
					<motion.p
						className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
						variants={slideUp}
					>
						I design and build integrated marketing ecosystems that turn complexity
						into clarity,
						<br className="hidden sm:block" />
						curiosity into conversion, and chaos into competitive advantage. My work
						bridges the gap
						<br className="hidden sm:block" />
						between creative strategy and technical execution.
					</motion.p>
					<motion.div
						className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
						variants={slideUp}
					>
						<Link
							to="/case-studies"
							className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
						>
							View Case Studies <ArrowRight className="w-4 h-4" />
						</Link>
						<a
							href="/resume.pdf"
							className="inline-flex items-center gap-2 border border-white/20 hover:bg-white/10 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
						>
							Download Résumé
						</a>
					</motion.div>
				</div>
			</motion.section>

			{/* Value Blocks */}
			<motion.section
				className="py-20 px-6"
				variants={staggerContainer}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true }}
			>
				<div className="max-w-6xl mx-auto">
					<motion.div className="text-center mb-16" variants={slideUp}>
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							Explore My Work
						</h2>
						<p className="text-slate-400 text-lg">
							Strategy, systems, and measurable results
						</p>
					</motion.div>

					<div className="grid md:grid-cols-3 gap-8">
						{valueBlocks.map((block) => (
							<motion.div key={block.title} variants={slideUp}>
								<Link
									to={block.href}
									className="group block p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 h-full"
								>
									<div
										className={`w-12 h-12 rounded-lg bg-gradient-to-r ${block.color} flex items-center justify-center mb-4`}
									>
										<block.icon className="w-6 h-6 text-white" />
									</div>
									<h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
										{block.title}
									</h3>
									<p className="text-slate-400 mb-4 leading-relaxed">
										{block.description}
									</p>
									<div className="flex items-center text-cyan-400 text-sm font-semibold group-hover:translate-x-1 transition-transform">
										Learn More{' '}
										<ArrowRight className="w-4 h-4 ml-1" />
									</div>
								</Link>
							</motion.div>
						))}
					</div>
				</div>
			</motion.section>

			{/* Social Proof */}
			<motion.section
				className="py-20 px-6 bg-white/5"
				variants={staggerContainer}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true }}
			>
				<div className="max-w-4xl mx-auto">
					<motion.div className="text-center mb-16" variants={slideUp}>
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							What Clients Say
						</h2>
						<p className="text-slate-400 text-lg">
							Real feedback from real partnerships
						</p>
					</motion.div>

					<div className="grid md:grid-cols-2 gap-8">
						{testimonials.map((testimonial, index) => (
							<motion.div
								key={index}
								className="p-6 bg-white/5 border border-white/10 rounded-xl"
								variants={slideUp}
							>
								<div className="flex items-center mb-4">
									{[...Array(5)].map((_, i) => (
										<Star
											key={i}
											className="w-4 h-4 text-yellow-400 fill-current"
										/>
									))}
								</div>
								<p className="text-slate-300 mb-4 italic">
									"{testimonial.quote}"
								</p>
								<div className="text-sm text-slate-400">
									<div className="font-semibold">{testimonial.author}</div>
									<div>{testimonial.company}</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</motion.section>

			{/* Stats Row */}
			<motion.section
				className="py-16 px-6"
				variants={staggerContainer}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true }}
			>
				<div className="max-w-4xl mx-auto">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
						{stats.map((stat, index) => (
							<motion.div key={index} variants={slideUp}>
								<div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-2">
									{stat.value}
								</div>
								<div className="text-slate-400 text-sm">
									{stat.label}
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</motion.section>

			{/* Live Apps Section */}
			<LiveApps />

			{/* CTA Section */}
			<motion.section
				className="py-20 px-6"
				variants={staggerContainer}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true }}
			>
				<div className="max-w-4xl mx-auto text-center">
					<motion.h2
						className="text-3xl md:text-4xl font-bold mb-6"
						variants={slideUp}
					>
						Ready to Build Something Great?
					</motion.h2>
					<motion.p
						className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto"
						variants={slideUp}
					>
						Let's discuss how strategic systems thinking can transform your
						marketing operations
						<br className="hidden sm:block" />
						and drive measurable growth.
					</motion.p>
					<motion.div
						className="flex flex-col sm:flex-row gap-4 justify-center"
						variants={slideUp}
					>
						<Link
							to="/contact"
							className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center"
						>
							Start a Conversation{' '}
							<ArrowRight className="w-4 h-4 ml-2" />
						</Link>
						<Link
							to="/case-studies"
							className="px-8 py-3 bg-white/10 border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
						>
							View Case Studies
						</Link>
					</motion.div>
				</div>
			</motion.section>
		</div>
	);
};

export default Home;
