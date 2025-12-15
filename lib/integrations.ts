export interface IntegrationConfig {
  id: string;
  name: string;
  description: string;
  image: string;
  category: "Social" | "Review Platform" | "App Store" | "Search";
}

export const integrations: IntegrationConfig[] = [
  {
    id: "google-business",
    name: "Google Business Profile",
    description: "Manage reviews and Q&A from Google Search and Maps.",
    image: "/Google.png",
    category: "Search",
  },
  {
    id: "facebook",
    name: "Facebook",
    description:
      "Connect your Facebook Pages to manage recommendations and reviews.",
    image: "/Facebook-Logo.png",
    category: "Social",
  },
  {
    id: "trustpilot",
    name: "Trustpilot",
    description: "Automate review collection and display verified reviews.",
    image: "/trustpilot-logo.png",
    category: "Review Platform",
  },
  {
    id: "bing-places",
    name: "Bing Places",
    description: "Sync reviews from Bing Places for Business.",
    image: "/bing-logo.png",
    category: "Search",
  },
  {
    id: "apple-business",
    name: "Apple Business Connect",
    description: "Manage your presence across Apple Maps and other Apple apps.",
    image: "/apple_business-logo.png",
    category: "Search",
  },
  {
    id: "google-play",
    name: "Google Play Store",
    description: "Monitor and reply to app reviews on the Google Play Store.",
    image: "/google_play-logo.png",
    category: "App Store",
  },
  {
    id: "app-store",
    name: "Apple App Store",
    description: "Track ratings and reviews for your iOS apps.",
    image: "/app_store-logo.png",
    category: "App Store",
  },
];
