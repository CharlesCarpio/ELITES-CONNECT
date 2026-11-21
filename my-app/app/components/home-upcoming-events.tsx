"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import {
  formatPostDate,
  getCommunityPostsSnapshot,
  getServerCommunityPostsSnapshot,
  subscribeToCommunityPosts,
} from "../lib/community-posts";
import { gpoaEvents } from "../lib/gpoa-events";

type UpcomingEvent = {
  key: string;
  sortDate: string;
  month: string;
  day?: string;
  year: string;
  date: string;
  title: string;
  venue: string;
};

function localDateKey(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function subscribeToCurrentDate(callback: () => void) {
  const timer = window.setInterval(callback, 60_000);
  return () => window.clearInterval(timer);
}

function getCurrentDateSnapshot() {
  return localDateKey(new Date());
}

function getServerDateSnapshot() {
  return "";
}

export function HomeUpcomingEvents() {
  const snapshot = useSyncExternalStore(
    subscribeToCommunityPosts,
    getCommunityPostsSnapshot,
    getServerCommunityPostsSnapshot,
  );
  const todayKey = useSyncExternalStore(
    subscribeToCurrentDate,
    getCurrentDateSnapshot,
    getServerDateSnapshot,
  );
  const currentMonth = todayKey.slice(0, 7);

  const plannedEvents: UpcomingEvent[] = gpoaEvents
    .filter((event) => currentMonth && event.dateTime && event.dateTime > currentMonth)
    .map((event) => ({
      key: `gpoa-${event.number}`,
      sortDate: `${event.dateTime}-01`,
      month: event.month,
      year: event.year,
      date: event.date,
      title: event.title,
      venue: event.venue,
    }));

  const publishedEvents: UpcomingEvent[] = snapshot.posts
    .filter((post) => todayKey && post.kind === "event" && post.date >= todayKey)
    .map((post) => {
      const [year, month, day] = post.date.split("-").map(Number);
      const parsedDate = new Date(year, month - 1, day);

      return {
        key: post.id,
        sortDate: post.date,
        month: parsedDate.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
        day: String(day),
        year: String(year),
        date: formatPostDate(post.date),
        title: post.title,
        venue: post.details || "Details to be announced",
      };
    });

  const upcomingEvents = [...plannedEvents, ...publishedEvents]
    .sort((first, second) => first.sortDate.localeCompare(second.sortDate))
    .slice(0, 3);

  return (
    <section
      className="home-upcoming-events-section wrap"
      aria-labelledby="home-upcoming-events-title"
    >
      <div className="home-upcoming-events-heading">
        <div>
          <p className="eyebrow">On the calendar</p>
          <h2 id="home-upcoming-events-title">Upcoming Events</h2>
        </div>
        <Link className="home-upcoming-events-all" href="/events">
          View all events <span aria-hidden="true">↗</span>
        </Link>
      </div>
      {snapshot.error && <p className="post-load-error" role="alert">{snapshot.error}</p>}
      {!todayKey ? (
        <p className="home-upcoming-events-empty" aria-live="polite">
          Loading upcoming events...
        </p>
      ) : upcomingEvents.length > 0 ? (
        <div className="home-upcoming-events-grid">
          {upcomingEvents.map((event) => (
            <Link
              className="home-upcoming-event"
              href="/events"
              key={event.key}
              aria-label={`View ${event.title} in Events`}
            >
              <span className="home-upcoming-event-date" aria-hidden="true">
                <span>{event.month}</span>
                {event.day && <strong>{event.day}</strong>}
                <small>{event.year}</small>
              </span>
              <span className="home-upcoming-event-copy">
                <span className="home-upcoming-event-time">{event.date}</span>
                <span className="home-upcoming-event-title">{event.title}</span>
                <span className="home-upcoming-event-venue">{event.venue}</span>
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="home-upcoming-events-empty">No upcoming events are currently scheduled.</p>
      )}
    </section>
  );
}
