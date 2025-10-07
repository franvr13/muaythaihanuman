(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  /**
   * Smooth scroll to a section taking into account a fixed header.
   * @param {string} hash e.g. '#contact'
   */
  function scrollToHash(hash) {
    try {
      const section = document.querySelector(hash);
      if (!section) return false;
      // Prefer CSS scroll-margin-top if set, otherwise fallback to header height
      const computed = getComputedStyle(section);
      const scrollMarginTop = computed && computed.scrollMarginTop ? parseInt(computed.scrollMarginTop) : 0;
      if (scrollMarginTop) {
        window.scrollTo({ top: section.offsetTop - scrollMarginTop, behavior: 'smooth' });
      } else {
        const header = document.querySelector('#header');
        const headerHeight = header ? header.offsetHeight : 0;
        const offset = Math.max(0, headerHeight - 10); // small extra offset
        const top = section.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      return true;
    } catch (err) {
      return false;
    }
  }

  // On page load, if the URL contains a hash, attempt to scroll to it smoothly.
  window.addEventListener('load', function () {
    if (window.location.hash) {
      // Delay slightly to allow layout/AOS/isotope to initialize and sizes to settle
      setTimeout(() => {
        scrollToHash(window.location.hash);
      }, 200);
    }
  });

  // Intercept clicks on any links that point to #contact to ensure reliable behavior
  document.querySelectorAll('a[href$="#contact"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      // If link leads to same page (already on index), do smooth scroll without navigation
      const current = window.location.pathname.split('/').pop();
      const isIndex = current === '' || current === 'index.html';
      if (isIndex) {
        e.preventDefault();
        // Use the helper to scroll; update history so hash is visible
        history.replaceState(null, '', '#contact');
        scrollToHash('#contact');
      } else {
        // Not on index: let browser navigate to index.html#contact (force full load)
        // but ensure we use an explicit path to avoid relative issues
        // No preventDefault so navigation occurs normally
        link.setAttribute('href', 'index.html#contact');
      }
    }, { passive: true });
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

// Funcionalidad: Traducciones
const translations = { en: {}, es: {} };
let currentLang = 'es'; // Idioma inicial por defecto

const loadTranslations = () => {
  return Promise.all([
    fetch('en.json').then(res => res.json()).then(data => translations.en = data),
    fetch('es.json').then(res => res.json()).then(data => translations.es = data)
  ]);
};

const updateLanguage = (lang) => {
  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    const translation = translations[lang]?.[key];
    if (translation) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translation;
      } else {
        el.textContent = translation;
      }
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const languageToggle = document.getElementById('languageToggle'); // Asegúrate de que este elemento exista en tu HTML

  if (languageToggle) {
    loadTranslations().then(() => {
      // Establecer el idioma inicial
      updateLanguage(currentLang);

      // Evento de clic para cambiar el idioma
      languageToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'es' : 'en'; // Alternar idioma

        // Actualizar atributos y estilos
        languageToggle.setAttribute('data-language', currentLang);
        languageToggle.textContent = currentLang === 'es' ? 'Español' : 'English';
        document.body.classList.toggle('es', currentLang === 'es');
        document.body.classList.toggle('en', currentLang === 'en');

        // Actualizar traducciones
        updateLanguage(currentLang);
      });
    }).catch(error => {
      console.error('Error al cargar las traducciones:', error);
    });
  }
});