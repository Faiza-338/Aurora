/**
 * Aurora Bistro - Home Page JavaScript
 */

// ============================================
// HERO TITLE LETTER ANIMATION
// ============================================
function initHeroAnimation() {
  const title = document.getElementById("hero-title");
  if (!title) return;

  const text = title.textContent;
  title.innerHTML = "";

  [...text].forEach((letter, index) => {
    const span = document.createElement("span");
    span.className = "letter";
    span.textContent = letter === " " ? "\u00A0" : letter;
    span.style.animationDelay = `${0.1 + index * 0.08}s`;
    title.appendChild(span);
  });
}

// ============================================
// HERO TAGLINE LETTER ANIMATION
// ============================================
function initTaglineAnimation() {
  const tagline = document.querySelector(".hero-tagline");
  if (!tagline) return;

  const text = tagline.textContent;
  tagline.innerHTML = "";

  [...text].forEach((letter, index) => {
    const span = document.createElement("span");
    span.className = "letter";
    span.textContent = letter === " " ? "\u00A0" : letter;
    span.style.animationDelay = `${index * 0.02}s`;
    tagline.appendChild(span);
  });
}

// ============================================
// HERO SLIDER (DOTS + ARROWS + AUTO)
// ============================================
function initHeroSlider() {
  const track = document.getElementById("hero-track");
  const dotsWrap = document.getElementById("hero-dots");
  const prevBtn = document.getElementById("hero-prev");
  const nextBtn = document.getElementById("hero-next");

  // ============================================
// PROMO POPUP
// ============================================
function initPromoPopup() {
  const overlay = document.getElementById("promo-overlay");
  const closeBtn = document.getElementById("popup-close");

  if (!overlay || !closeBtn) return;

  const now = Date.now();
  const lastShown = localStorage.getItem("promoLastShown");
  const cooldown = 15000; // 15 seconds

  if (!lastShown || now - lastShown > cooldown) {
    setTimeout(() => {
      overlay.classList.add("active");
      localStorage.setItem("promoLastShown", now);
    }, 600);
  }

  closeBtn.addEventListener("click", () => {
    overlay.classList.remove("active");
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.remove("active");
    }
  });
}

  // Slider exists only if you added the slider HTML
  if (!track || !dotsWrap || !prevBtn || !nextBtn) return;

  const slides = Array.from(track.children);
  let index = 0;
  let timer = null;

  // Build dots
  dotsWrap.innerHTML = "";
  const dots = slides.map((_, i) => {
    const dot = document.createElement("button");
    dot.className = "hero-dot" + (i === 0 ? " active" : "");
    dot.setAttribute("type", "button");
    dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
    return dot;
  });

  function render() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    render();
    restartAuto();
  }

  function next() {
    goTo(index + 1);
  }

  function prev() {
    goTo(index - 1);
  }

  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);

  function startAuto() {
    timer = setInterval(next, 4000);
  }

  function stopAuto() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  function restartAuto() {
    stopAuto();
    startAuto();
  }

  // Pause on hover (desktop)
  track.addEventListener("mouseenter", stopAuto);
  track.addEventListener("mouseleave", startAuto);

  render();
  startAuto();
}


// ============================================
// INITIALIZE HOME PAGE
// ============================================
function initHomePage() {
  initHeroAnimation();
  initTaglineAnimation();
  initHeroSlider();
  initPromoPopup();
}

// Run when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHomePage);
} else {
  initHomePage();
}
