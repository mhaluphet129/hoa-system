import ApiService from "./api.service";
import {
  Response,
  Event,
  ExtendedResponse,
  NewCategoryData,
  Category,
  NewCategoryDataOptionalProps,
} from "@/types";
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

  public async getCategory(): Promise<ExtendedResponse<Category[]>> {
    this.loaderPush("get-cat");
    const response = await this.instance.get<Category[]>({
      endpoint: "/staff/category",
    });
    this.loaderPop("get-cat");
    return response;
  }

  public async newCategory(category: NewCategoryData): Promise<Response> {
    this.loaderPush("new-category");
    const response = await this.instance.post<Response>({
      endpoint: "/staff/category",
      payload: category,
    });
    this.loaderPop("new-category");
    return response;
  }

  public async updateCategory(
    category: NewCategoryDataOptionalProps
  ): Promise<Response> {
    this.loaderPush("up-cat");
    const response = await this.instance.post<Response>({
      endpoint: "/staff/update-category",
      payload: { ...category },
    });
    this.loaderPop("up-cat");
    return response;
  }

  public async deleteCategory(_id: string): Promise<Response> {
    this.loaderPush("del-cat");
    const response = await this.instance.get<Response>({
      endpoint: "/staff/delete-category",
      query: { _id },
    });
    this.loaderPop("del-cat");
    return response;
  }
}
