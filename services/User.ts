import axios from "axios";
import { getCookie } from "cookies-next/client";
import {
  UpdateUserNameResponse,
  UpdateUserPasswordResponse,
} from "@/types/types";

interface UpdateNamePayload {
  first_name: string;
  last_name: string;
}
interface updatePasswordPayload {
  password: string;
  password_confirmation: string;
}

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/user`;

export default class UserService {
  private static getAuthToken() {
    const token = getCookie("authToken");
    if (!token) {
      throw new Error("No auth token found");
    }
    return { token };
  }

  static async UpdateUserName(payload: UpdateNamePayload) {
    const { token } = this.getAuthToken();
    try {
      const response = await axios.post(`${baseUrl}/update-name`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: UpdateUserNameResponse = response.data;
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async UpdateUserPassword(
    payload: updatePasswordPayload
  ): Promise<UpdateUserPasswordResponse> {
    const { token } = this.getAuthToken();
    try {
      const response = await axios.post(`${baseUrl}/update-password`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: UpdateUserPasswordResponse = response.data;
      return data;
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }
}
