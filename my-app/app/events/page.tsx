import { PlatformLayout } from "../components/platform-layout";
import { LocalCommunityPosts } from "../components/local-community-posts";
import { gpoaEvents } from "../lib/gpoa-events";

export default function EventsPage() {
  return (
    <PlatformLayout
      activePath="/events"
      eyebrow="General Plan of Activities · A.Y. 2026–2027"
      title="EVENTS"
      description="Explore the planned activities, objectives, venues, and target participants for the academic year."
    >
      <div className="event-list">
        {gpoaEvents.map((event) => (
          <article className="event-row" key={event.number}>
            <div className="event-date event-date-plan" aria-label={event.date}>
              <span>{event.month}</span>
              <strong>{event.year}</strong>
            </div>
            <div className="row-content">
              {event.dateTime ? (
                <time dateTime={event.dateTime}>{event.date}</time>
              ) : (
                <span className="row-content-date">{event.date}</span>
              )}
              <span className="event-plan-number">GPOA Activity {event.number}</span>
              <h2>{event.title}</h2>
              <p className="event-plan-objective">
                <strong>Objective:</strong> {event.objective}
              </p>
              <dl className="event-plan-meta">
                <div>
                  <dt>Venue</dt>
                  <dd>{event.venue}</dd>
                </div>
                <div>
                  <dt>Target participants</dt>
                  <dd>{event.participants}</dd>
                </div>
              </dl>
            </div>
            <span className="row-accent" aria-hidden="true">↗</span>
          </article>
        ))}
        <LocalCommunityPosts kind="events" />
      </div>
    </PlatformLayout>
  );
}
