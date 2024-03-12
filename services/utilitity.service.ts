import ApiService from "./api.service";
import {
  ExtendedResponse,
  CheckStakeholderProps,
  ProtectedUser,
} from "@/types";
import Loader from "./utils/class_loader";

export class UtilService extends Loader {
  private readonly instance = new ApiService();

  public async checkStakeholders(): Promise<
    ExtendedResponse<CheckStakeholderProps>
  > {
    this.loaderPush("checking-stakeholder");
    let response = await this.instance.get<CheckStakeholderProps>({
      endpoint: "/etc/check-stakeholder",
      publicRoute: true,
    });
    this.loaderPop("checking-stakeholder");
    return response;
  }

  public async getStakeholder(
    id: string,
    type: string
  ): Promise<ExtendedResponse<ProtectedUser>> {
    this.loaderPush("getting-stakeholder");
    let response = await this.instance.get<ProtectedUser>({
      endpoint: "/etc/get-stakeholder",
      query: {
        id,
        type,
      },
    });
    this.loaderPop("getting-stakeholder");
    return response;
  }
}
