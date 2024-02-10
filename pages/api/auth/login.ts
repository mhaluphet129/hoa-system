import dbConnect from "@/database/dbConnect";
import User from "@/database/models/user.schema";
import { LoginDTO } from "@/assets/dto";
import { Response } from "@/types";

import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY ?? "";

type LoginProps = Response & Partial<LoginDTO>;

async function handler(req: NextApiRequest, res: NextApiResponse<LoginProps>) {
  await dbConnect();

  const { method } = req;
  const { username, password } = req.body;

  if (method === "POST") {
    const validUser = await User.findOne({ username }).lean();
    const validPassword = await bcrypt.compare(password, validUser.password);

    if (validUser) {
      if (validPassword) {
        delete validUser.password;
        delete validUser.createdAt;
        delete validUser.updatedAt;
        delete validUser.__v;

        const token = jwt.sign(validUser, JWT_PRIVATE_KEY);

        Cookies.set("loggedIn", "true");

        res.json({
          token: token,
          status: 200,
          message: "Login Success",
          ...validUser,
        });
      } else
        res.json({
          status: 404,
          message: "Invalid Password",
        });
    } else res.json({ status: 404, message: "User doesn't exist" });
  } else {
    res.json({ status: 405, message: "Incorrect Request Method" });
  }
}

export default handler;
