import axios from "axios";
import { verify } from "@/assets/js";
import { useAuthStore } from "./context";

// TODO: re-adjust the expire token if user still accessing the api

class API {
  public async get({
    endpoint,
    query,
    publicRoute = false,
  }: {
    endpoint: string;
    query?: Record<any, any>;
    publicRoute?: boolean;
  }) {
    const { accessToken: token } = useAuthStore.getState();

    if (!publicRoute) {
      try {
        const flag = await verify(token!, process.env.JWT_PRIVATE_KEY!);
        if (!token && !flag && !publicRoute) throw new Error("No bearer");
      } catch {
        return new Fail({
          code: 401,
          response: { message: "Incorrect/No Bearer token" },
        });
      }
    }

    const request = await axios.get(`/api/${endpoint}`, {
      params: query,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (request.data.success)
      return new Success({ code: request.data.code, response: request.data });
    else
      return new Fail({
        code: request.data.status ?? 500,
        response: request.data,
      });
  }

  public async post({
    endpoint,
    payload,
    publicRoute = false,
  }: {
    endpoint: string;
    payload?: Record<any, any>;
    publicRoute?: boolean;
  }) {
    const { accessToken: token } = useAuthStore.getState();
    if (!publicRoute) {
      try {
        const flag = await verify(token!, process.env.JWT_PRIVATE_KEY!);
        if (!token || !flag) throw new Error("No bearer");
      } catch (e) {
        console.log(e);

        return new Fail({
          code: 401,
          response: { message: "Incorrect/No Bearer token" },
        });
      }
    }

    const { data } = await axios.post(`/api/${endpoint}`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (data.success)
      return new Success({
        code: data.code,
        response: data,
      });
    else
      return new Fail({
        code: data.code ?? 500,
        response: data,
      });
  }
}

class Success {
  public readonly code: number;
  public readonly response: Record<any, any>;

  public constructor({
    code,
    response,
  }: {
    code: number;
    response: Record<any, any>;
  }) {
    this.code = code;
    this.response = response;
  }
}

// class Fail extends Success {}

class Fail {
  public readonly code: number;
  public readonly response: Record<any, any>;

  public constructor({
    code,
    response,
  }: {
    code: number;
    response: Record<any, any>;
  }) {
    this.code = code;
    this.response = response;
  }
}

export { Success, Fail };
export default API;
