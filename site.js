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

let tweaks = { ...(window.TWEAK_DEFAULTS || { theme: "dark", fx: "on", accent: "cyan" }) };
try {
  const saved = JSON.parse(localStorage.getItem("tweaks") || "null");
  if (saved) tweaks = { ...tweaks, ...saved };
} catch(e) {}

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
  localStorage.setItem("tweaks", JSON.stringify(tweaks));
}
applyTweaks();

/* ---------- Dynamic date labels ---------- */
function currentQuarter(d = new Date()) { return Math.floor(d.getMonth() / 3) + 1; }
function availabilityLabel(d = new Date()) {
  const q = currentQuarter(d);
  const yy = String(d.getFullYear()).slice(-2);
  return `AVAILABLE Q${q} '${yy}`;
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
  if (el) el.textContent = `${hh}:${mm}:${ss} LOCAL`;
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
    year: "2026",
    wide: true,
    url: "https://www.nbeautycare.cz/",
    desc: "Info website for a beauty salon in OC Rozkvět, Brno. Next.js 16 App Router with Tailwind v4, 55 services across 9 categories, Framer Motion animations, and direct integration with the Reservio booking system.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "Framer Motion", "Vercel"],
    visual: "site",
  },
  {
    title: "PurityX",
    type: "e-shop",
    year: "2026",
    url: "https://its-time-shop.vercel.app",
    desc: "Custom Czech e-shop for an automotive cosmetics brand. Cart drawer, checkout with bank-transfer payments (SPD QR codes), order tracking page, and Resend-powered transactional emails — built end-to-end solo.",
    stack: ["Next.js 16", "TypeScript", "Supabase", "Zustand", "Tailwind", "Resend"],
    visual: "shop",
  },
  {
    title: "PurityX Admin Panel",
    type: "dashboard",
    year: "2026",
    desc: "Admin dashboard for the PurityX storefront. CRUD for products, categories, and orders with cookie-based auth, shop-settings management, and inline status controls for order fulfilment.",
    stack: ["Next.js 16", "TypeScript", "Supabase", "Tailwind", "Vercel"],
    visual: "dash",
  },
  {
    title: "It's Time",
    type: "business website",
    year: "2025",
    url: "https://itstime.cz/",
    desc: "Professional presentation website for an auto detailing studio. Features a service showcase, project gallery, and an integrated booking form.",
    stack: ["Svelte", "Python", "TypeScript", "Tailwind"],
    visual: "site",
  },
  {
    title: "Meta-Grid",
    type: "web app",
    year: "2025",
    desc: "Angular admin table for managing business records with live autocomplete from the Czech ARES registry. Firebase-backed persistence, authenticated access, and search across arbitrary columns.",
    stack: ["Angular 20", "TypeScript", "Firebase", "ARES API"],
    visual: "dashboard",
  },
  {
    title: "Colorly",
    type: "design tool",
    year: "2025",
    url: "https://colorly.cloud/",
    desc: "React web app that generates primary, secondary, and semantic color palettes with perceptual-lightness correction — built for designers and devs maintaining consistent design systems.",
    stack: ["React", "TypeScript", "Tailwind", "CRA"],
    visual: "editor",
  },
  {
    title: "HTML Price Converter",
    type: "desktop utility",
    year: "2023",
    desc: "Java desktop GUI that parses uploaded HTML files and automatically converts Czech crown prices to EUR. Built to streamline localization for multi-currency online stores.",
    stack: ["Java", "Swing", "JSoup"],
    visual: "api",
  },
  {
    title: "Twitch Bot",
    type: "bot",
    year: "2022",
    desc: "Self-hosted Twitch bot that monitors stream status to automatically join live channels. It simulates viewer engagement with randomized chat messages and emojis, disconnecting once the stream ends.",
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
          <span class="type">${p.type}</span>
          <span class="dot"></span>
          <span>${p.year}</span>
          ${p.url ? `<span class="dot"></span><span>view project</span>` : ""}
        </div>
        <div class="proj-title">${p.title}${p.url ? ` <span class="ext">↗</span>` : ""}</div>
        <p class="proj-desc">${p.desc}</p>
        <div class="proj-stack">${p.stack.map(s => `<span>${s}</span>`).join("")}</div>
      </div>
    </article>
  `).join("");
  wrap.addEventListener("click", (e) => {
    const card = e.target.closest(".project.clickable[data-url]");
    if (!card) return;
    window.open(card.dataset.url, "_blank", "noopener,noreferrer");
  });
  attachTilt();
  attachReveal();
}
renderPortfolio();

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
  },
  {
    years: "2023 — 2024",
    role: "Software developer",
    org: "Aparatera s.r.o. · hybrid",
    bullets: [
      "Engineered a Java desktop application that automated flyer parsing, multi-currency price conversions, and marketing asset generation.",
      "Developed a comprehensive internal management system for tracking inventory, tools, customers, and employee data.",
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
  },
];

function renderTimeline() {
  const wrap = document.getElementById("timeline");
  wrap.innerHTML = experience.map(e => `
    <div class="tl-row">
      <div class="tl-years">${e.years}</div>
      <div class="tl-entry">
        <h3>${e.org}</h3>
        <div class="role">${e.role}</div>
        <ul>${e.bullets.map(b => `<li>${b}</li>`).join("")}</ul>
      </div>
    </div>
  `).join("");
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
