import ApiService from "./api.service";
import {
  ExtendedResponse,
  User,
  UpdateHomeownerProps,
  Response,
} from "@/types";

import Loader from "./utils/class_loader";

// TODO: email the credentials

export class UserService extends Loader {
  private readonly instance = new ApiService();

  public async createUser(user: User): Promise<ExtendedResponse<User>> {
    this.loaderPush("new-user");
    const response = await this.instance.post<User>({
      endpoint: "/user/create-user",
      payload: user,
      publicRoute: true,
    });
    this.loaderPop("new-user");
    return response;
  }

  public async updateUser(user: UpdateHomeownerProps): Promise<Response> {
    this.loaderPush("updating-ho");
    const response = this.instance.post({
      endpoint: "/user/update-user",
      payload: user,
    });
    this.loaderPop("updating-ho");
    return response;
  }

  public async getUsers(type: string): Promise<ExtendedResponse<User[]>> {
    this.loaderPush("fetch-user");
    const response = await this.instance.get<User[]>({
      endpoint: "/user/get-users",
      query: {
        type,
      },
    });
    this.loaderPop("fetch-user");
    return response;
  }

  public async removeHomeOwner(id: string): Promise<Response> {
    this.loaderPush("removing-ho");
    const response = await this.instance.get<Response>({
      endpoint: "/homeowner/remove-homeowner",
      query: { id },
    });
    this.loaderPop("removing-ho");
    return response;
  }
}
