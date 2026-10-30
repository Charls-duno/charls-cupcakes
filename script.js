gsap.registerPlugin(ScrollTrigger);

const html = document.documentElement;
const progressBar = document.getElementById("progressBar");
const siteHeader = document.getElementById("site-header");
const replayBtn = document.getElementById("replay-btn") || document.getElementById("replayBtn");
const darkModeToggle = document.getElementById("theme-toggle") || document.getElementById("darkModeToggle");
const heroImg = document.getElementById("hero-img") || document.querySelector("#hero .rounded-full");
const heroTitle = document.getElementById("hero-title") || document.querySelector("#hero h2");
const heroTagline = document.getElementById("hero-tagline") || document.querySelector("#hero p");
const heroCta = document.getElementById("hero-cta") || document.querySelector("#hero .flex.gap-3");
const navLinks = document.querySelectorAll("#nav-links a, nav a");

const heroTL = gsap.timeline({
  defaults: { ease: "power3.out", duration: 0.5 },
});

if (heroImg) {
  heroTL.from(heroImg, { y: -40, opacity: 0, scale: 0.85 });
}
if (heroTitle) {
  heroTL.from(heroTitle, { y: 30, opacity: 0 }, "-=0.25");
}
if (heroTagline) {
  heroTL.from(heroTagline, { y: 20, opacity: 0 }, "-=0.3");
}
if (heroCta) {
  heroTL.from(heroCta.querySelectorAll("a, button"), { y: 15, opacity: 0, stagger: 0.12 }, "-=0.25");
}
if (navLinks.length) {
  heroTL.from(navLinks, { y: -15, opacity: 0, stagger: 0.07 }, "<");
}

if (heroImg) {
  gsap.to(heroImg, {
    y: -10,
    duration: 2,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
    delay: 0.8,
  });
}

if (replayBtn) {
  replayBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => heroTL.restart(), 350);
  });
}

const revealBlocks = gsap.utils.toArray(".reveal, .anim-title, .anim-sub, .anim-cards");
revealBlocks.forEach((el) => {
  const target = el.querySelectorAll ? el.querySelectorAll(".card") : [];
  if (target.length) {
    gsap.from(target, {
      scrollTrigger: { trigger: el, start: "top 86%", toggleActions: "play none none none" },
      y: 35,
      opacity: 0,
      duration: 0.5,
      stagger: 0.09,
      ease: "back.out(1.3)",
    });
    return;
  }

  gsap.from(el, {
    scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none reverse" },
    y: 24,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out",
  });
});

if (progressBar) {
  gsap.fromTo(
    progressBar,
    { scaleX: 0 },
    {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    }
  );
}

function applyTheme(dark) {
  html.classList.toggle("dark", Boolean(dark));

  const sunIcon = document.getElementById("icon-sun");
  const moonIcon = document.getElementById("icon-moon");

  if (sunIcon) {
    sunIcon.classList.toggle("hidden", !dark);
  }
  if (moonIcon) {
    moonIcon.classList.toggle("hidden", dark);
  }
}

if (darkModeToggle) {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(savedTheme ? savedTheme === "dark" : prefersDark);

  darkModeToggle.addEventListener("click", () => {
    const isDark = !html.classList.contains("dark");
    applyTheme(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");

    gsap.fromTo(
      darkModeToggle,
      { rotation: 0 },
      { rotation: 360, duration: 0.45, ease: "back.out(1.5)" }
    );
  });
}

if (siteHeader) {
  ScrollTrigger.create({
    start: "top -40",
    onEnter: () => siteHeader.classList.add("shadow-sm"),
    onLeaveBack: () => siteHeader.classList.remove("shadow-sm"),
  });
}

document.querySelectorAll(".menu-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, { y: -4, duration: 0.2, ease: "power2.out" });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, { y: 0, duration: 0.2, ease: "power2.inOut" });
  });
});
