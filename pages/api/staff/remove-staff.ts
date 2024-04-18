import dbConnect from "@/database/dbConnect";
import User from "@/database/models/user.schema";
import Staff from "@/database/models/user_staff.schema";
import { Response, User as UserType } from "@/types";

import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    const { id } = req.query;

    try {
      let staffId = await User.findOne({ _id: id })
        .lean()
        .then((e) => e.staffId);

      await User.findOneAndDelete({ _id: id, type: "staff" });
      await Staff.findOneAndDelete({ _id: staffId });

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
