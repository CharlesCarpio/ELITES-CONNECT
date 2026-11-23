import Image from "next/image";
import Link from "next/link";

const navigation = [
  { href: "/announcements", label: "ANNOUNCEMENTS" },
  { href: "/events", label: "EVENTS" },
  { href: "/meetings", label: "Meetings" },
  { href: "/officers", label: "Officers" },
  { href: "/admin", label: "ADMIN" },
];

function Logo() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <Image
        src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/ccs-elites-logo.png`}
        alt=""
        width={64}
        height={64}
        priority
        unoptimized
      />
    </span>
  );
}

export function SiteHeader({ activePath }: { activePath: string }) {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link className="brand" href="/about" aria-label="About ELITES CONNECT">
          <Logo />
          <span className="brand-name">ELITES<span>CONNECT</span></span>
        </Link>
        <nav aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={activePath === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link className="nav-home" href="/" aria-current={activePath === "/" ? "page" : undefined}>
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <Link className="brand footer-brand" href="/">
          <Logo />
          <span className="brand-name">ELITES<span>CONNECT</span></span>
        </Link>
        <p>Connected by purpose. Stronger together.</p>
        <span className="footer-copyright">© 2026 ELITES CONNECT</span>
      </div>
    </footer>
  );
}