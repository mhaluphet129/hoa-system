import dbConnect from "@/database/dbConnect";
import Announcement from "@/database/models/announcement.schema";
import { ExtendedResponse, Response } from "@/types";

import type { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExtendedResponse<Response>>
) {
  await dbConnect();
  const { method } = req;
  if (method?.toLocaleUpperCase() === "GET") {
    return await Announcement.findOneAndDelete({ _id: req.query.id })
      .then(() =>
        res.json({
          code: 200,
          success: true,
          message: "Successfully removed",
        })
      )
      .catch((e) => {
        console.log(e);
        res.json({
          code: 500,
          success: false,
          message: "Error in the server.",
        });
      });
  } else {
    res.json({
      code: 405,
      success: false,
      message: "Incorrect Request Method",
    });
  }
}

export default handler;
