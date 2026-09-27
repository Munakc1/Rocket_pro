export type NavItem = { label: string; href: string };

export const nepseLinks: NavItem[] = [
  { label: "Indices", href: "/market/indices" },
  { label: "Market Summary", href: "/market/summary" },
  { label: "Today's Share Price", href: "/market/today" },
  { label: "Sector Performance", href: "/market/sectors" },
  { label: "Market Breadth", href: "/market/breadth" },
];

export const mainLinks: NavItem[] = [
  { label: "Latest News", href: "/news" },
  { label: "Live Market", href: "/market" },
  { label: "Market Movers", href: "/movers" },
  { label: "Training", href: "/training" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const authLinks = {
  login: { label: "Login", href: "/login" },
  register: { label: "Sign Up", href: "/register" },
};