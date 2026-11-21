export type CommunityPostKind = "announcement" | "event" | "meeting";

export type CommunityPost = {
  id: string;
  kind: CommunityPostKind;
  date: string;
  title: string;
  description: string;
  category?: string;
  details?: string;
};

export type CommunityPostsSnapshot = {
  posts: CommunityPost[];
  error: string | null;
};

export type AdminPasscodeSnapshot = {
  passcode: string | null;
  error: string | null;
};

const POSTS_STORAGE_KEY = "elites-connect-posts-v1";
export const ADMIN_PASSCODE_KEY = "elites-connect-admin-passcode-v1";
const POSTS_CHANGE_EVENT = "elites-connect-posts-changed";
const PASSCODE_CHANGE_EVENT = "elites-connect-passcode-changed";

const emptyPostsSnapshot: CommunityPostsSnapshot = { posts: [], error: null };
const emptyPasscodeSnapshot: AdminPasscodeSnapshot = { passcode: null, error: null };
let cachedPostsKey: string | undefined;
let cachedPostsSnapshot = emptyPostsSnapshot;
let cachedPasscodeKey: string | undefined;
let cachedPasscodeSnapshot = emptyPasscodeSnapshot;

export function getServerCommunityPostsSnapshot() {
  return emptyPostsSnapshot;
}

export function getServerAdminPasscodeSnapshot() {
  return emptyPasscodeSnapshot;
}

function isCommunityPost(value: unknown): value is CommunityPost {
  if (!value || typeof value !== "object") return false;
  const post = value as Partial<CommunityPost>;
  return (
    typeof post.id === "string" &&
    (post.kind === "announcement" || post.kind === "event" || post.kind === "meeting") &&
    typeof post.date === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(post.date) &&
    !Number.isNaN(Date.parse(`${post.date}T00:00:00`)) &&
    typeof post.title === "string" &&
    typeof post.description === "string" &&
    (post.category === undefined || typeof post.category === "string") &&
    (post.details === undefined || typeof post.details === "string")
  );
}

export function loadCommunityPosts(): CommunityPost[] {
  const storedPosts = window.localStorage.getItem(POSTS_STORAGE_KEY);
  if (!storedPosts) return [];

  const parsedPosts: unknown = JSON.parse(storedPosts);
  if (!Array.isArray(parsedPosts) || !parsedPosts.every(isCommunityPost)) {
    throw new Error("Saved posts are invalid. Clear this browser's saved posts before continuing.");
  }

  return parsedPosts;
}

export function getCommunityPostsSnapshot(): CommunityPostsSnapshot {
  let storedPosts: string | null;
  try {
    storedPosts = window.localStorage.getItem(POSTS_STORAGE_KEY);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Browser storage is unavailable.";
    const key = `error:${message}`;
    if (cachedPostsKey !== key) {
      cachedPostsKey = key;
      cachedPostsSnapshot = { posts: [], error: message };
    }
    return cachedPostsSnapshot;
  }

  const key = storedPosts ?? "";
  if (cachedPostsKey === key) return cachedPostsSnapshot;
  cachedPostsKey = key;

  if (!storedPosts) {
    cachedPostsSnapshot = emptyPostsSnapshot;
    return cachedPostsSnapshot;
  }

  try {
    const parsedPosts: unknown = JSON.parse(storedPosts);
    if (!Array.isArray(parsedPosts) || !parsedPosts.every(isCommunityPost)) {
      throw new Error("Saved posts are invalid. Clear this browser's saved posts before continuing.");
    }
    cachedPostsSnapshot = { posts: parsedPosts, error: null };
  } catch (error) {
    cachedPostsSnapshot = {
      posts: [],
      error: error instanceof Error ? error.message : "Saved posts could not be loaded.",
    };
  }

  return cachedPostsSnapshot;
}

export function subscribeToCommunityPosts(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(POSTS_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(POSTS_CHANGE_EVENT, callback);
  };
}

export function getAdminPasscodeSnapshot(): AdminPasscodeSnapshot {
  let passcode: string | null;
  try {
    passcode = window.localStorage.getItem(ADMIN_PASSCODE_KEY);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Browser storage is unavailable.";
    const key = `error:${message}`;
    if (cachedPasscodeKey !== key) {
      cachedPasscodeKey = key;
      cachedPasscodeSnapshot = { passcode: null, error: message };
    }
    return cachedPasscodeSnapshot;
  }

  const key = passcode ?? "";
  if (cachedPasscodeKey === key) return cachedPasscodeSnapshot;
  cachedPasscodeKey = key;
  cachedPasscodeSnapshot = { passcode, error: null };
  return cachedPasscodeSnapshot;
}

export function subscribeToAdminPasscode(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(PASSCODE_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(PASSCODE_CHANGE_EVENT, callback);
  };
}

export function saveAdminPasscode(passcode: string): void {
  window.localStorage.setItem(ADMIN_PASSCODE_KEY, passcode);
  window.dispatchEvent(new Event(PASSCODE_CHANGE_EVENT));
}

export function saveCommunityPost(post: CommunityPost): void {
  const posts = loadCommunityPosts();
  window.localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify([post, ...posts]));
  window.dispatchEvent(new Event(POSTS_CHANGE_EVENT));
}

export function formatPostDate(date: string): string {
  const parsedDate = new Date(`${date}T00:00:00`);
  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
