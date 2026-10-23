# Studio site

Static page, no build step. Hosted on GitHub Pages.

## Add an app

1. Put its icon in `assets/icons/<id>.webp` (512 px) and 1 to 3 screenshots in `assets/shots/<id>-N.webp` (1440x900).
2. In `apps.js`, copy one entry in `APPS`, change the text, files, prices and App Store id.
3. `demo` is optional. Use one from `demos.js`, add a new function there, or leave it out (the strip then shows screenshots only).
4. Set `live: true` once Apple approves the app; the button then links to the Mac App Store.
5. Lower `UNEXPOSED` by one if you want the blank "next on this roll" frames to shrink.

## Change the studio name

Edit `STUDIO.name` in `apps.js` and the `<title>` in `index.html`.

## Preview locally

`python3 -m http.server 8765` in this folder, then open http://127.0.0.1:8765/
