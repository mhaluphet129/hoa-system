import dbConnect from "@/database/dbConnect";
import Concern from "@/database/models/concern.schema";
import { Response } from "@/types";

import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    return await Concern.findOneAndDelete({ _id: req.query._id })
      .then(() =>
        res.json({
          code: 200,
          success: true,
          message: "Successfully Deleted",
        })
      )
      .catch((e) => {
        console.log(e);
        return res.json({
          code: 500,
          success: false,
          message: "Error in the server.",
        });
      });
  } else {
    return res.json({
      code: 405,
      success: false,
      message: "Incorrect Request Method",
    });
  }
}

export default handler;
