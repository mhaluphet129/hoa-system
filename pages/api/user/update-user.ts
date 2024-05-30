import dbConnect from "@/database/dbConnect";
import User from "@/database/models/user.schema";
import { ExtendedResponse, Response } from "@/types";

import type { NextApiRequest, NextApiResponse } from "next";

// TODO: then email the account credentials via node mailer

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExtendedResponse<Response>>
) {
  await dbConnect();
  const { method } = req;

  if (method === "POST") {
    const { _id } = req.body;

    return await User.findOneAndUpdate({ _id }, { $set: req.body })
      .populate("treasurerId homeownerId staffId")
      .then((e) =>
        res.json({
          code: 200,
          success: true,
          message: "Successfully Updated",
          data: e,
        })
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
      code: 500,
      success: false,
      message: "Error in the server.",
    });
}

export default handler;
