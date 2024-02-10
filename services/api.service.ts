import axios from "axios";
import { getItem } from "@/assets/js";

class API {
  public async get({
    endpoint,
    query,
  }: {
    endpoint: string;
    query?: Record<any, any>;
  }) {
    const token = getItem("token");

    if (!token)
      return new Fail({
        code: 401,
        response: { message: "Incorrect/No Bearer token" },
      });

    const request = await axios.get(endpoint, {
      params: query,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (request.data.status == 200)
      return new Success({ code: 200, response: request.data });
    else
      return new Fail({
        code: request.data.status ?? 500,
        response: { errorMessage: "Error in the Server" },
      });
  }

  public async post({
    endpoint,
    payload,
  }: {
    endpoint: string;
    payload?: Record<any, any>;
  }) {
    const token = getItem("token");

    if (!token)
      return new Fail({
        code: 401,
        response: { message: "Incorrect/No Bearer token" },
      });

    const request = await axios.post(endpoint, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (request.data.status == 200)
      return new Success({ code: 200, response: request.data });
    else
      return new Fail({
        code: request.data.status ?? 500,
        response: { errorMessage: "Error in the Server" },
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
