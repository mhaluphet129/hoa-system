import ApiService from "./api.service";
import { Treasurer } from "@/types";

export class TreasurerService {
  private readonly instance = new ApiService();

  public async newTreasurer(treasurer?: Treasurer) {
    if (!treasurer) treasurer = { account_balance: 0, name: "Treasurer" };

    return await this.instance.post<Treasurer>({
      endpoint: "/treasurer",
      payload: treasurer,
    });
  }

  public async updateTreasurer(_id: string, payload: any) {
    return await this.instance.post<Treasurer>({
      endpoint: "/treasurer",
      payload: {
        _id,
        ...payload,
      },
    });
  }
}
