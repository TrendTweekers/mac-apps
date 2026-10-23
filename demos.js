// Live demos, one per app. Each gets the frame's inner box and fills it.
// A new app can point "demo" at one of these, add its own, or leave it out.
window.DEMOS = {
  /* Clackers: press the keycap (or type) and hear a real recording from the app. */
  keycap(box, app, { h }) {
    const packs = {
      blue: { label: "Blue", cap: "#ef6a2b", legend: "#fff3ea", files: [0, 1, 2, 3, 4, 5, 6, 7].map(i => `assets/sound/blue_0${i}.wav`) },
      typewriter: { label: "1946 typewriter", cap: "#2e4a3f", legend: "#e9f1ea", files: [0, 1, 2, 3, 4, 5].map(i => `assets/sound/typewriter_0${i}.wav`) },
    };
    let pack = "blue", ctx = null;
    const buffers = {};
    const stage = h("div", { class: "keycap-stage" });
    const key = h("button", { class: "keycap", type: "button", "aria-label": "Press the key to hear Clackers" },
      h("span", { class: "keycap__base" }), h("span", { class: "keycap__top" }), h("span", { class: "keycap__legend", text: "K" }));
    const meter = h("div", { class: "meter", "aria-hidden": "true" });
    const bars = Array.from({ length: 14 }, (_, i) => { const s = h("span"); s.style.height = `${6 + (7 - Math.abs(7 - i)) * .9}px`; meter.append(s); return s; });
    const chips = h("div", { class: "packs", role: "group", "aria-label": "Sound" });
    const paint = () => {
      key.style.setProperty("--cap", packs[pack].cap);
      key.style.setProperty("--legend", packs[pack].legend);
      chips.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.p === pack)));
    };
    Object.entries(packs).forEach(([id, p]) => chips.append(h("button", { type: "button", "data-p": id, text: p.label, onclick: () => { pack = id; paint(); press(); } })));
    stage.append(key, meter, chips); box.append(stage); paint();

    async function load(id) {
      if (buffers[id]) return buffers[id];
      buffers[id] = Promise.all(packs[id].files.map(async f => ctx.decodeAudioData(await (await fetch(f)).arrayBuffer())));
      return buffers[id];
    }
    let decay = null, level = 0;
    async function press() {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === "suspended") ctx.resume();
      key.classList.add("is-down"); setTimeout(() => key.classList.remove("is-down"), 90);
      level = .55 + Math.random() * .4;
      clearInterval(decay);
      decay = setInterval(() => { level *= .78; bars.forEach((b, i) => b.classList.toggle("on", i / 14 < level)); if (level < .03) clearInterval(decay); }, 40);
      try {
        const list = await load(pack);
        const src = ctx.createBufferSource(), g = ctx.createGain();
        src.buffer = list[Math.floor(Math.random() * list.length)];
        src.playbackRate.value = .96 + Math.random() * .08;
        g.gain.value = .9; src.connect(g).connect(ctx.destination); src.start();
      } catch (e) { /* sound failed to load: the key still moves */ }
    }
    key.addEventListener("pointerdown", e => { e.preventDefault(); press(); });
    key.addEventListener("keydown", e => { if ((e.key === " " || e.key === "Enter") && !e.repeat) { e.preventDefault(); press(); } });
    // While the keycap is on screen, typing anywhere on the page plays it too.
    let visible = false;
    new IntersectionObserver(es => es.forEach(en => visible = en.isIntersecting), { threshold: .6 }).observe(stage);
    document.addEventListener("keydown", e => {
      if (!visible || e.repeat || e.metaKey || e.ctrlKey || e.altKey || e.target === key) return;
      if (e.target.closest && e.target.closest("input,textarea,button,a")) return;
      if (e.key.length === 1 || e.key === "Enter" || e.key === "Backspace") press();
    });
  },

  /* Moor: a dock you can rearrange by dragging. */
  dock(box, app, { h }) {
    const stage = h("div", { class: "dock-stage" });
    const dock = h("div", { class: "dock", role: "list", "aria-label": "A Moor dock. Drag the items to reorder them." });
    const glyph = (body, label) => {
      const el = h("div", { class: "dock__item", role: "listitem", "aria-label": label });
      el.innerHTML = body; return el;
    };
    const items = [
      (() => { const el = h("div", { class: "dock__item", role: "listitem", "aria-label": "Clackers" }); el.append(h("img", { src: "assets/icons/clackers.webp", alt: "" })); return el; })(),
      glyph('<svg viewBox="0 0 48 48"><rect x="2" y="2" width="44" height="44" rx="10" fill="#3d8ff0"/><path d="M10 17a3 3 0 0 1 3-3h8l3 3h11a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3H13a3 3 0 0 1-3-3z" fill="#bfe0ff"/></svg>', "Projects folder"),
      (() => { const el = h("div", { class: "dock__item", role: "listitem", "aria-label": "Lookalike" }); el.append(h("img", { src: "assets/icons/lookalike.webp", alt: "" })); return el; })(),
      glyph('<svg viewBox="0 0 48 48"><rect x="2" y="2" width="44" height="44" rx="10" fill="#f4f1ea"/><path d="M15 11h13l7 7v19H15z" fill="#fff" stroke="#c9c2b6"/><path d="M19 23h12M19 28h12M19 33h8" stroke="#9a948a" stroke-width="2"/></svg>', "Invoice document"),
      glyph('<svg viewBox="0 0 48 48"><rect x="2" y="2" width="44" height="44" rx="10" fill="#f6c443"/><path d="M12 16h24M12 23h24M12 30h16" stroke="#7a5a10" stroke-width="2.4" stroke-linecap="round"/></svg>', "Notes"),
      (() => { const el = h("div", { class: "dock__item", role: "listitem", "aria-label": "Moor" }); el.append(h("img", { src: "assets/icons/moor.webp", alt: "" })); return el; })(),
    ];
    items.forEach(i => dock.append(i));
    const reset = h("button", { class: "reset", type: "button", text: "Reset", onclick: () => items.forEach(i => dock.append(i)) });
    stage.append(dock, reset, h("p", { class: "dock-caption", text: "Drag to rearrange" }));
    box.append(stage);

    let drag = null;
    dock.addEventListener("pointerdown", e => {
      const it = e.target.closest(".dock__item"); if (!it) return;
      e.preventDefault(); it.setPointerCapture(e.pointerId);
      drag = { it, x0: e.clientX, shift: 0 }; it.classList.add("is-dragging");
    });
    dock.addEventListener("pointermove", e => {
      if (!drag) return;
      const { it } = drag;
      it.style.transform = `translateX(${e.clientX - drag.x0 + drag.shift}px) scale(1.12)`;
      const sibs = [...dock.children].filter(c => c !== it);
      const cx = e.clientX;
      let target = sibs.find(s => { const b = s.getBoundingClientRect(); return cx < b.left + b.width / 2; });
      const before = target || null;
      if (it.nextElementSibling === before) return;
      // FLIP: remember where everything was, move, then animate from there.
      const first = new Map(sibs.map(s => [s, s.getBoundingClientRect().left]));
      const itBefore = it.getBoundingClientRect().left - (e.clientX - drag.x0 + drag.shift);
      dock.insertBefore(it, before);
      const itAfter = it.getBoundingClientRect().left - (e.clientX - drag.x0 + drag.shift);
      drag.shift += itBefore - itAfter;
      it.style.transform = `translateX(${e.clientX - drag.x0 + drag.shift}px) scale(1.12)`;
      sibs.forEach(s => {
        const dx = first.get(s) - s.getBoundingClientRect().left;
        if (!dx) return;
        s.style.transition = "none"; s.style.transform = `translateX(${dx}px)`;
        requestAnimationFrame(() => { s.style.transition = ""; s.style.transform = ""; });
      });
    });
    const end = () => { if (!drag) return; drag.it.classList.remove("is-dragging"); drag.it.style.transform = ""; drag = null; };
    dock.addEventListener("pointerup", end); dock.addEventListener("pointercancel", end);
  },

  /* Lookalike: four takes of one moment. It drops the weak ones and circles the keeper. */
  lookalike(box, app, { h, mark }) {
    const set = [
      { src: "assets/photo/pug-copy.webp", verdict: "smaller copy", alt: "A darker, low-resolution copy of the photo" },
      { src: "assets/photo/pug-sharp.webp", verdict: "keep", alt: "The sharp photo of a pug wrapped in a blanket", keeper: true },
      { src: "assets/photo/pug-shake.webp", verdict: "shaky", alt: "The same photo blurred by camera shake" },
      { src: "assets/photo/pug-soft.webp", verdict: "out of focus", alt: "The same moment, out of focus" },
    ];
    const stage = h("div", { class: "look-stage" });
    const figs = set.map((p, i) => {
      const f = h("figure", { class: "look" }, h("img", { src: p.src, alt: p.alt, loading: "lazy", "data-loupe": "" }), h("figcaption", { text: p.verdict }));
      if (p.keeper) f.append(mark(11));
      stage.append(f); return f;
    });
    const replay = h("button", { class: "replay", type: "button", text: "Run again" });
    stage.append(replay); box.append(stage);
    let timers = [];
    function run() {
      timers.forEach(clearTimeout); timers = [];
      figs.forEach(f => f.classList.remove("is-judged", "is-out", "is-keeper", "is-drawn"));
      const order = [2, 0, 3, 1];
      order.forEach((idx, n) => timers.push(setTimeout(() => {
        const f = figs[idx]; f.classList.add("is-judged");
        if (set[idx].keeper) f.classList.add("is-keeper", "is-drawn"); else f.classList.add("is-out");
      }, 700 + n * 650)));
    }
    replay.addEventListener("click", run);
    let started = false;
    new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting && !started) { started = true; run(); } }), { threshold: .6 }).observe(stage);
  },

  /* PetLift: a beagle that lives on a little Dock. It wanders, stops to look
     around, and jumps with a heart when you tap it. Same movement rules as
     the app: eased speed, hops counted by distance. */
  pet(box, app, { h }) {
    const stage = h("div", { class: "pet-stage" });
    const shelf = h("div", { class: "pet-shelf", "aria-hidden": "true" });
    ["petlift", "clackers", "moor", "lookalike"].forEach(n => shelf.append(h("img", { src: `assets/icons/${n}.webp`, alt: "" })));
    const glyphs = {
      folder: '<svg viewBox="0 0 64 64"><path d="M12 22a4 4 0 0 1 4-4h11l4 4h17a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4z" fill="#d9eeff"/></svg>',
      mail: '<svg viewBox="0 0 64 64"><rect x="13" y="20" width="38" height="25" rx="4" fill="#fff"/><path d="M14 22l18 13 18-13" fill="none" stroke="#2f86ee" stroke-width="3"/></svg>',
      notes: '<svg viewBox="0 0 64 64"><rect x="14" y="13" width="36" height="38" rx="5" fill="#fffbe9"/><path d="M20 26h24M20 33h24M20 40h16" stroke="#c9a136" stroke-width="3" stroke-linecap="round"/></svg>',
    };
    Object.entries(glyphs).forEach(([n, svg]) => { const g = h("span", { class: `g ${n}` }); g.innerHTML = svg; shelf.append(g); });
    const pup = h("button", { class: "pet-pup", type: "button", "aria-label": "Tap the puppy to make it jump" }, h("img", { src: "assets/photo/puppy.webp", alt: "" }));
    const shade = h("span", { class: "pet-shade", "aria-hidden": "true" });
    const heart = h("span", { class: "pet-heart", "aria-hidden": "true" });
    heart.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.2C.8 8.2 3 4.5 6.6 4.5c2.1 0 3.6 1.2 5.4 3.1 1.8-1.9 3.3-3.1 5.4-3.1 3.6 0 5.8 3.7 4.2 7.3C19.5 16.4 12 21 12 21z"/></svg>';
    stage.append(shelf, shade, pup, heart); box.append(stage);
    const img = pup.firstChild;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Positions are fractions of the stage width; speed in widths per second.
    let x = 0.42, v = 0, target = 0.42, wait = 1.2, stride = 0, face = 1, jumpT = -1, visible = false, last = 0, t = 0;
    const MAX = 0.14, ACC = 0.26, LO = 0.3, HI = 0.7;  // stays above the Dock
    function frame(now) {
      if (!visible) { last = 0; return; }
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016; last = now; t += dt;
      const rem = Math.abs(target - x);
      if (wait > 0) { if (!still) wait -= dt; if (wait <= 0) { target = LO + Math.random() * (HI - LO); if (Math.abs(target - x) < 0.12) target = x > 0.5 ? LO + 0.05 : HI - 0.05; } }
      else {
        const brake = v * v / (2 * ACC);
        v = rem <= brake + 0.002 ? Math.max(0, v - ACC * dt) : Math.min(MAX, v + ACC * dt);
        const step = Math.min(rem, v * dt);
        x += (target > x ? 1 : -1) * step; stride += step / 0.05;
        face = target > x ? 1 : -1;
        if (v < 0.002 && rem < 0.004) { v = 0; wait = still ? 1 : 1.5 + Math.random() * 2.5; }
      }
      const k = Math.min(1, v / MAX), p = stride % 1;
      let hop = Math.sin(Math.PI * p) * 7 * k, sx = 1, sy = 1, tilt = Math.sin(p * Math.PI * 2) * 2.5 * k;
      if (p < 0.12 || p > 0.88) { sx += 0.05 * k; sy -= 0.07 * k; } else { sx -= 0.03 * k; sy += 0.04 * k; }
      if (v === 0) { const b = Math.sin(t * 2.6); sx += 0.01 * b; sy -= 0.015 * b; }
      if (jumpT >= 0) { jumpT += dt; const j = Math.min(1, jumpT / 0.55); hop += Math.sin(Math.PI * j) * 46; if (j >= 1) jumpT = -1; }
      pup.style.left = (x * 100) + "%";
      shade.style.left = (x * 100) + "%";
      shade.style.transform = `translateX(-50%) scale(${1 - Math.min(0.6, hop / 80)})`;
      img.style.transform = `translateY(${-hop}px) scale(${face * sx}, ${sy}) rotate(${tilt * face}deg)`;
      requestAnimationFrame(frame);
    }
    // Click anywhere in the scene: the puppy trots over to that spot.
    stage.addEventListener("click", e => {
      if (e.target.closest(".pet-pup")) return;
      const r = stage.getBoundingClientRect();
      target = Math.min(HI, Math.max(LO, (e.clientX - r.left) / r.width));
      wait = 0;
    });
    pup.addEventListener("click", () => {
      jumpT = 0;
      // Reduced motion: no wandering on its own, but a tap is the visitor's
      // own action, so the jump and one short trot still play.
      if (still) { wait = 0; target = x > 0.5 ? LO + 0.06 : HI - 0.06; }
      heart.style.left = (x * 100) + "%";
      // Web Animations, not a CSS animation, so the page-wide reduced-motion
      // rule does not cut it to zero.
      heart.animate([
        { opacity: 0, transform: "translateY(0) scale(.6)" },
        { opacity: 1, transform: "translateY(-14px) scale(.9)", offset: 0.2 },
        { opacity: 0, transform: "translateY(-60px) scale(1.2)" },
      ], { duration: 1200, easing: "cubic-bezier(.16,1,.3,1)" });
    });
    if (still) wait = Infinity;
    new IntersectionObserver(es => es.forEach(e => { visible = e.isIntersecting; if (visible) requestAnimationFrame(frame); }), { threshold: 0.2 }).observe(stage);
  },

  /* Clickcast: a ring follows the pointer inside the frame, clicks leave a
     ring, and shortcuts pressed while the frame is on screen show as keycaps.
     Left alone, it plays a short demo by itself. */
  clickcast(box, app, { h }) {
    const stage = h("div", { class: "cc-stage" });
    stage.innerHTML = '<div class="cc-win"><div class="cc-bar"><i></i><i></i><i></i><span>lesson-3.swift</span></div>' +
      '<pre class="cc-code"><span class="c">// Lesson 3: shortcuts</span>\n<span class="k">func</span> <span class="f">greet</span>(name: <span class="k">String</span>) {\n  print(<span class="s">"Hello!"</span>)\n}</pre></div>';
    const ring = h("span", { class: "cc-ring", "aria-hidden": "true" });
    const keys = h("div", { class: "cc-keys", "aria-live": "polite" });
    stage.append(ring, keys);
    box.append(stage);
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let x = 0.55, y = 0.45, tx = x, ty = y, visible = false, last = 0, idle = 0, script = 0, hideT = null, touched = false;
    const NAMES = { Meta: "⌘", Control: "⌃", Alt: "⌥", Shift: "⇧" };
    function showKeys(list) {
      keys.innerHTML = "";
      list.forEach((k, i) => {
        if (i) keys.append(h("span", { class: "cc-plus", text: "+" }));
        const mod = ["⌘", "⌃", "⌥", "⇧"].includes(k);
        const cap = h("span", { class: "cc-cap" + (mod ? " mod" : ""), text: k });
        keys.append(cap);
      });
      keys.classList.add("on");
      clearTimeout(hideT);
      hideT = setTimeout(() => keys.classList.remove("on"), 1500);
    }
    function ripple(px, py) {
      const r = h("span", { class: "cc-ripple", "aria-hidden": "true" });
      r.style.left = px * 100 + "%"; r.style.top = py * 100 + "%";
      stage.append(r);
      r.animate([{ transform: "translate(-50%,-50%) scale(.35)", opacity: 1 }, { transform: "translate(-50%,-50%) scale(1.5)", opacity: 0 }],
        { duration: 600, easing: "cubic-bezier(.16,1,.3,1)" }).onfinish = () => r.remove();
    }
    stage.addEventListener("pointermove", e => {
      const b = stage.getBoundingClientRect();
      tx = (e.clientX - b.left) / b.width; ty = (e.clientY - b.top) / b.height; idle = 0; touched = true;
    });
    stage.addEventListener("pointerdown", e => {
      const b = stage.getBoundingClientRect();
      x = tx = (e.clientX - b.left) / b.width; y = ty = (e.clientY - b.top) / b.height; idle = 0; touched = true;
      ripple(x, y);
    });
    document.addEventListener("keydown", e => {
      if (!visible || e.repeat) return;
      if (e.target.closest && e.target.closest("input,textarea")) return;
      const mods = ["Control", "Alt", "Shift", "Meta"].filter(m => e.getModifierState(m)).map(m => NAMES[m]);
      if (NAMES[e.key]) { return; }
      if (!mods.length && e.key.length === 1) return; // shortcuts only, like the app's default
      const k = e.key.length === 1 ? e.key.toUpperCase() : ({ Enter: "⏎", Escape: "⎋", ArrowLeft: "←", ArrowRight: "→", ArrowUp: "↑", ArrowDown: "↓", Backspace: "⌫", Tab: "⇥" }[e.key] || e.key);
      showKeys([...mods, k]); idle = 0; touched = true;
    });
    const tour = [[0.3, 0.35, ["⌘", "C"]], [0.7, 0.55, ["⌘", "V"]], [0.5, 0.42, ["⌘", "⇧", "K"]]];
    function frame(now) {
      if (!visible) { last = 0; return; }
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016; last = now; idle += dt;
      if (!still && !touched && idle > 2.2) {
        const [sx, sy, sk] = tour[script % tour.length]; script++; idle = 0;
        tx = sx; ty = sy;
        setTimeout(() => { ripple(tx, ty); showKeys(sk); }, 700);
      }
      if (touched && idle > 6) touched = false;  // hand back to the demo
      const k = still ? 1 : 1 - Math.pow(0.0005, dt);  // smooth follow, frame-rate independent
      x += (tx - x) * k; y += (ty - y) * k;
      ring.style.left = x * 100 + "%"; ring.style.top = y * 100 + "%";
      requestAnimationFrame(frame);
    }
    new IntersectionObserver(es => es.forEach(e => { visible = e.isIntersecting; if (visible) requestAnimationFrame(frame); }), { threshold: 0.3 }).observe(stage);
  },
};
