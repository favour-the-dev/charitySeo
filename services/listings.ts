import axios from "axios";
import { getCookie } from "cookies-next/client";
import {
  getAllListingsResponse,
  getListingsStatsResponse,
  getSingleListingResponse,
  syncListByLocationPayload,
  syncListByLocationResponse,
  syncFacebookListingsPayload,
  syncFacebookListingsResponse,
  syncAllInWorkspacePayload,
  syncAllInWorkspaceResponse,
} from "@/types/types";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/tenants/listings`;
const rootbaseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

export default class ListingService {
  private static getAuthToken() {
    const token = getCookie("authToken");
    if (!token) {
      throw new Error("No auth token found");
    }
    return { token };
  }

  static async getAllListings(): Promise<getAllListingsResponse> {
    try {
      const { token } = this.getAuthToken();
      const res = await axios.get(`${baseUrl}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: getAllListingsResponse = res.data;
      return data;
    } catch (error) {
      console.error("Error fetching listings:", error);
      throw error;
    }
  }

  static async getListingStats(): Promise<getListingsStatsResponse> {
    try {
      const { token } = this.getAuthToken();
      const res = await axios.get(`${baseUrl}/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: getListingsStatsResponse = res.data;
      return data;
    } catch (error) {
      console.error("Error fetching listing stats:", error);
      throw error;
    }
  }

  static async getSingleListing(
    listing_id: string
  ): Promise<getSingleListingResponse> {
    try {
      const { token } = this.getAuthToken();
      const res = await axios.get(`${baseUrl}/${listing_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: getSingleListingResponse = res.data;
      return data;
    } catch (error) {
      console.error("Error fetching single listing:", error);
      throw error;
    }
  }

  static async syncListByLocation(
    payload: syncListByLocationPayload
  ): Promise<syncListByLocationResponse> {
    try {
      const { token } = this.getAuthToken();
      const res = await axios.post(
        `${rootbaseUrl}/locations/listings/sync`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data: syncListByLocationResponse = res.data;
      return data;
    } catch (error) {
      console.error("Error syncing listings by location:", error);
      throw error;
    }
  }

  static async syncFacebookListings(
    payload: syncFacebookListingsPayload
  ): Promise<syncFacebookListingsResponse> {
    try {
      const { token } = this.getAuthToken();
      const res = await axios.post(
        `${rootbaseUrl}/facebook/sync-listing`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data: syncFacebookListingsResponse = res.data;
      return data;
    } catch (error) {
      console.error("Error syncing Facebook listings:", error);
      throw error;
    }
  }

  static async syncAllInWorkspace(
    payload: syncAllInWorkspacePayload
  ): Promise<syncAllInWorkspaceResponse> {
    try {
      const { token } = this.getAuthToken();
      const res = await axios.post(
        `${rootbaseUrl}/locations/listings/sync-all`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data: syncAllInWorkspaceResponse = res.data;
      return data;
    } catch (error) {
      console.error("Error syncing all listings in workspace:", error);
      throw error;
    }
  }
}
