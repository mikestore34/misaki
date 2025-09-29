// Toggle mobile menu
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {
  // Open / close menu on hamburger click
  menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });

  // Close menu when clicking a nav link
  document.querySelectorAll("#navbar a").forEach(link => {
    link.addEventListener("click", () => {
      navbar.classList.remove("active");
      menuToggle.classList.remove("active");
    });
  });
}

// Testimonials carousel with dots
const carousel = document.querySelector(".testimonial-carousel");
const cards = document.querySelectorAll(".testimonial-carousel .card");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dotsContainer = document.querySelector(".dots");

let index = 0;

// Only run carousel if cards exist
if (cards.length > 0 && carousel) {
  // Create dots dynamically
  cards.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      index = i;
      updateCarousel();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dots span");

  function updateCarousel() {
    carousel.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      index = (index + 1) % cards.length;
      updateCarousel();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      index = (index - 1 + cards.length) % cards.length;
      updateCarousel();
    });
  }

  // Auto-slide every 4s
  setInterval(() => {
    index = (index + 1) % cards.length;
    updateCarousel();
  }, 4000);
}
// Contact form handling
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async function(event) {
  event.preventDefault();
  const data = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      status.textContent = "✅ Thank you! Your message has been sent.";
      status.style.color = "limegreen";
      form.reset();
    } else {
      status.textContent = "❌ Oops! Something went wrong. Please try again.";
      status.style.color = "red";
    }
  } catch (error) {
    status.textContent = "❌ Network error. Please try again later.";
    status.style.color = "red";
  }
});
