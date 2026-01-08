import axios from "axios";
import { getCookie } from "cookies-next/client";
const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/workspace`;
const activeBaseUrl = `${process.env.NEXT_PUBLIC_API_URL}/workspaces`;
import { CreateWorkspacePayload, UpdateWorkspacePayload } from "@/types/types";
export default class WorkspaceService {
  private static getAuthToken() {
    const token = getCookie("authToken");
    if (!token) {
      throw new Error("No auth token found");
    }
    return {
      token,
    };
  }

  static async getAll() {
    const { token } = this.getAuthToken();
    try {
      const response = await axios.get(baseUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch workspaces");
    }
  }

  static async create(payload: CreateWorkspacePayload) {
    const { token } = this.getAuthToken();
    try {
      const response = await axios.post(`${baseUrl}/store`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create workspace");
    }
  }

  static async update(data: UpdateWorkspacePayload) {
    const { token } = this.getAuthToken();
    try {
      const response = await axios.post(`${baseUrl}/update`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update workspace");
    }
  }

  static async delete(id: number) {
    const { token } = this.getAuthToken();
    try {
      const response = await axios.post(
        `${baseUrl}/delete`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete workspace");
    }
  }

  static async setActive(id: number) {
    const { token } = this.getAuthToken();
    try {
      const response = await axios.post(
        `${activeBaseUrl}/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to set active workspace");
    }
  }
}
