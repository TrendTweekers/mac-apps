---
name: Mac Apps Contact Sheet
description: A small studio's Mac apps printed as a photographer's contact sheet, one film strip per app, keepers circled in red grease pencil.
colors:
  sheet: "#f3f3f0"
  sheet-shade: "#e6e6e1"
  film: "#141312"
  film-2: "#23211f"
  ink-2: "#4a4743"
  edge: "#e8742a"
  grease: "#c42a21"
  grease-on-film: "#ff5a4a"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 6.4vw, 5.4rem)"
    fontWeight: 760
    lineHeight: 0.94
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.2rem)"
    fontWeight: 780
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 2vw, 1.6rem)"
    fontWeight: 400
    lineHeight: 1.42
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Archivo, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    letterSpacing: "0.18em"
  note:
    fontFamily: "Grease, Archivo, cursive"
    fontSize: "1.6rem"
    lineHeight: 1
rounded:
  frame: "3px"
  hole: "2.2px"
  tile: "22%"
  dock: "16px"
  pill: "999px"
spacing:
  strip-gap: "14px"
  gutter: "clamp(16px, 4vw, 64px)"
  strip-pad-y: "34px"
  section-gap: "clamp(36px, 5vw, 64px)"
components:
  store-button:
    backgroundColor: "{colors.film}"
    textColor: "{colors.sheet}"
    rounded: "{rounded.pill}"
    padding: "13px 20px 13px 16px"
    typography: "{typography.body}"
  film-strip:
    backgroundColor: "{colors.film}"
    padding: "34px 40px 34px 64px"
  frame:
    backgroundColor: "#0b0b0a"
    rounded: "{rounded.frame}"
  pack-chip:
    backgroundColor: "transparent"
    textColor: "#cfc8c0"
    rounded: "{rounded.pill}"
    padding: "7px 10px"
  pack-chip-selected:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.film}"
  grease-note:
    textColor: "{colors.grease}"
    typography: "{typography.note}"
---

# Design System: Mac Apps Contact Sheet

## Overview

**Creative North Star: "The Contact Sheet"**

The studio is printed as a photographer's contact sheet. The page is cool, glossy print white. Each app is one film strip of real frames, and the frame worth keeping is circled in red grease pencil by a person, not a template. The category default (dark hero, floating icons, three identical feature cards) is refused: here the demos are the frames, and touching a frame makes it work.

The mood is quiet, exact and tactile. Everything machine-made is film black with orange edge code. Everything a human did is red grease pencil. That split carries meaning: the red mark is the only place the page "speaks" in a person's hand.

**Key Characteristics:**
- Sheet white ground, film-black strips, a punched sprocket hole rail on both edges of every strip.
- Orange edge-code printing in condensed caps for studio name, frame numbers and "soon" markers.
- Red grease-pencil circles, ticks and handwritten notes that draw on when a strip scrolls into view.
- One grotesque (Archivo, variable width) for all type; handwriting only for grease notes.
- App icons and real screenshots are the only other colour.
- A round glass loupe follows the pointer over photo frames.

## Colors

A near-monochrome print palette with two inks: orange for printed film data, red for human marks.

### Primary
- **Film Rebate Black** (#141312): strips, rebate bands, the store button, and body ink. Slightly warm, never pure black.

### Secondary
- **Edge Code Orange** (#e8742a): film edge printing only (studio name, frame numbers, small triangle markers, the "soon" dot, active sound meter bars). Never used for text on the white sheet.

### Tertiary
- **Grease Pencil Red** (#c42a21): every human mark on the white sheet: circles, ticks, arrows, focus rings, link underline on hover, selection, handwritten notes.
- **Grease Pencil on Film** (#ff5a4a): the same red lifted for legibility when a note sits on a dark frame.

### Neutral
- **Glossy Print White** (#f3f3f0): the sheet, also the sprocket holes and inverted text on black.
- **Sheet Shade** (#e6e6e1): reserved shade of the sheet; defined but lightly used.
- **Film Lift** (#23211f): lifted black for scrollbar thumbs.
- **Faded Ink** (#4a4743): secondary text on the sheet.

### Named Rules
**The Two Inks Rule.** Orange is printed by the lab, red is drawn by a person. Never swap them, never use orange as a mark and never use red as film data.
**The Colour Belongs to the Apps Rule.** Outside orange and red accents, colour on the page comes only from app icons and screenshots.

## Typography

**Display Font:** Archivo (variable weight 100 to 900, width 62% to 125%, self-hosted woff2, fallback system-ui)
**Body Font:** Archivo
**Label Font:** Archivo at 62% width
**Handwriting:** "Grease" (self-hosted woff2, fallback cursive), grease notes only

**Character:** A confident grotesque that goes tight and heavy for headlines and narrow and tracked for edge code. The handwriting face appears only where a person would pick up the pencil.

### Hierarchy
- **Display** (760, clamp(2.6rem, 6.4vw, 5.4rem), 0.94, width 88%, -0.03em): the one page headline.
- **Headline** (780, clamp(2rem, 4vw, 3.2rem), 0.95, width 92%, -0.03em): app names.
- **Title** (400, clamp(1.25rem, 2vw, 1.6rem), 1.42, width 94%): the closing privacy statement; bold 760 on its lead phrase.
- **Body** (400, 17px, 1.55): descriptions, capped near 64ch; promise line capped at 34ch.
- **Label / Edge code** (600, 11px, +0.18em, width 62%, uppercase): rebate printing and frame numbers (10px, +0.16em).
- **Note** (Grease, 1.6rem to 2.2rem, line-height 1, rotated about -4deg): "touch a frame to try it", "press me", "next on this roll".

### Named Rules
**The Hand Only Marks Rule.** The handwriting face is for grease-pencil notes and keeper labels. Never set headings, buttons or paragraphs in it.

## Layout

A single sheet, read top to bottom: top rebate band, intro in the sheet margin, then one band per app (label row above, film strip below), unexposed strip, margin footer, bottom rebate. Content is left-aligned to a fluid gutter (clamp(16px, 4vw, 64px)); strips run edge to edge and scroll sideways with mandatory scroll snap. Frames are 3:2 and a fluid width (clamp(250px, 27vw, 420px)), 14px apart, inside 34px of film padding. Vertical rhythm between apps is clamp(36px, 5vw, 64px). The app label is a two-column grid (icon, then name, line, detail, price and store button).

Single breakpoint at 760px: frames become min(78vw, 340px) so the next frame peeks, the store button row spans full width, the footer collapses to one column, and the keycap grows to 33% of its frame. Motion is reduced to near zero under prefers-reduced-motion.

## Elevation & Depth

Depth is mostly tonal and printed, not shadowed. Strips are flat black bands; frames sit in them without shadow. Shadows exist only on objects that are physically lifted: the store button, app icons, the keycap, the dock, and the loupe.

### Shadow Vocabulary
- **Store button rest** (`box-shadow: 0 6px 14px -6px rgba(20,19,18,.55)`): the one call to action.
- **Store button hover** (`box-shadow: 0 10px 20px -8px rgba(20,19,18,.6)` with translateY(-2px)): lift on hover.
- **Icon drop** (`filter: drop-shadow(0 6px 10px rgba(20,19,18,.22))`): app icons on the sheet; on film `drop-shadow(0 18px 22px rgba(0,0,0,.55))`.
- **Loupe** (`0 0 0 5px #141312, 0 0 0 6px rgba(255,255,255,.35), 0 18px 30px -8px rgba(0,0,0,.55)`): black bezel with glass edge.
- **Dock** (`0 16px 28px -14px rgba(0,0,0,.7)` plus 1px white inset ring, backdrop blur 10px): the Moor dock demo.

### Named Rules
**The Lifted Objects Only Rule.** Shadows belong to things you could pick up (button, icon, keycap, dock, loupe). Frames, strips, text and sheet stay flat.

## Shapes

Print geometry: frames have a 3px corner, sprocket holes are 12 by 10 rounded slots (2.2px), photos inside demos have 2px corners. Pill shapes (999px) are for controls (store button, pack chips, replay and reset). App tiles inside the dock use a 22% squircle-like radius, and the dock itself 16px. The loupe is a perfect circle. Grease marks are hand-wobbled open loops drawn with round caps through an SVG wax filter, never clean geometric ellipses.

## Components

### Buttons
- **Shape:** full pill (999px).
- **Store button:** film black fill, sheet white text, 650 weight, padding 13px 20px 13px 16px, 18px glyph. Hover lifts 2px with a deeper shadow; active returns. A "soon" variant has no fill: text plus an orange dot until the App Store link goes live.
- **Replay / Reset:** small pills on frames, translucent black (rgba(20,19,18,.8)) with sheet text, 12px 600.

### Chips
- **Pack chip:** transparent, 1px #45403c border, #cfc8c0 text, 12px 600, pill. Selected state inverts to sheet fill with black text.

### Cards / Containers
There are no cards. The container is the **frame**: 3:2, #0b0b0a, 3px corner, with frame numbers printed in orange edge code under its corners. The **film strip** is the black band with sprocket rails 9px from top and bottom.

### Navigation
There is no nav. The top rebate band carries the studio name as edge code; the footer lists support links with underline-on-hover in red.

### Focus
Keyboard focus is a 3px grease red outline with 3px offset on every focusable element.

### Grease-pencil mark (signature)
SVG path drawn over a frame (offset about -16px/-18px), 5px red stroke at 93% opacity with a thinner 2.4px companion stroke at 55%, drawn on by stroke-dashoffset over 1.1s with the expo-out ease when the strip enters view. A handwritten note fades in 0.7s later.

### Loupe (signature)
A 190px round glass fixed to the pointer (press and hold on touch) that magnifies any photo frame; decides the Lookalike set by revealing the sharp shot.

### Demo frames
Clackers keycap (orange-glow dark stage, pressable key with real recorded sounds, orange level meter, pack chips), Moor dock (blue-to-brown wallpaper, draggable reorderable icons), Lookalike set (2x2 photo grid on warm grey, judged frames dim, keeper circled and labelled). Every demo can replay to a clean frame.

## Do's and Don'ts

### Do:
- **Do** keep the sheet #f3f3f0 and strips #141312; print film data in orange (#e8742a) and draw every human mark in red (#c42a21).
- **Do** let each app be one strip of 3:2 frames with a working demo, and circle the keeper in grease pencil.
- **Do** set all type in Archivo; use width 62% caps with wide tracking for edge code, 88% to 92% heavy for headlines.
- **Do** draw marks on with stroke-dashoffset and advance frames with snap scrolling; honour prefers-reduced-motion.
- **Do** end the roll with unexposed frames to signal more apps coming.
- **Do** keep the grease red at or above 4.5:1 on the sheet; use #ff5a4a when it sits on film.

### Don't:
- **Don't** open with a dark hero, floating icons or a row of identical feature cards.
- **Don't** add colour beyond the two inks, except through real app icons and screenshots.
- **Don't** use the handwriting face for headings, buttons or paragraphs.
- **Don't** put shadows on frames, strips or text.
- **Don't** invent ratings, download counts or testimonials; the strips show only what the apps really do.
- **Don't** use em dashes in copy.

## Drift and Defects Not Canonized
- The direction contract named grease red #D9342B and orange #E8742A; the build ships #c42a21 for grease and #e8742a for edge code. The build is recorded.
- The `.edge b` markers and the small orange triangle bullets are film-native printing and recorded as such; no standalone kicker or eyebrow style is part of this system.
- Orange (#ef6a2b) in the Clackers demo meter and glow is a near-duplicate of Edge Code Orange, not a separate token.
- Hard-coded dark values inside demo stages (#0b0b0a, #1c1a19, #45403c, #cfc8c0, wallpaper gradient) are demo-local, not system tokens.
- Sheet Shade (#e6e6e1) is declared in :root but unused in the stylesheet.
