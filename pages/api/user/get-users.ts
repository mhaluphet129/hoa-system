import dbConnect from "@/database/dbConnect";
import User from "@/database/models/user.schema";
import { ExtendedResponse, User as UserType } from "@/types";

import type { NextApiRequest, NextApiResponse } from "next";

// TODO: then email the account credentials via node mailer

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExtendedResponse<UserType[]>>
) {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    const { type } = req.query;
    return await User.find(type ? { type } : {})
      .populate("homeownerId staffId treasurerId")
      .then((e) =>
        res.json({ code: 200, success: true, data: e as UserType[] })
      )
      .catch((e) => {
        console.log(e);
        return res.json({
          code: 500,
          success: false,
          message: "Error in the server",
        });
      });
  } else
    return res.json({
      success: false,
      code: 500,
      message: "Error in the server.",
    });
}

export default handler;
