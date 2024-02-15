import ApiService, { Success } from "./api.service";

import { HomeOwnerRegistrationDTO } from "@/assets/dto";
import { Response } from "@/types";
import { useUserStore, useAuthStore } from "@/services/context";

import { validate } from "class-validator";

export default class RegistrationService {
  private readonly instance = new ApiService();

  public async newHomeOwner(user: HomeOwnerRegistrationDTO): Promise<Response> {
    const errors = await validate(user);

    if (errors.length > 0) {
      return {
        code: 500,
        error: errors.map((err: any) => Object.values(err.constraints)),
      };
    }

    const { setUser } = useUserStore();
    const { setAccessToken } = useAuthStore();

    const response = await this.instance.post({
      endpoint: "/homeowner/register",
      payload: user,
    });

    if (response instanceof Success) {
      setAccessToken(response.response.token);
      setUser(user);
      return {
        code: 200,
        data: response.response,
      };
    } else {
      return {
        code: response.code,
        data: {
          message: response.response?.message ?? "Error in the Server",
        },
      };
    }
  }
}
