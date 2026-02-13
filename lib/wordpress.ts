/**
 * Headless WordPress Utility
 * Fetches from the WordPress GraphQL endpoint via the local API proxy to avoid CORS.
 */

const WORDPRESS_GRAPHQL_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || "";

/**
 * Server-side fetch: calls WordPress directly.
 * Client-side fetch: uses the local /api/graphql proxy to avoid CORS.
 */
function getEndpoint(): string {
  if (typeof window !== "undefined") {
    return "/api/graphql";
  }
  return WORDPRESS_GRAPHQL_URL;
}

export async function fetchGraphQL(
  query: string,
  variables: Record<string, unknown> = {},
  signal?: AbortSignal
) {
  const endpoint = getEndpoint();

  if (!endpoint) {
    console.warn(
      "Zosa Law: No GraphQL endpoint defined. Set NEXT_PUBLIC_WORDPRESS_URL."
    );
    return null;
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
      signal,
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(
        `Zosa Law: GraphQL fetch failed with status ${res.status}`
      );
      return null;
    }

    const json = await res.json();

    if (json.errors) {
      console.warn(
        "Zosa Law: WordPress GraphQL returned errors:",
        JSON.stringify(json.errors, null, 2)
      );
      return null;
    }

    return json.data;
  } catch (error: unknown) {
    if (error instanceof Error && error.name === "AbortError") return null;
    const message =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Zosa Law: Request to GraphQL failed.", message);
    return null;
  }
}

export const GET_PARTNERS_QUERY = `
  query GetPartners {
    partners(first: 100, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        id
        databaseId
        title
        content
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
        partnerFields {
          title
          role
          bio
          email
          phone
          education
          specializations
          photo {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

export const GET_POSTS_QUERY = `
  query GetPosts {
    posts(first: 6) {
      nodes {
        id
        title
        excerpt
        content
        date
        slug
        categories {
          nodes {
            name
          }
        }
      }
    }
  }
`;
