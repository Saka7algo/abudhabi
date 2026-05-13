# ADM Kochi — Mobile + Desktop Optimisation Plan

Companion to [design.md](./design.md). Concrete, ordered work items to bring every page to the spec. Each item lists **What / Why / Where / Done when**.

---

## Phase 0 — Audit (½ day)

| # | Task |
|---|------|
| 0.1 | Run Lighthouse (mobile + desktop) on `index`, `services`, `ceramic-coating-kochi`, `contact`. Save scores. |
| 0.2 | Verify every page imports `assets/adm.css` and `assets/adm.js`, and has `data-slot="nav"` + `data-slot="footer"`. |
| 0.3 | Confirm every `*-kochi.html` has unique `<title>`, `description`, `data-page` attribute. |
| 0.4 | Note image weights — flag any > 250 KB. |

**Done when:** baseline Lighthouse numbers and an inventory of issues are recorded.

---

## Phase 1 — Mobile web (priority)

### 1.1 Tap targets & forms
- **What:** Verify every `.btn`, `.chip`, `.nav-item > a`, `.fb`, `.submit`, `.theme-toggle` is ≥ 44×44 on `≤640px`. Inputs already at 16px — keep.
- **Why:** Prevents iOS zoom-on-focus and Google's "tap targets too small" flag.
- **Where:** `assets/adm.css` (existing `@media(max-width:640px)` block lines 372–467).
- **Done when:** Lighthouse "Tap targets" passes on mobile.

### 1.2 Floating call/WhatsApp bubble
- **What:** Confirm `.float` only renders ≤640px, has `aria-label`, contrast ≥ 4.5:1 against bg.
- **Where:** `adm.js` (renderer), `adm.css` `.float` rules.
- **Done when:** Bubble appears on phone, hidden on desktop, screen reader announces "Call" / "WhatsApp".

### 1.3 Hero on small phones
- **What:** Lock hero image `aspect-ratio:1.08/1` and add `width`/`height` attributes on `<img>` so layout doesn't shift while loading.
- **Why:** Kills CLS contribution from the LCP element.
- **Where:** `index.html` lines 35–37; same pattern on every page hero.
- **Done when:** CLS < 0.05 in Lighthouse mobile.

### 1.4 Sticky CTA vs floating bubble
- **What:** Keep `.sticky` hidden ≤640px (already done). Audit it on tablet — make sure it doesn't overlap content.
- **Done when:** Visual check on 768px viewport.

### 1.5 Mobile nav focus trap + aria
- **What:** When `.mob-nav.open`, set `aria-expanded` on hamburger, lock body scroll (`overflow:hidden`), focus first link, restore focus on close.
- **Where:** `assets/adm.js` (nav module). New ~20 lines.
- **Done when:** Keyboard user can `Tab` through menu only, `Esc` closes.

### 1.6 Disable reveal animations on slow devices
- **What:** Already disabled ≤640px. Also gate by `prefers-reduced-motion`.
- **Where:** `adm.css` — add `@media (prefers-reduced-motion: reduce){ .r{opacity:1;transform:none} .ticker-track{animation:none} }`.
- **Done when:** Motion stops when OS-level reduce-motion is on.

---

## Phase 2 — Desktop web

### 2.1 Dropdown nav usability
- **What:** Current `.nav-drop` appears on `:hover`. Add `:focus-within` so keyboard users can open it.
- **Where:** `adm.css` `.nav-item.has-drop:hover .nav-drop` → also `:focus-within`.
- **Done when:** `Tab` to "Services" opens dropdown.

### 2.2 Wider screens (> 1600px)
- **What:** Cap reads at `--maxw:1360px` — good. Verify hero side margins don't look stranded on 1920px+ by checking padding rhythm.
- **Done when:** Designer eyeball pass at 1440 / 1920 / 2560.

### 2.3 Hover states
- **What:** Audit `.chooser-card`, `.core-card`, `.test-card` — confirm a clear hover (border or shadow lift) on desktop only (`@media (hover:hover)`).
- **Done when:** No "stuck" hover on mobile tap.

### 2.4 Before/After slider on desktop
- **What:** Check `.ba-slider` works with mouse + keyboard `←/→` arrows. Currently mouse/touch only — add a `role="slider"` + `aria-valuenow` and arrow-key handlers (~15 lines JS).
- **Where:** `assets/adm.js`.

---

## Phase 3 — Performance

### 3.1 Image pipeline
- **What:** Convert every PNG in `/assets` to WebP (keep PNG as fallback via `<picture>`). Target ≤ 180 KB for hero, ≤ 120 KB elsewhere.
- **Tool:** `cwebp -q 82` or squoosh.
- **Done when:** Total page weight on `index.html` < 600 KB.

### 3.2 Lazy-load non-hero images
- **What:** Add `loading="lazy" decoding="async"` to every `<img>` except hero LCP image.
- **Done when:** Grep shows compliance.

### 3.3 Font loading
- **What:** Currently using Google Fonts `display=swap` (good). Add `<link rel="preload" as="style">` for the CSS, and self-host if possible to drop a DNS hop.
- **Done when:** No render-blocking font request in Lighthouse.

### 3.4 Defer JS
- **What:** Add `defer` to `<script src="assets/adm.js">` on every page. Move the inline theme bootstrap (first ~6 lines of `adm.js`) into a tiny `<script>` in `<head>` to keep no-FOUC behaviour.
- **Done when:** No "Eliminate render-blocking resources" warning.

### 3.5 CSS minify (optional)
- **What:** `adm.css` is 560 lines / unminified. Ship a `adm.min.css` for prod; keep source.
- **Done when:** Gzipped CSS < 15 KB.

---

## Phase 4 — Accessibility & SEO

### 4.1 Skip link
- **What:** Add `<a href="#top" class="skip">Skip to content</a>` as first child of `<body>`, styled to appear on focus only.

### 4.2 Heading order
- **What:** Each page: exactly one `h1`; no skipped levels.
- **Done when:** axe-core "heading-order" passes.

### 4.3 Alt text audit
- **What:** Every `<img>` has descriptive `alt`. Decorative ones → `alt=""`.

### 4.4 Open Graph images
- **What:** Add `og:image` (1200×630) per page. Use hero crop.

### 4.5 Structured data
- **What:** Add `LocalBusiness` JSON-LD to `index.html` and `contact.html` (name, phone `+919544041000`, address, geo, hours).
- **Done when:** Google Rich Results test passes.

### 4.6 Sitemap + robots
- **What:** Generate `sitemap.xml` listing all 18 pages; add `robots.txt` pointing to it.

---

## Phase 5 — Dark mode polish

- 5.1 Verify all token-aware components in dark mode (cards, dividers, form inputs, before/after slider handle).
- 5.2 Confirm theme persistence works across all pages (single `localStorage` key already — should).
- 5.3 Check screenshot images don't fight the dark bg — add subtle 1px `border` on `.hero-img img` in dark.

---

## Phase 6 — QA matrix

Test on real devices before shipping:

| Device | Browser | Pages to hit |
|--------|---------|--------------|
| iPhone SE (375px) | Safari | index, contact, ceramic-coating-kochi |
| iPhone 14 Pro | Safari | index, services |
| Pixel 6 (412px) | Chrome | index, contact, before/after slider page |
| iPad (768px) | Safari | index, education |
| Desktop 1440 | Chrome | every page (smoke) |
| Desktop 1440 | Firefox | index, services |
| Desktop 1920 | Safari | index |
| Lighthouse | mobile + desktop | index, contact, one `*-kochi` page |

**Definition of done:** Lighthouse ≥ 95 / 95 / 100 / 100 (Perf/Acc/BP/SEO) on mobile for `index.html`, `contact.html`, and one SEO landing page.

---

## Out of scope (parked)

- No framework migration. Site stays vanilla HTML for editability.
- No analytics swap — current setup (if any) stays.
- No new content pages this round.
- No CMS / headless layer.

---

## Risks

| Risk | Mitigation |
|------|------------|
| Google Fonts blocked in some regions | Self-host fonts (Phase 3.3). |
| Image conversion breaks `<img>` references | Use `<picture>` with WebP + PNG fallback — old URLs keep working. |
| Theme bootstrap inline script blocks parsing | Keep it < 200 bytes, no DOM access — just `localStorage` + `setAttribute`. |
| Mobile nav focus trap traps screen readers too aggressively | Test with VoiceOver and TalkBack before merge. |
