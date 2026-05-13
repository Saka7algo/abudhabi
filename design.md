# ADM Kochi — Design Spec (Mobile + Desktop Web)

Static multi-page site for **Abu Dhabi Motors Kochi**: premium car service, body shop, ceramic coating, ECU diagnostics and automobile training. Plain HTML + one shared CSS + one shared JS. No framework, no build step.

---

## 1. Design principles

| # | Principle | Decision |
|---|-----------|----------|
| 1 | Premium-editorial, not auto-shop | Space Grotesk + Inter + JetBrains Mono; generous whitespace; thin 1px lines; tiny mono eyebrows. |
| 2 | One brand colour | Sky-blue `#00AEEF`. Used for accents, hovers, active dots — never for body copy. |
| 3 | Mobile-first reading order | Headline → desc → CTAs → image → ticker. Two-column grids collapse to one < 1080px. |
| 4 | Reveal-on-scroll, not animation theatre | `.r → .r.in` (opacity + 14px Y). Disabled below 640px to keep TTI low. |
| 5 | Tap-safe by default | All interactive targets ≥ 44×44 px on mobile. Form inputs use `font-size:16px` to block iOS auto-zoom. |
| 6 | Dark mode is first-class | `html[data-theme="dark"]` swaps tokens only — no extra DOM. Saved in `localStorage` before paint. |

---

## 2. Design tokens (`assets/adm.css :root`)

```
--bg     #F8F7F4   page background (off-white linen)
--bg2    #FFFFFF   card / surface
--bg3    #F2F0EC   inset (forms, slider track)
--fg     #0D0D0D   primary text
--mute   rgba(13,13,13,.52)   secondary text
--line   rgba(13,13,13,.10)   1px hairline divider
--blue   #00AEEF   brand accent
--maxw   1360px    content cap
--radius 4px       universal corner
```

Dark mode overrides only the above; component CSS reads tokens.

---

## 3. Type scale (fluid)

| Token | Clamp | Family |
|-------|-------|--------|
| `.h1` | `clamp(44px, 6vw, 96px)` | Space Grotesk 600, tracking -.04em |
| `.h2` | `clamp(32px, 3.4vw, 52px)` | Space Grotesk 600, tracking -.03em |
| `.h3` | `clamp(22px, 1.8vw, 30px)` | Space Grotesk 600 |
| `.h4` | `clamp(18px, 1.4vw, 22px)` | Space Grotesk 500 |
| body  | 16px / 1.6 | Inter 400 |
| `.mono` | 10px / .2em uppercase | JetBrains Mono |

Mobile (`≤640px`) tightens h1/h2 with vw-driven clamps and drops body to 15px.

---

## 4. Breakpoints

| BP | Width | What changes |
|----|-------|--------------|
| **Desktop** | > 1080px | 2-col hero, 3–4 col grids, full nav bar with hover dropdown. |
| **Tablet / small laptop** | ≤ 1080px | Single-column hero, 2-col stat grids, **hamburger replaces nav**, theme toggle hides, side padding 40 → 24px. |
| **Mobile** | ≤ 640px | All grids → 1 col, reveal animations off, sticky CTA hidden in favour of floating call/WhatsApp bubble, side padding 24 → 20px, 16px form inputs (no iOS zoom). |
| **Small mobile** | ≤ 380px | Side padding 16px, logo-sub hidden, `.h1` flat 38px. |
| Print | — | Strip nav/CTA, force 2-col grids, hide images, swap to black-on-white 12pt. |

---

## 5. Layout system

- **Container:** `.wrap` / `.sec-wrap` — `max-width:1360px` + 40/24/20/16px gutters per BP.
- **Grids:** CSS Grid only. No flex hacks for layout. Each grid declares its desktop columns, then collapses inside the 1080 / 640 media queries (see `.chooser-grid`, `.why-grid`, `.process-grid`, `.foot-grid`, `.showcase`).
- **Stacking:** Reveal classes use `transform: translateY(14px)` → `none`; rules in `_breakpoint.640` disable them to avoid janky scroll on low-end Android.
- **Z-index ladder:** `.nav 60` · `.mob-nav 59` · `.float / .hamburger 80` · `.nav-drop 200`.

---

## 6. Components

| Component | Desktop behaviour | Mobile behaviour |
|-----------|------------------|------------------|
| `.nav` | Fixed, 64px, blurred bg, hover dropdown, theme toggle visible. | 58px, hamburger pill on the right; full-screen `.mob-nav` overlay slides down. |
| `.hero` | 2-col grid (text \| image), ticker bar at bottom, reveal-staggered. | Single column; image becomes ~1:1; CTAs span full width as grid. |
| `.chooser-card` | 3-up grid with image + tags + arrow CTA. | 1-up, 28×22 padding, full-width button. |
| `.why-grid` / `.process-grid` | 4 / 5 columns with vertical hairlines. | 1 col with horizontal hairlines only; vertical borders zeroed. |
| `.showcase` | 3-col masonry-feeling grid (`.sh.a`, `.sh.d` span). | 1-col stack, fixed 220px row height. |
| `.ba-slider` (before/after) | Drag handle, 16:9. | Same; `touch-action:none` so vertical scroll still works around it. |
| `.float` (call / WhatsApp) | Hidden on desktop. | Bottom-right pair, 54×54 round, 28px shadow. |
| `.sticky` (mid-page CTA) | Visible. | Hidden — replaced by floating bubbles. |
| Forms | 2-col fields, chip group. | 1-col fields, chip group becomes vertical stack; input font 16px. |

---

## 7. Motion

- Reveal: `.r{opacity:0; transform:translateY(14px); transition:.7s cubic-bezier(.2,.8,.2,1)}` → `.r.in`.
- Ticker: `@keyframes tickerScroll` 28s linear; pauses on hover.
- Hover arrow: `.btn .arr` translates 3px on hover.
- **All reveal motion is killed at ≤640px** — assume the device is slow until proven otherwise.

---

## 8. Theming

- Toggle button `.theme-toggle` writes `data-theme="dark"` on `<html>` and persists to `localStorage('adm-theme')`.
- Script applies the saved theme **before first paint** (top of `adm.js` runs synchronously) to avoid FOUC.
- On ≤1080px the desktop toggle is hidden and a `mobile-menu-label` pill takes the same slot; theme toggle moves into `.mob-nav`.

---

## 9. Accessibility

- Color contrast ≥ 4.5:1 on body copy in both themes (verify after any token tweak).
- Focus: keep browser default + add `outline-offset:2px` on `.btn` and `.field input` (todo — see plan).
- Skip-link to `#top` (todo).
- All `<img>` need real `alt`; the hero already does, ceramic/training do — audit remaining pages.
- Hamburger must toggle `aria-expanded` and trap focus inside `.mob-nav.open` (todo — see plan).

---

## 10. Performance budgets

| Metric | Mobile (4G, mid Android) | Desktop |
|--------|--------------------------|---------|
| HTML transferred | < 30 KB | < 30 KB |
| CSS (`adm.css`) | < 20 KB gzipped | same |
| JS (`adm.js`) | < 10 KB gzipped, **non-blocking** | same |
| LCP image | < 180 KB, served as WebP, `loading="eager"` only on hero | < 240 KB |
| Other images | `loading="lazy"`, `decoding="async"` | same |
| LCP | ≤ 2.5s | ≤ 1.8s |
| CLS | < 0.05 | < 0.05 |
| INP | < 200ms | < 100ms |

---

## 11. SEO / metadata pattern

Each page repeats the same shape (see `index.html` head):

- `<title>` ≤ 60 chars, ends with city ("Kochi").
- `meta description` 140–160 chars.
- Open Graph: title, description, type. **Add `og:image` for every page** (todo).
- `<html lang="en" data-page="…">` — `data-page` drives nav active state and any per-page JS branching.

---

## 12. File map

```
abudhabi/
├── index.html                 home (hero + slot for nav/footer injected by JS)
├── services.html              hub: body / care / workshop / education
├── expertise.html             technical credentials
├── education.html             training programme overview
├── story.html                 founder + history
├── ecosystem.html             partner / supplier ecosystem
├── portfolio.html             showcase grid
├── contact.html               form + map + visit info
├── 404.html
├── *-kochi.html               9 SEO landing pages (one per service)
├── assets/
│   ├── adm.css                ALL styles — single source of truth
│   ├── adm.js                 nav inject, theme toggle, reveal observer, ticker clones, BA slider
│   └── *.png                  hero & section imagery
└── uploads/                   user-supplied media (gallery)
```

Every page imports the same `assets/adm.css` + `assets/adm.js` and relies on `data-slot="nav"` / `data-slot="footer"` placeholders that JS fills — so nav/footer edits are one-file edits.
