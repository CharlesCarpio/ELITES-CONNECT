function Logo({ large = false }: { large?: boolean }) {
  return (
    <svg
      className={large ? "logo big" : "logo"}
      viewBox="0 0 40 40"
      role="img"
      aria-label="ELITES CONNECT logo"
    >
      <rect width="40" height="40" rx="8" fill="var(--accent)" />
      <path
        d="M10 29V11h8a6 6 0 0 1 0 12h-3"
        fill="none"
        stroke="var(--accent-ink)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="28" cy="28" r="3" fill="var(--accent-ink)" />
    </svg>
  );
}

function LandscapePlaceholder({ label }: { label: string }) {
  return (
    <svg className="thumb" viewBox="0 0 160 100" role="img" aria-label={label}>
      <rect width="160" height="100" fill="var(--line)" opacity=".45" />
      <circle cx="122" cy="30" r="11" fill="var(--accent)" />
      <path
        d="M0 78 35 50 60 70 95 40 130 70 160 56V100H0Z"
        fill="var(--muted)"
        opacity=".35"
      />
      <path
        d="M0 90Q40 70 80 84T160 78V100H0Z"
        fill="var(--muted)"
        opacity=".6"
      />
    </svg>
  );
}

function MemberAvatar({ initials }: { initials: string }) {
  return <span className="avatar" aria-hidden="true">{initials}</span>;
}

const navigation = [
  { href: "#elites", label: "About" },
  { href: "#announcements", label: "Announcements" },
  { href: "#events", label: "Events" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Home() {
  return (
    <>
      <header className="site-header" id="home">
        <div className="wrap header-inner">
          <a className="brand" href="#home" aria-label="ELITES CONNECT home">
            <Logo />
            <span>ELITES CONNECT</span>
          </a>
          <nav aria-label="Main navigation">
            {navigation.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </nav>
        </div>
      </header>

      <main id="main-content">
        <div className="wrap layout">
          <div className="content">
            <section className="hero" aria-labelledby="hero-title">
              <p className="eyebrow">A community that moves forward together</p>
              <h1 id="hero-title">Everything the organization is doing, in one place.</h1>
              <p>Read announcements, find events and meetings, and follow project updates.</p>
              <a className="btn" href="#events">See upcoming events <span aria-hidden="true">→</span></a>
            </section>

            <section id="elites" className="section about" aria-labelledby="about-title">
              <div className="section-heading">
                <Logo large />
                <div>
                  <p className="eyebrow">Who we are</p>
                  <h2 id="about-title">ELITES CONNECT</h2>
                </div>
              </div>
              <div className="about-grid">
                <div className="block">
                  <h3>Goal</h3>
                  <p>To connect members, share timely announcements, and make events, meetings, and projects easy to find in one place.</p>
                </div>
                <div className="block">
                  <h3>Mission</h3>
                  <p>To bring our community together through clear communication, useful events, and projects that benefit our members.</p>
                </div>
                <div className="block">
                  <h3>Vision</h3>
                  <p>A connected, informed, and active community where every member can take part and grow.</p>
                </div>
              </div>
            </section>

            <section id="announcements" className="section" aria-labelledby="announcements-title">
              <div className="section-title">
                <div>
                  <p className="eyebrow">The latest</p>
                  <h2 id="announcements-title">Announcements</h2>
                </div>
              </div>
              <article className="item has-img">
                <div className="announcement-art" aria-hidden="true">
                  <LandscapePlaceholder label="Community announcement" />
                </div>
                <div>
                  <time dateTime="2026-11-05">November 5, 2026</time>
                  <h3>Community gathering this month</h3>
                  <p>Members are invited to our monthly gathering. Details and registration are available through the organization office.</p>
                </div>
              </article>
            </section>

            <section id="events" className="section" aria-labelledby="events-title">
              <div className="section-title">
                <div>
                  <p className="eyebrow">Save the date</p>
                  <h2 id="events-title">Upcoming events</h2>
                </div>
              </div>
              <article className="item event-item">
                <div className="date-tile"><span>NOV</span><strong>18</strong></div>
                <div><time dateTime="2026-11-18">November 18, 2026</time><h3>Monthly members’ meeting</h3><p>6:00 PM · Community Hall</p></div>
              </article>
              <article className="item event-item">
                <div className="date-tile"><span>NOV</span><strong>28</strong></div>
                <div><time dateTime="2026-11-28">November 28, 2026</time><h3>Community service day</h3><p>8:30 AM · Meet at the main office</p></div>
              </article>
            </section>

            <section id="projects" className="section" aria-labelledby="projects-title">
              <div className="section-title">
                <div>
                  <p className="eyebrow">Progress worth sharing</p>
                  <h2 id="projects-title">Project updates</h2>
                </div>
              </div>
              <article className="item has-img">
                <LandscapePlaceholder label="Library project placeholder image" />
                <div><time dateTime="2026-10-30">October 30, 2026</time><h3>Library project reaches halfway</h3><p>Shelving is installed. Book donations are still welcome.</p></div>
              </article>
              <article className="item has-img">
                <LandscapePlaceholder label="Scholarship placeholder image" />
                <div><time dateTime="2026-10-15">October 15, 2026</time><h3>Scholarship recipients named</h3><p>Twelve students received support this term.</p></div>
              </article>
              <article className="item has-img">
                <LandscapePlaceholder label="Project report placeholder image" />
                <div><time dateTime="2026-09-30">September 30, 2026</time><h3>Q3 report published</h3><p>Read the full report at the office or request a copy.</p></div>
              </article>
            </section>
          </div>

          <aside id="contact" aria-label="Contact and officers">
            <div className="contact-intro">
              <p className="eyebrow">We’d love to hear from you</p>
              <h2>Contact</h2>
              <p>Email <a href="mailto:hello@example.org">hello@example.org</a> to register for an event or ask a question.</p>
            </div>
            <div className="officers-section">
              <h2>Officers</h2>
              <ul className="members officer-list">
                <li><MemberAvatar initials="AR" /><div>Ana Reyes<small>President</small></div></li>
                <li><MemberAvatar initials="PR" /><div>Paolo Ramos<small>Vice President</small></div></li>
                <li><MemberAvatar initials="MS" /><div>Mark Santos<small>Secretary</small></div></li>
                <li><MemberAvatar initials="LC" /><div>Liza Cruz<small>Treasurer</small></div></li>
              </ul>
            </div>
          </aside>
        </div>
      </main>

      <footer>
        <div className="wrap footer-inner">
          <span>© 2026 ELITES CONNECT</span>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
