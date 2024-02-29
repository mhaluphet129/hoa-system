import ApiService, { Success } from "./api.service";
import { AnnouncementDTO } from "@/assets/dto";
import { validate } from "class-validator";
import { Response } from "@/types";
import Loader from "./utils/class_loader";

export class StaffService extends Loader {
  private readonly instance = new ApiService();

  public async newAnnouncement(announce: AnnouncementDTO): Promise<Response> {
    const errors = await validate(announce);

    if (errors.length > 0) {
      return {
        code: 500,
        error: errors.map((err: any) => Object.values(err.constraints)),
      };
    }

    this.loaderPush("new-annouce");
    const response = await this.instance.post({
      endpoint: "/staff/new-announcement",
      payload: announce,
    });

    if (response instanceof Success) {
      this.loaderPop("new-annouce");
      return {
        code: response.code,
        success: true,
        data: response.response.data,
      };
    } else {
      this.loaderPop("new-annouce");
      return {
        code: response.code,
        success: false,
        data: response.response.data,
      };
    }
  }
}
