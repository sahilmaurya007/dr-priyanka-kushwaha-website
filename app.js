/* ============================================================
   RENDERER (app.js) — Dr. Priyanka Kushwaha website.
   Content data1/data2/data3.js se aata hai.
   ============================================================ */
(function () {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

  $("menuBtn").addEventListener("click", () => $("navLinks").classList.toggle("open"));
  document.querySelectorAll("#navLinks a").forEach(a =>
    a.addEventListener("click", () => $("navLinks").classList.remove("open")));

  /* theme: light / night toggle */
  const setTheme = (t) => {
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem("pk-theme", t); } catch (e) {}
    $("themeBtn").textContent = t === "night" ? "☀️" : "🌙";
    let st = document.getElementById("nightStyle");
    if (t === "night") {
      if (!st) {
        st = document.createElement("style");
        st.id = "nightStyle";
        document.head.appendChild(st);
      }
      st.textContent = ":root{--bg:#12131a;--bg2:#181a24;--card:#1d2030;--soft:#262a3d;--text:#e8eaf3;--muted:#9aa0b5;--border:#2c3046;--shadow:0 6px 22px rgba(0,0,0,.35)}";
    } else if (st) {
      st.remove();
    }
  };
  let curTheme = "light";
  try { curTheme = localStorage.getItem("pk-theme") || "light"; } catch (e) {}
  setTheme(curTheme);
  $("themeBtn").addEventListener("click", () => setTheme(curTheme === "night" ? "light" : "night"));

  $("heroKicker").textContent = PROFILE.kicker;
  $("heroName").textContent = PROFILE.name;
  $("heroIntro").textContent = PROFILE.intro;
  $("heroTags").innerHTML = PROFILE.tagline.split(" · ").map(t =>
    `<span class="chip">${esc(t)}</span>`).join("");

  const linkedin = (PROFILE.links || []).find(l => /linkedin/i.test(l.label) && l.url);
  if (linkedin) $("heroLinkedInBtn").href = linkedin.url;
  else $("heroLinkedInBtn").style.display = "none";

  const mail = PROFILE.email || PROFILE.emailAlt;
  if (mail) {
    $("heroMailBtn").style.display = "";
    $("heroMailBtn").href = "mailto:" + mail;
  }

  const photo = $("heroPhoto");
  photo.alt = PROFILE.name;
  photo.addEventListener("error", () => {
    photo.style.display = "none";
    $("photoFallback").style.display = "grid";
  });

  $("aboutBody").innerHTML = ABOUT.map(p => `<p style="margin-bottom:14px">${esc(p)}</p>`).join("");
  $("interestsRow").innerHTML = RESEARCH_INTERESTS.map(t =>
    `<span class="pill">${esc(t)}</span>`).join("");

  $("labCard").innerHTML = `
    <h3 style="margin-bottom:12px">Quick info</h3>
    ${mail ? `<div style="margin-bottom:8px;font-size:.86rem"><span class="muted">Email:</span><br><a href="mailto:${esc(mail)}">${esc(mail)}</a></div>` : ""}
    <div style="margin-bottom:8px;font-size:.86rem"><span class="muted">Location:</span><br>${esc(PROFILE.currentAddress)}</div>
    ${PROFILE.inLabSince ? `<div style="margin-bottom:8px;font-size:.86rem"><span class="muted">Since:</span><br>${esc(PROFILE.inLabSince)}</div>` : ""}
    ${(PROFILE.links || []).filter(l => l.url).length ? `<div style="font-size:.86rem"><span class="muted">Connect:</span><br>${PROFILE.links.filter(l => l.url).map(l =>
      `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join(" · ")}</div>` : ""}
  `;

  const linkIco = (label) => {
    const l = String(label || "").toLowerCase();
    if (/scholar/.test(l))  return "🎓";
    if (/linkedin/.test(l)) return "💼";
    if (/researchgate/.test(l)) return "🧪";
    if (/music/.test(l))    return "🎵";
    if (/youtube/.test(l))  return "▶️";
    if (/github/.test(l))   return "🐙";
    if (/orcid/.test(l))    return "🆔";
    return "🔗";
  };
  const linkPills = (PROFILE.links || []).filter(l => l.url).map(l =>
    `<a class="con-pill" href="${esc(l.url)}" target="_blank" rel="noopener">` +
    `<span class="con-pill-ico">${linkIco(l.label)}</span>${esc(l.label)}</a>`).join("");

  const mapEmbed = `
    <div class="loc-map">
      <iframe class="loc-map-iframe"
        src="https://www.google.com/maps?q=University+of+KwaZulu-Natal,+Durban,+South+Africa&output=embed"
        title="Map — University of KwaZulu-Natal, Durban"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        allowfullscreen></iframe>
      <div class="loc-map-cap">
        <span class="loc-map-t">University of KwaZulu-Natal, Durban</span>
        <a class="loc-map-link" href="https://www.google.com/maps?q=University+of+KwaZulu-Natal,+Durban,+South+Africa"
          target="_blank" rel="noopener">Open in Google Maps ↗</a>
      </div>
    </div>`;

  const contacts = [
    mail ? { lab: "Email", ico: "✉️", html: `<a href="mailto:${esc(mail)}">${esc(mail)}</a>` } : null,
    { lab: "Current Address", ico: "🏛️", html: esc(PROFILE.currentAddress) },
    { lab: "Home", ico: "🏠", html: esc(PROFILE.address) },
    linkPills ? { lab: "Connect", ico: "🔗", html: linkPills } : null,
    { lab: "Location", ico: "📍", html: mapEmbed },
  ].filter(Boolean);
  $("contactGrid").innerHTML = contacts.map(c => `
    <div class="contact-item"><span class="ico">${c.ico}</span>
      <span><span class="lab">${esc(c.lab)}</span><br>${c.html}</span>
    </div>`).join("");

  $("eduGrid").innerHTML = EDUCATION.map(e => `
    <article class="card">
      <h3><span class="edu-inst">${esc(e.institute)}</span></h3>
      <p class="muted">${esc(e.degree)}${e.period ? " · " + esc(e.period) : ""}</p>
      ${e.score ? `<span class="edu-score">${esc(e.score)}</span>` : ""}
      ${e.note ? `<p class="note">${esc(e.note)}</p>` : ""}
    </article>`).join("");

  $("pubList").innerHTML = PUBLICATIONS.map((p, i) => {
    const links = [];
    if (p.doi)  links.push(`<a class="btn-sm" href="${esc(p.doi)}" target="_blank" rel="noopener">DOI</a>`);
    if (p.link) links.push(`<a class="btn-sm" href="${esc(p.link)}" target="_blank" rel="noopener">Link</a>`);
    if (p.pdf)  links.push(`<a class="btn-sm" href="${esc(p.pdf)}" target="_blank" rel="noopener">PDF</a>`);
    const tags = (p.tags || []).map(t => `<span class="tag">${esc(t)}</span>`).join("");
    return `
    <article class="card">
      <span class="pub-no">[${PUBLICATIONS.length - i}] · ${esc(p.type || "")} · ${esc(p.year)}</span>
      <h3 class="pub-title">${esc(p.title)}</h3>
      <p class="pub-meta">${esc(p.authors)} · <em>${esc(p.venue)}</em>, ${esc(p.year)}</p>
      ${p.note ? `<p class="note">${esc(p.note)}</p>` : ""}
      ${links.length ? `<div class="btn-row" style="margin-top:12px">${links.join("")}</div>` : ""}
      ${tags ? `<div class="tag-row">${tags}</div>` : ""}
    </article>`;
  }).join("");

  $("projGrid").innerHTML = PROJECTS.map(p => `
    <article class="card">
      <h3>${esc(p.title)}</h3>
      <p class="muted" style="font-size:.85rem">${esc(p.area)}</p>
      <p class="note">${esc(p.note)}</p>
    </article>`).join("");

  $("tlList").innerHTML = (JOURNEY || []).map(j => `
    <div class="tl-item">
      <span class="tl-dot"></span>
      <span class="tl-date">${esc(j.date)}</span>
      <div class="tl-card">
        ${j.cat ? `<span class="tl-cat">${esc(j.cat)}</span>` : ""}
        <h3>${esc(j.title)}</h3>
        <p>${esc(j.text)}</p>
      </div>
    </div>`).join("");

  $("skillsGrid").innerHTML = SKILLS.map(s => `
    <div class="card skill-cat">
      <h3>${esc(s.category)}</h3>
      <div class="pill-row">${s.items.map(t => `<span class="pill">${esc(t)}</span>`).join("")}</div>
    </div>`).join("");

  $("awardGrid").innerHTML = (AWARDS || []).map(a => `
    <article class="card">
      <h3>${esc(a.title)}</h3>
      <p class="muted">${esc(a.issuer)}</p>
      ${a.date ? `<span class="edu-score">${esc(a.date)}</span>` : ""}
      ${a.note ? `<p class="note">${esc(a.note)}</p>` : ""}
    </article>`).join("");

  const gal = (items) => (items || []).map(g => {
    const cap = g.src
      ? `<figcaption class="gal-cap">${esc(g.caption)}</figcaption>`
      : `<span class="muted">${esc(g.caption)}</span>`;
    const img = g.src
      ? `<div class="gal-media"><img loading="lazy" src="${esc(g.src)}" alt="${esc(g.caption)}"></div>` : "";
    return `<figure class="gal-item${g.src ? "" : " noimg"}">${img}${cap}</figure>`;
  }).join("");
  $("photoGal").innerHTML = gal(PHOTO_GALLERY);
  document.querySelectorAll("#photoGal img").forEach(img =>
    img.addEventListener("error", () => img.closest("figure").classList.add("noimg")));

  let activeCat = GALLERY_CATEGORIES.length ? GALLERY_CATEGORIES[0].name : "";
  const renderCatTabs = () => {
    $("catTabs").innerHTML = GALLERY_CATEGORIES.map(c =>
      `<button class="pill" data-name="${esc(c.name)}" style="cursor:pointer;background:${c.name === activeCat ? "var(--grad-btn)" : "var(--soft)"};color:${c.name === activeCat ? "#fff" : "var(--muted)"}">${esc(c.name)}</button>`).join(" ");
    document.querySelectorAll("#catTabs .pill").forEach(t =>
      t.addEventListener("click", () => { activeCat = t.dataset.name; renderCatTabs(); renderCatGal(); }));
  };
  const renderCatGal = () => {
    const cat = GALLERY_CATEGORIES.find(c => c.name === activeCat);
    if (!cat || !cat.photos.length) { $("catGal").innerHTML = ""; return; }
    $("catGal").innerHTML = gal(cat.photos);
    document.querySelectorAll("#catGal img").forEach(img =>
      img.addEventListener("error", () => img.closest("figure").classList.add("noimg")));
  };
  renderCatTabs();
  renderCatGal();

  $("refGrid").innerHTML = REFERENCES.map(r => `
    <article class="card">
      <h3>${esc(r.name)}</h3>
      <p class="muted">${esc(r.role)}</p>
    </article>`).join("");

  $("quoteText").textContent = QUOTE.text;
  $("quoteBy").textContent = QUOTE.by;

  const mapQ = encodeURIComponent("University of KwaZulu-Natal, Durban, South Africa");
  $("footAddr").innerHTML =
    `${esc(PROFILE.currentAddress)}<br>` +
    `<a class="foot-loc" href="https://www.google.com/maps?q=${mapQ}" target="_blank" rel="noopener">` +
    `📍 UKZN, Durban, South Africa ↗</a>`;
  $("footLinks").innerHTML = (PROFILE.links || []).filter(l => l.url).map(l =>
    `<li><a href="${esc(l.url)}" target="_blank" rel="noopener">${linkIco(l.label)} ${esc(l.label)}</a></li>`).join("");
  $("footCopy").textContent = SITE.footerNote;
  $("footUpd").textContent = "Last updated: " + SITE.lastUpdated;

  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("on"); io.unobserve(en.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
})();
