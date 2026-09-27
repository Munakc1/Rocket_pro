import { tax, RATES } from "@lacspace/tax";
import { cheapestQuote, type ShippingMethod } from "@lacspace/shipping";
import { createOrder, orderNumber, type Order } from "@lacspace/order";
import { createInvoice, type Invoice } from "@lacspace/invoice";
import { Money } from "@lacspace/money";

/** Everything internal is integer paisa; this is the only currency the store uses. */
export const CURRENCY = "NPR";
/** Nepal VAT — 13% — straight from @lacspace/tax's RATES table. */
export const VAT_RATE = RATES.NP_VAT;

/** Format integer paisa for display, e.g. 45000 -> "NPR 450.00". */
export function formatMoney(minor: number): string {
  return Money.fromMinor(Math.round(minor), CURRENCY).format();
}

/** A cart line the quote engine understands. All amounts are integer paisa. */
export interface QuoteLine {
  id: string;
  name: string;
  unitPrice: number;
  qty: number;
  /** Per-unit weight in grams (drives shipping). */
  weight?: number;
}

/**
 * The shipping methods offered at checkout. @lacspace/shipping rates each one
 * against the shipment (weight / subtotal / item count); "standard" ships free
 * once the order is large enough.
 */
export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: "standard",
    label: "Standard (3-5 days)",
    strategy: "weight",
    bands: [
      { min: 0, max: 500, cost: 8000 },
      { min: 501, max: 2000, cost: 12000 },
      { min: 2001, cost: 20000 },
    ],
    freeOver: 500000,
    etaDays: [3, 5],
  },
  { id: "express", label: "Express (1-2 days)", strategy: "flat", flat: 25000, etaDays: [1, 2] },
];

/** The computed money breakdown for a cart. Every field is integer paisa. */
export interface Quote {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  itemCount: number;
  currency: string;
  shippingMethod: string;
  /** Paisa still needed to unlock free standard shipping (0 once unlocked). */
  freeShippingRemaining: number;
}

const asQty = (n: number): number => Math.max(0, Math.trunc(n));

/** Compose subtotal + 13% VAT (@lacspace/tax) + cheapest shipping (@lacspace/shipping). */
export function quote(lines: QuoteLine[]): Quote {
  const subtotal = lines.reduce((sum, l) => sum + l.unitPrice * asQty(l.qty), 0);
  const weight = lines.reduce((sum, l) => sum + (l.weight ?? 0) * asQty(l.qty), 0);
  const itemCount = lines.reduce((sum, l) => sum + asQty(l.qty), 0);

  const vat = tax(subtotal, { rate: VAT_RATE });
  const ship = cheapestQuote(SHIPPING_METHODS, { weight, subtotal, itemCount });
  const shipping = ship?.cost ?? 0;
  const total = subtotal + vat.tax + shipping;
  const freeOver = 500000;

  return {
    subtotal,
    tax: vat.tax,
    shipping,
    total,
    itemCount,
    currency: CURRENCY,
    shippingMethod: ship?.label ?? "-",
    freeShippingRemaining: Math.max(0, freeOver - subtotal),
  };
}

export interface BuildOrderInput {
  lines: QuoteLine[];
  customer?: { name?: string; email?: string };
  paymentMethod: string;
  /** Sequence number for the human-facing order number. */
  seq?: number;
}

export interface BuiltOrder {
  order: Order;
  invoice: Invoice;
  quote: Quote;
}

/** Build an immutable Order (+ Invoice) from cart lines. Used by the checkout API. */
export function buildOrder(input: BuildOrderInput): BuiltOrder {
  const q = quote(input.lines);
  const seq = input.seq ?? Math.floor(Math.random() * 9000) + 1000;
  const number = orderNumber(seq, { prefix: "BZR" });

  const order = createOrder({
    number,
    currency: CURRENCY,
    lines: input.lines.map((l) => ({ sku: l.id, name: l.name, unitPrice: l.unitPrice, qty: asQty(l.qty) })),
    tax: q.tax,
    shipping: q.shipping,
    customer: input.customer,
    meta: { paymentMethod: input.paymentMethod, shippingMethod: q.shippingMethod },
  });

  const invoice = createInvoice({
    number: number.replace("BZR", "INV"),
    currency: CURRENCY,
    seller: { name: "LSBazaar", email: "orders@example.com" },
    buyer: { name: input.customer?.name ?? "Guest", email: input.customer?.email },
    lines: input.lines.map((l) => ({ description: l.name, qty: asQty(l.qty), unitPrice: l.unitPrice, taxRate: VAT_RATE })),
    status: "issued",
    issuedAt: Date.now(),
    notes: "Paid via " + input.paymentMethod + ". Shipping: " + q.shippingMethod + ".",
  });

  return { order, invoice, quote: q };
}
