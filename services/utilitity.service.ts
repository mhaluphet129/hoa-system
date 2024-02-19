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

  public async getStakeholder(id: string, type: string): Promise<Response> {
    let response = await this.instance.get({
      endpoint: "/etc/get-stakeholder",
      query: {
        id,
        type,
      },
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
