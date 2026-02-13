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
        slug
        date
        excerpt
        content
        categories {
          nodes {
            name
          }
        }
      }
    }
  }
`;

export async function fetchGraphQL(query: string, variables = {}, signal?: AbortSignal) {
  // Use the CMS subdomain directly for GraphQL requests
  const endpoint = 'https://cms.zosalaw.ph/graphql';
  
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    signal
  });
  
  const json = await res.json();
  if (json.errors) {
    console.error("GraphQL Errors:", json.errors);
    throw new Error('WordPress GraphQL returned errors');
  }
  return json.data;
}
