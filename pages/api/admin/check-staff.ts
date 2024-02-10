import dbConnect from "@/database/dbConnect";
import User from "@/database/models/user.schema";
import UserStaff from "@/database/models/user_staff.schema";
import { LoginDTO } from "@/assets/dto";
import { Response } from "@/assets/types";
import { mapResponseToDTO } from "@/assets/js";

import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

import type { NextApiRequest, NextApiResponse } from "next";
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY ?? "";

type LoginProps = Response & Partial<LoginDTO>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginProps>
) {
  await dbConnect();

  const { method } = req;

  if (method === "GET") {
    const staffCount = await User.countDocuments({ type: "staff" });

    if (staffCount == 0) {
      // create new staff with default username and password
      new Promise<LoginDTO>(async (resolve, reject) => {
        let newStaff = new UserStaff({ name: "Staff 1", role: "First Staff" });
        await newStaff.save();

        let newUserStaff = await new User({
          username: "staff-01",
          type: "staff",
          staffId: newStaff._id,
        });
        newUserStaff.password = await bcrypt.hash("password", 8);
        await newUserStaff.save();

        let user = mapResponseToDTO<LoginDTO, typeof newUserStaff>(
          newUserStaff
        );

        const token = jwt.sign(newUserStaff, JWT_PRIVATE_KEY);
        user.token = token;

        resolve(user);
      }).then((doc) => {
        res.json({
          status: 200,
          message: "Redirecting to Home",
          ...doc,
        });
      });
    } else res.json({ status: 200, message: "Already had staff" });
  } else {
    res.json({ status: 405, message: "Incorrect Request Method" });
  }
}
