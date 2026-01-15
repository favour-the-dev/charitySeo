import axios from "axios";
import { getCookie } from "cookies-next/client";
import {
  locationDataType,
  createLocationResponse,
  getLocationsResponse,
  getSingleLocationResponse,
  updateLocationResponse,
  bulkCreateLocationPayload,
  bulkCreateLocationResponse,
  deleteBulkLocationsPayload,
  deleteBulkLocationsResponse,
  publishLocationPayload,
  publishLocationResponse,
  publishLocationToAllPlatformsPayload,
  publishLocationToAllPlatformsResponse,
} from "@/types/types";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/tenants/locations`;
const rootUrl = `${process.env.NEXT_PUBLIC_API_URL}`;
export default class LocationService {
  private static getAuthToken() {
    const token = getCookie("authToken");
    if (!token) {
      throw new Error("No auth token found");
    }
    return { token };
  }

  static async createLocation(
    payload: locationDataType
  ): Promise<createLocationResponse> {
    try {
      const { token } = this.getAuthToken();
      const res = await axios.post(`${baseUrl}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: createLocationResponse = res.data;
      return data;
    } catch (error) {
      console.error("Error creating location:", error);
      throw error;
    }
  }

  static async getLocations(): Promise<getLocationsResponse> {
    try {
      const { token } = this.getAuthToken();
      const res = await axios.get(`${baseUrl}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: getLocationsResponse = res.data;
      return data;
    } catch (error) {
      console.error("Error fetching locations:", error);
      throw error;
    }
  }

  static async getLocationById(
    locationId: string
  ): Promise<getSingleLocationResponse> {
    try {
      const { token } = this.getAuthToken();
      const res = await axios.get(`${baseUrl}/${locationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: getSingleLocationResponse = res.data;
      return data;
    } catch (error) {
      console.error("Error fetching single locations:", error);
      throw error;
    }
  }

  static async updateLocation(
    locationId: string,
    payload: locationDataType
  ): Promise<updateLocationResponse> {
    try {
      const { token } = this.getAuthToken();
      const res = await axios.put(`${baseUrl}/${locationId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: updateLocationResponse = res.data;
      return data;
    } catch (error) {
      console.error("Error updating location:", error);
      throw error;
    }
  }

  static async deleteLocation(locationId: string): Promise<void> {
    try {
      const { token } = this.getAuthToken();
      await axios.delete(`${baseUrl}/${locationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error deleting location:", error);
      throw error;
    }
  }

  static async bulkCreateLocations(
    payload: bulkCreateLocationPayload
  ): Promise<bulkCreateLocationResponse> {
    try {
      const { token } = this.getAuthToken();
      const res = await axios.post(`${baseUrl}/bulk`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: bulkCreateLocationResponse = res.data;
      return data;
    } catch (error) {
      console.error("Error bulk creating locations:", error);
      throw error;
    }
  }

  static async deleteBulkLocations(
    payload: deleteBulkLocationsPayload
  ): Promise<deleteBulkLocationsResponse> {
    try {
      const { token } = this.getAuthToken();
      const res = await axios.delete(`${baseUrl}/bulk`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: payload,
      });
      const data: deleteBulkLocationsResponse = res.data;
      return data;
    } catch (error) {
      console.error("Error bulk deleting locations:", error);
      throw error;
    }
  }

  static async publishLocation(
    payload: publishLocationPayload
  ): Promise<publishLocationResponse> {
    try {
      const { token } = this.getAuthToken();
      const res = await axios.post(
        `${rootUrl}/locations/listings/publish`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data: publishLocationResponse = res.data;
      return data;
    } catch (error) {
      console.error("Error publishing location:", error);
      throw error;
    }
  }

  static async publishLocationToAllPlatforms(
    payload: publishLocationToAllPlatformsPayload
  ): Promise<publishLocationToAllPlatformsResponse> {
    try {
      const { token } = this.getAuthToken();
      const res = await axios.post(
        `${rootUrl}/locations/listings/publish-to-all`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data: publishLocationToAllPlatformsResponse = res.data;
      return data;
    } catch (error) {
      console.error("Error publishing location to all platforms:", error);
      throw error;
    }
  }
}
