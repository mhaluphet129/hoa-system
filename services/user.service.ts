import ApiService from "./api.service";
import {
  ExtendedResponse,
  User,
  UpdateHomeownerProps,
  Response,
  NewHomeownerTransactionData,
  Transaction,
  ConcernData,
  Concern,
} from "@/types";

import Loader from "./utils/class_loader";

// TODO: email the credentials

export class UserService extends Loader {
  private readonly instance = new ApiService();

  public async createUser(user: User): Promise<ExtendedResponse<User>> {
    this.loaderPush("new-user");
    const response = await this.instance.post<User>({
      endpoint: "/user/create-user",
      payload: user,
      publicRoute: true,
    });
    this.loaderPop("new-user");
    return response;
  }

  public async updateUser(_id: string, payload: any) {
    this.loaderPush("updating-ho");
    const response = this.instance.post({
      endpoint: "/user/update-user",
      payload: {
        _id,
        ...payload,
      },
    });
    this.loaderPop("updating-ho");
    return response;
  }

  public async getUsers(query?: any): Promise<ExtendedResponse<User[]>> {
    this.loaderPush("fetch-user");
    const response = await this.instance.get<User[]>({
      endpoint: "/user/get-users",
      query,
    });
    this.loaderPop("fetch-user");
    return response;
  }

  public async removeHomeOwner(id: string): Promise<Response> {
    this.loaderPush("removing-ho");
    const response = await this.instance.get<Response>({
      endpoint: "/homeowner/remove-homeowner",
      query: { id },
    });
    this.loaderPop("removing-ho");
    return response;
  }

  public async removeStaff(id: string): Promise<Response> {
    this.loaderPush("removing-ho");
    const response = await this.instance.get<Response>({
      endpoint: "/staff/remove-staff",
      query: { id },
    });
    this.loaderPop("removing-ho");
    return response;
  }

  public async newTransaction(
    data: NewHomeownerTransactionData
  ): Promise<Response> {
    this.loaderPush("new-transaction");
    const response = await this.instance.post<Response>({
      endpoint: "/user/transaction",
      payload: data,
    });
    this.loaderPop("new-transaction");
    return response;
  }

  public async getTransaction(
    userId?: string
  ): Promise<ExtendedResponse<[Transaction[], Transaction[]]>> {
    this.loaderPush("get-transaction");
    const response = await this.instance.get<[Transaction[], Transaction[]]>({
      endpoint: "/user/transaction",
      query: { userId },
    });
    this.loaderPop("get-transaction");
    return response;
  }

  public async newConcern(data: ConcernData): Promise<Response> {
    this.loaderPush("new-concern");
    this.loaderPush("get-transaction");
    const response = await this.instance.post<Response>({
      endpoint: "/user/concern",
      payload: data,
    });
    this.loaderPop("new-concern");
    return response;
  }

  public async getConcerns(
    homeownerId?: string
  ): Promise<ExtendedResponse<Concern[]>> {
    this.loaderPush("get-concerns");
    const response = await this.instance.get<Concern[]>({
      endpoint: "/user/concern",
      query: { homeownerId },
    });
    this.loaderPop("get-concerns");
    return response;
  }

  public async resolveConcern(
    id: string
  ): Promise<ExtendedResponse<Concern[]>> {
    this.loaderPush("get-concerns");
    const response = await this.instance.get<Concern[]>({
      endpoint: "/user/resolve-concern",
      query: { id },
    });
    this.loaderPop("get-concerns");
    return response;
  }

  public async deleteConcern(_id?: string): Promise<Response> {
    this.loaderPush("delete-concerns");
    const response = await this.instance.get({
      endpoint: "/user/delete-concern",
      query: { _id },
    });
    this.loaderPop("delete-concerns");
    return response;
  }
}
