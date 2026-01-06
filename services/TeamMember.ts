import axios from "axios";
import { getCookie } from "cookies-next/client";
import { AddTeamMemberResponse } from "@/types/types";
const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/team`;

export interface TeamMember {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  user_access?: { id: number; has_access: boolean }[];
}

export interface CreateTeamMemberRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
  user_access: { id: number; has_access: boolean }[];
}

export interface UpdateTeamMemberRequest {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  password?: string;
  user_access: { id: number; has_access: boolean }[];
}

export interface UpdatePasswordRequest {
  id: number;
  password: string;
  password_confirmation: string;
}

export default class TeamMemberService {
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
      throw new Error("Failed to fetch team members");
    }
  }

  // static async create(payload: CreateTeamMemberRequest) {
  //   const { token } = this.getAuthToken();
  //   try {
  //     const response = await axios.post(`${baseUrl}/add`, payload, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const data: AddTeamMemberResponse = response.data;
  //     console.log("data", data);
  //     return data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  static async create(payload: CreateTeamMemberRequest) {
    const { token } = this.getAuthToken();

    try {
      const response = await axios.post(`${baseUrl}/add`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        throw {
          status: error.response?.data?.status ?? "error",
          message: error.response?.data?.message ?? "Something went wrong",
          errors: error.response?.data?.errors ?? null,
        };
      }

      throw {
        status: "error",
        message: "Unexpected error occurred",
      };
    }
  }

  static async update(data: UpdateTeamMemberRequest) {
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
      throw new Error("Failed to update team member");
    }
  }

  static async updatePassword(data: UpdatePasswordRequest) {
    const { token } = this.getAuthToken();
    try {
      const response = await axios.post(`${baseUrl}/update/password`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update password");
    }
  }

  static async delete(id: number) {
    const { token } = this.getAuthToken();
    try {
      const response = await axios.delete(`${baseUrl}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { id },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete team member");
    }
  }
}
