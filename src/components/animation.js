import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

window.Webflow ||= [];
window.Webflow.push(() => {
  $(document).ready(function () {
    const $imgs = $('[img-anim]');
    if (!$imgs.length) return;

    $imgs.each(function () {
      const $img = $(this);

      function revealImage() {
        gsap.to($img, { opacity: 1, duration: 2, ease: 'power2.out' });
      }

      if ($img.is('img')) {
        if ($img[0].complete) {
          revealImage();
        } else {
          $img.on('load', revealImage);
          $img.on('error', revealImage);
        }
      } else {
        revealImage();
      }
    });
  });

  let tlFounders = gsap.timeline({
    defaults: { ease: 'power1.out' },
    scrollTrigger: {
      trigger: '.container_section-allow-anim',
      start: 'top top',
      end: '80% 50%',
      scrub: 2,
      markers: false,
    },
  });

  tlFounders
    .fromTo('.founders_img-contain', { top: '-30%' }, { top: '40%', duration: 2 })
    .to('.founders_img-wrap', { scale: 0.7, duration: 2, ease: 'power1.out' }, '<')
    .to("[founder-img-wrap='circle-gold']", { opacity: 1, duration: 2 }, '<')
    .to("[founder-img-wrap='circle']", { opacity: 0, duration: 2 }, '<');
});
