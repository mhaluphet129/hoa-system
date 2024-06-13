import dbConnect from "@/database/dbConnect";
import Bod from "@/database/models/user_bod.schema";
import { ExtendedResponse, Bod as BodProps } from "@/types";

import type { NextApiRequest, NextApiResponse } from "next";

// TODO: add duplicate validation here
// TODO: then email the account credentials via node mailer
// TODO: encrypted password

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExtendedResponse<BodProps>>
) {
  await dbConnect();
  const { method } = req;
  if (method === "POST") {
    return await Bod.create(req.body).then(async (doc) => {
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
