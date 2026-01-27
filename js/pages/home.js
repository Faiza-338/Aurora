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
// INITIALIZE HOME PAGE
// ============================================
function initHomePage() {
  initHeroAnimation();
  initTaglineAnimation();
}

// Run when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHomePage);
} else {
  initHomePage();
}
