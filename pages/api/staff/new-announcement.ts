import dbConnect from "@/database/dbConnect";
import Announcement from "@/database/models/announcement.schema";
import Notification from "@/database/models/notification.schema";
import { ExtendedResponse, Event } from "@/types";

import type { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExtendedResponse<Event>>
) {
  await dbConnect();
  const { method } = req;

  if (method === "POST") {
    return await Announcement.create(req.body)
      .then(async (e) => {
        await Notification.create({
          type: "events",
          title: req.body.title,
          description: req.body.description,
          status: "pending",
        });
        return res.json({
          code: 200,
          success: true,
          data: e,
        });
      })
      .catch((e) => {
        console.log(e);
        return res.json({
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
