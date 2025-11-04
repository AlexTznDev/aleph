import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export const lenis = new Lenis({
  lerp: 0.07, // plus petit = plus de résistance
  smoothWheel: true, // active le scroll fluide
  wheelMultiplier: 0.75, // < 1 = molette moins sensible
});

// --- SYNC LENIS / GSAP ---
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';

  window.addEventListener('load', () => {
    // petit délai pour éviter que le navigateur remette le scroll ensuite
    setTimeout(() => {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
    }, 50);
  });
}

// --- BOUTONS START / STOP ---
$('[data-lenis-start]').on('click', () => lenis.start());
$('[data-lenis-stop]').on('click', () => lenis.stop());
