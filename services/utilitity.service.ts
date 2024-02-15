import ApiService, { Success } from "./api.service";
import { Response } from "@/types";

export class UtilService {
  private readonly instance = new ApiService();

  public async checkStakeholders(): Promise<Response> {
    let response = await this.instance.get({
      endpoint: "/etc/check-stakeholder",
      publicRoute: true,
    });

    if (response instanceof Success) {
      return {
        code: response.code,
        success: true,
        data: response.response.data,
      };
    } else {
      return {
        code: 500,
      };
    }
  }
}
