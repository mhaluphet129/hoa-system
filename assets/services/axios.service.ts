import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

export default class AxiosService {
  public instance: AxiosInstance;

  public constructor() {
    this.instance = axios.create({
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 30000,
      timeoutErrorMessage: "Time out",
    });

    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = this.getToken();
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  private getToken(): string | null {
    return Cookies.get("token") || "";
  }
}
