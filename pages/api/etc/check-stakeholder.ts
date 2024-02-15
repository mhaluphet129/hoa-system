import dbConnect from "@/database/dbConnect";
import User from "@/database/models/user.schema";
import { Response } from "@/types";

import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  await dbConnect();

  const { method } = req;

  if (method?.toLocaleUpperCase() === "GET") {
    try {
      let staffCount = await User.countDocuments({ type: "staff" });
      let treasurerCount = await User.countDocuments({ type: "treasurer" });
      // let bodCount = await User.countDocuments({ type: "bod" });

      res.json({
        code: 200,
        success: true,
        data: {
          staff: staffCount > 0,
          treasurer: treasurerCount > 0,
          // bod: bodCount > 0,
        },
      });
    } catch {
      res.json({
        code: 599,
        success: false,
        data: {
          message: "Error in the Server",
        },
      });
    }
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
