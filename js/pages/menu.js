/**
 * Aurora Bistro - Menu Page JavaScript
 */

// ============================================
// MENU CATEGORY NAVIGATION
// ============================================
function initMenuNav() {
  const navButtons = document.querySelectorAll(".menu-nav-btn");
  const sections = document.querySelectorAll(".menu-section");

  if (!navButtons.length || !sections.length) return;

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;

      // Update active button
      navButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Show corresponding section
      sections.forEach((section) => {
        section.classList.remove("active");
        if (section.id === category) {
          section.classList.add("active");

          // Re-trigger animations for items in new section
          const items = section.querySelectorAll(".menu-item");
          items.forEach((item, index) => {
            item.classList.remove("visible");
            item.style.transitionDelay = `${index * 0.1}s`;
            setTimeout(() => {
              item.classList.add("visible");
            }, 50);
          });
        }
      });

      // Scroll to top of menu content
      const menuContent = document.querySelector(".menu-content");
      if (menuContent) {
        const navHeight = document.getElementById("nav")?.offsetHeight || 0;
        const menuNavHeight =
          document.querySelector(".menu-nav-wrapper")?.offsetHeight || 0;
        const targetPosition =
          menuContent.getBoundingClientRect().top +
          window.pageYOffset -
          navHeight -
          menuNavHeight -
          20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Trigger initial animation for active section
  const activeSection = document.querySelector(".menu-section.active");
  if (activeSection) {
    const items = activeSection.querySelectorAll(".menu-item");
    items.forEach((item, index) => {
      item.style.transitionDelay = `${index * 0.1}s`;
    });
  }
}

// ============================================
// INITIALIZE MENU PAGE
// ============================================
function initMenuPage() {
  initMenuNav();
}

// Run when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMenuPage);
} else {
  initMenuPage();
}
