import axios from "axios";
import { getCookie } from "cookies-next/client";
import {
  getAdminDashboardResponse,
  CreateUserPayload,
  CreateUserResponse,
  udpateUserPayload,
  UpdateUserResponse,
  UpdateUserSubscriptionsPayload,
  updateUserPasswordPayload,
} from "@/types/types";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/admin`;
const activateUrl = `${process.env.NEXT_PUBLIC_API_URL}`;
export default class AdminService {
  private static getAuthToken() {
    const token = getCookie("authToken");
    if (!token) {
      throw new Error("No auth token found");
    }
    return { token };
  }

  static async getAdminDashboardData(): Promise<getAdminDashboardResponse> {
    try {
      const { token } = this.getAuthToken();
      const response = await axios.get(baseUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data: getAdminDashboardResponse = response.data;
      return data;
    } catch (error) {
      console.error("Error fetching admin dashboard data:", error);
      throw error;
    }
  }

  static async createUser(
    payload: CreateUserPayload
  ): Promise<CreateUserResponse> {
    try {
      const { token } = this.getAuthToken();
      const response = await axios.post(`${baseUrl}/users/add`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data: CreateUserResponse = response.data;
      return data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  static async updateUser(
    payload: udpateUserPayload
  ): Promise<UpdateUserResponse> {
    try {
      const { token } = this.getAuthToken();
      // Remove password from payload if it's empty to avoid accidental overwrites or backend validation errors
      // if the backend uses the same endpoint. But here we have specific endpoints.
      // Based on type, it's there, but let's see.

      const response = await axios.post(
        `${baseUrl}/users/update/details`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data: UpdateUserResponse = response.data;
      return data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  static async deleteUser(
    user_id: number
  ): Promise<{ status: string; message: string }> {
    const { token } = this.getAuthToken();
    console.log("token: ", token);
    try {
      const response = await axios.post(
        `${baseUrl}/users/delete`,
        { user_id: user_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data: { status: string; message: string } = response.data;
      return data;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }

  static async activateUser(
    id: number
  ): Promise<{ status: string; message: string }> {
    try {
      const { token } = this.getAuthToken();
      const res = await axios.post(
        `${activateUrl}/activateUser`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data: { status: string; message: string } = res.data;
      return data;
    } catch (error) {
      console.error("Error activating user:", error);
      throw error;
    }
  }
  static async deactivateUser(id: number): Promise<{
    status: string;
    message: string;
    user?: { id: number; email: string; is_active: boolean };
  }> {
    try {
      const { token } = this.getAuthToken();
      const res = await axios.post(
        `${activateUrl}/deactivateUser`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data: {
        status: string;
        message: string;
        user?: { id: number; email: string; is_active: boolean };
      } = res.data;
      return data;
    } catch (error) {
      console.error("Error deactivating user:", error);
      throw error;
    }
  }

  static async updateUserSubscriptions(
    payload: UpdateUserSubscriptionsPayload
  ): Promise<{ status: string; message: string }> {
    try {
      const { token } = this.getAuthToken();
      const res = await axios.post(
        `${baseUrl}/users/update/subscriptions`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data: { status: string; message: string } = res.data;
      return data;
    } catch (error) {
      console.error("Error updating user subscriptions:", error);
      throw error;
    }
  }

  static async updateUserPassword(
    payload: updateUserPasswordPayload
  ): Promise<{ status: string; message: string }> {
    try {
      const { token } = this.getAuthToken();
      const res = await axios.post(
        `${baseUrl}/users/update/password`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data: { status: string; message: string } = res.data;
      return data;
    } catch (error) {
      console.error("Error updating user password: ", error);
      throw error;
    }
  }
}
