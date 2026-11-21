import { LocalCommunityPosts } from "../components/local-community-posts";
import { PlatformLayout } from "../components/platform-layout";
import { formatPostDate } from "../lib/community-posts";

const featuredMeeting = {
  date: "2026-11-18",
  title: "Monthly members’ meeting",
  description: "Catch up with members, hear the latest updates, and help shape what comes next.",
  details: "6:00 PM · Community Hall",
};

export default function MeetingsPage() {
  const [year, month, day] = featuredMeeting.date.split("-").map(Number);
  const monthLabel = new Date(year, month - 1, day)
    .toLocaleDateString("en-US", { month: "short" });

  return (
    <PlatformLayout
      activePath="/meetings"
      eyebrow="ELITES gatherings"
      title="Meetings"
      description="Meeting schedules and updates from the ELITES community."
    >
      <div className="event-list">
        <article className="event-row">
          <div className="event-date" aria-label={formatPostDate(featuredMeeting.date)}>
            <span>{monthLabel}</span>
            <strong>{day}</strong>
            <small>{year}</small>
          </div>
          <div className="row-content">
            <time dateTime={featuredMeeting.date}>{formatPostDate(featuredMeeting.date)}</time>
            <h2>{featuredMeeting.title}</h2>
            <p>{featuredMeeting.description}</p>
            <span className="event-details">{featuredMeeting.details}</span>
          </div>
          <span className="row-accent" aria-hidden="true">↗</span>
        </article>
        <LocalCommunityPosts kind="meetings" />
      </div>
    </PlatformLayout>
  );
}
