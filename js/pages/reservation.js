/**
 * Aurora Bistro - Reservation Page JavaScript
 */

// ============================================
// FORM HANDLING
// ============================================
function initReservationForm() {
  const form = document.getElementById("reservation-form");
  const modal = document.getElementById("confirmation-modal");
  const modalClose = document.getElementById("modal-close");
  const modalDetails = document.getElementById("modal-details");

  if (!form || !modal) return;

  // Set minimum date to today
  const dateInput = document.getElementById("date");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);
  }

  // Form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Format date for display
    const dateObj = new Date(data.date + "T00:00:00");
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Format time for display
    const timeParts = data.time.split(":");
    const hours = parseInt(timeParts[0]);
    const minutes = timeParts[1];
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    const formattedTime = `${displayHours}:${minutes} ${ampm}`;

    // Update modal details
    if (modalDetails) {
      modalDetails.innerHTML = `
        <p><span>Name</span><span>${data.firstName} ${data.lastName}</span></p>
        <p><span>Date</span><span>${formattedDate}</span></p>
        <p><span>Time</span><span>${formattedTime}</span></p>
        <p><span>Guests</span><span>${data.guests}</span></p>
        ${data.occasion ? `<p><span>Occasion</span><span>${data.occasion}</span></p>` : ""}
      `;
    }

    // Show modal
    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    // Reset form
    form.reset();
  });

  // Close modal
  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  // Close on overlay click
  const modalOverlay = modal.querySelector(".modal-overlay");
  if (modalOverlay) {
    modalOverlay.addEventListener("click", closeModal);
  }

  // Close on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// ============================================
// FORM INPUT ANIMATIONS
// ============================================
function initFormAnimations() {
  const inputs = document.querySelectorAll(
    ".form-group input, .form-group select, .form-group textarea"
  );

  inputs.forEach((input) => {
    // Add focus animation
    input.addEventListener("focus", () => {
      input.parentElement.classList.add("focused");
    });

    input.addEventListener("blur", () => {
      input.parentElement.classList.remove("focused");
    });
  });
}

// ============================================
// INITIALIZE RESERVATION PAGE
// ============================================
function initReservationPage() {
  initReservationForm();
  initFormAnimations();
}

// Run when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initReservationPage);
} else {
  initReservationPage();
}
