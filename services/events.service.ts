import ApiService, { Success } from "./api.service";
import { Response, PaginationProps } from "@/types";

export class EventService {
  private readonly instance = new ApiService();

  public async getEvent({
    pageSize,
    page,
  }: PaginationProps): Promise<Response> {
    const response = await this.instance.get({
      endpoint: "/event/get-events",
      query: {
        pageSize,
        page,
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
        success: false,
        data: {
          message: response.response?.message ?? "Error in the server",
        },
      };
    }
  }

  public async getEventAll(): Promise<Response> {
    const response = await this.instance.get({
      endpoint: "/event/get-events-all",
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
        success: false,
        data: {
          message: response.response?.message ?? "Error in the server",
        },
      };
    }
  }
}
