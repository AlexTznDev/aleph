import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

window.Webflow ||= [];
window.Webflow.push(() => {
  $(document).ready(function () {
    $('[img-anim]').each(function () {
      const $img = $(this);

      function revealImage() {
        gsap.to($img, { opacity: 1, duration: 2, ease: 'power2.out' });
      }

      if ($img[0].complete) {
        revealImage();
      } else {
        $img.on('load', revealImage);
        $img.on('error', revealImage);
      }
    });
  });
});
