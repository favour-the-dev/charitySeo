import axios from "axios";
import { setCookie } from "cookies-next/client";
import { LoginResponse } from "@/types/types";

const base_Url = `${process.env.NEXT_PUBLIC_API_URL}/login`;

export default class AuthService {
  static async login(email: string, password: string) {
    try {
      const response = await axios.post(`${base_Url}`, {
        email,
        password,
      });
      const data: LoginResponse["data"] = response.data.data;
      setCookie("authToken", data.token, { path: "/" });
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Login failed");
    }
  }
}
