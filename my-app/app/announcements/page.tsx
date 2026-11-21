import { PlatformLayout } from "../components/platform-layout";

const announcements = [
  {
    date: "November 5, 2026",
    dateTime: "2026-11-05",
    category: "Community",
    title: "Community gathering this month",
    description: "Members are invited to our monthly gathering. Details and registration are available through the organization office.",
  },
  {
    date: "October 22, 2026",
    dateTime: "2026-10-22",
    category: "Notice",
    title: "Membership directory is being updated",
    description: "Please confirm your current contact details with the team so members can stay connected.",
  },
  {
    date: "October 8, 2026",
    dateTime: "2026-10-08",
    category: "Reminder",
    title: "Book donations are welcome",
    description: "New and gently used books can be dropped off at the community office during regular hours.",
  },
];

export default function AnnouncementsPage() {
  return (
    <PlatformLayout
      activePath="/announcements"
      eyebrow="The latest from our community"
      title="Announcements"
      description="News, notices, and important updates from ELITES CONNECT."
    >
      <div className="announcement-list">
        {announcements.map((announcement, index) => (
          <article className="announcement-row" key={announcement.dateTime}>
            <span className="row-index">0{index + 1}</span>
            <div className="row-content">
              <div className="row-meta"><span className="category-tag">{announcement.category}</span><time dateTime={announcement.dateTime}>{announcement.date}</time></div>
              <h2>{announcement.title}</h2>
              <p>{announcement.description}</p>
            </div>
            <span className="row-accent" aria-hidden="true">↗</span>
          </article>
        ))}
      </div>
    </PlatformLayout>
  );
}