/**
 * Headless WordPress Utility
 * Optimized for DigitalOcean / Production environments.
 */

const getEndpoint = () => {
  // In the browser, ALWAYS use the local proxy for security and CORS
  if (typeof window !== 'undefined') {
    return '/api/graphql';
  }
  // On the server (during SSR), we can call WordPress directly via the environment variable
  return process.env.NEXT_PUBLIC_WORDPRESS_URL || "";
};

export async function fetchGraphQL(query: string, variables = {}, signal?: AbortSignal) {
  const endpoint = getEndpoint();
  
  if (!endpoint) return null;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
      signal,
    });

    const json = await res.json();
    
    if (json.errors) {
      console.warn('WordPress GraphQL returned errors:', json.errors);
      return null;
    }
    
    return json.data;
  } catch (error: any) {
    if (error.name === 'AbortError') return null;
    console.error("Zosa Law: Request to /api/graphql failed.", error.message);
    return null;
  }
}

/**
 * Standard Queries
 * Matches the ACF field names defined in your WordPress setup.
 */
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
          education {
            degree
          }
          specializations {
            name
          }
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
