import { ExtendedResponse, Homeowner } from "@/types";
import ApiService from "./api.service";
import Loader from "./utils/class_loader";

export class RegistrationService extends Loader {
  private readonly instance = new ApiService();

  public async newHomeOwner(
    user: Homeowner
  ): Promise<ExtendedResponse<Homeowner>> {
    this.loaderPush("register");
    const response = await this.instance.post<Homeowner>({
      endpoint: "/homeowner/register",
      payload: user,
    });
    this.loaderPop("register");
    return response;
  }

  // public async updateHomeowner(
  //   user: HomeOwnerRegistrationDTO
  // ): Promise<Response> {
  //   // * temporary remove class-validator for dto optimization later on

  //   this.loaderPush("update");
  //   const response = await this.instance.post({
  //     endpoint: "/homeowner/update",
  //     payload: user,
  //   });

  //   if (response instanceof Success) {
  //     this.loaderPop("update");
  //     return {
  //       code: response.code,
  //       success: true,
  //       data: response.response,
  //     };
  //   } else {
  //     this.loaderPop("update");
  //     return {
  //       code: response.code,
  //       success: false,
  //       data: {
  //         message: response.response?.message ?? "Error in the Server",
  //       },
  //     };
  //   }
  // }
}
