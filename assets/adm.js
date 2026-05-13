(function () {
  // Apply saved theme immediately — before paint — to avoid flash
  const _t = localStorage.getItem('adm-theme');
  if (_t) document.documentElement.setAttribute('data-theme', _t);
  else if (window.matchMedia('(prefers-color-scheme:dark)').matches)
    document.documentElement.setAttribute('data-theme', 'dark');

  const PHONE = '+919544041000';
  const PHONE_DISPLAY = '+91 95440 41000';
  const FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbylGtYgcp6PUCjoVrmyaxG_d9KjBDvd9Yjs8RQR_X7iSYuQ23UeYkUvuvz3f0AfiWVcGQ/exec'
  const active = document.documentElement.getAttribute('data-page') || '';

  const NAV = [
    { key: 'home', label: 'Home', href: 'index.html' },
    {
      key: 'services', label: 'Services', href: 'services.html', drop: [
        {
          heading: 'Body Shop', href: 'services.html#body', items: [
            { label: 'Dent Repair', href: 'car-dent-repair-kochi.html' },
            { label: 'Car Painting', href: 'car-painting-kochi.html' },
            { label: 'Insurance Claims', href: 'insurance-claim-kochi.html' },
          ]
        },
        {
          heading: 'Care', href: 'services.html#care', items: [
            { label: 'Ceramic Coating', href: 'ceramic-coating-kochi.html' },
            { label: 'PPF Installation', href: 'ppf-kochi.html' },
            { label: 'Detailing', href: 'car-detailing-kochi.html' },
          ]
        },
        {
          heading: 'Workshop', href: 'services.html#workshop', items: [
            { label: 'Car Service', href: 'car-service-kochi.html' },
            { label: 'Diagnostics', href: 'car-diagnostics-kochi.html' },
            { label: 'BMW / Audi / Mercedes', href: 'bmw-service-kochi.html' },
          ]
        },
      ]
    },
    {
      key: 'education', label: 'Education', href: 'education.html', drop: [
        {
          heading: 'Programme', href: 'education.html', items: [
            { label: 'Automobile Course', href: 'automobile-course-kochi.html' },
            { label: 'Mechanic Training', href: 'mechanic-training-kochi.html' },
            { label: 'Course Overview', href: 'education.html' },
          ]
        },
      ]
    },
    { key: 'portfolio', label: 'Portfolio', href: 'portfolio.html' },
    { key: 'story', label: 'Story', href: 'story.html' },
    { key: 'contact', label: 'Contact', href: 'contact.html' },
  ];

  function buildDrop(cols) {
    return '<div class="nav-drop">' +
      cols.map(col =>
        '<div class="nav-drop-col">' +
        '<a href="' + col.href + '" class="nav-drop-label">' + col.heading + '</a>' +
        col.items.map(it => '<a href="' + it.href + '" class="nav-drop-sub">' + it.label + '</a>').join('') +
        '</div>'
      ).join('') +
      '</div>';
  }

  const navHTML = `
  <nav class="nav">
    <div class="nav-inner">
      <a href="index.html" class="logo" aria-label="ADM Kochi">
        <img src="assets/logo.png" alt="ADM" style="height:30px;width:auto;display:block"/>
        <span class="logo-sub">KOCHI</span>
      </a>
      <div class="nav-links">
        ${NAV.map(n => {
    const isCurr = active === n.key;
    const hasDrop = n.drop && n.drop.length;
    return `<div class="nav-item${hasDrop ? ' has-drop' : ''}${isCurr ? ' active' : ''}">` +
      `<a href="${n.href}">${n.label}</a>` +
      (hasDrop ? buildDrop(n.drop) : '') +
      `</div>`;
  }).join('')}
      </div>
      <div class="nav-cta-wrap">
        <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode">
          <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
        </button>
        <a href="contact.html" class="btn primary">Book Service <span class="arr">→</span></a>
        <button class="mobile-menu-label" id="mobileMenuLabel" aria-label="Open menu">Menu</button>
        <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </nav>
  <div class="mob-nav" id="mobNav" aria-hidden="true">
    <div class="mob-nav-inner">
      ${NAV.map(n => `<a href="${n.href}" class="mob-nav-link${active === n.key ? ' active' : ''}">${n.label}</a>`).join('')}
      <a href="contact.html" class="btn primary mob-nav-cta" style="margin-top:32px">Book Service →</a>
    </div>
  </div>`;

  const footerHTML = `
  <footer>
    <div class="wrap">
      <div class="foot-grid">
        <div class="foot-brand">
          <a href="index.html" class="logo" aria-label="ADM Kochi">
            <img src="assets/logo.png" alt="ADM" style="height:32px;width:auto;display:block"/>
            <span class="logo-sub">KOCHI</span>
          </a>
          <p class="tag">Premium car service, ceramic coating, diagnostics and automobile training — one floor in Kochi.</p>
        </div>
        <div class="foot-col">
          <h6>Services</h6>
          <ul>
            <li><a href="services.html">Body Shop</a></li>
            <li><a href="services.html">Ceramic &amp; PPF</a></li>
            <li><a href="services.html">Workshop</a></li>
            <li><a href="education.html">Training</a></li>
          </ul>
        </div>
        <div class="foot-col">
          <h6>Company</h6>
          <ul>
            <li><a href="story.html">Our Story</a></li>
            <li><a href="expertise.html">Expertise</a></li>
            <li><a href="portfolio.html">Portfolio</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div class="foot-col">
          <h6>Visit</h6>
          <ul>
            <li><a href="contact.html">NH544, Muttom, Kalamassery</a></li>
            <li><a href="contact.html">Aluva, Kerala 683106</a></li>
            <li><a href="tel:${PHONE}">${PHONE_DISPLAY}</a></li>
            <li><a href="mailto:admkochi@gmail.com">admkochi@gmail.com</a></li>
          </ul>
        </div>
      </div>
      <div class="foot-bot">
        <span>© 2026 ADM Kochi · Abu Dhabi Motors Kochi</span>
        <span>Built in Kerala · Engineered for precision</span>
      </div>
    </div>
  </footer>`;

  const stickyHTML = `
  <div class="sticky" id="sticky">
    <span class="dot"></span>
    <span class="lbl">Workshop open · Mon–Sat</span>
    <a href="tel:${PHONE}" class="btn">Call ${PHONE_DISPLAY}</a>
    <a href="contact.html" class="btn primary">Book Service <span class="arr">→</span></a>
  </div>
  <div class="float">
    <a href="https://wa.me/${PHONE.replace('+', '')}" class="fb wa" aria-label="WhatsApp">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.33 4.99L2 22l5.2-1.36c1.45.79 3.08 1.21 4.74 1.21h.01c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.04-5.16-2.92-7.04A9.87 9.87 0 0 0 12.04 2Zm0 18.16h-.01c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.09.81.82-3.02-.19-.31a8.22 8.22 0 0 1-1.25-4.34c0-4.56 3.7-8.26 8.26-8.26 2.2 0 4.28.86 5.84 2.42a8.21 8.21 0 0 1 2.42 5.85c0 4.56-3.7 8.18-8.3 8.18Zm4.53-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.17.25-.64.8-.78.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.45-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43H8.7c-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.05 0 1.21.88 2.37 1 2.54.12.17 1.73 2.63 4.18 3.69.58.25 1.04.4 1.4.51.59.19 1.12.16 1.54.1.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.14-1.17-.07-.1-.23-.17-.48-.29Z"/></svg>
    </a>
    <a href="tel:${PHONE}" class="fb call" aria-label="Call">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z"/></svg>
    </a>
  </div>`;

  function inject() {
    const ns = document.querySelector('[data-slot="nav"]');
    if (ns) ns.outerHTML = navHTML;
    const fs = document.querySelector('[data-slot="footer"]');
    if (fs) fs.outerHTML = footerHTML + stickyHTML;

    // Theme toggle
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const next = isDark ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('adm-theme', next);
      });
    }

    // Hamburger
    const hb = document.getElementById('hamburger');
    const ml = document.getElementById('mobileMenuLabel');
    const mob = document.getElementById('mobNav');
    if (hb && mob) {
      const setOpen = open => {
        mob.classList.toggle('open', open);
        hb.classList.toggle('open', open);
        hb.setAttribute('aria-expanded', open);
        mob.setAttribute('aria-hidden', !open);
        document.body.style.overflow = open ? 'hidden' : '';
        if (ml) ml.textContent = open ? 'Close' : 'Menu';
      };
      const toggleMenu = () => {
        const open = mob.classList.toggle('open');
        setOpen(open);
      };
      hb.addEventListener('click', toggleMenu);
      if (ml) ml.addEventListener('click', toggleMenu);
      mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        setOpen(false);
      }));
    }

    // Scroll reveal
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.r').forEach(el => io.observe(el));

    // Sticky
    const sticky = document.getElementById('sticky');
    if (sticky) {
      const onScroll = () => sticky.classList.toggle('show', window.scrollY > window.innerHeight * .6);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    // Form input restrictions
    const nameInput = document.querySelector('input[name="name"]');
    const phoneInput = document.querySelector('input[name="phone"]');
    if (nameInput) {
      nameInput.addEventListener('keydown', e => {
        const key = e.key;
        const allowed = key.length > 1 || /^[A-Za-z\s]$/.test(key);
        if (!allowed) e.preventDefault();
      });
      nameInput.addEventListener('input', () => {
        nameInput.value = nameInput.value.replace(/[^A-Za-z\s]/g, '');
      });
    }
    if (phoneInput) {
      phoneInput.addEventListener('keydown', e => {
        const key = e.key;
        const allowed = key.length > 1 || /^[\d\+\-\s]$/.test(key);
        if (!allowed) e.preventDefault();
      });
      phoneInput.addEventListener('input', () => {
        phoneInput.value = phoneInput.value.replace(/[^\d\+\-\s]/g, '');
      });
    }

    // Form
    const form = document.getElementById('admForm');
    if (form) {
      form.addEventListener('submit', async e => {
        e.preventDefault();
        const btn = form.querySelector('.submit');
        const originalLabel = btn.querySelector('.sbl').textContent;
        const originalIcon = btn.querySelector('.sbr').innerHTML;

        // Loading state
        btn.disabled = true;
        btn.querySelector('.sbl').textContent = 'Sending…';

        const fd = new FormData(form);
        const params = new URLSearchParams();
        params.append('name', fd.get('name') || '');
        params.append('phone', fd.get('phone') || '');
        params.append('intent', form.querySelector('input[name="intent"]:checked')?.value || '');
        params.append('message', fd.get('message') || '');
        params.append('source', location.pathname + location.search);

        try {
          if (!FORM_ENDPOINT) throw new Error('FORM_ENDPOINT not configured');
          const res = await fetch(FORM_ENDPOINT, { method: 'POST', body: params });
          const json = await res.json().catch(() => ({}));

          if (json.success !== false) {
            btn.querySelector('.sbl').textContent = "Received. We'll be in touch.";
            btn.querySelector('.sbr').innerHTML = '<svg width="18" height="14" viewBox="0 0 24 18" fill="none"><path d="M2 9L9 16L22 2" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
            form.reset();
          } else {
            throw new Error(json.error || 'Server error');
          }
        } catch (err) {
          // Revert button so user can retry
          btn.disabled = false;
          btn.querySelector('.sbl').textContent = 'Send failed — try again';
          btn.querySelector('.sbr').innerHTML = '<svg width="18" height="12" viewBox="0 0 24 16" fill="none" aria-hidden="true"><path d="M2 8H22M22 8L16 2M22 8L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
          console.error('Form submit error:', err);
        }
      });
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', ev => {
        const el = document.querySelector(a.getAttribute('href'));
        if (el) { ev.preventDefault(); window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' }); }
      });
    });

    // Ticker marquee — wrap items in animated track and duplicate for seamless loop
    const ticker = document.querySelector('.hero-ticker');
    if (ticker) {
      const track = document.createElement('div');
      track.className = 'ticker-track';
      while (ticker.firstChild) track.appendChild(ticker.firstChild);
      // Duplicate children for seamless infinite scroll
      const clone = track.cloneNode(true);
      ticker.appendChild(track);
      ticker.appendChild(clone);
    }

    // Image fade-in — fire .loaded once each image is decoded
    document.querySelectorAll('img').forEach(img => {
      const markLoaded = () => img.classList.add('loaded');
      if (img.complete && img.naturalWidth) markLoaded();
      else img.addEventListener('load', markLoaded);
    });
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', inject)
    : inject();
})();
