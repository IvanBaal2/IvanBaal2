/* =========================================================
   PORTFOLIO SCRIPT
   Each feature is its own small block, so you can read,
   change or delete one without breaking the others.
   ========================================================= */

/* ---------- 1. NAV LINKS (used to highlight the current section) ---------- */
const navLinks = document.querySelectorAll(".nav__link");


/* ---------- 2. HEADER BACKGROUND ON SCROLL ---------- */
const header = document.getElementById("header");

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 40);
}
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();


/* ---------- 3. TYPING EFFECT ----------
   Edit this list to change the words that get typed. */
const roles = ["IT Student.", "Web Developer.", "Networking Enthusiast."];

const typingEl = document.getElementById("typing");
let roleIndex = 0;   // which word we're on
let charIndex = 0;   // how many letters are showing
let deleting = false;

function type() {
  const current = roles[roleIndex];

  // Add or remove one letter
  charIndex += deleting ? -1 : 1;
  typingEl.textContent = current.slice(0, charIndex);

  let delay = deleting ? 50 : 100;   // deleting is faster than typing

  if (!deleting && charIndex === current.length) {
    delay = 1800;          // pause when the word is complete
    deleting = true;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;   // next word (loops back to 0)
    delay = 400;
  }

  setTimeout(type, delay);
}
type();


/* ---------- 4. REVEAL ON SCROLL + SKILL BARS + COUNTERS ----------
   IntersectionObserver tells us when an element enters the screen.
   It's much faster than checking positions on every scroll event. */
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      el.classList.add("visible");

      // If this is a skill card, fill its progress bar
      const bar = el.querySelector(".skill__bar span");
      if (bar) bar.style.width = bar.dataset.level + "%";

      // If this block contains counters, count them up
      el.querySelectorAll("[data-count]").forEach(animateCounter);

      observer.unobserve(el);   // animate only once
    });
  },
  { threshold: 0.15 }   // trigger when 15% of the element is visible
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

function animateCounter(el) {
  const target = Number(el.dataset.count);
  const duration = 1500;   // ms
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);   // ease-out: fast start, slow finish
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}


/* ---------- 5. ACTIVE NAV LINK WHILE SCROLLING ---------- */
const sections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
      });
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }   // a section is "active" when it crosses the middle of the screen
);

sections.forEach((section) => sectionObserver.observe(section));


/* ---------- 6. FOOTER YEAR ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
