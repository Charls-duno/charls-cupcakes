# Charls Cupcakes 🧁

A single-page cupcake shop website built with semantic HTML5, Tailwind CSS v4 (CDN), GSAP 3.13, and ScrollTrigger.

---

## Design System

### C1 — Color Palette (60-30-10 rule)

| Role | Token | Hex | Usage |
|------|-------|-----|-------|
| 60% Dominant (light) | `--color-brand-bg` | `#fdf2f8` | Page background |
| 60% Dominant (light) | `--color-brand-surface` | `#ffffff` | Cards, sections |
| 30% Secondary | `--color-brand-primary` | `#ec4899` | Nav links, buttons, headings |
| 10% Accent | `--color-brand-accent` | `#f59e0b` | Price tags, highlights |
| 60% Dominant (dark) | `--color-brand-dark-bg` | `#030712` | Dark page background |
| 60% Dominant (dark) | `--color-brand-dark-sur` | `#1f2937` | Dark card surfaces |

### C2 — Tokens defined once, reused everywhere

All six tokens are declared in a single `@theme {}` block in the `<style type="text/tailwindcss">` tag and consumed via `bg-brand-*`, `text-brand-*`, and `border-brand-*` utility classes across the header, hero, all cards, form fields, buttons, and footer.

### C3 — Visual Style: Glassmorphism

The site uses **glassmorphism** as its named visual style: frosted-glass backgrounds (`bg-white/20 backdrop-blur-md`), subtle white borders (`border-white/30`), and soft translucency layered over gradient hero backgrounds. The `.glass` component class is available for overlay elements.

### C4 — Contrast Ratio

Body text is `text-gray-800` (`#1f2937`) on a `bg-pink-50` (`#fdf2f8`) background.  
Checked with [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/):  
**Result: 13.8 : 1** — passes WCAG AA and AAA for both normal and large text.

Dark mode body text is `text-gray-100` (`#f3f4f6`) on `bg-gray-950` (`#030712`):  
**Result: 18.1 : 1** — passes WCAG AA and AAA.

---

## Tech Stack

- **HTML5** — semantic elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- **Tailwind CSS v4** via CDN (`@tailwindcss/browser@4`) — utility-first, no external CSS file
- **GSAP 3.13.0** + **ScrollTrigger** — page-load timeline, scroll-triggered section reveals, hover interactions
- **Dark mode** — `classList.toggle("dark")` on `<html>`, preference saved to `localStorage`

## Features

- Responsive layout: mobile-first, `sm:` and `lg:` breakpoints for grids
- GSAP intro timeline with `defaults`, stagger, position-parameter overlap (`"-=0.3"`, `"<"`), total ≈ 2s
- ScrollTrigger animations on every section as it enters the viewport
- "Replay Intro" button that calls `heroTL.restart()`
- GSAP-driven card hover (lift effect) — no Tailwind `translate-*` / `scale-*` on animated elements
- Dark mode toggle with GSAP spin animation

## Live Demo

> Deploy URL goes here after `gh-pages` / Netlify push.
# charls-cupcakes
# charls-cupcakes
