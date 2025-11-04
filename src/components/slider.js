import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

window.Webflow ||= [];
window.Webflow.push(() => {
  // ================================================
  // SLIDERS thought-leader
  // ================================================

  $('.home-slider_container').each(function () {
    const swiperFounders = new Swiper('.swiper.is-founders', {
      slidesPerView: 'auto',
      spaceBetween: 16,
      loop: false,
      speed: 800,
      breakpoints: {
        992: {
          slidesPerView: 'auto',
        },
      },
      navigation: {
        nextEl: '.button-swiper.is-next',
        prevEl: '.button-swiper.is-prev',
        disabledClass: 'disabled',
      },
      a11y: {
        slideRole: 'listitem',
      },
    });
  });
});
