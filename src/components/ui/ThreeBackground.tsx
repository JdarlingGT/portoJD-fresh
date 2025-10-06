import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
	const mountRef = useRef<HTMLDivElement>(null);
	const sceneRef = useRef<THREE.Scene>();
	const rendererRef = useRef<THREE.WebGLRenderer>();
	const animationIdRef = useRef<number>();

	useEffect(() => {
		if (!mountRef.current) return;

		// Scene setup
		const scene = new THREE.Scene();
		sceneRef.current = scene;

		// Camera setup
		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		camera.position.z = 5;

		// Renderer setup
		const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setClearColor(0x000000, 0);
		rendererRef.current = renderer;
		mountRef.current.appendChild(renderer.domElement);

		// Create particles
		const particlesGeometry = new THREE.BufferGeometry();
		const particlesCount = 1000;
		const positions = new Float32Array(particlesCount * 3);
		const colors = new Float32Array(particlesCount * 3);

		for (let i = 0; i < particlesCount * 3; i++) {
			positions[i] = (Math.random() - 0.5) * 20;
			colors[i] = Math.random() * 0.5 + 0.5; // Bright colors
		}

		particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

		const particlesMaterial = new THREE.PointsMaterial({
			size: 0.02,
			vertexColors: true,
			blending: THREE.AdditiveBlending,
			transparent: true,
			opacity: 0.6
		});

		const particles = new THREE.Points(particlesGeometry, particlesMaterial);
		scene.add(particles);

		// Animation loop
		const animate = () => {
			animationIdRef.current = requestAnimationFrame(animate);

			particles.rotation.x += 0.0005;
			particles.rotation.y += 0.001;

			renderer.render(scene, camera);
		};
		animate();

		// Handle resize
		const handleResize = () => {
			if (!renderer || !camera) return;
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};

		window.addEventListener('resize', handleResize);

		// Cleanup
		return () => {
			window.removeEventListener('resize', handleResize);
			if (animationIdRef.current) {
				cancelAnimationFrame(animationIdRef.current);
			}
			if (mountRef.current && renderer.domElement) {
				mountRef.current.removeChild(renderer.domElement);
			}
			renderer.dispose();
		};
	}, []);

	return <div ref={mountRef} className="fixed inset-0 -z-10 pointer-events-none" />;
};

export default ThreeBackground;
