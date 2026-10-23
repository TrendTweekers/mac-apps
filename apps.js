// Everything the page says about the studio and its apps lives here.
// To add an app: copy one entry, change the text and files, and add it to APPS.
// "demo" is optional. Without it the strip shows the icon and screenshots only.
// "live": set to true once Apple approves the app, so the button links to the store.

window.STUDIO = {
  name: "Halloware",            // placeholder studio name: change it here only
  owner: "Peter Hallander",
  email: "admin@stackedboost.com",
  roll: "HW 400",               // printed on the film edges, like a film stock code
};

window.APPS = [
  {
    id: "clackers",
    name: "Clackers",
    full: "Clackers: Keyboard Sounds",
    line: "Real mechanical keyboard sounds every time you press a key, in every app.",
    detail: "Seven recorded switches and typewriters. Goes quiet by itself when you join a call.",
    price: "Free download. Pro is $5.99, once.",
    store: "https://apps.apple.com/app/id6826136937",
    support: "https://trendtweekers.github.io/clackers-app/",
    live: false,
    icon: "assets/icons/clackers.webp",
    demo: "keycap",
    keeper: 0,
    note: "press it",
    frames: [
      { type: "demo" },
      { type: "shot", src: "assets/shots/clackers-1.webp", alt: "The Clackers panel in the menu bar, with the keycap, sound packs and volume." },
      { type: "shot", src: "assets/shots/clackers-2.webp", alt: "Clackers paused while the microphone is in use during a call." },
    ],
  },
  {
    id: "moor",
    name: "Moor",
    full: "Moor: Floating Dock & Launcher",
    line: "Small floating docks you can put anywhere on your screen.",
    detail: "Drag in apps, files and folders, open stacks, and launch anything with a shortcut.",
    price: "Free download. Pro is $14.99, once.",
    store: "https://apps.apple.com/app/id6825738474",
    support: "https://trendtweekers.github.io/moor-app/",
    live: false,
    icon: "assets/icons/moor.webp",
    demo: "dock",
    keeper: 0,
    note: "drag the icons",
    frames: [
      { type: "demo" },
      { type: "shot", src: "assets/shots/moor-1.webp", alt: "Two Moor docks floating on a Mac desktop." },
      { type: "shot", src: "assets/shots/moor-2.webp", alt: "A Moor stack opened from the dock, showing a folder's files." },
    ],
  },
  {
    id: "lookalike",
    name: "Lookalike",
    full: "Lookalike: Duplicate Photos",
    line: "Finds duplicate, near-identical and blurry photos, and keeps the best shot of each set.",
    detail: "A loupe shows you why it chose. Nothing is removed until you say so.",
    price: "Free download. Pro is $14.99, once.",
    store: "https://apps.apple.com/app/id6825814146",
    support: "https://trendtweekers.github.io/lookalike-app/",
    live: false,
    icon: "assets/icons/lookalike.webp",
    demo: "lookalike",
    keeper: null,     // the demo circles its own keeper
    note: "",
    frames: [
      { type: "demo" },
      { type: "shot", src: "assets/shots/lookalike-1.webp", alt: "Lookalike showing a set of similar photos with the kept shot large." },
      { type: "shot", src: "assets/shots/lookalike-2.webp", alt: "Lookalike listing blurry photos found in a library." },
    ],
  },
  {
    id: "petlift",
    name: "PetLift",
    full: "PetLift: Desktop Pet",
    line: "Your own dog or cat, lifted out of a photo, living on top of your Dock.",
    detail: "With Pro they hop around, follow your pointer, and nap when you step away.",
    price: "Free download. Pro is $4.99, once.",
    store: "https://apps.apple.com/app/id6826183467",
    support: "https://trendtweekers.github.io/petlift-mac-app/",
    live: false,
    icon: "assets/icons/petlift.webp",
    demo: "pet",
    keeper: 0,
    note: "tap the dog",
    frames: [
      { type: "demo" },
      { type: "shot", src: "assets/shots/petlift-1.webp", alt: "Three pets standing on top of the Mac Dock." },
      { type: "shot", src: "assets/shots/petlift-2.webp", alt: "A puppy lifted out of a photo by PetLift." },
    ],
  },
];

// Blank frames at the end of the roll: apps still to come.
window.UNEXPOSED = 2;
