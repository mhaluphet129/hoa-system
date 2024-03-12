import dbConnect from "@/database/dbConnect";
import Announcement from "@/database/models/announcement.schema";
import { ExtendedResponse, EventWithTotal } from "@/types";

import type { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExtendedResponse<EventWithTotal>>
) {
  await dbConnect();
  const { method } = req;
  if (method?.toLocaleUpperCase() === "GET") {
    return await Announcement.find()
      .then((doc) =>
        res.json({
          code: 200,
          success: true,
          data: {
            events: doc,
            total: 0,
          },
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
