import dbConnect from "@/database/dbConnect";
import Staff from "@/database/models/user_staff.schema";
import { ExtendedResponse, Staff as StaffProp } from "@/types";

import type { NextApiRequest, NextApiResponse } from "next";

// TODO: add duplicate validation here
// TODO: then email the account credentials via node mailer
// TODO: encrypted password

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExtendedResponse<StaffProp>>
) {
  await dbConnect();
  const { method } = req;
  if (method === "POST") {
    return await Staff.create(req.body).then(async (doc) => {
      return res.json({
        code: 200,
        success: true,
        data: doc,
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
