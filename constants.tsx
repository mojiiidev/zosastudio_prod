
import React from 'react';
import { Partner, PracticeArea, NavItem, Post } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Firm', href: '#firm' },
  { label: 'Services', href: '#services' },
  { label: 'Partners', href: '#partners' },
  { label: 'News', href: '#news' },
  { label: 'Contact', href: '#contact' },
];

export interface DetailedService {
  category: string;
  items: string[];
}

export const DETAILED_SERVICES: DetailedService[] = [
  {
    category: "A. Local Government Unit (Scope Nationwide)",
    items: [
      "Business Permit Licensing (New, Amendment and Retirement)",
      "Locational & Zoning Clearance/Special Use Permit",
      "Sanitary Permit",
      "Environmental Clearance",
      "Fire Safety Inspection Certificate (LGU/BFP)",
      "Building and Occupancy Permits",
      "Special Permits",
      "JV and PPP (Reclamation/Infrastructure Projects)",
      "General Licensing Audit",
      "Issuance/Transfer of Tax Declaration"
    ]
  },
  {
    category: "B. SEC",
    items: [
      "Registration of Article of Incorporation",
      "Amendment of Articles of Incorporation and By-Laws",
      "Increase of Capital Stock",
      "Corporate Housekeeping/Reportorial Compliance",
      "Due Diligence Mergers/Acquisition",
      "Hosting of Directors and Officers",
      "Transition of Business Model from Sole Proprietorship to Corporation"
    ]
  },
  {
    category: "C. BIR",
    items: [
      "Registration/Retirement/Renewal of COR",
      "Reportorial Compliance",
      "Processing of Transfer Taxes/Issuance of E-CAR (Disposition and Transfer of Properties)",
      "Tax Clearance"
    ]
  },
  {
    category: "D. DOLE",
    items: [
      "Certificate of Registration of Establishment",
      "Establishment Termination Report",
      "DO 174 Accreditation",
      "DO 174 Semi-Annual Reporting"
    ]
  },
  {
    category: "E. DENR",
    items: [
      "ECC/CNC",
      "Public Scoping",
      "Area Clearance",
      "APSI/PTO Registration"
    ]
  },
  {
    category: "F. PRA",
    items: [
      "NTP, NTM and NTCARW (Reclamation Project)"
    ]
  },
  {
    category: "G. DPWH",
    items: [
      "PCAB Registration/Amendment",
      "ARCC Registration",
      "Philgeps Registration/Amendment",
      "Competitive Public Bidding under RA 9184",
      "Expropriation/Road Right of Way Transactions"
    ]
  },
  {
    category: "H. DTI/BOI",
    items: [
      "Registration of Business/Trade Name (Sole Proprietorship)",
      "FTEB Registration",
      "BOI Availment and Cancellation of Incentives"
    ]
  },
  {
    category: "I. PEZA",
    items: [
      "PEZA Registration/Accreditation",
      "E-AEDS Processing"
    ]
  },
  {
    category: "J. BOC",
    items: [
      "Import/Export Clearance Processing"
    ]
  },
  {
    category: "K. PAGCOR",
    items: [
      "Local Gaming Agent",
      "OGLD – Accreditation of IGL/Service Providers",
      "E-Games/E-Bingo – PIGO/Accreditation of Hybrid Betting Stations",
      "AMLA PAGCOR Compliance"
    ]
  },
  {
    category: "L. AMLC",
    items: [
      "AMLA Registration",
      "AMLA Reportorial Compliance",
      "Hosting of Compliance Officers"
    ]
  },
  {
    category: "M. Register of Deeds",
    items: [
      "Transfer and Issuance of New Title",
      "Reconstitution of Title",
      "Land Due Diligence Acquisition of Properties"
    ]
  },
  {
    category: "N. LTFRB",
    items: [
      "Issuance of Provisional Authority/Certificate of Public Convenience",
      "Issuance of Certificates and Letters of Exemption"
    ]
  },
  {
    category: "O. BFAR",
    items: [
      "Public Scoping",
      "Certificates/Letters of No Objection"
    ]
  },
  {
    category: "P. Optical Media Board (OMB)",
    items: [
      "OMB Registration"
    ]
  },
  {
    category: "Q. CAB",
    items: [
      "Accreditation of Domestic and International Freight Forwarder"
    ]
  }
];

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: 'corporate-regulatory',
    title: 'Corporate & Regulatory',
    description: 'Strategic advisory on corporate structuring, SEC compliance, and commercial transactions for growing enterprises.',
    icon: '🏢'
  },
  {
    id: 'business-disputes',
    title: 'Business-Critical Disputes',
    description: 'Representation in high-stakes commercial litigation, labor cases, and business-related criminal offenses.',
    icon: '⚖️'
  },
  {
    id: 'real-estate-expansion',
    title: 'Real Estate & Expansion',
    description: 'Comprehensive support for land acquisitions, property transactions, leasing, and essential due diligence.',
    icon: '🏘️'
  },
  {
    id: 'tax-bir-advisory',
    title: 'Tax & BIR Advisory',
    description: 'Specialized assistance with BIR registration, audits, assessments, and tax controversy resolution.',
    icon: '📊'
  },
  {
    id: 'fintech-innovation',
    title: 'Fintech & Innovation',
    description: 'Guiding technology-driven businesses through licensing, regulatory frameworks, and digital economy compliance.',
    icon: '⚡'
  },
  {
    id: 'labor-employment',
    title: 'Labor & Employment',
    description: 'Acting as a strategic partner for businesses in navigating employment matters and operational issues.',
    icon: '🤝'
  }
];

export const PARTNERS: Partner[] = [
  {
    id: 'zosa',
    name: 'Atty. Zosa',
    role: 'Partner',
    title: 'Founding Partner',
    bio: 'Extensive experience in the practice of Philippine law, focusing on strategic business advocacy.',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    specialization: ['Corporate & Commercial', 'Litigation', 'Strategic Advocacy'],
    education: ['Bachelor of Laws, University of the Philippines', 'BS Economics, Ateneo de Manila University'],
    email: 'zosa@zosalaw.ph',
    phone: '+63 917 123 4567'
  },
  {
    id: 'borromeo',
    name: 'Atty. Borromeo',
    role: 'Partner',
    title: 'Founding Partner',
    bio: 'Dedicated to delivering practical and business-minded legal solutions across the Philippines.',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    specialization: ['Real Estate', 'Commercial Transactions', 'Property Law'],
    education: ['Juris Doctor, San Beda University', 'AB Political Science, University of San Carlos'],
    email: 'borromeo@zosalaw.ph',
    phone: '+63 917 234 5678'
  },
  {
    id: 'ong-vano',
    name: 'Atty. Ong Vaño',
    role: 'Partner',
    title: 'Senior Partner',
    bio: 'Expertise in navigating the rapidly evolving digital economy and regulatory frameworks.',
    imageUrl: 'https://images.unsplash.com/photo-1519085184588-4d5def43322d?auto=format&fit=crop&q=80&w=400',
    specialization: ['Fintech & Innovation', 'Labor Law', 'Regulatory Compliance'],
    education: ['LL.M., National University of Singapore', 'Juris Doctor, Ateneo Law School'],
    email: 'ongvano@zosalaw.ph',
    phone: '+63 917 345 6789'
  },
  {
    id: 'mirhan',
    name: 'Atty. Mirhan',
    role: 'Partner',
    title: 'Senior Partner',
    bio: 'Focused on tax advisory and dispute resolution for established corporations and growing enterprises.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    specialization: ['Taxation & BIR Advisory', 'Corporate Compliance', 'Dispute Resolution'],
    education: ['Bachelor of Laws, University of Cebu', 'BS Accountancy, University of San Jose-Recoletos'],
    email: 'mirhan@zosalaw.ph',
    phone: '+63 917 456 7890'
  },
  {
    id: 'reyes',
    name: 'Atty. Reyes',
    role: 'Partner',
    title: 'Associate Partner',
    bio: 'Specialist in Local Government Unit relations and nationwide regulatory permitting processes.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    specialization: ['LGU Relations', 'Gaming & PAGCOR', 'Public-Private Partnerships'],
    education: ['Juris Doctor, University of Santo Tomas', 'AB Communications, Maryknoll College'],
    email: 'reyes@zosalaw.ph',
    phone: '+63 917 567 8901'
  }
];

export const STATIC_POSTS: Post[] = [
  {
    id: 'fallback-1',
    title: 'Strategic Expansion in the Digital Economy',
    excerpt: 'Navigating the complex landscape of fintech regulation and digital commerce in the Philippines.',
    content: '<p>The digital economy in the Philippines is experiencing unprecedented growth. At Zosa Borromeo, we provide the regulatory foresight necessary for fintech enterprises to thrive within the legal frameworks provided by the BSP and SEC.</p>',
    date: new Date().toISOString(),
    category: 'Innovation',
    slug: 'strategic-expansion'
  },
  {
    id: 'fallback-2',
    title: 'Developments in Corporate Compliance 2024',
    excerpt: 'Key updates on reportorial requirements and corporate governance for domestic and foreign enterprises.',
    content: '<p>Staying ahead of annual reportorial requirements is critical for corporate standing. This insight covers the latest SEC circulars affecting both domestic entities and foreign branches operating in local business hubs.</p>',
    date: new Date().toISOString(),
    category: 'Compliance',
    slug: 'corporate-compliance-2024'
  },
  {
    id: 'fallback-3',
    title: 'Real Estate Due Diligence in Emerging Hubs',
    excerpt: 'Critical considerations for land acquisition and commercial leasing in developing economic zones.',
    content: '<p>With the expansion of business districts in Cebu and Clark, real estate due diligence has never been more vital. Our team examines the intricacies of land titles, zoning permits, and LGU-specific requirements.</p>',
    date: new Date().toISOString(),
    category: 'Real Estate',
    slug: 'real-estate-due-diligence'
  }
];
