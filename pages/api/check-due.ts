import dbConnect from "@/database/dbConnect";
import Homeowner from "@/database/models/user_homeowner.schema";
import { Response } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    return res.json({
      code: 200,
      success: true,
    });
  } else
    return res.json({
      code: 405,
      success: false,
      message: "Incorrect Request Method",
    });
}

export default handler;
