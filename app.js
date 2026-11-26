const MENU = [
  {
    id: "mains",
    title: "Mains",
    icon: '<ellipse cx="14.5" cy="9.5" rx="7.2" ry="5.6" transform="rotate(-45 14.5 9.5)"/><path d="M9 13.5 11 15.5 6.6 19.9 4.6 17.9Z"/><circle cx="3.9" cy="18.1" r="1.8"/><circle cx="5.9" cy="20.1" r="1.8"/>',
    items: [
      { name: "Roasted Turkey", note: "herbs · pan jus" },
      { name: "Duck Stew", note: "tomato ginger sauce", diet: ["halal"] },
      { name: "Rosemary Garlic Lamb", note: "rosemary · black pepper · garlic" },
      { name: "Skillet Pumpkin Cannellini", note: "tofu · parmesan · sage", diet: ["veg"] },
    ],
  },
  {
    id: "sides",
    title: "Sides",
    icon: '<path d="M2.5 12.5h19a9.5 9.5 0 0 1-19 0Z"/><path d="M5 11.5c0-3 1.5-5.5 4.5-6.5.5 3-1 5.5-4.5 6.5Z"/><path d="M19 11.5c0-3-1.5-5.5-4.5-6.5-.5 3 1 5.5 4.5 6.5Z"/><path d="M12 11.5c-2.2-2.2-2.2-5.3 0-8 2.2 2.7 2.2 5.8 0 8Z"/>',
    items: [
      { name: "Harvest Salad", note: "butternut squash · pomegranate", diet: ["veg"] },
      { name: "Baked Mac and Cheese", note: "aged cheddar · gruyère", diet: ["veg"] },
      { name: "Honey Thyme Roasted Carrots", note: "wildflower honey · thyme", diet: ["veg"] },
      { name: "Sweet Potato Wedges", note: "oven roasted", diet: ["veg"] },
      { name: "Red Beans", note: "tomato sauce", diet: ["veg"] },
      { name: "Jasmine Rice", note: "garlic", diet: ["veg"] },
    ],
  },
  {
    id: "dessert",
    title: "Dessert",
    icon: '<path d="M12 8c-1.5-1.2-3.5-1.5-5-1-2.7.9-4 3.6-3.5 7 .6 4 3.2 7.5 5.8 7.5 1 0 1.7-.5 2.7-.5s1.7.5 2.7.5c2.6 0 5.2-3.5 5.8-7.5.5-3.4-.8-6.1-3.5-7-1.5-.5-3.5-.2-5 1Z"/><path d="M11.2 7c0-1.9.5-3.4 1.6-4.6l1 .8c-.9 1-1.3 2.2-1.3 3.8Z"/><path d="M13.8 5.6c.8-2 2.6-3 5-2.8-.6 2.2-2.4 3.2-5 2.8Z"/>',
    items: [{ name: "Apple Turnovers", note: "puff pastry · apples", diet: ["veg"] }],
  },
];

const DIET = { veg: "Vegetarian", halal: "Halal" };

const tag = (k) => `<span class="tag tag-${k}" role="img" title="${DIET[k]}" aria-label="${DIET[k]}"></span>`;

const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

const paper = document.querySelector(".paper");
const nav = document.querySelector(".course-nav");
const sectionsEl = document.getElementById("menu-sections");
const inkCol = document.querySelector(".ink-col");

function render() {
  nav.innerHTML = MENU.map((s) => `<button type="button" data-target="${s.id}">${s.title}</button>`).join("");

  sectionsEl.innerHTML = MENU.map(
    (s) => `
    <section id="${s.id}" class="course" aria-labelledby="h-${s.id}">
      <header class="course-head reveal">
        <svg class="course-icon" viewBox="0 0 24 24" aria-hidden="true">${s.icon}</svg>
        <h2 id="h-${s.id}">${s.title}</h2>
        <span class="course-rule" aria-hidden="true"></span>
      </header>
      <ul class="dishes">
        ${s.items
          .map(
            (d, j) => `
        <li><button type="button" class="dish reveal" style="--d:${j * 60}ms" aria-pressed="false">
          <span class="dish-diet">${(d.diet || []).map(tag).join("")}</span>
          <span class="dish-name">${d.name}</span>
          <span class="dish-note">${d.note}</span>
        </button></li>`
          )
          .join("")}
      </ul>
    </section>`
  ).join("");
}

function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (REDUCED || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      }),
    { root: paper, threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));
}

function initNav() {
  const buttons = [...nav.querySelectorAll("button")];
  const sections = MENU.map((s) => document.getElementById(s.id));

  nav.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const target = document.getElementById(btn.dataset.target);
    paper.scrollTo({ top: target.offsetTop - nav.offsetHeight - 8, behavior: REDUCED ? "auto" : "smooth" });
  });

  const onScroll = () => {
    const y = paper.scrollTop + nav.offsetHeight + 48;
    const atEnd = paper.scrollTop + paper.clientHeight >= paper.scrollHeight - 4;
    const idx = atEnd ? sections.length - 1 : Math.max(0, sections.findLastIndex((s) => s.offsetTop <= y));
    buttons.forEach((b, i) => b.classList.toggle("is-active", i === idx));
  };

  paper.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initMarks() {
  sectionsEl.addEventListener("click", (e) => {
    const dish = e.target.closest(".dish");
    if (!dish) return;
    const on = dish.getAttribute("aria-pressed") !== "true";
    dish.setAttribute("aria-pressed", on);

    if (on && !REDUCED) {
      const r = dish.getBoundingClientRect();
      const x = e.detail ? e.clientX : r.left + 24;
      const y = e.detail ? e.clientY : r.top + r.height / 2;
      const bloom = document.createElement("span");
      bloom.className = "bloom";
      bloom.style.left = `${x - r.left}px`;
      bloom.style.top = `${y - r.top}px`;
      bloom.addEventListener("animationend", () => bloom.remove());
      dish.append(bloom);
      leaves.burst(x, y, 1, -3);
    }
  });
}

const leaves = (() => {
  const canvas = document.querySelector(".leaves");
  const ctx = canvas.getContext("2d");
  const COLORS = ["#e3a54c", "#d1702f", "#c4572a", "#a63a24", "#8e2a1f", "#d9993f"];
  const shape = new Path2D();
  for (let i = 0; i <= 80; i++) {
    const t = (i / 80) * Math.PI * 2;
    const a = t - Math.PI / 2;
    const lobe = Math.pow(Math.abs(Math.cos(t * 2.5)), 1.4);
    const teeth = 0.07 * Math.abs(Math.sin(t * 12.5));
    const r = (0.32 + 0.62 * lobe + teeth) * (1 - 0.3 * Math.max(0, Math.sin(a)));
    i ? shape.lineTo(Math.cos(a) * r, Math.sin(a) * r) : shape.moveTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  shape.closePath();
  shape.moveTo(0, 0.4);
  shape.lineTo(0.05, 0.95);

  let list = [];
  let W = 0;
  let H = 0;

  const colWidth = () => inkCol.getBoundingClientRect().right;
  const rand = (a, b) => a + Math.random() * (b - a);

  const make = (x, y, ambient, vx = rand(-0.4, 0.4), vy = rand(0.3, 0.9)) => ({
    x, y, vx, vy, ambient,
    size: rand(9, 18),
    rot: rand(0, Math.PI * 2),
    spin: rand(-0.03, 0.03),
    phase: rand(0, Math.PI * 2),
    color: COLORS[(Math.random() * COLORS.length) | 0],
    alpha: rand(0.7, 0.95),
  });

  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth;
    H = innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const tick = () => {
    ctx.clearRect(0, 0, W, H);
    for (const l of list) {
      l.phase += 0.025;
      l.vx += Math.sin(l.phase) * 0.03;
      l.vx *= 0.985;
      l.vy += (0.6 + l.size * 0.03 - l.vy) * 0.02;
      l.x += l.vx;
      l.y += l.vy;
      l.rot += l.spin + l.vx * 0.01;
      if (l.y > H + 30 && l.ambient) Object.assign(l, make(rand(0, colWidth()), -30, true));

      ctx.save();
      ctx.translate(l.x, l.y);
      ctx.rotate(l.rot);
      ctx.scale(l.size, l.size * Math.cos(l.phase * 0.8));
      ctx.globalAlpha = l.alpha;
      ctx.fillStyle = l.color;
      ctx.fill(shape);
      ctx.lineWidth = 0.06;
      ctx.strokeStyle = "rgba(42,29,20,0.35)";
      ctx.stroke(shape);
      ctx.restore();
    }
    list = list.filter((l) => l.ambient || l.y < H + 30);
    requestAnimationFrame(tick);
  };

  const api = {
    burst(x, y, n, vy = -2) {
      if (REDUCED) return;
      for (let i = 0; i < n; i++) list.push(make(x, y, false, rand(-2, 2), vy + rand(-1, 0.5)));
    },
  };

  if (!REDUCED) {
    resize();
    addEventListener("resize", resize);
    for (let i = 0; i < 8; i++) list.push(make(rand(0, colWidth()), rand(0, H), true));
    requestAnimationFrame(tick);
  }

  return api;
})();

render();
initReveal();
initNav();
initMarks();
