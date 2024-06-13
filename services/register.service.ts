import { Bod, ExtendedResponse, Homeowner, Staff } from "@/types";
import ApiService from "./api.service";
import Loader from "./utils/class_loader";

export class RegistrationService {
  private readonly instance = new ApiService();

  public async newHomeOwner(user: Homeowner) {
    return await this.instance.post<Homeowner>({
      endpoint: "/homeowner/register",
      payload: user,
    });
  }

  public async newStaff(user: Staff): Promise<ExtendedResponse<Staff>> {
    return await this.instance.post<Staff>({
      endpoint: "/staff/register",
      payload: user,
    });
  }

  public async newBod(user: Staff): Promise<ExtendedResponse<Staff>> {
    return await this.instance.post<Bod>({
      endpoint: "/bod/register",
      payload: user,
    });
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
