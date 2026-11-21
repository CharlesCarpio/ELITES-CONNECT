import Link from "next/link";
import { PlatformLayout } from "../components/platform-layout";

type Officer = {
  initials: string;
  name: string;
  role: string;
};

const president: Officer = {
  initials: "CD",
  name: "Charles Andrei F. De Leon",
  role: "President",
};

const executive: Officer[] = [
  { initials: "KA", name: "Khmer Zheldon C. Aquino", role: "VP for Internal Affairs" },
  { initials: "MC", name: "Marina C. Camaso", role: "VP for External Affairs" },
  { initials: "CG", name: "Chelsea Krizelle C. Garcia", role: "Secretary" },
  { initials: "PB", name: "Precious Leinara G. Bongala", role: "Assistant Secretary" },
  { initials: "SP", name: "Shawn Nicholson R. Perez", role: "Treasurer" },
  { initials: "GJ", name: "Gian Lanz B. Jose", role: "Auditor" },
  { initials: "AM", name: "Aaron Kerbie M. Malaon", role: "Business Manager" },
  { initials: "SD", name: "Sophia Rainne O. Dumayas", role: "Public Information Officer" },
];

const representatives = [
  {
    year: "1st Year",
    members: [
      { initials: "DA", name: "Daniel James D. Avelino", role: "1st Year Representative" },
      { initials: "TO", name: "Trisha Marie D. Olea", role: "1st Year Representative" },
      { initials: "JR", name: "Jayrah Nicole O. Reyes", role: "1st Year Representative" },
      { initials: "AV", name: "Ansttly P. Viernez", role: "1st Year Representative" },
    ],
  },
  {
    year: "2nd Year",
    members: [
      { initials: "PB", name: "Pretzel Marie G. Briones", role: "2nd Year Representative" },
      { initials: "JM", name: "Jordan A. Monton", role: "2nd Year Representative" },
      { initials: "LF", name: "Lhord Jian Herwin O. Fernandez", role: "2nd Year Representative" },
      { initials: "HM", name: "Heili Grace A. Montallana", role: "2nd Year Representative" },
    ],
  },
  {
    year: "3rd Year",
    members: [
      { initials: "JL", name: "John Lloyd G. Landero", role: "3rd Year Representative" },
      { initials: "EB", name: "Efren A. Barona Jr.", role: "3rd Year Representative" },
      { initials: "AB", name: "Ardy F. Bagnas", role: "3rd Year Representative" },
    ],
  },
  {
    year: "4th Year",
    members: [
      { initials: "FA", name: "Franchesca Lei M. Arcega", role: "4th Year Representative" },
      { initials: "PD", name: "Paul Jan V. Dilag", role: "4th Year Representative" },
      { initials: "AS", name: "Aaron Paul H. Sario", role: "4th Year Representative" },
    ],
  },
];

function OfficerCard({ officer, featured = false }: { officer: Officer; featured?: boolean }) {
  return (
    <article className={`officer-card${featured ? " officer-card-featured" : ""}`}>
      <span className="officer-avatar" aria-hidden="true">{officer.initials}</span>
      <div>
        <h3>{officer.name}</h3>
        <p>{officer.role}</p>
      </div>
    </article>
  );
}

export default function OfficersPage() {
  const officerCount = 1 + executive.length + representatives.reduce((count, group) => count + group.members.length, 0);

  return (
    <PlatformLayout
      activePath="/officers"
      eyebrow="Leadership structure"
      title="Our officers"
      description="Meet the people guiding ELITES CONNECT throughout the 2026–2027 term."
    >
      <section className="family-tree-section" aria-labelledby="family-tree-heading">
        <div className="family-tree-heading">
          <div>
            <p className="eyebrow">2026–2027 Organization</p>
            <h2 id="family-tree-heading">ELITES leadership</h2>
          </div>
          <span className="family-tree-count">{String(officerCount).padStart(2, "0")} OFFICERS</span>
        </div>

        <div className="family-tree-scroll" role="region" aria-label="ELITES officers family tree" tabIndex={0}>
          <div className="family-tree">
            <div className="tree-root">
              <OfficerCard officer={president} featured />
            </div>

            <div className="tree-level executive-level">
              <p className="tree-level-label">Executive Officers</p>
              <div className="executive-grid">
                {executive.map((officer) => (
                  <OfficerCard officer={officer} key={officer.initials + officer.name} />
                ))}
              </div>
            </div>

            <div className="tree-level representative-level">
              <p className="tree-level-label">Student Representatives</p>
              <div className="year-grid">
                {representatives.map((group) => (
                  <section className="year-group" key={group.year}>
                    <h3>{group.year} Representatives</h3>
                    <div className="year-members">
                      {group.members.map((officer) => (
                        <OfficerCard officer={officer} key={officer.initials + officer.name} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="family-tree-key" aria-label="Family tree key">
          <span><i className="key-line" /> Leadership hierarchy</span>
          <span><i className="key-dot" /> 2026–2027 term</span>
        </div>
      </section>

      <section className="officers-cta" aria-label="Get involved">
        <div>
          <p className="eyebrow">Your place is here, too</p>
          <h2>Good communities grow together.</h2>
        </div>
        <Link className="button button-orange" href="/events">
          Join an upcoming event <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </PlatformLayout>
  );
}