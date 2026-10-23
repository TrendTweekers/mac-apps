// Fills a guide page's call-to-action from apps.js, so a guide's button turns
// into a Mac App Store link the moment the app's `live` flag is set.
(() => {
  for (const el of document.querySelectorAll("[data-app]")) {
    const app = (window.APPS || []).find(a => a.id === el.dataset.app);
    if (!app) continue;
    const btn = el.querySelector("[data-buy]");
    if (app.live) {
      btn.outerHTML = `<a class="store" href="${app.store}" rel="noopener">Get it on the Mac App Store</a>`;
    } else {
      btn.outerHTML = `<span class="store store--soon">In review at Apple, out soon</span>`;
    }
  }
})();
