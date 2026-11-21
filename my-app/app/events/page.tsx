import { PlatformLayout } from "../components/platform-layout";

const events = [
  {
    month: "NOV",
    day: "18",
    date: "November 18, 2026",
    dateTime: "2026-11-18",
    title: "Monthly members’ meeting",
    description: "Catch up with members, hear the latest updates, and help shape what comes next.",
    details: "6:00 PM · Community Hall",
  },
  {
    month: "NOV",
    day: "28",
    date: "November 28, 2026",
    dateTime: "2026-11-28",
    title: "Community service day",
    description: "Spend the morning lending a hand on a project that supports our neighborhood.",
    details: "8:30 AM · Meet at the main office",
  },
  {
    month: "DEC",
    day: "12",
    date: "December 12, 2026",
    dateTime: "2026-12-12",
    title: "Year-end community gathering",
    description: "Celebrate the year’s work and reconnect with the ELITES CONNECT community.",
    details: "5:00 PM · Venue to be announced",
  },
];

export default function EventsPage() {
  return (
    <PlatformLayout
      activePath="/events"
      eyebrow="Make room for good things"
      title="Events"
      description="Meet up, pitch in, and be part of what’s happening next."
    >
      <div className="event-list">
        {events.map((event) => (
          <article className="event-row" key={event.dateTime}>
            <div className="event-date"><span>{event.month}</span><strong>{event.day}</strong></div>
            <div className="row-content">
              <time dateTime={event.dateTime}>{event.date}</time>
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <span className="event-details">{event.details}</span>
            </div>
            <span className="row-accent" aria-hidden="true">↗</span>
          </article>
        ))}
      </div>
    </PlatformLayout>
  );
}