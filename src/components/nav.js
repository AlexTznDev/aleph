import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
window.Webflow ||= [];
window.Webflow.push(() => {
  $('.nav_component').each(function () {
    const navWrapper = $(this).find('.nav_wrapper');
    const navComponent = $(this);
    const mm = gsap.matchMedia();

    mm.add('(max-width: 991px)', () => {
      const menuMobile = $(this).find('.menu');
      const menuContainer = $(this).find('.menu_container');
      const navBurger = $(this).find('.nav_burger');
      const topLine = $(this).find('.nav-burger_line.is-1');
      const middleLine = $(this).find('.nav-burger_line.is-2');
      const bottomLine = $(this).find('.nav-burger_line.is-3');
      const navLine = $(this).find('.nav_line');

      let menuIsOpen = false;

      // --- Timeline ouverture ---
      const tlOpen = gsap.timeline({ paused: true });

      tlOpen
        .set(menuMobile, { display: 'flex' })
        .to(
          navComponent,
          {
            color: 'var(--base-color--white-radiance)',
            duration: 0.4,
            ease: 'power2.inOut',
          },
          '<'
        )
        .to(
          navLine,
          {
            backgroundImage: 'linear-gradient(90deg, #efefed, #efefed00)',
            duration: 0.4,
            ease: 'power2.inOut',
          },
          '<'
        )
        .fromTo(
          menuContainer,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.inOut',
          },
          '<'
        )
        .to(
          topLine,
          {
            y: 5.2,
            rotate: 45,
            duration: 0.3,
            ease: 'power2.inOut',
          },
          '<'
        )
        .to(
          middleLine,
          {
            opacity: 0,
            duration: 0.2,
            ease: 'power2.inOut',
          },
          '<'
        )
        .to(
          bottomLine,
          {
            y: -5,
            rotate: -45,
            duration: 0.3,
            ease: 'power2.inOut',
          },
          '<'
        );

      // --- Timeline fermeture ---
      const tlClose = gsap.timeline({
        paused: true,
        onComplete: () => {
          gsap.set(menuMobile, { display: 'none' });
        },
      });

      tlClose
        .to(
          menuContainer,
          {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut',
          },
          0
        )
        .to(
          navLine,
          {
            backgroundImage: 'linear-gradient(90deg, #181617, #18161700)',
            duration: 0.4,
            ease: 'power2.inOut',
          },
          0
        )
        .to(
          navComponent,
          {
            color: '',
            duration: 0.4,
            ease: 'power2.inOut',
          },
          0
        )
        .to(
          topLine,
          {
            y: 0,
            rotate: 0,
            duration: 0.3,
            ease: 'power2.inOut',
          },
          0
        )
        .to(
          middleLine,
          {
            opacity: 1,
            duration: 0.2,
            ease: 'power2.inOut',
          },
          0
        )
        .to(
          bottomLine,
          {
            y: 0,
            rotate: 0,
            duration: 0.3,
            ease: 'power2.inOut',
          },
          0
        );

      // --- Gestion du click ---
      navBurger.on('click', () => {
        if (menuIsOpen) {
          tlClose.restart();
          navWrapper.removeClass('is-active-mobile');
          menuIsOpen = false;
        } else {
          tlOpen.restart();
          navWrapper.addClass('is-active-mobile');
          menuIsOpen = true;
        }
      });
    });
  });
});
