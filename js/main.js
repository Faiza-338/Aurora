/**
 * Aurora Bistro - Main JavaScript
 * Shared functionality across all pages
 */

// ============================================
// MOBILE NAVIGATION
// ============================================
function initMobileNav() {
  const navToggle = document.getElementById("nav-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  if (!navToggle || !mobileNav) return;

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    mobileNav.classList.toggle("active");
    document.body.style.overflow = mobileNav.classList.contains("active")
      ? "hidden"
      : "";
  });

  // Close mobile nav when clicking a link
  const mobileLinks = mobileNav.querySelectorAll("a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      mobileNav.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
}

// ============================================
// NAVIGATION SCROLL EFFECT
// ============================================
function initNavScroll() {
  const nav = document.getElementById("nav");
  if (!nav || nav.classList.contains("nav-dark")) return;

  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
  });
}

// ============================================
// SCROLL ANIMATIONS (INTERSECTION OBSERVER)
// ============================================
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -50px 0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay for grid items
        const parent = entry.target.parentElement;
        if (parent) {
          const siblings = parent.querySelectorAll(".hidden");
          const siblingIndex = Array.from(siblings).indexOf(entry.target);
          entry.target.style.transitionDelay = `${siblingIndex * 0.1}s`;
        }

        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observe all hidden elements
  document.querySelectorAll(".hidden").forEach((el) => {
    observer.observe(el);
  });
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      e.preventDefault();
      const target = document.querySelector(targetId);

      if (target) {
        const navHeight = document.getElementById("nav")?.offsetHeight || 0;
        const targetPosition =
          target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// ============================================
// PAGE LOAD ANIMATION
// ============================================
function initPageLoad() {
  document.body.classList.add("loaded");
}

// ============================================
// PHILOSOPHY IMAGE SLIDER (ABOUT PAGE)
// ============================================
function initPhilosophySlider() {
  const slider = document.getElementById("philosophy-slider");
  if (!slider) return;

  const slides = slider.querySelectorAll(".philosophy-slide");
  const dots = slider.querySelectorAll(".philosophy-dot");
  const prev = slider.querySelector(".philosophy-prev");
  const next = slider.querySelector(".philosophy-next");

  if (!slides.length) return;

  let index = 0;
  let timer;

  const show = (targetIndex) => {
    slides[index].classList.remove("active");
    dots[index]?.classList.remove("active");

    index = (targetIndex + slides.length) % slides.length;

    slides[index].classList.add("active");
    dots[index]?.classList.add("active");
  };

  const nextSlide = () => show(index + 1);
  const prevSlide = () => show(index - 1);

  const restartTimer = () => {
    clearInterval(timer);
    timer = setInterval(nextSlide, 3000);
  };

  prev?.addEventListener("click", () => {
    prevSlide();
    restartTimer();
  });

  next?.addEventListener("click", () => {
    nextSlide();
    restartTimer();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const target = Number(dot.dataset.index) || 0;
      show(target);
      restartTimer();
    });
  });

  slider.addEventListener("mouseenter", () => clearInterval(timer));
  slider.addEventListener("mouseleave", restartTimer);

  show(0);
  restartTimer();
}

// ============================================
// PROMO POPUP (SHOWS EVERY TIME)
// ============================================
function initPromoPopup() {
  const overlay = document.getElementById("promo-overlay");
  const closeBtn = document.getElementById("popup-close");

  if (!overlay || !closeBtn) return;

  // Show popup every time page loads
  setTimeout(() => {
    overlay.classList.add("active");
  }, 600);

  closeBtn.addEventListener("click", () => {
    overlay.classList.remove("active");
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.remove("active");
    }
  });
}

// ============================================
// SCROLL PROGRESS BAR
// ============================================
function initScrollProgress() {
  const progressBar = document.getElementById("scroll-progress-bar");
  if (!progressBar) return;

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset;
    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${scrollPercent}%`;
  });
}



// ============================================
// INITIALIZE
// ============================================
function init() {
  initMobileNav();
  initNavScroll();
  initScrollAnimations();
  initSmoothScroll();
  initPageLoad();
  initPhilosophySlider();
  initPromoPopup();
}

// Run when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
