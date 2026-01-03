import axios from "axios";
import { getCookie } from "cookies-next/client";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/workspace`;

export interface Workspace {
  id: number;
  name: string;
  slug: string;
  is_default: boolean;
  logo: string | null;
}

export interface CreateWorkspaceRequest {
  name: string;
  slug: string;
  is_default: boolean;
  logo?: File | string;
}

export interface UpdateWorkspaceRequest {
  id: number;
  name: string;
  slug: string;
  is_default: boolean;
}

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

  static async create(data: CreateWorkspaceRequest) {
    const { token } = this.getAuthToken();
    try {
      //   const formData = new FormData();
      //   formData.append("name", data.name);
      //   formData.append("slug", data.slug);
      //   formData.append("is_default", data.is_default ? "1" : "0");
      //   if (data.logo) {
      //     formData.append("logo", data.logo);
      //   }

      const response = await axios.post(`${baseUrl}/store`, data, {
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

  static async update(data: UpdateWorkspaceRequest) {
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
}
