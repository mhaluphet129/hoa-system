import dbConnect from "@/database/dbConnect";
import Announcement from "@/database/models/announcement.schema";
import { Response } from "@/types";

import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  await dbConnect();
  const { method } = req;
  if (method?.toLocaleUpperCase() === "GET") {
    let { page, pageSize } = req.query;
    const _page = Number.parseInt(page!.toString()) - 1;

    const total = await Announcement.countDocuments();

    return await Announcement.find()
      .skip(_page * Number.parseInt(pageSize!.toString()))
      .limit(Number.parseInt(pageSize!.toString()))
      .then((doc) =>
        res.json({
          code: 200,
          success: true,
          data: {
            events: doc,
            total,
          },
        })
      )
      .catch((e) => {
        console.log(e);
        res.json({
          code: 500,
          success: false,
          data: {
            message: "Error in the server.",
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
