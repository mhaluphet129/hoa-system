import { validate } from "class-validator";

import ApiService, { Success } from "./api.service";
import { Response } from "@/types";
import {
  UserRegistrationDTO,
  UserStaffDTO,
  UserHomeOwnerDTO,
  UserTreasurerDTO,
} from "@/assets/dto";

// TODO: email the credentials

export class UserService {
  private readonly instance = new ApiService();

  public async createUser(user: UserRegistrationDTO): Promise<Response> {
    switch (user.type) {
      case "homeowner": {
        let _user: UserHomeOwnerDTO = {
          name: user.homeownerId?.name,
          middlename: user.homeownerId?.middlename,
          lastname: user.homeownerId?.lastname,
          email: user.homeownerId?.email,
          phone: user.homeownerId?.phone,
          move_in_date: user.homeownerId?.move_in_date,
          type: user.homeownerId?.type,
          spouse_name: user.homeownerId?.spouse_name,
          spouse_number: user.homeownerId?.spouse_number,
          monthly_due: user.homeownerId?.monthly_due,
          annual_membership_fee: user.homeownerId?.annual_membership_fee,
          profile_description: user.homeownerId?.profile_description,
        };

        const errors = await validate(_user!);

        if (errors.length > 0) {
          return {
            code: 500,
            error: errors.map((err: any) => Object.values(err.constraints)),
          };
        }
        break;
      }

      case "staff": {
        let _user: UserStaffDTO = {
          name: user.staffId?.name,
          role: user.staffId?.role,
        };

        const errors = await validate(_user!);

        if (errors.length > 0) {
          return {
            code: 500,
            error: errors.map((err: any) => Object.values(err.constraints)),
          };
        }

        break;
      }

      case "treasurer": {
        let _user: UserTreasurerDTO = {
          account_balance: user.treasurerId?.account_balance,
        };

        const errors = await validate(_user!);

        if (errors.length > 0) {
          return {
            code: 500,
            error: errors.map((err: any) => Object.values(err.constraints)),
          };
        }
        break;
      }

      case "bod": {
        // let _user = user.;
        // const errors = await validate(_user!);

        // if (errors.length > 0) {
        //   return {
        //     code: 500,
        //     error: errors.map((err: any) => Object.values(err.constraints)),
        //   };
        // }

        return {
          code: 202,
        };
      }
    }

    const response = await this.instance.post({
      endpoint: "/user/create-user",
      payload: user,
      publicRoute: true,
    });

    if (response instanceof Success) {
      return {
        code: response.code,
        success: true,
        data: response.response.user,
      };
    } else {
      return {
        code: 500,
        success: false,
        data: {
          message: "Error in the server.",
        },
      };
    }
  }
}
