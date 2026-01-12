import axios from "axios";
import { getCookie } from "cookies-next/client";
import {
  getConnectedFacebookPagesResponse,
  saveFacbookCredentialsPayload,
} from "@/types/types";
const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

export default class IntegrationService {
  private static getAuthToken() {
    const token = getCookie("authToken");
    if (!token) {
      throw new Error("No auth token found");
    }
    return { token };
  }

  static async connectFacebook() {
    try {
      const { token } = this.getAuthToken();
      const res = await axios.get(`${baseUrl}/facebook/connect`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: { oauth_url?: string } = res.data;
      if (!data?.oauth_url) {
        throw new Error("Facebook OAuth URL not returned by API");
      }
      return data.oauth_url;
    } catch (error) {
      console.error("Error connecting to Facebook:", error);
      throw error;
    }
  }

  static async getConnectedFacebookPages(
    workspace_id: number
  ): Promise<getConnectedFacebookPagesResponse> {
    try {
      const { token } = this.getAuthToken();
      const res = await axios.get(
        `${baseUrl}/facebook/pages?workspace_id=${workspace_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data: getConnectedFacebookPagesResponse = res.data;
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async saveFacebookPages(payload: saveFacbookCredentialsPayload) {
    try {
      const { token } = this.getAuthToken();
      const res = await axios.post(
        `${baseUrl}/save/user/facebook/credentials?Acc`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data;
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
