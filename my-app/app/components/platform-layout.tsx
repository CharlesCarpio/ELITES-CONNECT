import Link from "next/link";
import { SiteFooter, SiteHeader } from "./site-chrome";

type PlatformLayoutProps = {
  activePath: string;
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

export function PlatformLayout({
  activePath,
  eyebrow,
  title,
  description,
  children,
}: PlatformLayoutProps) {
  return (
    <>
      <SiteHeader activePath={activePath} />
      <main id="main-content" className="platform-main">
        <div className="wrap platform-page">
          <Link className="back-link" href="/">← Back to home</Link>
          <header className="platform-page-heading">
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p>{description}</p>
          </header>
          <div className="platform-content">{children}</div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}