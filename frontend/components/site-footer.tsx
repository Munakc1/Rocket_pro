import Link from "next/link";

const quickLinks = [
  { label: "NEPSE Data", href: "/market" },
  { label: "Latest News", href: "/news" },
  { label: "About", href: "/about" },
  { label: "Training", href: "/training" },
  { label: "Contact", href: "/contact" },
];

const usefulLinks = [
  { label: "Live Market", href: "/market" },
  { label: "Indices", href: "/market/indices" },
  { label: "Summary", href: "/market/summary" },
  { label: "Today's Share Price", href: "/market/today" },
  { label: "Market Movers", href: "/movers" },
];

export function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-[#d5d5d5] bg-[#f4fff8] px-6 py-16 md:px-[104px] md:py-16">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-14 md:flex-row md:justify-between">
        {/* =====================================================
            BRAND COLUMN
        ====================================================== */}
        <div className="max-w-[520px] shrink-0">
          {/* Logo + Brand */}
          <Link href="/" className="mb-7 flex items-center gap-2">
            {/* Rocket Logo */}
            <div
              className="
                relative
                h-[62px]
                w-[62px]
                sm:h-[70px]
                sm:w-[70px]
                lg:h-[78px]
                lg:w-[78px]
              "
            >
              <svg
                viewBox="0 0 100 100"
                className="absolute left-0 top-0 h-full w-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {/* Rocket body */}
                <path
                  d="
                    M74.5 7
                    C57 7.5 42 17 31 31
                    L17 49
                    L31 63
                    L49 49
                    C63 38 72.5 23 74.5 7Z
                  "
                  fill="#08A957"
                />

                {/* Rocket window */}
                <circle cx="57.5" cy="27" r="9" fill="white" />

                {/* Left fin */}
                <path
                  d="
                    M31 48
                    C20 51 13 58 10 72
                    C20 68 29 64 37 57
                    Z
                  "
                  fill="#08A957"
                />

                {/* Bottom fin */}
                <path
                  d="
                    M49 57
                    C46 69 39 79 28 88
                    C27 76 31 66 39 57
                    Z
                  "
                  fill="#08A957"
                />

                {/* Fire */}
                <path
                  d="
                    M29 64
                    C22 69 17 78 15 89
                    C25 86 34 81 39 72
                    Z
                  "
                  fill="#ED2024"
                />
              </svg>
            </div>

            {/* Brand Name */}
            <div className="flex flex-col leading-none">
              <span className="font-['Space_Grotesk'] text-[34px] font-bold text-black">
                Rocket
              </span>

              <span className="text-right font-['Space_Grotesk'] text-[26px] font-bold text-[#e31b1b]">
                प्रो
              </span>
            </div>
          </Link>

          {/* Description */}
          <p className="mb-10 font-['Poppins'] text-xl leading-relaxed text-[#353535]">
            Real-time market insights, tools &amp; analytics designed to help
            investors make smarter decisions.
          </p>

          {/* Social */}
          <h4 className="mb-5 font-['Space_Grotesk'] text-xl font-bold text-black">
            Connect With Us
          </h4>

          <div className="flex gap-3.5">
            {/* Facebook */}
            <a
              href="#"
              aria-label="Facebook"
              className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-[#0aa852]"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-white"
                aria-hidden="true"
              >
                <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="#"
              aria-label="YouTube"
              className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-[#0aa852]"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-white"
                aria-hidden="true"
              >
                <path d="M23 12s0-3.6-.5-5.3c-.3-1-1.1-1.8-2.1-2.1C18.7 4 12 4 12 4s-6.7 0-8.4.6c-1 .3-1.8 1.1-2.1 2.1C1 8.4 1 12 1 12s0 3.6.5 5.3c.3 1.7 1.1 1.8 2.1 2.1C5.3 20 12 20 12 20s6.7 0 8.4-.6c1-.3 1.8-1.1 2.1-2.1.5-1.7.5-5.3.5-5.3ZM9.8 15.5v-7l6 3.5-6 3.5Z" />
              </svg>
            </a>
          </div>
        </div>

        {/* =====================================================
            LINK COLUMNS
        ====================================================== */}
        <div className="flex flex-wrap gap-16 lg:gap-20">
          {/* Quick Links */}
          <div>
            <h4 className="mb-[30px] font-['Space_Grotesk'] text-xl font-bold text-black">
              Quick Links
            </h4>

            <ul className="flex flex-col gap-[18px]">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-['Space_Grotesk'] text-base text-black transition-colors hover:text-[#0aa852]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="mb-[30px] font-['Space_Grotesk'] text-xl font-bold text-black">
              Useful Links
            </h4>

            <ul className="flex flex-col gap-[18px]">
              {usefulLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-['Space_Grotesk'] text-base text-black transition-colors hover:text-[#0aa852]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h4 className="mb-[30px] font-['Space_Grotesk'] text-xl font-bold text-black">
              Get in Touch
            </h4>

            <div className="flex flex-col gap-[18px]">
              {/* Location */}
              <div className="flex items-center gap-2 text-base text-black">
                <svg
                  viewBox="0 0 24 24"
                  strokeWidth={1.6}
                  className="h-[18px] w-[18px] shrink-0 fill-none stroke-black"
                  aria-hidden="true"
                >
                  <path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>

                <span className="font-['Space_Grotesk']">
                  Jhapa, Nepal
                </span>
              </div>

              {/* Phone */}
              <a
                href="tel:9704069636"
                className="flex items-center gap-2 text-base text-black transition-colors hover:text-[#0aa852]"
              >
                <svg
                  viewBox="0 0 24 24"
                  strokeWidth={1.6}
                  className="h-[18px] w-[18px] shrink-0 fill-none stroke-black"
                  aria-hidden="true"
                >
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .6 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.4c.9.3 1.9.5 2.9.6a2 2 0 0 1 1.6 2Z" />
                </svg>

                <span className="font-['Space_Grotesk']">
                  9704069636
                </span>
              </a>

              {/* Email */}
              <a
                href="mailto:info@sharerocketpro.com.np"
                className="flex items-center gap-2 text-base text-black transition-colors hover:text-[#0aa852]"
              >
                <svg
                  viewBox="0 0 24 24"
                  strokeWidth={1.6}
                  className="h-[18px] w-[18px] shrink-0 fill-none stroke-black"
                  aria-hidden="true"
                >
                  <rect
                    x="2"
                    y="4"
                    width="20"
                    height="16"
                    rx="2"
                  />
                  <path d="m2 6 10 7 10-7" />
                </svg>

                <span className="font-['Space_Grotesk']">
                  info@sharerocketpro.com.np
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM LINE
      ====================================================== */}
      <hr className="mx-auto mt-14 max-w-[1440px] border-t border-[#d5d5d5]" />

      <p className="mx-auto mt-6 max-w-[1440px] font-['Space_Grotesk'] text-lg text-black">
        © 2026 ShareRocketPro. All Rights Reserved{" "}
        <span className="mx-2">|</span>{" "}
        <Link
          href="/privacy-policy"
          className="transition-colors hover:text-[#0aa852]"
        >
          Privacy Policy
        </Link>{" "}
        <span className="mx-2">|</span>{" "}
        <Link
          href="/delete-account"
          className="transition-colors hover:text-[#0aa852]"
        >
          Delete Account
        </Link>
      </p>
    </footer>
  );
}