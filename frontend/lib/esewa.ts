// lib/esewa.ts  (frontend-only, TEST MODE)
//
// .env.local (optional, these are the test defaults):
// NEXT_PUBLIC_ESEWA_FORM_URL=https://rc-epay.esewa.com.np/api/epay/main/v2/form
// NEXT_PUBLIC_ESEWA_STATUS_URL=https://rc.esewa.com.np/api/epay/transaction/status/
// NEXT_PUBLIC_ESEWA_PRODUCT_CODE=EPAYTEST
// NEXT_PUBLIC_ESEWA_SECRET_KEY=8gBm/:&EnhH.1/q
//
// WARNING: anything starting with NEXT_PUBLIC_ is visible to everyone.
// Use ONLY the public test key here. Never put your live secret key in the frontend.

export const ESEWA_CONFIG = {
  formUrl:
    process.env.NEXT_PUBLIC_ESEWA_FORM_URL ||
    "https://rc-epay.esewa.com.np/api/epay/main/v2/form",
  statusUrl:
    process.env.NEXT_PUBLIC_ESEWA_STATUS_URL ||
    "https://rc.esewa.com.np/api/epay/transaction/status/",
  productCode: process.env.NEXT_PUBLIC_ESEWA_PRODUCT_CODE || "EPAYTEST",
  secretKey: process.env.NEXT_PUBLIC_ESEWA_SECRET_KEY || "8gBm/:&EnhH.1/q",
};

/* HMAC-SHA256 -> base64, using the browser's Web Crypto API
   (works on https:// and http://localhost) */
async function hmacBase64(message: string, secret: string) {
  const enc = new TextEncoder();

  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));

  let binary = "";
  new Uint8Array(sig).forEach((b) => (binary += String.fromCharCode(b)));

  return btoa(binary);
}

/* Signs the fields named in signedFieldNames, in that exact order */
export async function signFields(
  fields: Record<string, string>,
  signedFieldNames: string
) {
  const message = signedFieldNames
    .split(",")
    .map((name) => `${name}=${fields[name]}`)
    .join(",");

  return hmacBase64(message, ESEWA_CONFIG.secretKey);
}

/* Builds the complete form that gets POSTed to eSewa */
export async function buildEsewaForm(params: {
  amount: number;
  transactionUuid: string;
  origin: string;
}) {
  const signedFieldNames = "total_amount,transaction_uuid,product_code";

  const formData: Record<string, string> = {
    amount: String(params.amount),
    tax_amount: "0",
    total_amount: String(params.amount),
    transaction_uuid: params.transactionUuid,
    product_code: ESEWA_CONFIG.productCode,
    product_service_charge: "0",
    product_delivery_charge: "0",
    success_url: `${params.origin}/payment/success`,
    failure_url: `${params.origin}/payment/failure`,
    signed_field_names: signedFieldNames,
  };

  formData.signature = await signFields(formData, signedFieldNames);

  return formData;
}