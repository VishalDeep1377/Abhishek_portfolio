(function () { 'use strict';
	const html = document.documentElement;
	const navToggle = document.getElementById('navToggle');
	const navMenu = document.getElementById('navMenu');
	const themeToggle = document.getElementById('themeToggle');
	const yearEl = document.getElementById('year');

	function applyTheme(theme) {
		html.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
		themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
	}

	const savedTheme = localStorage.getItem('theme');
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

	if (navToggle && navMenu) {
		navToggle.addEventListener('click', () => {
			const isOpen = navMenu.classList.toggle('open');
			navToggle.setAttribute('aria-expanded', String(isOpen));
		});
	}

	if (themeToggle) {
		themeToggle.addEventListener('click', () => {
			const current = html.getAttribute('data-theme');
			applyTheme(current === 'dark' ? 'light' : 'dark');
		});
	}

	// Scroll spy for active nav link
	const sections = Array.from(document.querySelectorAll('main section[id]'));
	const navLinks = Array.from(document.querySelectorAll('.nav-menu a'));
	function onScroll() {
		let current = 'home';
		for (const section of sections) {
			const rect = section.getBoundingClientRect();
			if (rect.top <= 96 && rect.bottom >= 96) {
				current = section.id;
				break;
			}
		}
		navLinks.forEach(a => {
			a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
		});
	}
	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('load', onScroll);

	// Scroll reveal animations
	const revealOptions = { threshold: 0.12 };
	const revealObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('reveal-in');
				revealObserver.unobserve(entry.target);
			}
		});
	}, revealOptions);
	Array.from(document.querySelectorAll('.card, .hero, .skill, .project')).forEach((el) => {
		el.classList.add('reveal');
		revealObserver.observe(el);
	});

	// Close menu on link click (mobile)
	navLinks.forEach(a => a.addEventListener('click', () => {
		navMenu.classList.remove('open');
		navToggle.setAttribute('aria-expanded', 'false');
	}));

	// Current year
	if (yearEl) yearEl.textContent = String(new Date().getFullYear());

	const progressBar = document.querySelector('.scroll-progress__bar');
	function updateProgress() {
		const scrollTop = window.scrollY || document.documentElement.scrollTop;
		const docHeight = document.documentElement.scrollHeight - window.innerHeight;
		const progress = Math.max(0, Math.min(1, scrollTop / docHeight));
		if (progressBar) progressBar.style.width = (progress * 100).toFixed(2) + '%';
	}
	window.addEventListener('scroll', updateProgress, { passive: true });
	window.addEventListener('load', updateProgress);

	// Smooth anchor scroll with header offset and easing
	function easeInOutCubic(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
	function smoothScrollTo(targetY, duration) {
		const startY = window.scrollY;
		const start = performance.now();
		function step(now) {
			const elapsed = now - start;
			const t = Math.min(1, elapsed / duration);
			const eased = easeInOutCubic(t);
			window.scrollTo(0, startY + (targetY - startY) * eased);
			if (t < 1) requestAnimationFrame(step);
		}
		requestAnimationFrame(step);
	}
	document.querySelectorAll('a[href^="#"]').forEach((link) => {
		link.addEventListener('click', (e) => {
			const href = link.getAttribute('href');
			if (!href || href === '#' || href.length === 1) return;
			const id = href.slice(1);
			const section = document.getElementById(id);
			if (!section) return;
			e.preventDefault();
			const headerOffset = 80;
			const y = section.getBoundingClientRect().top + window.scrollY - headerOffset;
			const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
			if (prefersReduced) window.scrollTo(0, y); else smoothScrollTo(y, 600);
		});
	});

	// Enhance reveal: stagger within each container
	const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (!prefersReduced) {
		const groups = document.querySelectorAll('.container, .card, .skills-grid');
		groups.forEach((group) => {
			const children = group.querySelectorAll('.reveal');
			children.forEach((el, i) => {
				el.style.transitionDelay = (i * 60) + 'ms';
			});
		});
	}

	// KPI counters
	function animateCounter(el) {
		const target = parseFloat(el.dataset.target || '0');
		const decimals = parseInt(el.dataset.decimals || '0', 10);
		const prefix = el.dataset.prefix || '';
		const suffix = el.dataset.suffix || '';
		const negative = target < 0;
		const absTarget = Math.abs(target);
		const duration = 1200;
		const start = performance.now();
		function step(now) {
			const t = Math.min(1, (now - start) / duration);
			const eased = easeInOutCubic(t);
			const value = absTarget * eased;
			const display = (negative ? '-' : '') + value.toFixed(decimals);
			el.textContent = prefix + display + suffix;
			if (t < 1) requestAnimationFrame(step);
		}
		requestAnimationFrame(step);
	}
	const kpis = Array.from(document.querySelectorAll('.kpi-num'));
	const kpiObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				animateCounter(entry.target);
				kpiObserver.unobserve(entry.target);
			}
		});
	}, { threshold: 0.5 });
	kpis.forEach((el) => kpiObserver.observe(el));

	// Parallax hero photo
	const heroPhoto = document.querySelector('.hero-photo');
	if (heroPhoto) {
		// Apply adjustable properties from data-attributes
		const dx = heroPhoto.getAttribute('data-x');
		const dy = heroPhoto.getAttribute('data-y');
		const dfit = heroPhoto.getAttribute('data-fit');
		const dsize = heroPhoto.getAttribute('data-size');
		if (dx) heroPhoto.style.setProperty('--photo-x', dx);
		if (dy) heroPhoto.style.setProperty('--photo-y', dy);
		if (dfit) heroPhoto.style.setProperty('--photo-fit', dfit);
		if (dsize) heroPhoto.style.setProperty('--photo-size', dsize);
		if (!prefersReduced) {
			window.addEventListener('scroll', () => {
				const rect = heroPhoto.getBoundingClientRect();
				const offset = rect.top / window.innerHeight;
				heroPhoto.style.transform = `translateY(${offset * 14}px)`;
			}, { passive: true });
		}
	}

	// Card tilt on mouse move
	const tiltCards = Array.from(document.querySelectorAll('.card'));
	tiltCards.forEach((card) => {
		card.classList.add('tilt');
		card.addEventListener('mousemove', (e) => {
			if (prefersReduced) return;
			const rect = card.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			const rx = ((y / rect.height) - 0.5) * -6;
			const ry = ((x / rect.width) - 0.5) * 6;
			card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
		});
		card.addEventListener('mouseleave', () => {
			card.style.transform = '';
		});
	});
})(); 