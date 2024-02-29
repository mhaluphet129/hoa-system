import ApiService, { Success } from "./api.service";
import { Response } from "@/types";
import { UserRegistrationDTO, UpdateUserDTO } from "@/assets/dto";

import Loader from "./utils/class_loader";

// TODO: email the credentials

export class UserService extends Loader {
  private readonly instance = new ApiService();

  public async createUser(user: UserRegistrationDTO): Promise<Response> {
    const response = await this.instance.post({
      endpoint: "/user/create-user",
      payload: user,
      publicRoute: true,
    });

    if (response instanceof Success) {
      return {
        code: response.code,
        success: true,
        data: response.response.user,
      };
    } else {
      return {
        code: 500,
        success: false,
        data: {
          message: "Error in the server.",
        },
      };
    }
  }

  public async updateUser(user: UpdateUserDTO): Promise<Response> {
    const response = this.instance.post({
      endpoint: "/user/update-user",
      payload: user,
    });

    if (response instanceof Success) {
      return {
        code: response.code,
        success: true,
        data: response.response.user,
      };
    } else {
      return {
        code: 500,
        success: false,
        data: {
          message: "Error in the server.",
        },
      };
    }
  }

  public async getUsers(type: string): Promise<Response> {
    this.loaderPush("fetch-user");
    const response = await this.instance.get({
      endpoint: "/user/get-users",
      query: {
        type,
      },
    });
    if (response instanceof Success) {
      this.loaderPop("fetch-user");
      return {
        code: response.code,
        success: true,
        data: {
          users: response.response.data.users,
        },
      };
    } else {
      this.loaderPop("fetch-user");
      return {
        code: 500,
        success: false,
        data: {
          message: "Error in the server.",
        },
      };
    }
  }
}
