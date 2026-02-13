
export interface Partner {
  id: string;
  name: string;
  title: string;
  role: string;
  bio: string;
  imageUrl: string;
  specialization: string[];
  education: string[];
  email: string;
  phone: string;
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  slug: string;
}

export interface PracticeArea {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
}

// Internal WP Shape for Partners
export interface WPPartnerNode {
  id: string;
  databaseId?: number;
  title: string;
  excerpt?: string;
  content?: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
  partnerFields?: {
    title?: string;
    role?: string;
    bio?: string;
    email?: string;
    phone?: string;
    education?: { degree: string }[];
    specializations?: { name: string }[];
    photo?: {
      node: {
        sourceUrl: string;
      };
    };
  };
}

// Internal WP Shape for Posts
export interface WPPostNode {
  id: string;
  databaseId?: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  slug: string;
  categories: {
    nodes: {
      name: string;
    }[];
  };
}
