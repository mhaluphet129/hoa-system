import dbConnect from "@/database/dbConnect";
import Staff from "@/database/models/user_staff.schema";
import { ExtendedResponse, Staff as StaffProp } from "@/types";

import type { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExtendedResponse<StaffProp>>
) {
  await dbConnect();
  const { method } = req;
  if (method === "POST") {
    return await Staff.findOneAndUpdate(
      { _id: req.body._id },
      { $set: req.body },
      { returnOriginal: false }
    ).then(async (doc) => {
      return res.json({
        code: 200,
        success: true,
        data: doc,
        message: "Updated Successfully",
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
