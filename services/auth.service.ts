import ApiService from "./api.service";
import { ExtendedResponse, LoginProp, ProtectedUserWithToken } from "@/types";
import Loader from "./utils/class_loader";

export class AuthService extends Loader {
  private readonly instance = new ApiService();

  public async login(
    credentials: LoginProp
  ): Promise<ExtendedResponse<ProtectedUserWithToken>> {
    this.loaderPush("logging-in");
    const response = await this.instance.post<ProtectedUserWithToken>({
      endpoint: "/auth/login",
      payload: credentials,
      publicRoute: true,
    });
    this.loaderPop("logging-in");
    return response;
  }
}
