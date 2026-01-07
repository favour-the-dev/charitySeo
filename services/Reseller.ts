import axios from "axios";
import { getCookie } from "cookies-next/client";
import { getAllResellersResponse, ResellerResponse } from "@/types/types";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/reseller`;

export interface AddResellerPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  is_active: boolean;
}
export interface UpdateResellerPayload {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
}

export interface updateResellerPasswordPayload {
  id: number;
  password: string;
  password_confirmation: string;
}

export default class ResellerService {
  private static getAuthToken() {
    const token = getCookie("authToken");
    if (!token) {
      throw new Error("No auth token found");
    }
    return {
      token,
    };
  }

  static async getAllResellers() {
    const { token } = this.getAuthToken();
    try {
      const response = await axios.get(baseUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data: getAllResellersResponse = response.data;
      return data;
    } catch (error) {
      console.error("Error fetching resellers:", error);
      throw error;
    }
  }

  static async AddReseller(payload: AddResellerPayload) {
    const { token } = this.getAuthToken();
    try {
      const response = await axios.post(`${baseUrl}/add`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data: ResellerResponse = response.data;
      return data;
    } catch (error) {
      console.error("Error fetching resellers:", error);
      throw error;
    }
  }

  static async UpdateReseller(payload: UpdateResellerPayload) {
    const { token } = this.getAuthToken();
    try {
      const response = await axios.post(`${baseUrl}/update/details`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data: ResellerResponse = response.data;
      return data;
    } catch (error) {
      console.error("Error updating reseller:", error);
      throw error;
    }
  }

  static async UpdateResellerPassword(payload: updateResellerPasswordPayload) {
    const { token } = this.getAuthToken();
    try {
      const response = await axios.post(`${baseUrl}/update/password`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data: { status: string; message: string } = response.data;
      return data;
    } catch (error) {
      console.error("Error updating reseller password:", error);
      throw error;
    }
  }

  static async DeleteReseller(payload: { id: number }) {
    const { token } = this.getAuthToken();
    try {
      const response = await axios.delete(`${baseUrl}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: payload,
      });
      const data: { status: string; message: string } = response.data;
      return data;
    } catch (error) {
      console.error("Error deleting reseller:", error);
      throw error;
    }
  }
}
