import { ExtendedResponse, Homeowner, Staff } from "@/types";
import ApiService from "./api.service";
import Loader from "./utils/class_loader";

export class RegistrationService extends Loader {
  private readonly instance = new ApiService();

  public async newHomeOwner(user: Homeowner) {
    return await this.instance.post<Homeowner>({
      endpoint: "/homeowner/register",
      payload: user,
    });
  }

  public async newStaff(user: Staff): Promise<ExtendedResponse<Staff>> {
    this.loaderPush("register");
    const response = await this.instance.post<Staff>({
      endpoint: "/staff/register",
      payload: user,
    });
    this.loaderPop("register");
    return response;
  }

  public async updateHomeowner(_id: string, payload: any) {
    return await this.instance.post({
      endpoint: "/homeowner/update",
      payload: {
        _id,
        ...payload,
      },
    });
  }

  public async updateStaff(_id: string, payload: any) {
    return await this.instance.post({
      endpoint: "/staff/update",
      payload: {
        _id,
        ...payload,
      },
    });
  }
}
