import { AxiosInstance } from "axios";
import AxiosService from "./axios.service";
import { HomeOwnerRegistrationDTO } from "../assets/dto";
import { validate } from "class-validator";

export default class RegistrationService {
  protected readonly axiosClient: AxiosInstance;

  public constructor() {
    this.axiosClient = new AxiosService().instance;
  }

  public async newHomeOwner(user: HomeOwnerRegistrationDTO): Promise<any> {
    const errors = await validate(user);
    if (errors.length > 0) {
      console.log(
        `Validation failed: ${errors
          .map((error: any) => Object.values(error.constraints))
          .join(", ")}`
      );
    }
  }
}
