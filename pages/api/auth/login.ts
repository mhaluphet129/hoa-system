import dbConnect from "@/database/dbConnect";
import User from "@/database/models/user.schema";
import { Response } from "@/types";
import { sign } from "@/assets/js";

import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY ?? "";

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  await dbConnect();

  const { method } = req;
  const { username, password } = req.body;

  if (method === "POST") {
    const validUser = await User.findOne({
      $or: [{ username, email: username }],
    }).lean();

    if (validUser) {
      const validPassword = await bcrypt.compare(password, validUser.password);
      if (validPassword) {
        delete validUser.password;
        delete validUser.createdAt;
        delete validUser.updatedAt;
        delete validUser.__v;

        const token = await sign(validUser, JWT_PRIVATE_KEY);

        res.json({
          code: 200,
          success: true,
          data: {
            message: "Login Success",
            user: validUser,
            token: token,
          },
        });
      } else
        res.json({
          code: 404,
          success: false,
          data: {
            message: "Invalid Password",
          },
        });
    } else
      res.json({
        code: 404,
        success: false,
        data: {
          message: "User doesn't exist",
        },
      });
  } else {
    res.json({
      code: 405,
      success: false,
      data: {
        message: "Incorrect Request Method",
      },
    });
  }
}

export default handler;
