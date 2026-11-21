"use client";

import { useSyncExternalStore } from "react";
import {
  CommunityPost,
  formatPostDate,
  getCommunityPostsSnapshot,
  getServerCommunityPostsSnapshot,
  subscribeToCommunityPosts,
} from "../lib/community-posts";

type LocalCommunityPostsProps = {
  kind: "announcement" | "events" | "meetings";
  indexOffset?: number;
};

export function LocalCommunityPosts({
  kind,
  indexOffset = 0,
}: LocalCommunityPostsProps) {
  const snapshot = useSyncExternalStore(
    subscribeToCommunityPosts,
    getCommunityPostsSnapshot,
    getServerCommunityPostsSnapshot,
  );
  const visiblePosts = snapshot.posts.filter((post) =>
    kind === "announcement"
      ? post.kind === "announcement"
      : kind === "meetings"
        ? post.kind === "meeting"
        : post.kind === "event" || post.kind === "meeting",
  );

  if (snapshot.error) {
    return <p className="post-load-error" role="alert">{snapshot.error}</p>;
  }

  return visiblePosts.map((post, index) =>
    kind === "announcement" ? (
      <AnnouncementRow
        key={post.id}
        post={post}
        index={indexOffset + index + 1}
      />
    ) : (
      <EventRow key={post.id} post={post} />
    ),
  );
}

function AnnouncementRow({
  post,
  index,
}: {
  post: CommunityPost;
  index: number;
}) {
  return (
    <article className="announcement-row">
      <span className="row-index">{String(index).padStart(2, "0")}</span>
      <div className="row-content">
        <div className="row-meta">
          <span className="category-tag">{post.category || "Announcement"}</span>
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        </div>
        <h2>{post.title}</h2>
        <p>{post.description}</p>
      </div>
      <span className="row-accent" aria-hidden="true">↗</span>
    </article>
  );
}

function EventRow({ post }: { post: CommunityPost }) {
  const [year, month, day] = post.date.split("-").map(Number);
  const monthLabel = new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
  });

  return (
    <article className="event-row">
      <div className="event-date">
        <span>{monthLabel}</span>
        <strong>{day}</strong>
      </div>
      <div className="row-content">
        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        <h2>{post.title}</h2>
        <p>{post.description}</p>
        {post.details && <span className="event-details">{post.details}</span>}
        {post.kind === "meeting" && (
          <span className="category-tag">{post.kind}</span>
        )}
      </div>
      <span className="row-accent" aria-hidden="true">↗</span>
    </article>
  );
}
