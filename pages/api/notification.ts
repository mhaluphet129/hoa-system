import dbConnect from "@/database/dbConnect";
import Notification from "@/database/models/notification.schema";
import { ExtendedResponse, Notification as NotificationProp } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExtendedResponse<NotificationProp[]>>
) {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    const { userId, type } = req.query;
    const query = [];

    if (userId) query.push({ userId });
    if (type) query.push({ $in: type });

    return Notification.find(
      query.length > 0 ? { $and: query } : { userId: { $exists: false } }
    )
      .then((e) => res.json({ code: 200, success: true, data: e }))
      .catch((e) => {
        console.log(e);
        return res.json({
          code: 500,
          success: false,
          message: "Error in the Server",
        });
      });
  } else
    return res.json({
      code: 405,
      success: false,
      message: "Incorrect Request Method",
    });
}

export default handler;
