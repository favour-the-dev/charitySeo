import { create } from "zustand";
import { mockReviews, Review, ReviewStatus } from "./mock-data";

interface ReviewsState {
  reviews: Review[];
  filterStatus: ReviewStatus | "all";
  filterRating: number | "all";
  searchQuery: string;
  setFilterStatus: (status: ReviewStatus | "all") => void;
  setFilterRating: (rating: number | "all") => void;
  setSearchQuery: (query: string) => void;
  updateReviewStatus: (id: string, status: ReviewStatus) => void;
  respondToReview: (id: string, response: string) => void;
  getFilteredReviews: () => Review[];
}

export const useReviewsStore = create<ReviewsState>((set, get) => ({
  reviews: mockReviews,
  filterStatus: "all",
  filterRating: "all",
  searchQuery: "",

  setFilterStatus: (status) => set({ filterStatus: status }),
  setFilterRating: (rating) => set({ filterRating: rating }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  updateReviewStatus: (id, status) =>
    set((state) => ({
      reviews: state.reviews.map((review) =>
        review.id === id ? { ...review, status } : review
      ),
    })),

  respondToReview: (id, response) =>
    set((state) => ({
      reviews: state.reviews.map((review) =>
        review.id === id ? { ...review, response, status: "responded" } : review
      ),
    })),

  getFilteredReviews: () => {
    const { reviews, filterStatus, filterRating, searchQuery } = get();
    return reviews.filter((review) => {
      const matchesStatus =
        filterStatus === "all" || review.status === filterStatus;
      const matchesRating =
        filterRating === "all" || review.rating === filterRating;
      const matchesSearch =
        review.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesRating && matchesSearch;
    });
  },
}));
