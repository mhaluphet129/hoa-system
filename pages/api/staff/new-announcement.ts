import dbConnect from "@/database/dbConnect";
import Announcement from "@/database/models/announcement.schema";
import { Response } from "@/types";

import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  await dbConnect();
  const { method } = req;

  if (method === "POST") {
    return await Announcement.create(req.body)
      .then((e) => {
        return res.json({
          code: 200,
          success: true,
          data: e,
        });
      })
      .catch((e) => {
        return res.json({
          code: 500,
          success: false,
          data: {
            error: e,
          },
        });
      });
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
