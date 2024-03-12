import ApiService from "./api.service";
import {
  Response,
  PaginationProps,
  EventWithTotal,
  ExtendedResponse,
} from "@/types";
import Loader from "./utils/class_loader";

export class EventService extends Loader {
  private readonly instance = new ApiService();

  public async getEvent({
    pageSize,
    page,
  }: PaginationProps): Promise<ExtendedResponse<EventWithTotal>> {
    this.loaderPush("get-events");
    const response = await this.instance.get<EventWithTotal>({
      endpoint: "/event/get-events",
      query: {
        pageSize,
        page,
      },
    });
    this.loaderPop("get-events");
    return response;
  }

  public async removeEvent(id: string): Promise<Response> {
    this.loaderPush("removing-event");
    const response = await this.instance.get<Response>({
      endpoint: "/event/remove-event",
      query: {
        id,
      },
    });
    this.loaderPop("removing-event");
    return response;
  }

  public async getEventAll(): Promise<ExtendedResponse<EventWithTotal>> {
    this.loaderPush("get-event-all");
    const response = await this.instance.get<EventWithTotal>({
      endpoint: "/event/get-events-all",
    });
    this.loaderPop("get-event-all");
    return response;
  }
}
