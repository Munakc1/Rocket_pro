// The catalogue for LSBazaar. Swap this for a database or CMS —
// every price is an integer in **paisa** (minor units), so there is never a
// floating-point rounding bug. NPR 450.00 is written as 45000.

export interface Product {
  slug: string;
  name: string;
  /** Price in integer minor units (paisa). */
  price: number;
  /** A placeholder visual — swap for a real image URL when you have one. */
  emoji: string;
  /** Optional image URL (falls back to the emoji tile). */
  image?: string;
  blurb: string;
  /** Shipping weight in grams — drives the weight-based shipping rate. */
  weight: number;
}

export const PRODUCTS: Product[] = [
  { slug: "himalayan-gold-tea", name: "Himalayan Gold Tea", price: 45000, emoji: "\u{1F375}", blurb: "Hand-picked orthodox black tea from the high hills — bright, malty and endlessly re-steepable.", weight: 250 },
  { slug: "lokta-notebook", name: "Lokta Paper Notebook", price: 68000, emoji: "\u{1F4D3}", blurb: "A5 notebook bound in handmade lokta paper. 160 pages that take fountain-pen ink beautifully.", weight: 320 },
  { slug: "pashmina-scarf", name: "Pashmina Scarf", price: 320000, emoji: "\u{1F9E3}", blurb: "Feather-light, ethically sourced pashmina, hand-loomed in a natural undyed grey.", weight: 180 },
  { slug: "singing-bowl", name: "Hand-hammered Singing Bowl", price: 540000, emoji: "\u{1F514}", blurb: "A seven-metal bowl with a long, resonant hum. Comes with a wooden striker and cushion.", weight: 900 },
  { slug: "ceramic-mug", name: "Glazed Ceramic Mug", price: 52000, emoji: "\u2615", blurb: "A chunky, wheel-thrown mug in a speckled reactive glaze. Holds a generous 350ml.", weight: 420 },
  { slug: "wool-socks", name: "Merino Wool Socks", price: 38000, emoji: "\u{1F9E6}", blurb: "Cushioned merino socks that stay warm even when damp — the ones you will keep reaching for.", weight: 120 },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
