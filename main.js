(() => {
  const S = window.STUDIO, APPS = window.APPS;
  const $ = (sel, el = document) => el.querySelector(sel);
  const h = (tag, attrs = {}, ...kids) => {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") el.className = v;
      else if (k === "text") el.textContent = v;
      else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v);
    }
    for (const kid of kids) if (kid) el.append(kid);
    return el;
  };
  const svg = (tag, attrs = {}) => {
    const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    return el;
  };
  const canHover = matchMedia("(hover: hover)").matches;

  /* ---------- studio name, edge printing, footer ---------- */
  document.title = `${S.name}: small, sharp apps for your Mac`;
  document.querySelectorAll("[data-studio]").forEach(el => el.textContent = S.name);
  document.querySelectorAll("[data-owner]").forEach(el => el.textContent = S.owner);
  const mail = $("[data-email]"); mail.href = `mailto:${S.email}`; mail.textContent = S.email;
  const sup = $("[data-support]");
  APPS.forEach(a => sup.append(h("a", { href: a.support, text: `${a.name} support` })));
  document.querySelectorAll("[data-edge]").forEach(el => {
    el.innerHTML = Array.from({ length: 12 }, (_, i) => `<b>${S.roll}</b>${S.name.toUpperCase()}<i></i>${i + 1}`).join("");
  });
  const hint = $(".grease--hint"); if (hint && canHover) hint.textContent = "click a frame to try it";

  /* ---------- grease pencil: a hand-drawn ring that overshoots its start ---------- */
  function ring(seed = 1) {
    let r = seed * 9301 + 49297;
    const rnd = () => ((r = (r * 9301 + 49297) % 233280) / 233280);
    const pts = [], start = -1.9, turns = Math.PI * 2 * 1.08, n = 26;
    for (let i = 0; i <= n; i++) {
      const t = start + (turns * i) / n;
      const k = 1 + (rnd() - .5) * .05 + (i > n - 4 ? .04 : 0);
      pts.push([50 + Math.cos(t) * 47 * k, 50 + Math.sin(t) * 45 * k]);
    }
    let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
    for (let i = 1; i < pts.length - 1; i++) {
      const mx = (pts[i][0] + pts[i + 1][0]) / 2, my = (pts[i][1] + pts[i + 1][1]) / 2;
      d += ` Q${pts[i][0].toFixed(1)},${pts[i][1].toFixed(1)} ${mx.toFixed(1)},${my.toFixed(1)}`;
    }
    return d;
  }
  function mark(seed, note) {
    const s = svg("svg", { class: "mark", viewBox: "0 0 100 100", preserveAspectRatio: "none", "aria-hidden": "true" });
    s.append(svg("path", { d: ring(seed), pathLength: "1", "vector-effect": "non-scaling-stroke", style: "--len:1" }));
    s.append(svg("path", { d: ring(seed + 7), pathLength: "1", "vector-effect": "non-scaling-stroke", style: "--len:1" }));
    const frag = document.createDocumentFragment(); frag.append(s);
    if (note) frag.append(h("span", { class: "grease mark__note", "aria-hidden": "true", text: note }));
    return frag;
  }

  /* ---------- the roll ---------- */
  const roll = $("#roll");
  let frameNo = 1;
  const arrow = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h10.2l-4-4 1.4-1.4L18 11l-6.4 6.4-1.4-1.4 4-4H4z"/></svg>';

  APPS.forEach((app, ai) => {
    const buy = app.live
      ? h("a", { class: "store", href: app.store, rel: "noopener" })
      : h("span", { class: "store store--soon" });
    buy.innerHTML = app.live ? `Get it on the Mac App Store ${arrow}` : "In review at Apple, out soon";
    const section = h("section", { class: "app", id: app.id, "aria-labelledby": `${app.id}-name` },
      h("div", { class: "app__label" },
        h("img", { src: app.icon, alt: "", width: "64", height: "64", loading: ai ? "lazy" : "eager" }),
        h("div", {},
          h("h2", { class: "app__name", id: `${app.id}-name`, text: app.name }),
          h("p", { class: "app__line", text: app.line }),
          h("p", { class: "app__detail", text: app.detail })),
        h("div", { class: "app__buy" }, buy, h("p", { class: "app__price", text: app.price }))));

    const film = h("div", { class: "strip__film" });
    app.frames.forEach((f, fi) => {
      const frame = h("div", { class: `frame frame--${f.type}` });
      const inner = h("div", { class: "frame__inner" });
      if (f.type === "icon") inner.append(h("img", { src: app.icon, alt: `${app.full} app icon`, loading: "lazy" }));
      if (f.type === "shot") inner.append(h("img", { class: "shot", src: f.src, alt: f.alt, loading: "lazy", "data-loupe": "" }));
      if (f.type === "demo" && window.DEMOS[app.demo]) window.DEMOS[app.demo](inner, app, { h, mark });
      frame.append(inner,
        h("span", { class: "frame__num", "aria-hidden": "true", text: String(frameNo) }),
        h("span", { class: "frame__num", "aria-hidden": "true", text: `${frameNo}A` }));
      if (fi === app.keeper) frame.append(mark(ai + 3, app.note));
      film.append(frame);
      frameNo++;
    });
    const strip = h("div", { class: "strip", role: "group", "aria-label": `${app.name}: frames`, tabindex: "0" }, film);
    section.append(strip);
    roll.append(section);
  });

  const blank = h("div", { class: "strip__film" });
  for (let i = 0; i < (window.UNEXPOSED || 0); i++) {
    blank.append(h("div", { class: "frame" }, h("div", { class: "frame__inner" }),
      h("span", { class: "frame__num", "aria-hidden": "true", text: String(frameNo) }),
      h("span", { class: "frame__num", "aria-hidden": "true", text: `${frameNo}A` })));
    frameNo++;
  }
  $("#blank").append(blank);

  // Draw the grease marks once each strip is in view.
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("is-drawn"); io.unobserve(e.target); }
  }), { threshold: .45 });
  document.querySelectorAll(".app").forEach(el => io.observe(el));

  /* ---------- loupe ---------- */
  const loupe = $(".loupe"), Z = 2.6, R = 95;
  let loupeImg = null;
  function aim(img, cx, cy, lift) {
    const b = img.getBoundingClientRect();
    const nw = img.naturalWidth || b.width, nh = img.naturalHeight || b.height;
    const sc = Math.max(b.width / nw, b.height / nh), dw = nw * sc, dh = nh * sc;
    const ox = (b.width - dw) / 2, oy = (b.height - dh) / 2;
    const x = cx - b.left, y = cy - b.top;
    loupe.style.backgroundImage = `url("${img.currentSrc || img.src}")`;
    loupe.style.backgroundSize = `${dw * Z}px ${dh * Z}px`;
    loupe.style.backgroundPosition = `${-((x - ox) * Z - R)}px ${-((y - oy) * Z - R)}px`;
    loupe.style.left = `${cx - R}px`;
    loupe.style.top = `${cy - R - lift}px`;
  }
  document.addEventListener("pointermove", e => {
    if (e.pointerType !== "mouse") return;
    const img = e.target.closest && e.target.closest("img[data-loupe]");
    if (img) { loupeImg = img; aim(img, e.clientX, e.clientY, 0); loupe.classList.add("is-on"); }
    else if (loupeImg) { loupeImg = null; loupe.classList.remove("is-on"); }
  }, { passive: true });
  // Touch: press and hold a photo to bring the loupe up above your finger.
  let hold = null, holding = false, startXY = null;
  document.addEventListener("touchstart", e => {
    const img = e.target.closest && e.target.closest("img[data-loupe]");
    if (!img) return;
    const t = e.touches[0]; startXY = [t.clientX, t.clientY];
    hold = setTimeout(() => { holding = true; loupeImg = img; aim(img, t.clientX, t.clientY, 120); loupe.classList.add("is-on"); }, 260);
  }, { passive: true });
  document.addEventListener("touchmove", e => {
    const t = e.touches[0];
    if (holding) { e.preventDefault(); aim(loupeImg, t.clientX, t.clientY, 120); return; }
    if (hold && startXY && Math.hypot(t.clientX - startXY[0], t.clientY - startXY[1]) > 8) { clearTimeout(hold); hold = null; }
  }, { passive: false });
  const endHold = () => { clearTimeout(hold); hold = null; if (holding) { holding = false; loupe.classList.remove("is-on"); } };
  document.addEventListener("touchend", endHold); document.addEventListener("touchcancel", endHold);
  document.addEventListener("scroll", () => { if (loupeImg && !holding) { loupeImg = null; loupe.classList.remove("is-on"); } }, { passive: true });
})();
