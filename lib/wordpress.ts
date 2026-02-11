
/**
 * Headless WordPress Utility
 * Optimized for DigitalOcean / Production environments.
 */

const getEndpoint = () => {
  // In the browser, we use the local API route to bypass CORS
  if (typeof window !== 'undefined') {
    return '/api/graphql';
  }
  // During SSR (Build time / Server side), we use the direct environment variable
  return process.env.NEXT_PUBLIC_WORDPRESS_URL || "";
};

export async function fetchGraphQL(query: string, variables = {}, signal?: AbortSignal) {
  const endpoint = getEndpoint();
  
  if (!endpoint) {
    console.warn("Zosa Law: No GraphQL endpoint defined. Check NEXT_PUBLIC_WORDPRESS_URL.");
    return null;
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
      signal,
      // Add cache tags for Next.js revalidation if needed
      next: { revalidate: 3600 } 
    });

    if (!res.ok) {
      console.error(`Zosa Law: GraphQL fetch failed with status ${res.status}`);
      return null;
    }

    const json = await res.json();
    
    if (json.errors) {
      console.warn('Zosa Law: WordPress GraphQL returned errors:', JSON.stringify(json.errors, null, 2));
      return null;
    }
    
    return json.data;
  } catch (error: any) {
    if (error.name === 'AbortError') return null;
    console.error("Zosa Law: Request to GraphQL failed.", error.message);
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
