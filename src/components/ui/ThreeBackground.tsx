import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
	const mountRef = useRef<HTMLDivElement>(null);
	const sceneRef = useRef<THREE.Scene>();
	const cameraRef = useRef<THREE.PerspectiveCamera>();
	const rendererRef = useRef<THREE.WebGLRenderer>();
	const particlesRef = useRef<THREE.Points>();
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
		cameraRef.current = camera;

		// Renderer setup
		const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setClearColor(0x000000, 0);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
		rendererRef.current = renderer;
		mountRef.current.appendChild(renderer.domElement);

		// Create particles
		const particlesGeometry = new THREE.BufferGeometry();
		const isMobileViewport = window.innerWidth < 768;
		const particlesCount = isMobileViewport ? 250 : 1000;
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
		particlesRef.current = particles;

		// Animation loop
		const stopAnimation = () => {
			if (animationIdRef.current) {
				cancelAnimationFrame(animationIdRef.current);
				animationIdRef.current = undefined;
			}
		};

		const animate = () => {
			animationIdRef.current = requestAnimationFrame(animate);

			const currentParticles = particlesRef.current;
			if (currentParticles) {
				currentParticles.rotation.x += isMobileViewport ? 0.0003 : 0.0005;
				currentParticles.rotation.y += isMobileViewport ? 0.0006 : 0.001;
			}

			if (cameraRef.current) {
				renderer.render(scene, cameraRef.current);
			}
		};

		const startAnimation = () => {
			if (!animationIdRef.current) {
				animate();
			}
		};

		startAnimation();

		// Handle resize
		const handleResize = () => {
			if (!renderer || !cameraRef.current) return;
			const { innerWidth, innerHeight } = window;
			cameraRef.current.aspect = innerWidth / innerHeight;
			cameraRef.current.updateProjectionMatrix();
			renderer.setSize(innerWidth, innerHeight);
		};

		const handleVisibilityChange = () => {
			if (document.hidden) {
				stopAnimation();
			} else {
				startAnimation();
			}
		};

		window.addEventListener('resize', handleResize);
		document.addEventListener('visibilitychange', handleVisibilityChange);

		// Cleanup
		return () => {
			window.removeEventListener('resize', handleResize);
			document.removeEventListener('visibilitychange', handleVisibilityChange);
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
