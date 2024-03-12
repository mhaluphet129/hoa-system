import ApiService from "./api.service";
import { Response, Event, ExtendedResponse } from "@/types";
import Loader from "./utils/class_loader";

export class StaffService extends Loader {
  private readonly instance = new ApiService();

  public async newAnnouncement(
    announce: Event
  ): Promise<ExtendedResponse<Event>> {
    this.loaderPush("new-annouce");
    const response = await this.instance.post<Event>({
      endpoint: "/staff/new-announcement",
      payload: announce,
    });
    this.loaderPop("new-annouce");
    return response;
  }
}
