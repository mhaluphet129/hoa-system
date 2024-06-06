import ApiService from "./api.service";
import { Notification } from "@/types";

export class NotificationService {
  private readonly instance = new ApiService();

  public async getNotif(query: any) {
    return this.instance.get<Notification[]>({
      endpoint: "/notification",
      query,
    });
  }
}
