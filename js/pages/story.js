/**
 * Aurora Bistro - Story Page JavaScript
 */

// ============================================
// STORY QUOTE WORD-BY-WORD ANIMATION
// ============================================
function initStoryQuote() {
  const quote = document.getElementById("story-quote");
  if (!quote) return;

  const text = quote.textContent.trim();
  quote.innerHTML = "";

  const words = text.split(" ");
  words.forEach((word, index) => {
    const span = document.createElement("span");
    span.className = "word";
    span.textContent = word;
    span.dataset.index = index;
    quote.appendChild(span);
    quote.appendChild(document.createTextNode(" "));
  });

  // Observe the quote section for scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const words = quote.querySelectorAll(".word");
          words.forEach((word, index) => {
            setTimeout(() => {
              word.classList.add("visible");
            }, index * 80);
          });

          // Show author after words complete
          setTimeout(() => {
            const author = document.querySelector(".story-author");
            if (author) {
              author.classList.add("visible");
            }
          }, words.length * 80 + 300);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  const quoteSection = document.querySelector(".story-quote-section");
  if (quoteSection) {
    observer.observe(quoteSection);
  }
}

// ============================================
// TIMELINE ANIMATION
// ============================================
function initTimelineAnimation() {
  const timelineItems = document.querySelectorAll(".timeline-item");
  if (!timelineItems.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px",
    }
  );

  timelineItems.forEach((item) => {
    observer.observe(item);
  });
}

// ============================================
// INITIALIZE STORY PAGE
// ============================================
function initStoryPage() {
  initStoryQuote();
  initTimelineAnimation();
}

// Run when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initStoryPage);
} else {
  initStoryPage();
}
