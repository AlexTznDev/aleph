import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import Reeller from 'reeller';
import { lenis } from './smoothscroll';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, Flip);

Reeller.registerGSAP(gsap);

window.Webflow ||= [];
window.Webflow.push(() => {
  $(document).ready(function () {
    const $imgs = $('[img-anim]');
    if (!$imgs.length) return;

    $imgs.each(function () {
      const $img = $(this);

      function revealImage() {
        gsap.to($img, { opacity: 1, duration: 2, delay: 0.5, ease: 'power2.out' });
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
  $('.founders_img-contain').each(function () {
    const $container = $(this);

    // Pré-décodage des images
    $container.find('img').each(function () {
      this.decode?.().catch(() => {});
    });

    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    // --- MatchMedia Desktop ---
    let mm = gsap.matchMedia();
    mm.add('(min-width: 992px)', () => {
      // 🧠 Important : ne set que ce conteneur (pas tous)
      if (isSafari) gsap.set($container, { force3D: true, z: 0.01 });

      let tlFounders = gsap.timeline({
        defaults: { ease: 'power1.out' },
        scrollTrigger: {
          trigger: '.container_section-allow-anim',
          start: 'top top',
          end: '+=800px',
          scrub: 2,
          markers: false,
        },
      });

      tlFounders
        .fromTo(
          $container,
          { xPercent: -50, y: '-26rem', left: '50%' },
          { y: '36rem', duration: 2 }
        )
        .to($container.find('.founders_img-wrap'), { scale: 0.7, duration: 2 }, '<')
        .to($container.find("[founder-img-wrap='circle-gold']"), { opacity: 0.5, duration: 2 }, '<')
        .to($container.find("[founder-img-wrap='circle']"), { opacity: 0, duration: 2 }, '<');
    });
  });

  $('.venture_img-contain').each(function () {
    const $container = $(this);
    $container.find('img').each(function () {
      this.decode?.().catch(() => {});
    });
    // --- MatchMedia Desktop ---
    let mm = gsap.matchMedia();
    mm.add('(min-width: 992px)', () => {
      let tlVenture = gsap.timeline({
        defaults: { ease: 'power1.out' },
        scrollTrigger: {
          trigger: '.container_section-allow-anim',
          start: 'top top',
          end: '+=800px',
          scrub: 2,
          markers: false,
        },
      });

      tlVenture
        .fromTo(
          $container,
          { xPercent: -50, y: '-12rem', left: '50%' },
          { y: '36rem', duration: 2 }
        )

        // Animation d'opacité sur les cercles
        .to($container.find('.venture_img-wrap'), { scale: 0.7, duration: 2 }, '<')
        .to($container.find("[venture-img-wrap='circle-gold']"), { opacity: 0.5, duration: 2 }, '<')
        .to($container.find("[venture-img-wrap='circle']"), { opacity: 0, duration: 2 }, '<');
    });
  });

  $('[arrow-circle]').each(function () {
    const $container = $(this);
    $container.find('img').each(function () {
      this.decode?.().catch(() => {});
    });
    // --- MatchMedia Desktop ---
    let mm = gsap.matchMedia();
    mm.add('(min-width: 992px)', () => {
      let tlArrowCircle = gsap.timeline({
        defaults: { ease: 'power1.out' },
        scrollTrigger: {
          trigger: '.container_section-allow-anim',
          start: 'top top',
          end: '+=800px',
          scrub: 2,
          markers: false,
        },
      });

      tlArrowCircle
        .fromTo($container, { xPercent: -50, y: '8rem', left: '50%' }, { y: '30rem', duration: 2 })

        // Animation d'opacité sur les cercles
        .to($container.find('.arrow-circle_img-wrap'), { scale: 0.9, duration: 2 }, '<')
        .to(
          $container.find("[arrow-img-wrap='arrow-circle-gold']"),
          { opacity: 0.5, duration: 2 },
          '<'
        )
        .to($container.find("[arrow-img-wrap='arrow-circle']"), { opacity: 0, duration: 2 }, '<');
    });
  });

  $('.lightbox_section').each(function () {
    function adjaxModal() {
      let lightbox = $("[tr-ajaxmodal-element='lightbox']");
      let lightboxClose = $("[tr-ajaxmodal-element='lightbox-close']").attr(
        'aria-label',
        'Close Modal'
      );
      let lightboxModal = $("[tr-ajaxmodal-element='lightbox-modal']");
      let cmsLink = "[tr-ajaxmodal-element='cms-link']";
      let cmsPageContent = "[tr-ajaxmodal-element='cms-page-content']";
      let initialPageTitle = document.title;
      let initialPageUrl = window.location.href;
      let focusedLink;

      function updatePageInfo(newTitle, newUrl) {
        lightboxModal.empty();
        document.title = newTitle;
        window.history.replaceState({}, '', newUrl);
      }

      let tl = gsap.timeline({
        paused: true,
        onReverseComplete: () => {
          focusedLink.focus();
          updatePageInfo(initialPageTitle, initialPageUrl);
          lenis.start();
        },
        onComplete: () => {
          lightboxClose.focus();
        },
      });
      tl.set('body', { overflow: 'hidden' });
      tl.set(lightbox, { display: 'block', onComplete: () => lightboxModal.scrollTop(0) });
      tl.from(lightbox, { opacity: 0, duration: 0.2 });
      tl.from(lightboxModal, { y: '5em', duration: 0.2 }, '<');

      function keepFocusWithinLightbox() {
        let lastFocusableChild = lightbox
          .find("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])")
          .not(':disabled')
          .not('[aria-hidden=true]')
          .last();
        lastFocusableChild.on('focusout', function () {
          lightboxClose.focus();
        });
      }

      function lightboxReady() {
        // your code here
      }

      $(document).on('click', cmsLink, function (e) {
        focusedLink = $(this);
        initialPageUrl = window.location.href;
        e.preventDefault();
        let linkUrl = $(this).attr('href');
        $.ajax({
          url: linkUrl,
          success: function (response) {
            let cmsContent = $(response).find(cmsPageContent);
            let cmsTitle = $(response).filter('title').text();
            let cmsUrl = window.location.origin + linkUrl;
            updatePageInfo(cmsTitle, cmsUrl);

            lightboxModal.append(cmsContent);
            tl.play();
            keepFocusWithinLightbox();
            lightboxReady();
          },
        });
      });

      lightboxClose.on('click', function () {
        tl.reverse();
      });
      $(document).on('keydown', function (e) {
        if (e.key === 'Escape') tl.reverse();
      });
      $(document).on('click', lightbox, function (e) {
        if (!$(e.target).is(lightbox.find('*'))) tl.reverse();
      });
    }
    adjaxModal();
  });

  $('.founders_list-item').each(function () {
    const $item = $(this);
    const $img = $item.find('.image-full-cover');

    $item.on('mouseenter', function () {
      gsap.to($img, { scale: 1.05, duration: 0.8, ease: 'power2.out' });
    });

    $item.on('mouseleave', function () {
      gsap.to($img, { scale: 1, duration: 0.8, ease: 'power2.out' });
    });
  });

  $('[founders-list]').each(function () {
    function reloadOnResize() {
      let lastWidth = window.innerWidth;
      const breakpoint = 767;

      window.addEventListener('resize', () => {
        const currentWidth = window.innerWidth;

        // Vérifie si on est passé au-dessus ou en dessous du breakpoint
        const crossedBreakpoint =
          (lastWidth < breakpoint && currentWidth >= breakpoint) ||
          (lastWidth >= breakpoint && currentWidth < breakpoint);

        if (crossedBreakpoint) {
          window.location.reload();
        }

        lastWidth = currentWidth;
      });
    }

    reloadOnResize();

    let mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const $allComponents = $('.archives-collection_dropdown-component');

      let $currentlyOpen = null;

      $allComponents.each(function () {
        const $component = $(this);
        const $list = $component.find('.archives-collection_dropdown-list');
        const $icon = $component.find('.icon-1x1-small');

        let isOpen = false;

        if ($list.length === 0 || $icon.length === 0) {
          return;
        }

        gsap.set($list, {
          opacity: 0,
          y: 10,
          display: 'none',
        });
        gsap.set($icon, {
          rotate: 0,
        });

        function openDropdown() {
          if ($currentlyOpen && $currentlyOpen[0] !== $component[0]) {
            $currentlyOpen.data('close')();
            $currentlyOpen = null;
          }

          gsap.set($list, { display: 'block' });
          gsap.to($list, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          });
          gsap.to($icon, {
            rotate: 180,
            duration: 0.6,
            ease: 'power2.out',
          });

          isOpen = true;
          $currentlyOpen = $component;
        }

        function closeDropdown() {
          gsap.to($list, {
            opacity: 0,
            y: 10,
            duration: 0.1,
            ease: 'power2.in',
            onComplete: () => {
              gsap.set($list, { display: 'none' });
            },
          });
          gsap.to($icon, {
            rotate: 0,
            duration: 0.4,
            ease: 'power2.in',
          });

          isOpen = false;
          if ($currentlyOpen && $currentlyOpen[0] === $component[0]) {
            $currentlyOpen = null;
          }
        }

        $component.data('close', closeDropdown);

        // 👇 Remplacé le click par hover
        $component.on('mouseenter', openDropdown);
        $component.on('mouseleave', closeDropdown);
      });
    });

    mm.add('(max-width: 767px)', () => {
      $('[modal-filter="open"]').on('click', function () {
        $('[modal-filter="container"]').addClass('is-active');
      });

      $('[modal-filter="close"]').on('click', function () {
        $('[modal-filter="container"]').removeClass('is-active');
      });

      // --- Dropdowns ---
      const $allComponents = $('.archives-collection_dropdown-component');

      let $currentlyOpen = null;
      let isAnimating = false; // ← empêche d’ouvrir pendant qu’un autre se ferme

      $allComponents.each(function () {
        const $component = $(this);
        const $list = $component.find('.archives-collection_dropdown-list');

        const $icon = $component.find('.icon-1x1-small');

        const $toggle = $component.find('.archives-collection_dropdown-toggle');

        let isOpen = false;

        if ($list.length === 0 || $icon.length === 0 || $toggle.length === 0) {
          return;
        }

        // Init : collapse complet
        gsap.set($list, { height: 0 });
        gsap.set($icon, { rotate: 0 });

        function openDropdown() {
          if (isAnimating) return; // attend que l'autre soit fini

          // Si un autre est ouvert → le fermer d'abord
          if ($currentlyOpen && $currentlyOpen[0] !== $component[0]) {
            const previous = $currentlyOpen;
            isAnimating = true;

            previous.data('close')(true, () => {
              // une fois que l'autre est fermé, on ouvre celui-ci
              isAnimating = false;
              openDropdown();
            });
            return;
          }

          // Animation d’ouverture
          gsap.to($list, {
            height: 'auto',
            duration: 0.4,
            ease: 'power2.out',
          });

          gsap.to($icon, {
            rotate: 180,
            duration: 0.4,
            ease: 'power2.out',
          });

          isOpen = true;
          $currentlyOpen = $component;
        }

        // accepte un callback pour quand la fermeture est finie
        function closeDropdown(skipAnimation = false, onClosed = null) {
          const animProps = {
            height: 0,
            duration: skipAnimation ? 0 : 0.3,
            ease: 'power2.in',
            onComplete: () => {
              isOpen = false;
              if ($currentlyOpen && $currentlyOpen[0] === $component[0]) {
                $currentlyOpen = null;
              }
              if (onClosed) onClosed(); // ← callback déclenché quand c’est fini
            },
          };

          gsap.to($list, animProps);
          gsap.to($icon, {
            rotate: 0,
            duration: skipAnimation ? 0 : 0.3,
            ease: 'power2.in',
          });
        }

        $component.data('close', closeDropdown);

        $toggle.on('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          if (isAnimating) return; // bloque le spam click
          isOpen ? closeDropdown() : openDropdown();
        });

        $list.on('click', function (e) {
          e.stopPropagation();
        });
      });
    });

    // ---- OBSERVATION DE LA LISTE FOUNDER ----
    const $list = $('[cms-list-number="founders"]');
    const $number = $('[number="founders"]');

    if ($list.length && $number.length) {
      const updateCount = () => {
        const count = $list.find('.founders_list-item-wrap').length;
        $number.text(count);
      };

      // MutationObserver via élément natif mais appliqué à l'élément jQuery
      const observer = new MutationObserver(updateCount);
      observer.observe($list[0], { childList: true, subtree: false });

      // Mise à jour initiale
      updateCount();
    }

    // Fonction pour déplacer l'élément filter-list="founders"
    function moveFoundersFilter() {
      const foundersFilter = document.querySelector('[filter-list="founders"]');
      const mobileContainer = document.querySelector('.modal_filter-mobile-contain');
      const desktopContainer = document.querySelector('.archives_filter-container');

      if (!foundersFilter || !mobileContainer || !desktopContainer) {
        console.warn('Un ou plusieurs éléments sont introuvables');
        return;
      }

      // Vérifier la largeur de l'écran
      if (window.innerWidth <= 767) {
        // Mobile: déplacer dans .modal_filter-mobile-contain
        if (!mobileContainer.contains(foundersFilter)) {
          mobileContainer.appendChild(foundersFilter);
        }
      } else {
        // Desktop: déplacer dans .archives_filter-container
        if (!desktopContainer.contains(foundersFilter)) {
          desktopContainer.appendChild(foundersFilter);
        }
      }
    }

    // Exécuter au chargement de la page
    document.addEventListener('DOMContentLoaded', moveFoundersFilter);

    // Exécuter lors du redimensionnement de la fenêtre
    let resizeTimer;
    window.addEventListener('resize', function () {
      // Debounce pour optimiser les performances
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(moveFoundersFilter, 100);
    });

    // Si le DOM est déjà chargé, exécuter immédiatement
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', moveFoundersFilter);
    } else {
      moveFoundersFilter();
    }
  });

  $('[ventures-list]').each(function () {
    function reloadOnResize() {
      let lastWidth = window.innerWidth;
      const breakpoint = 767;

      window.addEventListener('resize', () => {
        const currentWidth = window.innerWidth;

        // Vérifie si on est passé au-dessus ou en dessous du breakpoint
        const crossedBreakpoint =
          (lastWidth < breakpoint && currentWidth >= breakpoint) ||
          (lastWidth >= breakpoint && currentWidth < breakpoint);

        if (crossedBreakpoint) {
          window.location.reload();
        }

        lastWidth = currentWidth;
      });
    }

    reloadOnResize();

    let mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const $allComponents = $('.archives-collection_dropdown-component');

      let $currentlyOpen = null;

      $allComponents.each(function () {
        const $component = $(this);
        const $list = $component.find('.archives-collection_dropdown-list');
        const $icon = $component.find('.icon-1x1-small');

        let isOpen = false;

        if ($list.length === 0 || $icon.length === 0) {
          return;
        }

        gsap.set($list, {
          opacity: 0,
          y: 10,
          display: 'none',
        });
        gsap.set($icon, {
          rotate: 0,
        });

        function openDropdown() {
          if ($currentlyOpen && $currentlyOpen[0] !== $component[0]) {
            $currentlyOpen.data('close')();
            $currentlyOpen = null;
          }

          gsap.set($list, { display: 'block' });
          gsap.to($list, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          });
          gsap.to($icon, {
            rotate: 180,
            duration: 0.6,
            ease: 'power2.out',
          });

          isOpen = true;
          $currentlyOpen = $component;
        }

        function closeDropdown() {
          gsap.to($list, {
            opacity: 0,
            y: 10,
            duration: 0.1,
            ease: 'power2.in',
            onComplete: () => {
              gsap.set($list, { display: 'none' });
            },
          });
          gsap.to($icon, {
            rotate: 0,
            duration: 0.4,
            ease: 'power2.in',
          });

          isOpen = false;
          if ($currentlyOpen && $currentlyOpen[0] === $component[0]) {
            $currentlyOpen = null;
          }
        }

        $component.data('close', closeDropdown);

        // 👇 Remplacé le click par hover
        $component.on('mouseenter', openDropdown);
        $component.on('mouseleave', closeDropdown);
      });
    });

    mm.add('(max-width: 767px)', () => {
      $('[modal-filter="open"]').on('click', function () {
        $('[modal-filter="container"]').addClass('is-active');
      });

      $('[modal-filter="close"]').on('click', function () {
        $('[modal-filter="container"]').removeClass('is-active');
      });

      // --- Dropdowns ---
      const $allComponents = $('.archives-collection_dropdown-component');

      let $currentlyOpen = null;
      let isAnimating = false; // ← empêche d’ouvrir pendant qu’un autre se ferme

      $allComponents.each(function () {
        const $component = $(this);
        const $list = $component.find('.archives-collection_dropdown-list');

        const $icon = $component.find('.icon-1x1-small');

        const $toggle = $component.find('.archives-collection_dropdown-toggle');

        let isOpen = false;

        if ($list.length === 0 || $icon.length === 0 || $toggle.length === 0) {
          return;
        }

        // Init : collapse complet
        gsap.set($list, { height: 0 });
        gsap.set($icon, { rotate: 0 });

        function openDropdown() {
          if (isAnimating) return; // attend que l'autre soit fini

          // Si un autre est ouvert → le fermer d'abord
          if ($currentlyOpen && $currentlyOpen[0] !== $component[0]) {
            const previous = $currentlyOpen;
            isAnimating = true;

            previous.data('close')(true, () => {
              // une fois que l'autre est fermé, on ouvre celui-ci
              isAnimating = false;
              openDropdown();
            });
            return;
          }

          // Animation d’ouverture
          gsap.to($list, {
            height: 'auto',
            duration: 0.4,
            ease: 'power2.out',
          });

          gsap.to($icon, {
            rotate: 180,
            duration: 0.4,
            ease: 'power2.out',
          });

          isOpen = true;
          $currentlyOpen = $component;
        }

        // accepte un callback pour quand la fermeture est finie
        function closeDropdown(skipAnimation = false, onClosed = null) {
          const animProps = {
            height: 0,
            duration: skipAnimation ? 0 : 0.3,
            ease: 'power2.in',
            onComplete: () => {
              isOpen = false;
              if ($currentlyOpen && $currentlyOpen[0] === $component[0]) {
                $currentlyOpen = null;
              }
              if (onClosed) onClosed(); // ← callback déclenché quand c’est fini
            },
          };

          gsap.to($list, animProps);
          gsap.to($icon, {
            rotate: 0,
            duration: skipAnimation ? 0 : 0.3,
            ease: 'power2.in',
          });
        }

        $component.data('close', closeDropdown);

        $toggle.on('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          if (isAnimating) return; // bloque le spam click
          isOpen ? closeDropdown() : openDropdown();
        });

        $list.on('click', function (e) {
          e.stopPropagation();
        });
      });
    });

    // ---- OBSERVATION DE LA LISTE FOUNDER ----
    const $list = $('[cms-list-number="ventures"]');
    const $number = $('[number="ventures"]');

    if ($list.length && $number.length) {
      const updateCount = () => {
        const count = $list.find('.founders_list-item-wrap').length;
        $number.text(count);
      };

      // MutationObserver via élément natif mais appliqué à l'élément jQuery
      const observer = new MutationObserver(updateCount);
      observer.observe($list[0], { childList: true, subtree: false });

      // Mise à jour initiale
      updateCount();
    }

    // Fonction pour déplacer l'élément filter-list="founders"
    function moveFoundersFilter() {
      const foundersFilter = document.querySelector('[filter-list="ventures"]');
      const mobileContainer = document.querySelector('.modal_filter-mobile-contain');
      const desktopContainer = document.querySelector('.archives_filter-container');

      if (!foundersFilter || !mobileContainer || !desktopContainer) {
        console.warn('Un ou plusieurs éléments sont introuvables');
        return;
      }

      // Vérifier la largeur de l'écran
      if (window.innerWidth <= 767) {
        // Mobile: déplacer dans .modal_filter-mobile-contain
        if (!mobileContainer.contains(foundersFilter)) {
          mobileContainer.appendChild(foundersFilter);
        }
      } else {
        // Desktop: déplacer dans .archives_filter-container
        if (!desktopContainer.contains(foundersFilter)) {
          desktopContainer.appendChild(foundersFilter);
        }
      }
    }

    // Exécuter au chargement de la page
    document.addEventListener('DOMContentLoaded', moveFoundersFilter);

    // Exécuter lors du redimensionnement de la fenêtre
    let resizeTimer;
    window.addEventListener('resize', function () {
      // Debounce pour optimiser les performances
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(moveFoundersFilter, 100);
    });

    // Si le DOM est déjà chargé, exécuter immédiatement
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', moveFoundersFilter);
    } else {
      moveFoundersFilter();
    }
  });

  $('.hero_component.is-about').each(function () {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 992px)', () => {
      const $container = $(this);
      const $titleContain = $container.find('.hero_title-wrap.is-about');
      const $circle = $container.find('.hero_circle-about-contain');
      const $title = $container.find('.about-title');
      const $paragrapheWrap = $container.find('.hero_paragraphe-wrap.is-about');
      const $aboutImg1 = $container.find('.about_img-wrap.is-1');
      const $aboutImg2 = $container.find('.about_img-wrap.is-2');

      if (
        !$titleContain.length ||
        !$circle.length ||
        !$title.length ||
        !$paragrapheWrap.length ||
        !$aboutImg1.length ||
        !$aboutImg2.length
      )
        return;

      $circle.css({
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        opacity: 0,
      });

      // --- Apparition fluide du cercle ---
      gsap.to($circle, { opacity: 1, duration: 1, delay: 0.5, ease: 'power2.out' });
      gsap.to($paragrapheWrap, { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power2.out' });
      gsap.to($aboutImg1, {
        opacity: 0.9,
        y: 0,
        x: 0,
        duration: 2,
        delay: 0.5,
        ease: 'power2.out',
      });
      gsap.to($aboutImg2, {
        opacity: 0.9,
        y: 0,
        x: 0,
        duration: 2,
        delay: 0.5,
        ease: 'power2.out',
      });

      // --- Placement initial (80% / 80%) ---
      const rect = $titleContain[0].getBoundingClientRect();
      const circleRect = $circle[0].getBoundingClientRect();
      const circleW = circleRect.width;
      const circleH = circleRect.height;

      const startX = rect.width * 0.8 - circleW / 2;
      const startY = rect.height * 0.8 - circleH / 2;

      gsap.set($circle, { x: startX, y: startY });

      // --- Variables ---
      let rafId = null;
      let targetX = rect.width * 0.8;
      let targetY = rect.height * 0.8;
      let currentX = rect.width * 0.8;
      let currentY = rect.height * 0.8;

      // --- Ecoute du mouvement ---
      $titleContain.on('mousemove', function (e) {
        const rect = $titleContain[0].getBoundingClientRect();
        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;

        const circleRect = $circle[0].getBoundingClientRect();
        const circleW = circleRect.width;
        const circleH = circleRect.height;

        const x = targetX - circleW / 2;
        const y = targetY - circleH / 2;

        gsap.to($circle, {
          x,
          y,
          duration: 0.5,
          ease: 'power2.out',
        });

        if (!rafId) animateGradient();
      });

      // --- Animation lissée du gradient ---
      function animateGradient() {
        rafId = requestAnimationFrame(animateGradient);

        const lerpFactor = 0.08;
        currentX += (targetX - currentX) * lerpFactor;
        currentY += (targetY - currentY) * lerpFactor;

        const rect = $titleContain[0].getBoundingClientRect();
        const percentX = (currentX / rect.width) * 100;
        const percentY = (currentY / rect.height) * 100;

        const gradient = `radial-gradient(circle at ${percentX}% ${percentY}%, #5D5B5C 0%, #B7B6B6 70%)`;
        $title.css({
          background: gradient,
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
          'text-fill-color': 'transparent',
        });
      }

      // --- Gradient initial à 80% / 80% ---
      const initialGradient = `radial-gradient(circle at 80% 80%, #5D5B5C 0%, #B7B6B6 70%)`;
      $title.css({
        background: initialGradient,
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        'background-clip': 'text',
        'text-fill-color': 'transparent',
      });

      let tlAboutImgWrap = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: '.hero_about-img-contain',
          start: 'top center',
          end: 'bottom center',
          scrub: 2,
          markers: false,
        },
      });

      tlAboutImgWrap
        .to($aboutImg1, { yPercent: 5, xPercent: 5, duration: 2 })
        .to($aboutImg2, { yPercent: -5, xPercent: -10, duration: 2 }, '<');
    });
  });

  $('.enduring-partners_component').each(function () {
    if (window.innerWidth > 768) {
      //ANIMATION GRID LOGO
      const logoGrid = document.querySelector('.confiance_logo-grid');

      const positions = ['20%', '40%', '60%', '80%'];

      function createLogoShapes() {
        positions.forEach((position, index) => {
          const logoShapeContain = document.createElement('div');
          logoShapeContain.classList.add('logo_shape-contain');

          logoShapeContain.style.position = 'absolute';
          logoShapeContain.style.left = position;

          const logoShape = document.createElement('div');
          logoShape.classList.add('logo-shape');

          logoShapeContain.appendChild(logoShape);

          logoGrid.appendChild(logoShapeContain);

          animateLogoShape(logoShape);
        });
      }

      function animateLogoShape(shape) {
        const delay = Math.random() * 5;

        gsap.timeline({ repeat: -1, repeatDelay: 1, delay: delay }).fromTo(
          shape,
          { y: '-100%' },
          {
            y: '1000%',
            duration: 2,
            ease: 'none',
            onComplete: () => {
              gsap.set(shape, { y: '-100%' });
            },
          }
        );
      }

      createLogoShapes();

      const topPositions = ['25%', '50%', '75%'];

      function createHorizontalLogoShapes() {
        topPositions.forEach((topPosition, index) => {
          const logoShapeContainHorizontal = document.createElement('div');
          logoShapeContainHorizontal.classList.add('logo_shape-contain-horizontal');

          logoShapeContainHorizontal.style.position = 'absolute';
          logoShapeContainHorizontal.style.top = topPosition;

          const logoShapeHorizontal = document.createElement('div');
          logoShapeHorizontal.classList.add('logo-shape-horizontale');

          logoShapeContainHorizontal.appendChild(logoShapeHorizontal);

          logoGrid.appendChild(logoShapeContainHorizontal);

          animateHorizontalLogoShape(logoShapeHorizontal);
        });
      }

      function animateHorizontalLogoShape(shape) {
        const delay = Math.random() * 5;

        gsap.timeline({ repeat: -1, repeatDelay: 1, delay: delay }).fromTo(
          shape,
          { x: '-100%' },
          {
            x: '1000%',
            duration: 2,
            ease: 'none',
            onComplete: () => {
              gsap.set(shape, { x: '-100%' });
            },
          }
        );
      }

      createHorizontalLogoShapes();

      const logos = document.querySelectorAll('.confiance_logo');

      logos.forEach((logo) => {
        const randomDelay = Math.random() * 3;

        gsap.fromTo(
          logo,
          { opacity: 0.25 },
          {
            opacity: 1,
            duration: 1,
            delay: randomDelay,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.confiance_logo-grid',
              start: 'top center',
              end: 'bottom top',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // const partnerLogosContainer = document.querySelectorAll('.confiance_logo-item');

      // partnerLogosContainer.forEach((logo) => {
      //   let logoInside = logo.querySelector('.confiance_logo');

      //   let tlPartnerLogo = gsap.timeline({
      //     paused: true,
      //   });

      //   tlPartnerLogo.from(logoInside, { opacity: 1, duration: 0.5, ease: 'power2.out' });

      //   logo.addEventListener('mouseenter', () => {
      //     tlPartnerLogo.restart();
      //   });

      //   logo.addEventListener('mouseleave', () => {
      //     tlPartnerLogo.reverse();
      //   });
      // });
    }
  });

  $('.partner-logo_component').each(function () {
    let reeller = new Reeller({
      container: '.partner-logo_reel',
      wrapper: '.partner-logo_reel_wrap',
      itemSelector: '.partner-logo_reel_item',
      speed: 20,
    });

    reeller.reverse(true);
  });

  $(document).ready(function () {
    $('.intention_component').each(function () {
      const trigger = $(this);

      // CERCLE 1
      const circle1 = $('.intention_circle.is-1');
      const path1 = '#motionPath1';

      if (circle1.length) {
        gsap.set(circle1, { opacity: 0 });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: trigger,
              start: 'top 70%',
              end: 'bottom center',
              scrub: 1.5,
              markers: false,
            },
          })
          .to(circle1, {
            opacity: 1,
            duration: 0.3,
            ease: 'power1.out',
            motionPath: {
              path: path1,
              align: path1,
              autoRotate: false,
              alignOrigin: [0.5, 0.5],
              start: 1,
              end: 1,
            },
          })
          .to(circle1, {
            duration: 1,
            ease: 'none',
            motionPath: {
              path: path1,
              align: path1,
              autoRotate: false,
              alignOrigin: [0.5, 0.5],
              start: 1,
              end: 0,
            },
          });
      }

      // CERCLE 2
      const circle2 = $('.intention_circle.is-2');
      const path2 = '#motionPath2';

      if (circle2.length) {
        gsap.set(circle2, { opacity: 0 });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: trigger,
              start: '25% 70%',
              end: 'bottom center',
              scrub: 1.5,
              markers: false,
            },
          })
          .to(circle2, {
            opacity: 1,
            duration: 0.3,
            ease: 'power1.out',
            motionPath: {
              path: path2,
              align: path2,
              autoRotate: false,
              alignOrigin: [0.5, 0.5],
              start: 1,
              end: 1,
            },
          })
          .to(circle2, {
            duration: 1,
            ease: 'none',
            motionPath: {
              path: path2,
              align: path2,
              autoRotate: false,
              alignOrigin: [0.5, 0.5],
              start: 1,
              end: 0,
            },
          });
      }
    });
  });

  $('.section_hero-home').each(function () {
    // ANIMATION HOME PAGE

    let mm = gsap.matchMedia();

    mm.add('(min-width: 992px)', () => {
      let titleHeroHome = document.querySelector('[hero-element="title"]');
      let paragrapheHeroHome = document.querySelector('[hero-element="paragraphe"]');
      let rosaceHeroHome = document.querySelector('[hero-element="rosace"]');
      let heroHomeCircleWhite = document.querySelector('[hero-element="circle-white"]');
      let heroRosaceSvg = document.querySelector('[hero-element="rosace-svg"]');
      let sectionHeroHome = document.querySelector('.section_hero-home');
      let heroHomeCircleDark = document.querySelector('[hero-element="circle-dark"]');
      let heroHomeCircleContainer = document.querySelector('[hero-element="circle-contain"]');
      const circleTarget = document.querySelector('.text-reveal_circle-target-flip');
      const sectionRevealText = document.querySelector('.section_reveal-text');
      let tabsTargetBefore = document.querySelector('[home-tabs="target-before"]');
      let tabsTargetAfter = document.querySelector('[home-tabs="target-after"]');
      let tabsCircleBefore = document.querySelector('[home-tabs="circle-before"]');
      let tabsCircleAfter = document.querySelector('[home-tabs="circle-after"]');
      let sectionHomeTabs = document.querySelector('.section_home-tabs');
      let homeTabsCircleTitleWrap = document.querySelector('.home-tabs_circle-title-wrap');
      let homeTabsCircleParagrapheWrap = document.querySelector(
        '.home-tabs_circle-paragraphe-wrap'
      );
      let sliderHomeTitleWrap = document.querySelector('.home-slider_title-wrap');
      let homeSliderTargetAfter = document.querySelector('[home-slider="target-after"]');
      let homeSliderRayon = document.querySelector('[home-slider="rayon"]');
      let tabsCircleGradient = document.querySelector('.home-tabs_gradient');
      let textRevealComponent = document.querySelector('.text-reveal_component');
      let navLineHero = document.querySelector('.nav_line');

      // // --- Détection simple du navigateur ---
      // const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

      // // --- Applique le style uniquement sur Chrome/Edge ---
      // if (heroHomeCircleDark && !isSafari) {
      //   heroHomeCircleDark.style.backdropFilter = 'blur(3px)';
      //   heroHomeCircleDark.style.webkitBackdropFilter = 'blur(3px)'; // pour compatibilité complète
      // }

      let resizeTimeout;

      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout); // on réinitialise le timer si le resize continue
        resizeTimeout = setTimeout(() => {
          location.reload(); // recharge la page après 1 seconde sans resize
        }, 500);
      });

      // --- TL Hero au chargement ---
      let tlHomeHeroStart = gsap.timeline({
        onStart: () => {
          if (lenis) lenis.stop(); // ⛔ bloque le scroll pendant l’intro
        },
        onComplete: () => {
          if (lenis) lenis.start(); // ✅ relance Lenis quand tout est terminé
        },
      });
      tlHomeHeroStart
        .to(titleHeroHome, {
          opacity: 1,
          transform: 'translateY(0)',
          duration: 1,
          delay: 1,
          ease: 'power2.out',
        })
        .to(
          paragrapheHeroHome,
          {
            opacity: 1,
            transform: 'translateY(0)',
            duration: 1,
            delay: 0.1,
            ease: 'power2.out',
          },
          '<'
        )
        .to(
          rosaceHeroHome,
          {
            opacity: 1,
            transform: 'translateY(0)',
            duration: 1,
            delay: 0.1,
            ease: 'power2.out',
          },
          '<'
        )
        .to(
          heroRosaceSvg,
          {
            rotate: 90,
            duration: 1,
            ease: 'power2.out',
          },
          '<'
        )
        .to(
          heroHomeCircleWhite,
          {
            transform: 'translateY(0)',
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
          },
          '-=1.3'
        )
        .to(
          textRevealComponent,
          {
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
          },
          '<'
        );
      // .to(
      //   heroHomeCircleWhite,
      //   {
      //     rotate: '40deg',
      //     duration: 440,
      //     ease: 'power2.out',
      //   },
      //   '<'
      // );

      let tlFirstScrollAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: sectionHeroHome,
          start: 'top top',
          end: '800px 500px',
          scrub: true,
          markers: false,
        },
      });

      tlFirstScrollAnimation
        .to(heroHomeCircleContainer, {
          width: '64px',
          // transform: 'translateY(10rem)',
          duration: 1,
          ease: 'power2.out',
        })
        .to(
          heroHomeCircleWhite,
          {
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
          },
          '<'
        )
        .to(
          heroHomeCircleDark,
          {
            opacity: 1,

            duration: 1,
            ease: 'power2.out',
          },
          '<'
        )
        .to(
          titleHeroHome,
          {
            opacity: 0,
            transform: 'translateY(35rem)',
            duration: 1,
            ease: 'power2.out',
          },
          '<'
        )
        .to(
          paragrapheHeroHome,
          {
            opacity: 0,
            transform: 'translateY(35rem)',
            duration: 1,
            ease: 'power2.out',
          },
          '<'
        )
        .to(
          rosaceHeroHome,
          {
            opacity: 0,
            transform: 'translateY(35rem)',
            duration: 1,
            ease: 'power2.out',
          },
          '<'
        )
        .to(
          '.bg-layer',
          {
            backgroundColor: '#181617',
            duration: 1,
            ease: 'power2.out',
          },
          '<'
        )
        .to(
          '.nav_component',
          {
            color: 'var(--base-color--white-radiance)',
            duration: 1,
            ease: 'power2.out',
          },
          '<'
        )
        .to(
          navLineHero,
          {
            backgroundImage: 'linear-gradient(90deg, #efefed, #efefed00)',
            duration: 0.4,
            ease: 'power2.inOut',
          },
          '<'
        );

      function getTargetPosition() {
        const circleRect = heroHomeCircleDark.getBoundingClientRect();
        const targetRect = circleTarget.getBoundingClientRect();

        // --- Calcul du centre horizontal (axe X) ---
        const circleCenterX = circleRect.left + circleRect.width / 2;
        const targetCenterX = targetRect.left + targetRect.width / 2;

        // --- Globalisation (scroll inclus) ---
        const globalCircleX = circleCenterX + window.scrollX;
        const globalTargetX = targetCenterX + window.scrollX;

        const globalCircleY = circleRect.top + window.scrollY;
        const globalTargetY = targetRect.top + window.scrollY;

        return {
          x: globalTargetX - globalCircleX,
          y: globalTargetY - globalCircleY,
        };
      }

      let tlMoveCircle = gsap.timeline({
        scrollTrigger: {
          trigger: sectionHeroHome,
          start: '700px 500px',
          end: '1300px 500px',
          scrub: true,
          markers: false,
          invalidateOnRefresh: true, // pour recalculer dynamiquement
        },
      });

      tlMoveCircle
        .to([heroHomeCircleDark, heroHomeCircleWhite], {
          x: () => getTargetPosition().x,
          y: () => getTargetPosition().y,
          ease: 'none',
          duration: 1,
        })
        .to(circleTarget, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        })
        .to(
          heroHomeCircleDark,
          {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
          },
          '<'
        );

      // --- Animation du texte reveal ---

      let textRevealTitle2 = document.querySelector('.text-reveal_title2');
      let textRevealParagraphe = document.querySelector('.text-reveal_paragraphe-wrap');

      function getRelativeOffset() {
        const wrap = document.querySelector('.text-reveal_title-wrap');
        const target = document.querySelector('.text-reveal_circle-target-flip');

        const wrapRect = wrap.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        // --- Axe X : translation depuis left:100px (base CSS) vers 80% du parent ---
        const startX = 100; // valeur de ton CSS
        const endX = wrapRect.width * 0.8;
        const finalX = endX - startX; // translation horizontale à appliquer

        // --- Axe Y : translation depuis top:20% (base CSS) vers 80% du parent ---
        const startY = wrapRect.height * 0.2;
        const endY = wrapRect.height * 0.8;
        const finalY = endY - startY; // translation verticale à appliquer

        return { x: finalX, y: finalY };
      }

      let tlTextReveal = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRevealText,
          start: 'top 700px',
          end: '90% 500px',
          scrub: true,
          markers: false,
          invalidateOnRefresh: true,
        },
      });

      tlTextReveal
        .to(textRevealTitle2, {
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
        })
        .to(circleTarget, {
          x: () => getRelativeOffset().x,
          y: () => getRelativeOffset().y,
          duration: 2,
          delay: 1.5,
          ease: 'power2.out',
        })
        .to(
          '.text-reveal_title',
          {
            '--bg-y': '80%',
            '--bg-x': '80%',
            duration: 1.2,
            ease: 'power2.out',
          },
          '<'
        )
        .to(
          textRevealParagraphe,
          {
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
          },
          '<'
        )
        .to(
          tabsTargetBefore,
          {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=.3'
        )
        .to(
          circleTarget,
          {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
          },
          '<'
        );

      // ----------- Animation tabs ----------------

      function getTabsOffset() {
        const wrapBefore = document.querySelector('[home-tabs="target-before"]');
        const wrapAfter = document.querySelector('[home-tabs="target-after"]');

        const beforeRect = wrapBefore.getBoundingClientRect();
        const afterRect = wrapAfter.getBoundingClientRect();

        // --- Axe X : translation relative (coin gauche) ---
        const finalX = afterRect.left - beforeRect.left;

        // --- Axe Y : translation relative (coin haut) ---
        const finalY = afterRect.top - beforeRect.top;

        return { x: finalX, y: finalY };
      }

      let circleSizeTarget = tabsTargetAfter.getBoundingClientRect();

      let tlTabs = gsap.timeline({
        scrollTrigger: {
          trigger: sectionHomeTabs,
          start: '0px 500px',
          end: '80% 800px',
          scrub: true,
          markers: false,
          invalidateOnRefresh: true, // recalcule les positions si resize
        },
      });

      // Animation fluide : déplacement + resize
      tlTabs
        .to(tabsCircleBefore, {
          width: circleSizeTarget.width,
          height: circleSizeTarget.height,
          duration: 1,
          ease: 'power2.out',
        })
        .to(
          tabsCircleBefore,
          {
            x: () => getTabsOffset().x,
            y: () => getTabsOffset().y,
            duration: 1,
            ease: 'power2.out',
          },
          '<'
        )
        .to(tabsTargetAfter, {
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
        })
        .to(
          tabsCircleBefore,
          {
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
          },
          '<'
        )
        .to(
          homeTabsCircleTitleWrap,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
          },
          '-=.4'
        )
        .to(
          homeTabsCircleParagrapheWrap,
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power2.out',
          },
          '<'
        );

      // Sélecteurs
      const $tabsContainer = document.querySelector('.home-tabs_container');
      const $tabItems = gsap.utils.toArray('.home-tabs_item-wrap');

      // Timeline principale
      const tlTabsReveal = gsap.timeline({
        scrollTrigger: {
          trigger: $tabsContainer,
          start: '20% center',
          end: 'bottom 50%',
          scrub: true,
          markers: false,
        },
      });

      tlTabsReveal.to(
        $tabItems,

        {
          opacity: 1,
          y: 0,
          ease: 'none',
          stagger: 0.25,
        }
      );

      // ----------- Animation home-slider ----------------

      function getRayonOffset() {
        const afterRect = homeSliderTargetAfter.getBoundingClientRect();
        const beforeRect = tabsCircleAfter.getBoundingClientRect();

        // --- Axe X : alignement horizontal absolu (inchangé) ---
        const viewportCenterX = window.innerWidth / 2;
        const finalX = viewportCenterX - beforeRect.left;

        // --- Axe Y : alignement sur le centre vertical de homeSliderTargetAfter ---
        const afterCenterY = afterRect.top + afterRect.height / 2;
        const finalY = afterCenterY - beforeRect.top;

        return { x: finalX, y: finalY };
      }

      let tlHomeSlider = gsap.timeline({
        scrollTrigger: {
          trigger: '.section_home-slider',
          start: '-500px 500px',
          end: 'bottom 50%',
          scrub: true,
          markers: false,
          invalidateOnRefresh: true,
        },
      });

      tlHomeSlider
        .to(tabsCircleGradient, {
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
        })
        .to(tabsCircleAfter, {
          x: () => getRayonOffset().x,
          y: () => getRayonOffset().y,
          width: '0rem',
          height: '0rem',
          '--glow-size': '0px',
          duration: 2,
          ease: 'power2.out',
        })
        .to(homeSliderRayon, {
          scale: 1,
          transformOrigin: 'center center',
          duration: 1,
          ease: 'power2.out',
        })
        .to(
          tabsCircleAfter,
          {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=1.5'
        )
        .to(
          sliderHomeTitleWrap,
          {
            opacity: 1,
            transform: 'translateY(0)',
            duration: 1,
            ease: 'power2.out',
          },
          '-=1'
        );

      tlSliderFounders = gsap.timeline({
        scrollTrigger: {
          trigger: '.section_home-slider',
          start: '60% center',
          end: 'bottom 50%',
          scrub: true,
          markers: false,
        },
      });

      tlSliderFounders.to('.home-slider_container', {
        opacity: 1,
        transform: 'translateX(0)',
        duration: 1,
        ease: 'power2.out',
      });
    });

    mm.add('(max-width: 992px)', () => {
      let navLineHero = document.querySelector('.nav_line');
      let tlAnimNav = gsap.timeline({
        scrollTrigger: {
          trigger: '.section_reveal-text',
          start: '-160px top',
          end: 'bottom bottom',
          toggleActions: 'play none none reverse',
          markers: false,
        },
      });
      tlAnimNav
        .to('.nav_component', {
          color: 'var(--base-color--white-radiance)',
          duration: 0,
          ease: 'power2.out',
        })
        .to(
          navLineHero,
          {
            backgroundImage: 'linear-gradient(90deg, #efefed, #efefed00)',
            duration: 0.4,
            ease: 'power2.inOut',
          },
          '<'
        );
    });
  });
});
