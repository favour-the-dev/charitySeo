import axios from "axios";
import { setCookie } from "cookies-next/client";
import { getCookie } from "cookies-next/client";
import { LoginResponse } from "@/types/types";

const base_Url = `${process.env.NEXT_PUBLIC_API_URL}`;

export default class AuthService {
  private static getAuthToken() {
    const token = getCookie("authToken");
    if (!token) {
      throw new Error("No auth token found");
    }
    return {
      token,
    };
  }
  static async login(email: string, password: string) {
    try {
      const response = await axios.post(`${base_Url}/login`, {
        email,
        password,
      });
      const data: LoginResponse = response.data;
      setCookie("authToken", data.data.token, { path: "/" });
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Login failed");
    }
  }
  static async logout() {
    const { token } = this.getAuthToken();
    try {
      const response = await axios.post(`${base_Url}/logout`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
