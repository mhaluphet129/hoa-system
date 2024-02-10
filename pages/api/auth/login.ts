import dbConnect from "@/database/dbConnect";
import User from "@/database/models/user.schema";
import { LoginDTO } from "@/assets/dto";
import { Response } from "@/assets/types";

import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { buildMapper } from "dto-mapper";

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY ?? "";

type LoginProps = Response & Partial<LoginDTO>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginProps>
) {
  await dbConnect();

  const { method } = req;
  const { username, password, loginMode } = req.body;

  if (method === "POST") {
    const validUser = await User.findOne({ username, type: loginMode }).lean();

    if (validUser) {
      const validPassword = await bcrypt.compare(password, validUser.password);

      if (validPassword) {
        const token = jwt.sign(validUser, JWT_PRIVATE_KEY);
        const mapper = buildMapper(LoginDTO);

        // TODO: fetch specified data by loginMode

        const user = mapper.serialize(validUser, loginMode);
        user.token = token;

        res.json({
          status: 200,
          message: "Login Success",
          ...user,
        });
      } else {
        res.json({
          status: 400,
          message: "Password is incorrect.",
        });
      }
    } else {
      res.json({
        message: "Account doesn't exist",
        status: 404,
      });
    }
  } else {
    res.json({ status: 405, message: "Incorrect Request Method" });
  }
}
