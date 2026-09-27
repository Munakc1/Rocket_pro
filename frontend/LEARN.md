# 🧭 Learn rocket_pro

You scaffolded **Marketplace / commerce** with 8 feature add-ons:
`auth-pages` · `analytics` · `payments` · `email` · `i18n` · `quality` · `uploads` · `notify`.

Work through the checklist below — each item is a real next step.

## Auth & account `(auth-pages)`

Account management on top of the built-in login/register: edit profile, change password, and TOTP two-factor auth (2FA) with backup codes. Full-stack.

- [ ] Sign in, then open http://localhost:3000/account/settings.
- [ ] Enable 2FA: add the shown secret to an authenticator app (Google Authenticator, Authy…), then verify.
- [ ] Backup codes are shown once on enable — store them somewhere safe.

Learn more → https://developer.lacspace.com/packages/otp

## Analytics `(analytics)`

Privacy-first, cookieless web analytics: a tracker (@lacspace/analytics-lite), a collector that stores events in MongoDB, and a dashboard. Full-stack.

- [ ] Add <Analytics /> to app/layout.tsx (inside <body>) to start tracking page views.
- [ ] Browse your site, then open http://localhost:3000/analytics (sign in) to see the dashboard.
- [ ] It's cookieless and stores no personal data — privacy-first by default.

Learn more → https://developer.lacspace.com/packages/analytics-lite

## Payments (Nepal) `(payments)`

A checkout wired to eSewa & Khalti — orders, the signed eSewa flow (works in TEST with NO credentials), Khalti when keyed, integer-safe money. Full-stack.

- [ ] Sign in, then open http://localhost:3000/checkout and pay with eSewa — it works in TEST mode with no credentials.
- [ ] Enable Khalti by setting KHALTI_SECRET in .env (get a test key from https://khalti.com).
- [ ] Go live: set ESEWA_MERCHANT_CODE + ESEWA_SECRET (and a live KHALTI_SECRET).

Learn more → https://developer.lacspace.com/packages/esewa

## Email `(email)`

Transactional email — a ready mail service (@lacspace/mailer) with beautiful templates + address validation. Logs to the console until you add SMTP. Full-stack.

- [ ] Sign in, then open http://localhost:3000/email-test and send yourself a sample email.
- [ ] With no SMTP_* set, the email is printed to the API console (dev). Set SMTP_* in .env to send for real.
- [ ] Reuse the helpers in backend/src/mail/mailer.ts: sendWelcome / sendVerify / sendReset.

Learn more → https://developer.lacspace.com/packages/mailer

## i18n (multi-language) `(i18n)`

Multi-language UI: a tiny runtime translator (t() + a language switcher) with English + Nepali locales, plus an i18n:check lint script.

- [ ] Wrap app/layout.tsx's <body> with <LanguageProvider> (from @/components/language-provider).
- [ ] Use it in a client component: const { t } = useT();  then {t("hello", { name })}.
- [ ] Add keys in locales/*.json, then lint them with `npm run i18n:check`.

Learn more → https://developer.lacspace.com/tools/i18n

## Quality & CI `(quality)`

One-command quality gates from the Lacspace dev-tools — bundle-size budget, dependency audit and fake fixtures — plus a ready GitHub Actions CI workflow.

- [ ] Run `npm run size:check` (bundle-size budget) and `npm run deps:audit` (dependency audit) — both fail loudly in CI.
- [ ] Generate sample data: `npm run fixtures:gen` → fixtures/users.json.
- [ ] The GitHub Actions workflow (.github/workflows/ci.yml) runs the checks on every push.

Learn more → https://developer.lacspace.com/tools/size

## File uploads `(uploads)`

Authenticated file uploads stored in MongoDB, served via signed, expiring URLs (@lacspace/signed-url). No S3 required. Full-stack.

- [ ] Sign in, then open http://localhost:3000/uploads and upload an image or file.
- [ ] Files are stored in MongoDB and served via signed, expiring links — no S3 required.
- [ ] For large files or production, swap the Mongo storage for disk or object storage.

Learn more → https://developer.lacspace.com/packages/signed-url

## Toast notifications `(notify)`

Beautiful in-app toast notifications (@lacspace/notify) — a <Toaster/> plus success/error/promise toasts, accessible and zero-config. Frontend, any template.

- [ ] Render <Toaster/> once in app/layout.tsx: import { Toaster } from '@/components/toaster'.
- [ ] Then call toast.success('Saved!') (or .error/.info/.promise) from any client component.
- [ ] See it live at http://localhost:3000/notify-demo.

Learn more → https://developer.lacspace.com/packages/notify

---

Every add-on is built from zero-dependency `@lacspace/*` packages. Browse them all → https://lacspace.com/packages
