/**
 * Headless WordPress Utility
 * Fetches from the WordPress REST API
 */

const WORDPRESS_REST_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || "";

function getRestEndpoint(): string {
  if (!WORDPRESS_REST_URL) {
    return "";
  }
  return `${WORDPRESS_REST_URL}/wp-json/wp/v2`;
}

export async function fetchREST(
  path: string,
  signal?: AbortSignal
) {
  const endpoint = getRestEndpoint();

  if (!endpoint) {
    console.warn(
      "Zosa Law: No WordPress URL defined. Set NEXT_PUBLIC_WORDPRESS_URL."
    );
    return null;
  }

  try {
    const url = `${endpoint}${path}`;
    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal,
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(
        `Zosa Law: REST API fetch failed with status ${res.status}`
      );
      return null;
    }

    return await res.json();
  } catch (error: unknown) {
    if (error instanceof Error && error.name === "AbortError") return null;
    const message =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Zosa Law: Request to REST API failed.", message);
    return null;
  }
}

export const PARTNERS_ENDPOINT = "/partners?orderby=menu_order&order=asc&_embed&per_page=100";
export const POSTS_ENDPOINT = "/posts?per_page=6&_embed";
