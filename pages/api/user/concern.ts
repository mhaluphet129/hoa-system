import dbConnect from "@/database/dbConnect";
import Concern from "@/database/models/concern.schema";
import { Concern as ConcernProp, ExtendedResponse } from "@/types";

import type { NextApiRequest, NextApiResponse } from "next";

// TODO: then email the account credentials via node mailer

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response | ExtendedResponse<ConcernProp[]>>
) {
  await dbConnect();
  const { method } = req;

  if (method == "POST") {
    return await Concern.create(req.body)
      .then(() =>
        res.json({
          success: true,
          code: 200,
          message: "Successfully Created New Concern",
        })
      )
      .catch((e) => {
        console.log(e);
        return res.json({
          success: false,
          code: 500,
          message: "Error in the server.",
        });
      });
  } else {
    const { homeownerId } = req.query;

    return await Concern.find(homeownerId ? { homeownerId } : {})
      .populate("homeownerId")
      .then((e) =>
        res.json({
          code: 200,
          success: true,
          data: e as any,
        })
      );
  }
}

export default handler;
