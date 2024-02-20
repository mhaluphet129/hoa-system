import ApiService, { Success } from "./api.service";

import { HomeOwnerRegistrationDTO } from "@/assets/dto";
import { Response } from "@/types";
import Loader from "./utils/class_loader";

import { validate } from "class-validator";

export class RegistrationService extends Loader {
  private readonly instance = new ApiService();

  public async newHomeOwner(user: HomeOwnerRegistrationDTO): Promise<Response> {
    const errors = await validate(user);
    if (errors.length > 0) {
      return {
        code: 500,
        error: errors.map((err: any) => Object.values(err.constraints)),
      };
    }

    this.loaderPush("register");
    const response = await this.instance.post({
      endpoint: "/homeowner/register",
      payload: user,
    });

    if (response instanceof Success) {
      this.loaderPop("register");
      return {
        code: response.code,
        success: true,
        data: response.response,
      };
    } else {
      this.loaderPop("register");
      return {
        code: response.code,
        success: false,
        data: {
          message: response.response?.message ?? "Error in the Server",
        },
      };
    }
  }

  public async updateHomeowner(
    user: HomeOwnerRegistrationDTO
  ): Promise<Response> {
    // * temporary remove class-validator for dto optimization later on

    this.loaderPush("update");
    const response = await this.instance.post({
      endpoint: "/homeowner/update",
      payload: user,
    });

    if (response instanceof Success) {
      this.loaderPop("update");
      return {
        code: response.code,
        success: true,
        data: response.response,
      };
    } else {
      this.loaderPop("update");
      return {
        code: response.code,
        success: false,
        data: {
          message: response.response?.message ?? "Error in the Server",
        },
      };
    }
  }
}
