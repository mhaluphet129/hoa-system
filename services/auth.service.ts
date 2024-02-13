import ApiService, { Success } from "./api.service";
import { LoginDTO } from "@/assets/dto";
import { validate } from "class-validator";
import { Response } from "@/types";

export default class AuthService {
  private readonly instance = new ApiService();

  public async login(credentials: LoginDTO): Promise<Response> {
    const errors = await validate(credentials);

    if (errors.length > 0) {
      return {
        code: 500,
        error: errors.map((err: any) => Object.values(err.constraints)),
      };
    }

    const response = await this.instance.post({
      endpoint: "/auth/login",
      payload: credentials,
      publicRoute: true,
    });

    if (response instanceof Success) {
      return {
        code: response.code,
        success: true,
        data: {
          message: response.response.data.message,
          token: response.response.data.token,
        },
      };
    } else {
      return {
        code: response.code,
        success: false,
        data: {
          message: response.response.data.message,
        },
      };
    }
  }
}
