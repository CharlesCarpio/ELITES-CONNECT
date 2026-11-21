import Link from "next/link";
import { SiteFooter, SiteHeader } from "./site-chrome";

type PlatformLayoutProps = {
  activePath: string;
  eyebrow: string;
  title: string;
  description: string;
  hidePageIntro?: boolean;
  centerHeading?: boolean;
  children: React.ReactNode;
};

export function PlatformLayout({
  activePath,
  eyebrow,
  title,
  description,
  hidePageIntro = false,
  centerHeading = false,
  children,
}: PlatformLayoutProps) {
  return (
    <>
      <SiteHeader activePath={activePath} />
      <main id="main-content" className="platform-main">
        <div className="wrap platform-page">
          {!hidePageIntro && (
            <>
              <Link className="back-link" href="/">← Back to home</Link>
              <header
                className={`platform-page-heading${centerHeading ? " platform-page-heading-centered" : ""}`}
              >
                <p className="eyebrow">{eyebrow}</p>
                <h1>{title}</h1>
                <p>{description}</p>
              </header>
            </>
          )}
          <div className="platform-content">{children}</div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}