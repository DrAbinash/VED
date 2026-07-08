export const siteConfig = {
  person: {
    name: "Ved Singh",
    title: "Final Year MBBS Student",
    tagline: "Aspiring Doctor · Traveller · Photographer · Chef",
    shortBio:
      "Final year MBBS student at Dr. D. Y. Patil Medical College, Pune. Passionate about solo travelling, photography, and cooking — exploring the world one frame and one flavour at a time.",
    longBio: [
      "Namaste! I'm Ved Singh, a final year MBBS student at Dr. D. Y. Patil Medical College, Pune. My journey in medicine has taught me the profound art of healing, empathy, and the resilience of the human spirit. Every patient encounter reinforces my belief that being a doctor is not just a profession — it's a calling.",
      "Beyond the walls of the hospital, I wear many hats. I'm a solo traveller who finds solace in the mountains and wisdom in the streets of unknown cities. Through my camera lens, I capture the poetry of everyday life — the golden hours, the candid smiles, the quiet moments that most people walk past.",
      "In the kitchen, I express my creativity through flavours, experimenting with recipes that nourish both body and soul. As a future doctor, understanding nutrition is second nature, but cooking is where that knowledge becomes art.",
    ],
    heroPhoto: "/gallery/WhatsApp Image 2026-07-08 at 15.08.45.jpeg",
    aboutPhoto: "/gallery/WhatsApp Image 2026-07-08 at 15.08.46 (1).jpeg",
    college: "Dr. D. Y. Patil Medical College, Pune",
    location: "Pune, Maharashtra, India",
  },
  interests: [
    {
      icon: "Plane",
      title: "Solo Travelling",
      description:
        "From the misty hills of the Western Ghats to the golden deserts of Rajasthan, every journey is a story waiting to be lived. Travelling solo isn't just about destinations — it's about discovering who you become when no one's watching.",
      color: "amber",
    },
    {
      icon: "Camera",
      title: "Photography",
      description:
        "Through the lens, ordinary moments become extraordinary. Whether it's the golden hour light on a mountain pass or the quiet stillness of a patient's smile — every frame tells a story worth preserving.",
      color: "rose",
    },
    {
      icon: "ChefHat",
      title: "Cooking",
      description:
        "The kitchen is a sanctuary where science meets soul. From perfecting the classic dal to experimenting with global cuisines, every dish is a celebration of flavours, health, and the joy of feeding others.",
      color: "emerald",
    },
  ],
  gallery: [
    { src: "/gallery/WhatsApp Image 2026-07-08 at 15.08.45.jpeg", alt: "Travel moment", span: "col-span-2 row-span-2" },
    { src: "/gallery/WhatsApp Image 2026-07-08 at 15.08.45 (1).jpeg", alt: "Adventures", span: "col-span-1 row-span-1" },
    { src: "/gallery/WhatsApp Image 2026-07-08 at 15.08.45 (2).jpeg", alt: "Exploring new places", span: "col-span-1 row-span-1" },
    { src: "/gallery/WhatsApp Image 2026-07-08 at 15.08.46.jpeg", alt: "Photography capture", span: "col-span-1 row-span-2" },
    { src: "/gallery/WhatsApp Image 2026-07-08 at 15.08.46 (1).jpeg", alt: "Beautiful scenery", span: "col-span-2 row-span-1" },
    { src: "/gallery/WhatsApp Image 2026-07-08 at 15.08.47.jpeg", alt: "Cooking creation", span: "col-span-1 row-span-1" },
    { src: "/gallery/WhatsApp Image 2026-07-08 at 15.08.47 (2).jpeg", alt: "Culinary art", span: "col-span-1 row-span-1" },
    { src: "/gallery/WhatsApp Image 2026-07-08 at 15.08.47 (3).jpeg", alt: "Food photography", span: "col-span-2 row-span-1" },
    { src: "/gallery/WhatsApp Image 2026-07-08 at 15.08.48.jpeg", alt: "Life in frames", span: "col-span-1 row-span-1" },
    { src: "/gallery/WhatsApp Image 2026-07-08 at 15.08.48 (2).jpeg", alt: "Captured moments", span: "col-span-1 row-span-1" },
  ],
  stats: [
    { label: "Places Explored", value: 15, suffix: "+" },
    { label: "Photos Captured", value: 5000, suffix: "+" },
    { label: "Recipes Tried", value: 200, suffix: "+" },
    { label: "MBBS Final Year", value: 5, suffix: ".5 yrs" },
  ],
  social: {
    instagram: "https://www.instagram.com/vedawsm/",
    foodInstagram: "https://www.instagram.com/food_ved_/",
    facebook: "",
    youtube: "",
    linkedin: "",
    twitter: "",
  },
  nav: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Interests", href: "#interests" },
    { label: "Gallery", href: "#gallery" },
    { label: "Connect", href: "#connect" },
  ],
  theme: { primary: "#0d9488", primaryDark: "#0f766e", accent: "#dc2626" },
} as const;

export type SiteConfig = typeof siteConfig;