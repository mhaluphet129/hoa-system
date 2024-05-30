import ApiService from "./api.service";
import {
  Response,
  Event,
  ExtendedResponse,
  Category,
  CategoryData,
  Staff,
  Transaction,
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
    return await this.instance.get<Category[]>({
      endpoint: "/staff/category",
    });
  }

  public async newCategory(category: CategoryData): Promise<Response> {
    this.loaderPush("new-category");
    const response = await this.instance.post<Response>({
      endpoint: "/staff/category",
      payload: category,
    });
    this.loaderPop("new-category");
    return response;
  }

  public async updateCategory(
    category: CategoryData,
    _id: string
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

  public async updateStaff(_id: string, payload: any) {
    return await this.instance.post<Staff>({
      endpoint: "/staff/update",
      payload: {
        _id,
        ...payload,
      },
    });
  }

  public async getDues(query?: any) {
    return await this.instance.get<Transaction[]>({
      endpoint: "/due",
      query,
    });
  }
  public async newDue(payload: Transaction) {
    return await this.instance.post<Transaction>({
      endpoint: "/due",
      payload,
    });
  }

  public async updateTransaction(_id: string, payload: any) {
    return await this.instance.post<Response>({
      endpoint: "/due",
      payload: { ...payload, _id },
    });
  }

  public async deleteTransaction(id: string) {
    return await this.instance.get<Response>({
      endpoint: "/due/delete",
      query: { id },
    });
  }
}
