/* =========================================================
   Personal website — zdenek.dev
   ========================================================= */

/* ---------- Tweaks defaults (mirror of index.html block) ---------- */
const ACCENTS = {
  cyan:   { accent: "#00ffd1", accent2: "#7c3aed", glow: "0 0 24px rgba(0,255,209,0.35)" },
  violet: { accent: "#b78aff", accent2: "#00ffd1", glow: "0 0 24px rgba(183,138,255,0.35)" },
  amber:  { accent: "#ffb020", accent2: "#ff5577", glow: "0 0 24px rgba(255,176,32,0.35)" },
  lime:   { accent: "#a4ff4d", accent2: "#22d3ee", glow: "0 0 24px rgba(164,255,77,0.35)" },
  rose:   { accent: "#ff5f8a", accent2: "#7c3aed", glow: "0 0 24px rgba(255,95,138,0.35)" },
};
const ACCENT_ORDER = ["cyan", "violet", "amber", "lime", "rose"];

let tweaks = { ...(window.TWEAK_DEFAULTS || { theme: "dark", fx: "on", accent: "cyan", lang: "en" }) };
try {
  const saved = JSON.parse(localStorage.getItem("tweaks") || "null");
  if (saved) tweaks = { ...tweaks, ...saved };
} catch(e) {}

/* ---------- Translations ---------- */
const translations = {
  en: {
    "nav.about": "// about",
    "nav.stack": "// stack",
    "nav.work": "// work",
    "nav.services": "// services",
    "nav.experience": "// experience",
    "nav.contact": "// contact",
    "availability.prefix": "AVAILABLE",
    "hero.online": "ONLINE",
    "hero.location": "PRAGUE, CZ",
    "hero.h1": `Building <span class="accent">fast</span>,<br /> thoughtful <span class="strike">websites</span> <span>software</span><br /> for the modern web.`,
    "hero.intro": `<strong>Zdeněk Němec</strong> — software developer focused on web apps, marketing sites &amp; e-commerce. I ship production-grade systems end-to-end, from database schema to the last pixel.`,
    "btn.portfolio": "View portfolio",
    "btn.project": "Start a project",
    "clock.suffix": "LOCAL",
    "about.tag": "// 01 — about",
    "about.title": "Ten years of<br />shipping the web.",
    "about.lead": `I design and build the <em>full stack</em> — from Next.js frontends and Shopify storefronts to Node &amp; Laravel APIs and database schemas that actually scale.`,
    "about.body_1": "Self-taught, detail-obsessed, and pragmatic. I care about performance budgets, accessibility defaults, and shipping features that survive the first real week of traffic. No framework churn, no buzzword soup — just the right tool per problem.",
    "about.body_2": "I've built everything from small landing pages to multi-tenant SaaS dashboards and e-commerce platforms moving real money. I work with founders, agencies, and in-house teams as a solo contractor or embedded engineer.",
    "stat.1.k": "Years shipping",
    "stat.1.meta": "since 2022",
    "stat.2.k": "Projects delivered",
    "stat.2.meta": "commercial &amp; internal",
    "stat.3.k": "Production stacks",
    "stat.3.meta": "languages + frameworks",
    "stat.4.k": "Uptime, flagship",
    "stat.4.meta": "rolling 12mo",
    "skills.tag": "// 02 — stack",
    "skills.title": "Tooling,<br />categorized.",
    "work.tag": "// 03 — selected work",
    "work.title": "Recent<br />projects.",
    "services.tag": "// 04 — services",
    "services.title": "How I<br />can help.",
    "service.1.title": "Web applications",
    "service.1.desc": "Full-stack SaaS, dashboards, internal tools. Auth, billing, realtime, background jobs — wired end-to-end.",
    "service.2.title": "Marketing sites",
    "service.2.desc": "Fast, CMS-driven sites that score 100 on Lighthouse and actually convert. SEO done properly.",
    "service.3.title": "E-commerce",
    "service.3.desc": "Shopify Plus storefronts, custom checkouts, or from-scratch e-shops with payment + fulfilment integrations.",
    "experience.tag": "// 05 — experience",
    "experience.title": "Work<br />history.",
    "contact.tag": "// 06 — contact",
    "contact.title": "Let's build<br />something.",
    "contact.lead": `Have a project in mind? I'm currently taking on <em>new engagements</em>. Short consults, fixed-scope builds, or embedded retainers.`,
    "contact.k.email": "Email",
    "contact.k.github": "GitHub",
    "contact.k.linkedin": "LinkedIn",
    "contact.k.based": "Based in",
    "contact.v.based": "Brno, Czech Republic",
    "contact.k.working": "Working",
    "contact.v.working": "Remote · EU / US hours",
    "form.name": "Name",
    "form.name_ph": "John Doe",
    "form.email": "Email",
    "form.email_ph": "johndoe@gmail.com",
    "form.type": "Project type",
    "form.opt.web": "Web application",
    "form.opt.marketing": "Marketing site",
    "form.opt.ecomm": "E-commerce",
    "form.opt.design": "Design & Graphics",
    "form.opt.updates": "Updates & Ongoing support",
    "form.opt.other": "Something else",
    "form.brief": "Brief",
    "form.brief_ph": "a few lines about scope, timeline, stack...",
    "form.submit": "Transmit",
    "form.sent": "// message transmitted — I'll reply within 24h.",
    "footer.crafted": "Crafted with care in Brno",
    "tweaks.title": "// Tweaks",
    "tweaks.theme": "Theme",
    "tweaks.theme.dark": "Dark",
    "tweaks.theme.light": "Light",
    "tweaks.fx": "Background FX",
    "tweaks.fx.on": "On",
    "tweaks.fx.off": "Off",
    "tweaks.accent": "Accent",
    "tweaks.lang": "Language",
    "tweaks.trigger": "TWEAKS",
    "proj.view": "view project",
  },
  cs: {
    "nav.about": "// o mně",
    "nav.stack": "// stack",
    "nav.work": "// projekty",
    "nav.services": "// služby",
    "nav.experience": "// zkušenosti",
    "nav.contact": "// kontakt",
    "availability.prefix": "DOSTUPNÝ",
    "hero.online": "ONLINE",
    "hero.location": "PRAHA, CZ",
    "hero.h1": `Tvořím <span class="accent">rychlé</span>,<br /> promyšlené <span class="strike">weby</span> <span>webové aplikace</span>.`,
    "hero.intro": `<strong>Zdeněk Němec</strong> — softwarový vývojář zaměřený na webové aplikace, marketingové weby &amp; e-commerce. Dodávám komplexní řešení od návrhu databáze až po poslední pixel na frontendu.`,
    "btn.portfolio": "Zobrazit portfolio",
    "btn.project": "Začít projekt",
    "clock.suffix": "MÍSTNÍ",
    "about.tag": "// 01 — o mně",
    "about.title": "Několik let<br />vývoje webů.",
    "about.lead": `Navrhuji a programuji <em>full-stack</em> — od Next.js frontendů a Shopify e-shopů přes Node a Laravel API až po databáze, které reálně zvládnou zátěž.`,
    "about.body_1": "Samouk, co si potrpí na detaily a zdravý rozum. Záleží mi na výkonu, přístupnosti a na tom, aby appka nespadla hned po prvním náporu návštěvníků. Nehoním se za každým novým frameworkem a vynechávám buzzwordy — beru prostě nástroj, co dává pro daný problém smysl.",
    "about.body_2": "Vytvořil jsem všechno od menších landing pages po multi-tenant SaaS dashboardy a e-commerce platformy, přes které tečou reálné peníze. Spolupracuji se zakladateli firem, agenturami i in-house týmy – ať už jako nezávislý dodavatel nebo externí posila.",
    "stat.1.k": "Let vývoje",
    "stat.1.meta": "od roku 2022",
    "stat.2.k": "Dodaných projektů",
    "stat.2.meta": "komerční &amp; interní",
    "stat.3.k": "Produkčních stacků",
    "stat.3.meta": "jazyky + frameworky",
    "stat.4.k": "Uptime",
    "stat.4.meta": "za posledních 12 měsíců",
    "skills.tag": "// 02 — stack",
    "skills.title": "Nástroje,<br />přehledně.",
    "work.tag": "// 03 — vybrané projekty",
    "work.title": "Nedávné<br />projekty.",
    "services.tag": "// 04 — služby",
    "services.title": "S čím vám<br />pomůžu.",
    "service.1.title": "Webové aplikace",
    "service.1.desc": "Full-stack SaaS, dashboardy, interní nástroje. Autentizace, platby, realtime funkce a úlohy na pozadí — vše odladěné a propojené.",
    "service.2.title": "Marketingové weby",
    "service.2.desc": "Bleskově rychlé weby s CMS, které mají stovku v Lighthouse a skutečně prodávají. Se správně vyřešeným SEO.",
    "service.3.title": "E-commerce",
    "service.3.desc": "Shopify Plus storefronty, custom checkouty, nebo e-shopy od nuly s integracemi plateb a logistiky.",
    "experience.tag": "// 05 — zkušenosti",
    "experience.title": "Pracovní<br />historie.",
    "contact.tag": "// 06 — kontakt",
    "contact.title": "Máte projekt?<br />Ozvěte se.",
    "contact.lead": `Máte nápad na projekt? Aktuálně nabírám <em>nové klienty</em>. Rád pomůžu s krátkou konzultací, uceleným projektem nebo i dlouhodobou spoluprací.`,
    "contact.k.email": "Email",
    "contact.k.github": "GitHub",
    "contact.k.linkedin": "LinkedIn",
    "contact.k.based": "Lokace",
    "contact.v.based": "Brno, Česká republika",
    "contact.k.working": "Režim",
    "contact.v.working": "Remote · EU / US časové zóny",
    "form.name": "Jméno",
    "form.name_ph": "Jan Novák",
    "form.email": "Email",
    "form.email_ph": "jannovak@gmail.com",
    "form.type": "Typ projektu",
    "form.opt.web": "Webová aplikace",
    "form.opt.marketing": "Marketingový web",
    "form.opt.ecomm": "E-commerce",
    "form.opt.design": "Design & Grafika",
    "form.opt.updates": "Údržba & Podpora",
    "form.opt.other": "Něco jiného",
    "form.brief": "Popis",
    "form.brief_ph": "pár vět o rozsahu, termínech, technologiích...",
    "form.submit": "Odeslat zprávu",
    "form.sent": "// zpráva odeslána — ozvu se do 24 hodin.",
    "footer.crafted": "Vytvořeno s péčí v Brně",
    "tweaks.title": "// Nastavení",
    "tweaks.theme": "Vzhled",
    "tweaks.theme.dark": "Tmavý",
    "tweaks.theme.light": "Světlý",
    "tweaks.fx": "Efekty na pozadí",
    "tweaks.fx.on": "Zapnuto",
    "tweaks.fx.off": "Vypnuto",
    "tweaks.accent": "Akcent",
    "tweaks.lang": "Jazyk",
    "tweaks.trigger": "NASTAVENÍ",
    "proj.view": "zobrazit projekt",
  },
};

function tr(key) {
  const lang = translations[tweaks.lang] ? tweaks.lang : "en";
  return translations[lang][key] ?? translations.en[key] ?? key;
}

function trField(obj, field) {
  const lang = translations[tweaks.lang] ? tweaks.lang : "en";
  const locKey = `${field}_${lang}`;
  return (lang !== "en" && obj[locKey] !== undefined) ? obj[locKey] : obj[field];
}

function applyLanguage() {
  const lang = translations[tweaks.lang] ? tweaks.lang : "en";
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const val = tr(el.getAttribute("data-i18n"));
    if (val !== undefined) el.textContent = val;
  });
  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    const val = tr(el.getAttribute("data-i18n-html"));
    if (val !== undefined) el.innerHTML = val;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const val = tr(el.getAttribute("data-i18n-placeholder"));
    if (val !== undefined) el.placeholder = val;
  });
  // refresh dynamic labels (availability + UTC) tied to language
  const avail = document.getElementById("availability");
  if (avail && typeof availabilityLabel === "function") avail.textContent = availabilityLabel();
  // re-render dynamically generated sections so translated content shows
  // guard: only after initial render (projects/experience consts are not yet initialized on first applyTweaks call)
  if (typeof renderPortfolio === "function" && document.querySelector("#portfolio .project")) renderPortfolio();
  if (typeof renderTimeline === "function" && document.querySelector("#timeline .tl-row")) renderTimeline();
}

/* ---------- UTC offset for Europe/Prague (DST-aware) ---------- */
function pragueOffset() {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Prague",
      timeZoneName: "shortOffset",
    }).formatToParts(new Date());
    const tz = parts.find(p => p.type === "timeZoneName");
    if (tz && tz.value) return tz.value.replace("GMT", "UTC");
  } catch {}
  return "UTC+1";
}

function updateFavicon(accentColor) {
  const bg = tweaks.theme === "light" ? "#f5f4ef" : "#0a0a0f";
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='${bg}' rx='8'/><rect x='8' y='8' width='48' height='48' fill='none' stroke='${accentColor}' stroke-width='2' rx='2'/><text x='32' y='41' text-anchor='middle' font-family='ui-monospace,monospace' font-size='22' font-weight='600' fill='${accentColor}' letter-spacing='1'>ZN</text></svg>`;
  const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  let link = document.querySelector("link[rel='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.type = "image/svg+xml";
  link.href = url;
}

function applyTweaks() {
  document.documentElement.classList.toggle("light", tweaks.theme === "light");
  document.documentElement.classList.toggle("fx-off", tweaks.fx === "off");
  const a = ACCENTS[tweaks.accent] || ACCENTS.cyan;
  document.documentElement.style.setProperty("--accent", a.accent);
  document.documentElement.style.setProperty("--accent-2", a.accent2);
  document.documentElement.style.setProperty("--accent-glow", a.glow);
  updateFavicon(a.accent);
  applyLanguage();
  localStorage.setItem("tweaks", JSON.stringify(tweaks));
}
applyTweaks();

/* ---------- Dynamic date labels ---------- */
function currentQuarter(d = new Date()) { return Math.floor(d.getMonth() / 3) + 1; }
function availabilityLabel(d = new Date()) {
  const q = currentQuarter(d);
  const yy = String(d.getFullYear()).slice(-2);
  const prefix = tr("availability.prefix") || "AVAILABLE";
  return `${prefix} Q${q} '${yy}`;
}
function engagementRange(d = new Date()) {
  const q = currentQuarter(d);
  const y = d.getFullYear();
  if (q === 4) return `Q4 ${y} – Q1 ${y + 1}`;
  return `Q${q}–Q${q + 1} ${y}`;
}
function buildStamp(d = new Date()) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}.${mm}.${dd}`;
}

(function initDynamicText() {
  const d = new Date();
  const avail = document.getElementById("availability");
  if (avail) avail.textContent = availabilityLabel(d);
  const build = document.getElementById("build");
  if (build) build.textContent = `build ${buildStamp(d)}`;
  const year = document.getElementById("year");
  if (year) year.textContent = String(d.getFullYear());
  const utc = document.getElementById("utc-offset");
  if (utc) utc.textContent = pragueOffset();
})();

/* ---------- Custom cursor ---------- */
const ring = document.getElementById("cursorRing");
const dot = document.getElementById("cursorDot");
let mx = innerWidth/2, my = innerHeight/2, rx = mx, ry = my;
addEventListener("mousemove", (e) => {
  mx = e.clientX; my = e.clientY;
  dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
});
function animCursor() {
  rx += (mx - rx) * 0.18;
  ry += (my - ry) * 0.18;
  ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
  requestAnimationFrame(animCursor);
}
animCursor();
document.addEventListener("mouseover", (e) => {
  if (e.target.closest("[data-hover], a, button, input, textarea, select, .project")) {
    ring.classList.add("hover");
  }
});
document.addEventListener("mouseout", (e) => {
  if (e.target.closest("[data-hover], a, button, input, textarea, select, .project")) {
    ring.classList.remove("hover");
  }
});

/* ---------- Starfield ---------- */
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let dpr = Math.min(devicePixelRatio || 1, 2);
let stars = [];
function resizeCanvas() {
  dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  canvas.style.width = innerWidth + "px";
  canvas.style.height = innerHeight + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const count = Math.floor((innerWidth * innerHeight) / 9000);
  stars = new Array(count).fill(0).map(() => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    z: Math.random() * 0.8 + 0.2,
    r: Math.random() * 1.2 + 0.2,
    tw: Math.random() * Math.PI * 2,
    vx: (Math.random() - 0.5) * 0.05,
    vy: (Math.random() - 0.5) * 0.05,
  }));
}
resizeCanvas();
addEventListener("resize", resizeCanvas);

let t = 0;
function drawStars() {
  t += 0.016;
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#00ffd1";
  for (const s of stars) {
    s.x += s.vx * s.z;
    s.y += s.vy * s.z;
    if (s.x < 0) s.x = innerWidth;
    if (s.x > innerWidth) s.x = 0;
    if (s.y < 0) s.y = innerHeight;
    if (s.y > innerHeight) s.y = 0;
    const a = 0.4 + Math.sin(t * 1.5 + s.tw) * 0.3;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r * s.z, 0, Math.PI * 2);
    ctx.fillStyle = s.z > 0.85 ? accent : `rgba(240,240,240,${a * s.z})`;
    ctx.globalAlpha = s.z > 0.85 ? a * 0.7 : 1;
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(drawStars);
}
drawStars();

/* ---------- Clock ---------- */
function tickClock() {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2,"0");
  const mm = String(d.getMinutes()).padStart(2,"0");
  const ss = String(d.getSeconds()).padStart(2,"0");
  const el = document.getElementById("clock");
  const suffix = tr("clock.suffix") || "LOCAL";
  if (el) el.textContent = `${hh}:${mm}:${ss} ${suffix}`;
}
setInterval(tickClock, 1000); tickClock();

/* ---------- Terminal typing ---------- */
const termLines = [
  { t: `<span class="comment"># boot sequence initialized</span>` },
  { t: `<span class="prompt">$</span> whoami` },
  { t: `zdenek_nemec <span class="comment">// software developer · brno, cz</span>` },
  { t: `<span class="prompt">$</span> cat stack.json` },
  { t: `{` },
  { t: `  <span class="str">"frontend"</span>: [<span class="str">"next.js"</span>, <span class="str">"react"</span>, <span class="str">"svelte"</span>, <span class="str">"vue.js"</span>, <span class="str">"angular"</span>],`, indent: 15 },
  { t: `  <span class="str">"backend"</span>:  [<span class="str">"node"</span>, <span class="str">"laravel"</span>, <span class="str">"python"</span>, <span class="str">"java"</span>],`, indent: 15 },
  { t: `  <span class="str">"commerce"</span>: [<span class="str">"shopify"</span>, <span class="str">"stripe"</span>]`, indent: 15 },
  { t: `}` },
  { t: `<span class="prompt">$</span> <span class="kw">run</span> <span class="str">"./open_to_work.sh"</span>` },
  { t: `<span class="comment">→ accepting new engagements for ${engagementRange()}</span>`, final: true },
];

function runTerminal() {
  const body = document.getElementById("termBody");
  if (!body) return;
  body.innerHTML = "";
  let li = 0;
  function nextLine() {
    if (li >= termLines.length) return;
    const line = termLines[li];
    const el = document.createElement("div");
    el.className = "term-line";
    if (line.indent) {
      el.classList.add("indent");
      el.style.setProperty("--indent", `${line.indent}ch`);
    }
    body.appendChild(el);
    // Strip HTML for char-by-char, but re-insert final HTML after.
    const tmp = document.createElement("div");
    tmp.innerHTML = line.t;
    const txt = tmp.textContent;
    let ci = 0;
    const isComment = /^#|^→/.test(txt);
    function step() {
      if (ci < txt.length) {
        ci += Math.max(1, Math.round(txt.length / 28));
        el.textContent = txt.slice(0, ci);
        setTimeout(step, 8);
      } else {
        el.innerHTML = line.t;
        if (li === termLines.length - 1) el.classList.add("cursor-blink");
        li++;
        setTimeout(nextLine, isComment ? 240 : 160);
      }
    }
    step();
  }
  nextLine();
}
runTerminal();

/* ---------- Skills ---------- */
const skills = {
  "frontend": [
    { n: "Next.js", l: 5 }, { n: "React", l: 5 }, { n: "TypeScript", l: 5 },
    { n: "Tailwind", l: 5 }, { n: "Svelte", l: 4 }, { n: "Vue.js", l: 4 },
    { n: "Angular", l: 5 }, { n: "HTML / CSS", l: 5 },
  ],
  "backend": [
    { n: "Node.js", l: 4 }, { n: "Laravel", l: 4 }, { n: "Python", l: 4 },
    { n: "Java", l: 4 }, { n: "C#", l: 3 }, { n: "C / C++", l: 3 },
    { n: "REST / GraphQL", l: 4 }, { n: "WebSockets", l: 4 },
  ],
  "data / infra": [
    { n: "Postgres", l: 4 }, { n: "Supabase", l: 5 }, { n: "Firebase", l: 5 },
    { n: "Vercel", l: 5 }, { n: "Docker", l: 4 },
    { n: "CI/CD", l: 3 },
  ],
  "commerce": [
    { n: "Shopify", l: 4 }, { n: "Hydrogen", l: 4 }, { n: "Stripe", l: 4 },
    { n: "GoPay", l: 4 }, { n: "WooCommerce", l: 3 },
  ],
  "craft": [
    { n: "Perf budgets", l: 4 }, { n: "Accessibility", l: 4 },
    { n: "Motion design", l: 4 }, { n: "SEO", l: 4 }, { n: "Design systems", l: 4 },
  ],
};
const skillCats = Object.keys(skills);

function renderSkills() {
  const wrap = document.getElementById("skillsWrap");
  wrap.innerHTML = `
    <div class="skills-cats" id="skillsCats">
      ${skillCats.map((c, i) => `<button data-cat="${c}" class="${i===0?"active":""}">${c}</button>`).join("")}
    </div>
    <div class="skills-list" id="skillsList"></div>
  `;
  function paint(cat) {
    const list = document.getElementById("skillsList");
    list.innerHTML = skills[cat].map(s => `
      <div class="skill">
        <span>${s.n}</span>
        <span class="lvl">${[1,2,3,4,5].map(n => `<i class="${n<=s.l?"on":""}"></i>`).join("")}</span>
      </div>
    `).join("");
  }
  paint(skillCats[0]);
  document.querySelectorAll("#skillsCats button").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#skillsCats button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      paint(btn.dataset.cat);
    });
  });
}
renderSkills();

/* ---------- Portfolio ---------- */
const projects = [
  {
    title: "Nbeauty Care",
    type: "business website",
    type_cs: "prezentační web",
    year: "2026",
    wide: true,
    url: "https://www.nbeautycare.cz/",
    desc: "Info website for a beauty salon in OC Rozkvět, Brno. Next.js 16 App Router with Tailwind v4, 55 services across 9 categories, Framer Motion animations, and direct integration with the Reservio booking system.",
    desc_cs: "Prezentační web pro brněnský beauty salon v OC Rozkvět. Postaveno na Next.js 16 (App Router) a Tailwindu v4. Obsahuje 55 služeb v 9 kategoriích, plynulé animace přes Framer Motion a přímou integraci na rezervační systém Reservio.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "Framer Motion", "Vercel"],
    visual: "site",
  },
  {
    title: "PurityX",
    type: "e-shop",
    type_cs: "e-shop",
    year: "2026",
    url: "https://its-time-shop.vercel.app",
    desc: "Custom Czech e-shop for an automotive cosmetics brand. Cart drawer, checkout with bank-transfer payments (SPD QR codes), order tracking page, and Resend-powered transactional emails — built end-to-end solo.",
    desc_cs: "E-shop na míru pro českou značku autokosmetiky. Postranní výsuvný košík, platby převodem s QR kódem, stránka pro sledování stavu objednávky a transakční e-maily přes Resend — vyvinuto kompletně od nuly.",
    stack: ["Next.js 16", "TypeScript", "Supabase", "Zustand", "Tailwind", "Resend"],
    visual: "shop",
  },
  {
    title: "PurityX Admin Panel",
    type: "dashboard",
    type_cs: "administrace",
    year: "2026",
    desc: "Admin dashboard for the PurityX storefront. CRUD for products, categories, and orders with cookie-based auth, shop-settings management, and inline status controls for order fulfilment.",
    desc_cs: "Administrace k e-shopu PurityX. Kompletní CRUD pro produkty, kategorie a objednávky, bezpečné přihlašování, správa nastavení obchodu a rychlé přepínání stavu objednávek přímo z výpisu.",
    stack: ["Next.js 16", "TypeScript", "Supabase", "Tailwind", "Vercel"],
    visual: "dash",
  },
  {
    title: "It's Time",
    type: "business website",
    type_cs: "firemní web",
    year: "2025",
    url: "https://itstime.cz/",
    desc: "Professional presentation website for an auto detailing studio. Features a service showcase, project gallery, and an integrated booking form.",
    desc_cs: "Prezentační web pro autodetailingové studio. Čistý přehled služeb, ukázky realizovaných projektů a integrovaný rezervační formulář.",
    stack: ["Svelte", "Python", "TypeScript", "Tailwind"],
    visual: "site",
  },
  {
    title: "Meta-Grid",
    type: "web app",
    type_cs: "webová aplikace",
    year: "2025",
    desc: "Angular admin table for managing business records with live autocomplete from the Czech ARES registry. Firebase-backed persistence, authenticated access, and search across arbitrary columns.",
    desc_cs: "Administrační rozhraní v Angularu pro správu firemních záznamů s živým našeptávačem napojeným na ARES. Data běží na Firebase, nechybí autentizace a fulltextové vyhledávání napříč všemi sloupci tabulky.",
    stack: ["Angular 20", "TypeScript", "Firebase", "ARES API"],
    visual: "dashboard",
  },
  {
    title: "Colorly",
    type: "design tool",
    type_cs: "designový nástroj",
    year: "2025",
    url: "https://colorly.cloud/",
    desc: "React web app that generates primary, secondary, and semantic color palettes with perceptual-lightness correction — built for designers and devs maintaining consistent design systems.",
    desc_cs: "React appka, která generuje primární, sekundární a sémantické palety s optickou korekcí jasu (perceptual lightness). Šikovná utilita pro vývojáře a designéry, co staví konzistentní design systémy.",
    stack: ["React", "TypeScript", "Tailwind", "CRA"],
    visual: "editor",
  },
  {
    title: "HTML Price Converter",
    type: "desktop utility",
    type_cs: "desktopový nástroj",
    year: "2023",
    desc: "Java desktop GUI that parses uploaded HTML files and automatically converts Czech crown prices to EUR. Built to streamline localization for multi-currency online stores.",
    desc_cs: "Jednoúčelová desktopová appka v Javě, která umí projít nahrané HTML soubory a automaticky v nich přepočítat ceny z CZK na EUR. Super nástroj pro zrychlení lokalizace e-shopů.",
    stack: ["Java", "Swing", "JSoup"],
    visual: "api",
  },
  {
    title: "Twitch Bot",
    type: "bot",
    type_cs: "bot",
    year: "2022",
    desc: "Self-hosted Twitch bot that monitors stream status to automatically join live channels. It simulates viewer engagement with randomized chat messages and emojis, disconnecting once the stream ends.",
    desc_cs: "Self-hosted bot pro Twitch, který hlídá stav vybraných kanálů a po spuštění streamu se do nich automaticky připojí. Simuluje chování reálného diváka (posílá náhodné zprávy i emotikony) a jakmile stream skončí, zase se sám odpojí.",
    stack: ["Typescript", "Twitch IRC", "WebSockets", "@twurple", "pino", "twitch-js", "worker-threads"],
    visual: "api",
  },
];

function projVisual(kind) {
  if (kind === "dashboard") return `
    <div class="vis-dashboard">
      <div class="vis-inner">
        <div class="m">
          <div class="row"><div class="box"><div class="fill" style="width:62%"></div></div><div class="box"><div class="fill" style="width:38%"></div></div><div class="box"><div class="fill" style="width:81%"></div></div></div>
          <div class="row"><div class="box lg" style="flex:2"><svg viewBox="0 0 200 90" preserveAspectRatio="none" style="width:100%;height:100%"><polyline points="0,70 20,55 40,60 60,35 80,45 100,25 120,30 140,15 160,20 180,8 200,15" fill="none" stroke="currentColor" stroke-width="1.2" style="color:var(--accent)"/><polyline points="0,80 20,75 40,72 60,60 80,65 100,50 120,52 140,40 160,42 180,30 200,32" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.5" style="color:var(--accent-2)"/></svg></div></div>
          <div class="row"><div class="box"><div class="fill" style="width:45%"></div></div><div class="box"><div class="fill" style="width:72%"></div></div><div class="box"><div class="fill" style="width:22%"></div></div><div class="box"><div class="fill" style="width:90%"></div></div></div>
        </div>
        <div class="side">
          <div class="tag">fleet_01 · ACTIVE</div>
          <div class="tag">fleet_02 · ACTIVE</div>
          <div class="tag">fleet_03 · IDLE</div>
          <div class="tag">+ 12 units</div>
        </div>
      </div>
    </div>`;
  if (kind === "shop") return `
    <div class="vis-shop">
      <div class="vis-inner">
        <div class="header"><span>HALDEN</span><div class="search"></div><div class="cart"></div></div>
        <div class="grid">
          <div class="item hi"></div><div class="item"></div><div class="item"></div><div class="item"></div>
          <div class="item"></div><div class="item"></div><div class="item hi"></div><div class="item"></div>
          <div class="item"></div><div class="item"></div><div class="item"></div><div class="item"></div>
        </div>
      </div>
    </div>`;
  if (kind === "editor") return `
    <div class="vis-editor">
      <div class="vis-inner">
        <div class="tree">
          <div class="f">▾ pages/</div>
          <div class="f" style="padding-left:10px">home.mdx</div>
          <div class="f on" style="padding-left:10px">about.mdx</div>
          <div class="f" style="padding-left:10px">pricing.mdx</div>
          <div class="f">▸ blocks/</div>
          <div class="f">▸ media/</div>
        </div>
        <div class="code">
          <div class="ln"><span class="n">1</span><span><span class="kw">export</span> <span class="kw">const</span> <span class="fn">Hero</span> = () =&gt; (</span></div>
          <div class="ln"><span class="n">2</span><span>  &lt;<span class="fn">Section</span> tone=<span class="str">"dark"</span>&gt;</span></div>
          <div class="ln"><span class="n">3</span><span>    &lt;<span class="fn">Headline</span>&gt;Build.&lt;/<span class="fn">Headline</span>&gt;</span></div>
          <div class="ln"><span class="n">4</span><span>    &lt;<span class="fn">Cta</span> href=<span class="str">"/start"</span> /&gt;</span></div>
          <div class="ln"><span class="n">5</span><span>  &lt;/<span class="fn">Section</span>&gt;</span></div>
          <div class="ln"><span class="n">6</span><span>)</span></div>
          <div class="ln"><span class="n">7</span><span></span></div>
          <div class="ln"><span class="n">8</span><span><span class="kw">export</span> <span class="kw">default</span> <span class="fn">Hero</span></span></div>
        </div>
      </div>
    </div>`;
  if (kind === "site") return `
    <div class="vis-site">
      <div class="vis-inner">
        <div class="nav"><i class="on"></i><i></i><i></i><i></i></div>
        <div class="body">
          <div class="h">Studio Voltaire — spaces that breathe.</div>
          <div class="l"></div>
          <div class="l short"></div>
          <div class="cta"><span>VIEW WORK →</span><span style="border-color:var(--line-2); color:var(--fg-meta)">CONTACT</span></div>
        </div>
      </div>
    </div>`;
  if (kind === "dash") return `
    <div class="vis-dash">
      <div class="vis-inner">
        <div class="side">
          <div class="pill on"></div><div class="pill"></div><div class="pill"></div><div class="pill"></div><div class="pill"></div>
        </div>
        <div class="main">
          <div class="card"><div class="num">€ 42.8k</div><div>MRR</div></div>
          <div class="card"><div class="num">+18%</div><div>qoq</div></div>
          <div class="card chart"><svg viewBox="0 0 200 70" preserveAspectRatio="none"><polyline points="0,60 25,48 50,52 75,30 100,38 125,20 150,25 175,10 200,14" fill="none" stroke="currentColor" stroke-width="1.5" style="color:var(--accent)"/></svg></div>
        </div>
      </div>
    </div>`;
  if (kind === "api") return `
    <div class="vis-api">
      <div class="vis-inner">
        <div class="req"><span class="m">GET</span><span class="path">/v2/shipments</span><span class="status">200 · 38ms</span></div>
        <div class="req"><span class="m post">POST</span><span class="path">/v2/shipments</span><span class="status">201 · 112ms</span></div>
        <div class="req"><span class="m">GET</span><span class="path">/v2/fleet/:id</span><span class="status">200 · 21ms</span></div>
        <div class="req"><span class="m post">POST</span><span class="path">/v2/auth/token</span><span class="status">200 · 64ms</span></div>
        <div class="req"><span class="m del">DEL</span><span class="path">/v2/shipments/48a2</span><span class="status">204 · 18ms</span></div>
        <div class="req"><span class="m">GET</span><span class="path">/v2/webhooks</span><span class="status">200 · 9ms</span></div>
      </div>
    </div>`;
  return "";
}

function renderPortfolio() {
  const wrap = document.getElementById("portfolio");
  wrap.innerHTML = projects.map((p, i) => `
    <article class="project reveal ${p.wide ? "wide" : ""} ${p.url ? "clickable" : ""} ${i%2 === 1 ? "delay-1" : ""}" ${p.url ? `data-url="${p.url}"` : ""} data-hover>
      <div class="proj-vis">
        <div class="proj-chrome"><span class="d"></span><span class="d"></span><span class="d"></span><span>// ${p.title.toLowerCase().replace(/\s+/g,"_")}</span></div>
        ${projVisual(p.visual)}
      </div>
      <div class="proj-info">
        <div class="proj-meta">
          <span class="type">${trField(p, "type")}</span>
          <span class="dot"></span>
          <span>${p.year}</span>
          ${p.url ? `<span class="dot"></span><span>${tr("proj.view")}</span>` : ""}
        </div>
        <div class="proj-title">${p.title}${p.url ? ` <span class="ext">↗</span>` : ""}</div>
        <p class="proj-desc">${trField(p, "desc")}</p>
        <div class="proj-stack">${p.stack.map(s => `<span>${s}</span>`).join("")}</div>
      </div>
    </article>
  `).join("");
  attachTilt();
  attachReveal();
}
renderPortfolio();
document.getElementById("portfolio").addEventListener("click", (e) => {
  const card = e.target.closest(".project.clickable[data-url]");
  if (!card) return;
  window.open(card.dataset.url, "_blank", "noopener,noreferrer");
});

/* ---------- 3D Tilt ---------- */
function attachTilt() {
  document.querySelectorAll(".project").forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(1000px) rotateX(${-y * 4}deg) rotateY(${x * 6}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

/* ---------- Experience timeline ---------- */
const experience = [
  {
    years: "2026 — NOW",
    role: "Frontend developer · hybrid",
    org: "Legito s.r.o.",
    bullets: [
      "Developing and maintaining core UI features for a complex B2B document automation platform.",
      "Translating high-fidelity Figma designs into responsive, accessible, and performant frontend components.",
      "Contributing to the internal UI component library to ensure visual consistency across the SaaS application.",
      "Collaborating with backend engineers and product teams to streamline data-heavy interfaces and user workflows.",
    ],
    bullets_cs: [
      "Vývoj a údržba klíčových částí UI pro rozsáhlou B2B platformu na automatizaci dokumentů.",
      "Přetavování detailních Figma návrhů do responzivních, přístupných a rychlých frontendových komponent.",
      "Rozšiřování interní knihovny UI komponent, která drží vizuální konzistenci napříč celou SaaS aplikací.",
      "Spolupráce s backendem a produkťáky na zjednodušování datově náročných rozhraní a uživatelských flow.",
    ],
  },
  {
    years: "2024 — NOW",
    role: "Independent contractor",
    org: "zdenek.dev",
    bullets: [
      "Solo engineering for agencies & founders across EU and US.",
      "Led builds of 3 SaaS dashboards, 2 e-shops, and 6 marketing sites.",
      "Owned the entire visual lifecycle, from initial Figma wireframes to pixel-perfect frontend code.",
      "Redesigned critical user interfaces, focusing on accessibility, responsive layouts, and custom animations.",
    ],
    bullets_cs: [
      "Vývoj na volné noze pro agentury a foundery napříč EU i USA.",
      "Kompletní realizace 3 SaaS dashboardů, 2 e-shopů a 6 marketingových webů.",
      "Zodpovědnost za celý vizuál — od prvních wireframů ve Figmě až po pixel-perfect kód na frontendu.",
      "Redesign klíčových UI prvků s důrazem na přístupnost, responzivitu a custom animace.",
    ],
  },
  {
    years: "2024 — 2026",
    role: "Frontend developer",
    org: "OKsystem · hybrid",
    bullets: [
      "Developed full-stack features for OKbase (enterprise HR system), bridging frontend UI with backend architecture.",
      "Built and integrated REST APIs and modified backend services to support complex data flows and business logic.",
      "Collaborated closely with system analysts, QA testers, and UX/UI designers to deliver robust, user-centric modules.",
    ],
    bullets_cs: [
      "Full-stack vývoj pro enterprise HR systém OKbase — propojování frontendového UI s backend architekturou.",
      "Tvorba a integrace REST API a úpravy backendu tak, aby zvládal komplexní datové toky a byznys logiku.",
      "Úzká spolupráce se systémovými analytiky, QA a UX/UI designéry na dodávání stabilních a user-friendly modulů.",
    ],
  },
  {
    years: "2023 — 2024",
    role: "Software developer",
    org: "Aparatera s.r.o. · hybrid",
    bullets: [
      "Engineered a Java desktop application that automated flyer parsing, multi-currency price conversions, and marketing asset generation.",
      "Developed a comprehensive internal management system for tracking inventory, tools, customers, and employee data.",
    ],
    bullets_cs: [
      "Vývoj desktopové Java aplikace, která zautomatizovala parsování letáků, převody měn a generování marketingových podkladů.",
      "Vytvoření komplexního interního systému pro evidenci skladu, nářadí, zákazníků a dat o zaměstnancích.",
    ],
  },
  {
    years: "2022 — 2024",
    role: "Frontend developer",
    org: "EOS Digital · remote",
    bullets: [
      "Developed frontend features for a comprehensive SaaS platform used by sports clubs for member, finance, and communication management.",
      "Implemented responsive, data-heavy dashboards and intuitive UI modules, optimizing the platform for thousands of active users.",
    ],
    bullets_cs: [
      "Vývoj frontendu pro rozsáhlou SaaS platformu, přes kterou sportovní kluby řeší členy, finance a komunikaci.",
      "Nasazování responzivních, datově náročných dashboardů a intuitivních UI modulů optimalizovaných pro tisíce aktivních uživatelů.",
    ],
  },
  {
    years: "2022 — 2023",
    role: "Software developer",
    org: "Fakultní nemocnice Brno · hybrid",
    bullets: [
      "Introduced and established the SPFx React framework to modernize custom SharePoint application development across the hospital.",
      "Built tailored medical and administrative apps using React (patient transport, food ordering, and internal registries).",
      "Developed automated workflows and digital solutions utilizing PowerApps and Power Automate within the SharePoint ecosystem.",
    ],
    bullets_cs: [
      "Zavedení SPFx React frameworku, který v nemocnici odstartoval modernizaci vývoje interních SharePoint aplikací.",
      "Tvorba specializovaných zdravotnických a administrativních aplikací v Reactu (transporty pacientů, objednávání stravy, interní registry).",
      "Vývoj automatizovaných workflows a digitalizace procesů pomocí PowerApps a Power Automate v rámci SharePoint ekosystému.",
    ],
  },
];

function renderTimeline() {
  const lang = translations[tweaks.lang] ? tweaks.lang : "en";
  const wrap = document.getElementById("timeline");
  wrap.innerHTML = experience.map(e => {
    const bullets = (lang !== "en" && e.bullets_cs) ? e.bullets_cs : e.bullets;
    return `
    <div class="tl-row">
      <div class="tl-years">${e.years}</div>
      <div class="tl-entry">
        <h3>${e.org}</h3>
        <div class="role">${e.role}</div>
        <ul>${bullets.map(b => `<li>${b}</li>`).join("")}</ul>
      </div>
    </div>
  `;
  }).join("");
}
renderTimeline();

/* ---------- Scroll reveal ---------- */
function attachReveal() {
  const els = document.querySelectorAll(".reveal:not(.in)");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add("in");
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
  els.forEach(el => io.observe(el));
}
attachReveal();

/* ---------- Contact form ---------- */
const form = document.getElementById("contactForm");
const formBtn = form.querySelector('button[type="submit"]');
const sentEl = form.querySelector('.sent');
const defaultSentText = sentEl ? sentEl.textContent : '';

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (formBtn.disabled) return;

  const data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    type: form.type.value,
    msg: form.msg.value.trim(),
  };

  const originalBtn = formBtn.innerHTML;
  formBtn.disabled = true;
  formBtn.innerHTML = 'Transmitting… <span class="arrow">→</span>';
  form.classList.remove("sent", "error");

  try {
    const resp = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await resp.json().catch(() => ({}));
    if (!resp.ok || !result.success) {
      throw new Error(result.error || 'Transmission failed.');
    }

    if (sentEl) sentEl.textContent = defaultSentText;
    form.classList.add("sent");
    form.reset();
    setTimeout(() => form.classList.remove("sent"), 6000);
  } catch (err) {
    if (sentEl) sentEl.textContent = `// error — ${err.message}`;
    form.classList.add("sent", "error");
    setTimeout(() => form.classList.remove("sent", "error"), 6000);
  } finally {
    formBtn.disabled = false;
    formBtn.innerHTML = originalBtn;
  }
});

/* ---------- Tweaks panel ---------- */
function buildSwatches() {
  const el = document.getElementById("swatches");
  el.innerHTML = ACCENT_ORDER.map(k => `
    <button class="swatch ${tweaks.accent === k ? "on" : ""}" data-accent="${k}" style="background:${ACCENTS[k].accent}" aria-label="${k}"></button>
  `).join("");
  el.querySelectorAll(".swatch").forEach(btn => btn.addEventListener("click", () => {
    tweaks.accent = btn.dataset.accent;
    applyTweaks();
    persist();
    buildSwatches();
  }));
}
function syncToggles() {
  document.querySelectorAll(".tweak-toggle").forEach(group => {
    const key = group.dataset.group;
    group.querySelectorAll("button").forEach(b => {
      b.classList.toggle("on", tweaks[key] === b.dataset.value);
    });
  });
}
function wireToggles() {
  document.querySelectorAll(".tweak-toggle").forEach(group => {
    const key = group.dataset.group;
    group.querySelectorAll("button").forEach(b => {
      b.addEventListener("click", () => {
        tweaks[key] = b.dataset.value;
        applyTweaks();
        syncToggles();
        persist();
      });
    });
  });
}
function persist() {
  try {
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: tweaks }, "*");
  } catch (e) {}
}

buildSwatches();
syncToggles();
wireToggles();

/* ---------- Tweaks panel toggle ---------- */
const tweaksEl = document.getElementById("tweaks");
const tweaksTrigger = document.getElementById("tweaksTrigger");
const tweaksClose = document.getElementById("tweaksClose");

function openTweaks() {
  tweaksEl.classList.add("open");
  tweaksTrigger.classList.add("hidden");
}
function closeTweaks() {
  tweaksEl.classList.remove("open");
  tweaksTrigger.classList.remove("hidden");
}

tweaksTrigger?.addEventListener("click", openTweaks);
tweaksClose?.addEventListener("click", closeTweaks);

// Zavřít při kliknutí mimo panel
document.addEventListener("click", (e) => {
  if (!tweaksEl.classList.contains("open")) return;
  if (tweaksEl.contains(e.target) || tweaksTrigger.contains(e.target)) return;
  closeTweaks();
});

// Zavřít na Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && tweaksEl.classList.contains("open")) closeTweaks();
});

// Podpora Claude Design edit-mode protokolu
window.addEventListener("message", (e) => {
  const d = e.data || {};
  if (d.type === "__activate_edit_mode") openTweaks();
  if (d.type === "__deactivate_edit_mode") closeTweaks();
});
try {
  window.parent.postMessage({ type: "__edit_mode_available" }, "*");
} catch (e) {}
