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

  $('.founders_component').each(function () {
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
        .fromTo('.founders_img-contain', { top: '-26rem' }, { top: '36rem', duration: 2 })
        .to('.founders_img-wrap', { scale: 0.7, duration: 2, ease: 'power1.out' }, '<')
        .to("[founder-img-wrap='circle-gold']", { opacity: 0.5, duration: 2 }, '<')
        .to("[founder-img-wrap='circle']", { opacity: 0, duration: 2 }, '<');
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
});
