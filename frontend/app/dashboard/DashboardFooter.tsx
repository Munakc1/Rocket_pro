
import Link from "next/link";
import {
  CalendarDays,
  CircleHelp,
  Mail,
  ShieldCheck,
} from "lucide-react";

const footerLinks = [
  {
    label: "Help",
    href: "/dashboard/help",
    icon: CircleHelp,
  },
  {
    label: "Market Calendar",
    href: "/market/calendar",
    icon: CalendarDays,
  },
  {
    label: "Contact",
    href: "/contact",
    icon: Mail,
  },
];

export default function DashboardFooter() {
  return (
    <footer className="border-t border-[#d5d5d5] bg-[#f4fff8]">
      <div className="mx-auto flex min-h-[58px] w-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex shrink-0 items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#dcffec]">
            <span className="text-xs font-bold text-[#0aa852]">R</span>
          </div>

          <p className="whitespace-nowrap text-xs font-semibold text-[#000]">
            Rocket <span className="text-[#0aa852]">प्रो</span>
          </p>

          <span className="hidden text-[11px] text-[#656565] sm:inline">
            © {new Date().getFullYear()} Rocket Pro
          </span>
        </div>

        {/* Links */}
        <nav
          aria-label="Dashboard footer navigation"
          className="hidden items-center gap-5 md:flex"
        >
          {footerLinks.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  whitespace-nowrap
                  text-[11px]
                  font-medium
                  text-[#656565]
                  transition-colors
                  hover:text-[#0aa852]
                "
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Market Information */}
        <div className="flex shrink-0 items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#dcffec]">
            <ShieldCheck
              className="h-3.5 w-3.5 text-[#0aa852]"
              strokeWidth={2}
            />
          </span>

          <div className="hidden sm:block">
            <p className="whitespace-nowrap text-[11px] font-medium text-[#000]">
              Nepal Market
            </p>
            <p className="whitespace-nowrap text-[10px] text-[#656565]">
              NEPSE • Informational use
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

