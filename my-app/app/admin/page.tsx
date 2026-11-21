"use client";

import { FormEvent, useState, useSyncExternalStore } from "react";
import { PlatformLayout } from "../components/platform-layout";
import {
  CommunityPostKind,
  getAdminPasscodeSnapshot,
  getServerAdminPasscodeSnapshot,
  saveAdminPasscode,
  saveCommunityPost,
  subscribeToAdminPasscode,
} from "../lib/community-posts";

function localDateValue() {
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export default function AdminPage() {
  const passcodeSnapshot = useSyncExternalStore(
    subscribeToAdminPasscode,
    getAdminPasscodeSnapshot,
    getServerAdminPasscodeSnapshot,
  );
  const passcodeExists = Boolean(passcodeSnapshot.passcode);
  const [unlocked, setUnlocked] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [kind, setKind] = useState<CommunityPostKind>("announcement");
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Community");
  const [details, setDetails] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleAccessSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      if (passcodeExists) {
        if (passcode !== passcodeSnapshot.passcode) {
          setError("That passcode is incorrect.");
          return;
        }
      } else {
        if (passcode.length < 6) {
          setError("Create a passcode with at least 6 characters.");
          return;
        }
        if (passcode !== confirmation) {
          setError("The passcodes do not match.");
          return;
        }
        saveAdminPasscode(passcode);
      }

      setUnlocked(true);
      setDate((currentDate) => currentDate || localDateValue());
      setPasscode("");
      setConfirmation("");
    } catch (accessError) {
      setError(
        accessError instanceof Error
          ? accessError.message
          : "The admin passcode could not be saved.",
      );
    }
  }

  function handlePostSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      saveCommunityPost({
        id: crypto.randomUUID(),
        kind,
        date,
        title: title.trim(),
        description: description.trim(),
        ...(kind === "announcement" ? { category: category.trim() || "Announcement" } : {}),
        ...(kind !== "announcement" && details.trim()
          ? { details: details.trim() }
          : {}),
      });
      setMessage(`${kindLabel(kind)} saved in this browser.`);
      setTitle("");
      setDescription("");
      setDetails("");
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "The post could not be saved.",
      );
    }
  }

  return (
    <PlatformLayout
      activePath="/admin"
      eyebrow="Browser-local publishing"
      title="Admin posting"
      description="Create announcements, events, and meetings for this browser."
    >
      <p className="admin-storage-notice">
        Posts and the passcode stay in this browser and do not sync to other
        devices. This passcode is only a convenience gate, not secure
        authentication; do not use it to protect a public website.
      </p>

      {passcodeSnapshot.error && (
        <p className="admin-error" role="alert">{passcodeSnapshot.error}</p>
      )}

      {!unlocked ? (
        <form className="admin-form" onSubmit={handleAccessSubmit}>
          <h2>{passcodeExists ? "Admin access" : "Set up a local passcode"}</h2>
          <label>
            Passcode
            <input
              type="password"
              autoComplete={passcodeExists ? "current-password" : "new-password"}
              minLength={passcodeExists ? undefined : 6}
              required
              value={passcode}
              onChange={(event) => setPasscode(event.target.value)}
            />
          </label>
          {!passcodeExists && (
            <label>
              Confirm passcode
              <input
                type="password"
                autoComplete="new-password"
                minLength={6}
                required
                value={confirmation}
                onChange={(event) => setConfirmation(event.target.value)}
              />
            </label>
          )}
          {error && <p className="admin-error" role="alert">{error}</p>}
          <button className="button button-orange" type="submit">
            {passcodeExists ? "Unlock posting" : "Set passcode"}
          </button>
        </form>
      ) : (
        <form className="admin-form" onSubmit={handlePostSubmit}>
          <div className="admin-form-heading">
            <h2>Create a post</h2>
            <button
              className="admin-lock-button"
              type="button"
              onClick={() => setUnlocked(false)}
            >
              Lock
            </button>
          </div>
          <div className="meeting-page-actions">
            <p>Have a new meeting schedule or update to share?</p>
            <button
              className="button button-orange"
              type="button"
              onClick={() => setKind("meeting")}
            >
              Create a meeting update
            </button>
          </div>
          <label>
            Post type
            <select
              value={kind}
              onChange={(event) => {
                const value = event.target.value;
                if (value === "announcement" || value === "event" || value === "meeting") {
                  setKind(value);
                }
              }}
            >
              <option value="announcement">Announcement</option>
              <option value="event">Event</option>
              <option value="meeting">Meeting</option>
            </select>
          </label>
          <label>
            Date
            <input
              type="date"
              required
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </label>
          <label>
            Title
            <input
              type="text"
              required
              maxLength={120}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
          <label>
            Description
            <textarea
              required
              rows={4}
              maxLength={1200}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </label>
          {kind === "announcement" ? (
            <label>
              Category
              <input
                type="text"
                maxLength={40}
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              />
            </label>
          ) : (
            <label>
              Time and location (optional)
              <input
                type="text"
                maxLength={160}
                placeholder="e.g. 6:00 PM · Community Hall"
                value={details}
                onChange={(event) => setDetails(event.target.value)}
              />
            </label>
          )}
          {error && <p className="admin-error" role="alert">{error}</p>}
          {message && <p className="admin-success" role="status">{message}</p>}
          <button className="button button-orange" type="submit">
            Publish {kindLabel(kind).toLowerCase()}
          </button>
        </form>
      )}
    </PlatformLayout>
  );
}

function kindLabel(kind: CommunityPostKind) {
  return kind === "announcement"
    ? "Announcement"
    : kind === "event"
      ? "Event"
      : "Meeting";
}
