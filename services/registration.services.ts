import ApiService, { Success } from "./api.service";

import { HomeOwnerRegistrationDTO } from "@/assets/dto";
import { Response } from "@/types";
import { setItemWithExpiry } from "@/assets/js";

import { validate } from "class-validator";

export default class RegistrationService {
  private readonly instance = new ApiService();

  public async newHomeOwner(user: HomeOwnerRegistrationDTO): Promise<Response> {
    const errors = await validate(user);

    if (errors.length > 0) {
      return {
        status: 500,
        error: errors.map((err: any) => Object.values(err.constraints)),
      };
    }

    const response = await this.instance.post({
      endpoint: "/homeowner/register",
      payload: user,
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
