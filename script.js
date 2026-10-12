// Show the current year in the footer.
document.getElementById("year").textContent = new Date().getFullYear();

// Open and close the navigation menu on small screens.
const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

menuButton.addEventListener("click", () => {
  const menuIsOpen = navLinks.classList.toggle("open");

  menuButton.setAttribute("aria-expanded", menuIsOpen);
  menuButton.textContent = menuIsOpen ? "Close" : "Menu";
});

// Close the menu after the visitor chooses a section.
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "Menu";
  });
});

// Create an email with the information from the contact form.
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  const emailSubject = encodeURIComponent(`Portfolio message: ${subject}`);
  const emailBody = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );

  window.location.href = `mailto:pramodthati03@gmail.com?subject=${emailSubject}&body=${emailBody}`;
});

// Add a small 3D response when a mouse moves over a project, skill, or experience card.
// The effect is disabled on touch screens and for visitors who prefer less motion.
const canUseHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Type one career focus inside the hero heading, then erase it before typing the next.
const rotatingRole = document.getElementById("rotatingRole");
const careerRoles = [
  "AIML Student & Aspiring Data Analyst",
  "AIML Student Exploring Machine Learning",
  "AIML Student & Aspiring Data Scientist"
];
let currentRole = 0;
let letterPosition = 0;
let isDeleting = false;

if (!reduceMotion) {
  rotatingRole.textContent = "";

  function typeCareerRole() {
    const fullText = careerRoles[currentRole];
    let delay = 55;

    if (!isDeleting) {
      letterPosition += 1;
      rotatingRole.textContent = fullText.slice(0, letterPosition);

      if (letterPosition === fullText.length) {
        isDeleting = true;
        delay = 1700;
      }
    } else {
      letterPosition -= 1;
      rotatingRole.textContent = fullText.slice(0, letterPosition);
      delay = 28;

      if (letterPosition === 0) {
        isDeleting = false;
        currentRole = (currentRole + 1) % careerRoles.length;
        delay = 380;
      }
    }

    window.setTimeout(typeCareerRole, delay);
  }

  window.setTimeout(typeCareerRole, 350);
}

if (canUseHover && !reduceMotion) {
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const cardBox = card.getBoundingClientRect();
      const moveX = event.clientX - cardBox.left;
      const moveY = event.clientY - cardBox.top;

      const rotateY = ((moveX / cardBox.width) - 0.5) * 5;
      const rotateX = ((moveY / cardBox.height) - 0.5) * -5;

      card.style.setProperty("--tilt-x", `${rotateX}deg`);
      card.style.setProperty("--tilt-y", `${rotateY}deg`);
    });

    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    });
  });
}

// Reveal content as it enters the screen. This keeps the page calm while scrolling.
if ("IntersectionObserver" in window && !reduceMotion) {
  const revealItems = document.querySelectorAll(
    ".section-heading, .section-intro, .about-introduction, .project-grid, .skills-grid, .certificate-list, .education-list, .contact-content"
  );

  revealItems.forEach((item) => item.classList.add("reveal-on-scroll"));

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

// Highlight the current section in the navigation bar as the visitor scrolls.
if ("IntersectionObserver" in window) {
  const navigationLinks = Array.from(navLinks.querySelectorAll('a[href^="#"]'));
  const sections = navigationLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const navigationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navigationLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => navigationObserver.observe(section));
}
