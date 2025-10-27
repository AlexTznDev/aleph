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

    $container.find('img').each(function () {
      this.decode?.().catch(() => {});
    });

    // --- MatchMedia Desktop ---
    let mm = gsap.matchMedia();
    mm.add('(min-width: 992px)', () => {
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
          { left: '50%', xPercent: -50, y: '-26rem' },
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

        if($list.length === 0 || $icon.length === 0) {
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

        if($list.length === 0 || $icon.length === 0 || $toggle.length === 0) {
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
});
