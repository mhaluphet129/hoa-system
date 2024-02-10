import ApiService, { Success } from "./api.service";
import { LoginDTO } from "@/assets/dto";
import { validate } from "class-validator";
import { setItemWithExpiry } from "@/assets/js";
import { Response } from "@/types";

export default class AuthService {
  private readonly instance = new ApiService();

  public async login(credentials: LoginDTO): Promise<Response> {
    const errors = await validate(credentials);

    if (errors.length > 0) {
      return {
        status: 500,
        error: errors.map((err: any) => Object.values(err.constraints)),
      };
    }

    const response = await this.instance.post({
      endpoint: "/auth/login",
      payload: credentials,
    });

    if (response instanceof Success) {
      setItemWithExpiry("token", response.response.token, 3600);
      return {
        status: 200,
        data: response.response,
      };
    } else {
      return {
        status: response.code,
        data: {
          message: response.response?.message ?? "Error in the Server",
        },
      };
    }
  }
}
