// Site-wide configuration and metadata constants

export const SITE_CONFIG = {
  name: "Nicolás Vázquez",
  title: "nicolás vázquez",
  url: "https://nicolasvazquez.com.ar",
  description:
    "software engineer from buenos aires. notes about anything that comes to my mind..",
  author: {
    name: "Nicolás Vázquez",
    email: "nicorvazquezs@gmail.com",
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
