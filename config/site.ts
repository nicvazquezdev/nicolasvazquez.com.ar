// Site-wide configuration and metadata constants

export const SITE_CONFIG = {
  name: "Nicolás Vazquez",
  title: "nicolás vazquez",
  url: "https://nicolasvazquez.com.ar",
  description:
    "software engineer from buenos aires. notes about systems, the work itself, and the odd places it takes me.",
  author: {
    name: "Nicolás Vazquez",
    email: "contact@nicolasvazquez.com.ar",
    twitter: "@nicvazquezdev",
    github: "nicvazquezdev",
    linkedin: "nicvazquez",
  },
  social: {
    github: "https://github.com/nicvazquezdev",
    linkedin: "https://linkedin.com/in/nicvazquez",
  },
  images: {
    og: "https://nicolasvazquez.com.ar/avatar_og.jpg",
  },
  location: {
    city: "Buenos Aires",
    region: "Ciudad Autónoma de Buenos Aires",
    country: "Argentina",
    countryCode: "AR",
    timezone: "America/Argentina/Buenos_Aires",
    coordinates: {
      latitude: -34.6037,
      longitude: -58.3816,
    },
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
