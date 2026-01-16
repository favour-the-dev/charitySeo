import axios from "axios";
import { getCookie } from "cookies-next/client";
import {
  syncReviewwithLocationIdResponse,
  getReviewsResponse,
  getReviewsByIdResponse,
  getReviewsStatsResponse,
  respondToReviewPayload,
  respondToReviewResponse,
  updateResponseToReviewPayload,
  updateResponseToReviewResponse,
} from "@/types/types";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

export default class ReviewService {
  private static getAuthToken() {
    const token = getCookie("authToken");
    if (!token) {
      throw new Error("Authentication token not found");
    }
    return { token };
  }
  static async syncReviewwithLocationId(
    location_id: number
  ): Promise<syncReviewwithLocationIdResponse> {
    try {
      const { token } = this.getAuthToken();
      const response = await axios.post(
        `${baseUrl}/locations/${location_id}/reviews/sync`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data: syncReviewwithLocationIdResponse = response.data;
      return data;
    } catch (error) {
      console.error("Error syncing reviews:", error);
      throw error;
    }
  }

  static async getreviewsByLocation(payload: {
    location_id: number;
  }): Promise<getReviewsResponse> {
    try {
      const { token } = this.getAuthToken();
      const response = await axios.get(
        `${baseUrl}/locations/${payload.location_id}/reviews`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data: getReviewsResponse = response.data;
      return data;
    } catch (error) {
      console.error("Error fetching reviews for this location: ", error);
      throw error;
    }
  }

  static async getAllReviewsInWorkspace(): Promise<getReviewsResponse> {
    try {
      const { token } = this.getAuthToken();
      const res = await axios.get(`${baseUrl}/tenants/reviews`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: getReviewsResponse = res.data;
      return data;
    } catch (error) {
      console.error("Error fetching all reviews data: ", error);
      throw error;
    }
  }

  static async getReviewsById(
    review_id: number
  ): Promise<getReviewsByIdResponse> {
    try {
      const { token } = this.getAuthToken();
      const res = await axios.get(`${baseUrl}/reviews/${review_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: getReviewsByIdResponse = res.data;
      return data;
    } catch (error) {
      console.error("Error fetching review by ID: ", error);
      throw error;
    }
  }

  static async getReviewsStats(): Promise<getReviewsStatsResponse> {
    try {
      const { token } = this.getAuthToken();
      const res = await axios.get(`${baseUrl}/tenants/reviews/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: getReviewsStatsResponse = res.data;
      return data;
    } catch (error) {
      console.error("error fetching reviews stats");
      throw error;
    }
  }

  static async getReviewStatsForLocation(
    location_id: number
  ): Promise<getReviewsStatsResponse> {
    try {
      const { token } = this.getAuthToken();
      const res = await axios.get(
        `${baseUrl}/tenants/locations/${location_id}/reviews/stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data: getReviewsStatsResponse = res.data;
      return data;
    } catch (error) {
      console.error("Error fetching review stats for location: ", error);
      throw error;
    }
  }

  static async respondToReview({
    payload,
    review_id,
  }: {
    payload: respondToReviewPayload;
    review_id: number;
  }): Promise<respondToReviewResponse> {
    try {
      const { token } = this.getAuthToken();
      const res = await axios.post(
        `${baseUrl}/tenants/reviews/${review_id}/response`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data: respondToReviewResponse = res.data;
      return data;
    } catch (error) {
      console.error("Error responding to review: ", error);
      throw error;
    }
  }
  static async updateResponseToReview({
    payload,
    review_id,
  }: {
    payload: updateResponseToReviewPayload;
    review_id: number;
  }): Promise<updateResponseToReviewResponse> {
    try {
      const { token } = this.getAuthToken();
      const res = await axios.put(
        `${baseUrl}/tenants/update/reviews/${review_id}/response`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data: updateResponseToReviewResponse = res.data;
      return data;
    } catch (error) {
      console.error("Error updating response to review: ", error);
      throw error;
    }
  }

  static async deleteResponseToReview(review_id: number): Promise<void> {
    try {
      const { token } = this.getAuthToken();
      const res = await axios.delete(
        `${baseUrl}/tenants/reviews/${review_id}/response`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data;
      return data;
    } catch (error) {
      console.error("Error deleting response to review: ", error);
      throw error;
    }
  }

  static async publishResponseToPlatform(
    review_id: number
  ): Promise<{ message: string }> {
    try {
      const { token } = this.getAuthToken();
      const res = await axios.post(
        `${baseUrl}/tenants/reviews/${review_id}/response/publish`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data: { message: string } = res.data;
      return data;
    } catch (error) {
      console.error(`Error publishing response to platform: `, error);
      throw error;
    }
  }
}
