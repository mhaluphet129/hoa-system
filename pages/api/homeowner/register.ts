import dbConnect from "@/database/dbConnect";
import HomeOwner from "@/database/models/user_homeowner.schema";
import { ExtendedResponse, Homeowner } from "@/types";

import type { NextApiRequest, NextApiResponse } from "next";

// TODO: add duplicate validation here
// TODO: then email the account credentials via node mailer
// TODO: encrypted password

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExtendedResponse<Homeowner>>
) {
  await dbConnect();
  const { method } = req;
  if (method === "POST") {
    return await HomeOwner.create(req.body).then(async (doc) => {
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
