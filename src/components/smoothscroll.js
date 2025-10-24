import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export const lenis = new Lenis({
  duration: 0.8,
});
// --- RAF ---
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
// --- SYNC LENIS / GSAP ---
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
// --- BOUTONS START / STOP ---
$('[data-lenis-start]').on('click', () => lenis.start());
$('[data-lenis-stop]').on('click', () => lenis.stop());
// --- Forcer le scroll en haut après chargement complet ---
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
  lenis.scrollTo(0, { immediate: true });
});
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
  lenis.scrollTo(0, { immediate: true });
};
