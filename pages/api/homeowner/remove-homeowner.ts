import dbConnect from "@/database/dbConnect";
import User from "@/database/models/user.schema";
import Homeowner from "@/database/models/user_homeowner.schema";
import { Response, User as UserType } from "@/types";

import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    const { id } = req.query;

    try {
      let homeownerId = await User.findOne({ _id: id })
        .lean()
        .then((e) => e.homeownerId);

      await User.findOneAndDelete({ _id: id, type: "homeowner" });
      await Homeowner.findOneAndDelete({ _id: homeownerId });

      return res.json({
        success: true,
        code: 200,
        message: "Successfully Removed",
      });
    } catch (e) {
      console.log(e);
      return res.json({
        success: false,
        code: 500,
        message: "Error in the server",
      });
    }
  } else
    return res.json({
      success: false,
      code: 500,
      message: "Invalid request method",
    });
}

export default handler;
