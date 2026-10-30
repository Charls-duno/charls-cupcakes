gsap.registerPlugin(ScrollTrigger);


   defaults, 5 steps, stagger, position overlaps, total ≈ 2s */
const heroTL = gsap.timeline({
  defaults: { ease: "power3.out", duration: 0.5 } // power3.out: snappy decel for headline entrance
});

heroTL
  .from("#hero-img",     { y: -40, opacity: 0, scale: 0.85 })
  .from("#hero-title",   { y: 30,  opacity: 0 },                 "-=0.25")
  .from("#hero-tagline", { y: 20,  opacity: 0 },                 "-=0.3")
  .from("#hero-cta > *", { y: 15,  opacity: 0, stagger: 0.12 }, "-=0.25")
  .from("#nav-links a",  { y: -15, opacity: 0, stagger: 0.07 }, "<");


gsap.to("#hero-img", {
  y: -10, duration: 2,
  ease: "sine.inOut", // sine.inOut: smooth endless oscillation, no jerk
  yoyo: true, repeat: -1, delay: 0.8
});


document.getElementById("replay-btn").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => heroTL.restart(), 350);
});


gsap.utils.toArray(".anim-title").forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: "top 86%", toggleActions: "play none none none" },
    y: 24, opacity: 0, duration: 0.6,
    ease: "power2.out" // power2.out: gentle text reveal
  });
});

gsap.utils.toArray(".anim-sub").forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
    y: 16, opacity: 0, duration: 0.5, delay: 0.08,
    ease: "power2.out"
  });
});


gsap.utils.toArray(".anim-cards").forEach(group => {
  gsap.from(group.querySelectorAll(".card"), {
    scrollTrigger: { trigger: group, start: "top 86%", toggleActions: "play none none none" },
    y: 35, opacity: 0, duration: 0.5, stagger: 0.09,
    ease: "back.out(1.3)" // back.out: subtle pop-in overshoot on cards
  });
});

gsap.from(".anim-form", {
  scrollTrigger: { trigger: ".anim-form", start: "top 86%", toggleActions: "play none none none" },
  y: 30, opacity: 0, duration: 0.6,
  ease: "power2.out"
});


document.querySelectorAll(".menu-card").forEach(card => {
  card.addEventListener("mouseenter", () =>
    gsap.to(card, { y: -4, duration: 0.2, ease: "power2.out" })
  );
  card.addEventListener("mouseleave", () =>
    gsap.to(card, { y: 0,  duration: 0.2, ease: "power2.inOut" })
  );
});

/* ── B1: Dark mode — classList.toggle("dark") on <html> ── */
const themeToggle = document.getElementById("theme-toggle");
const iconSun     = document.getElementById("icon-sun");
const iconMoon    = document.getElementById("icon-moon");
const html        = document.documentElement;

function applyTheme(dark) {
  if (dark) {
    html.classList.add("dark");
    iconSun.classList.remove("hidden");
    iconMoon.classList.add("hidden");
  } else {
    html.classList.remove("dark");
    iconSun.classList.add("hidden");
    iconMoon.classList.remove("hidden");
  }
}

// Restore saved preference on load
applyTheme(localStorage.getItem("theme") === "dark");

themeToggle.addEventListener("click", () => {
  const isDark = !html.classList.contains("dark");
  applyTheme(isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
  gsap.fromTo(themeToggle,
    { rotation: 0 },
    { rotation: 360, duration: 0.45, ease: "back.out(1.5)" }
  );
});

/* ── Header shadow on scroll ── */
ScrollTrigger.create({
  start: "top -40",
  onEnter:     () => document.getElementById("site-header").classList.add("shadow-sm"),
  onLeaveBack: () => document.getElementById("site-header").classList.remove("shadow-sm")
});
