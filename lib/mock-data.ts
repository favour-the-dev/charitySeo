import { nanoid } from "nanoid";

export type ReviewStatus = "new" | "responded" | "archived";

export interface Review {
  id: string;
  customerName: string;
  customerEmail?: string;
  rating: number;
  content: string;
  date: string;
  status: ReviewStatus;
  platform: "Google" | "Trustpilot" | "Direct";
  response?: string;
}

export const mockReviews: Review[] = [
  {
    id: nanoid(),
    customerName: "Alice Johnson",
    customerEmail: "alice@example.com",
    rating: 5,
    content:
      "Localmator helped us increase our visibility significantly. The team is amazing!",
    date: "2023-10-25T10:00:00Z",
    status: "new",
    platform: "Google",
  },
  {
    id: nanoid(),
    customerName: "Bob Smith",
    rating: 4,
    content: "Great service, but the onboarding process could be a bit faster.",
    date: "2023-10-24T14:30:00Z",
    status: "responded",
    platform: "Trustpilot",
    response:
      "Thanks for the feedback, Bob! We're working on streamlining our onboarding.",
  },
  {
    id: nanoid(),
    customerName: "Charlie Brown",
    customerEmail: "charlie@test.com",
    rating: 5,
    content: "Highly recommend! They really understand the non-profit sector.",
    date: "2023-10-23T09:15:00Z",
    status: "archived",
    platform: "Direct",
  },
  {
    id: nanoid(),
    customerName: "Diana Prince",
    rating: 3,
    content: "It's okay, but I expected more detailed reporting.",
    date: "2023-10-22T16:45:00Z",
    status: "new",
    platform: "Google",
  },
  {
    id: nanoid(),
    customerName: "Evan Wright",
    rating: 5,
    content: "Fantastic results in just a few months.",
    date: "2023-10-21T11:20:00Z",
    status: "new",
    platform: "Trustpilot",
  },
  {
    id: nanoid(),
    customerName: "Fiona Gallagher",
    rating: 2,
    content: "Had some communication issues initially.",
    date: "2023-10-20T13:00:00Z",
    status: "responded",
    platform: "Direct",
    response:
      "Hi Fiona, we apologize for the miscommunication and are glad we could resolve it.",
  },
  {
    id: nanoid(),
    customerName: "George Martin",
    rating: 5,
    content: "Best SEO agency for charities, hands down.",
    date: "2023-10-19T15:10:00Z",
    status: "new",
    platform: "Google",
  },
  {
    id: nanoid(),
    customerName: "Hannah Lee",
    rating: 4,
    content: "Very professional team.",
    date: "2023-10-18T10:05:00Z",
    status: "new",
    platform: "Trustpilot",
  },
];
