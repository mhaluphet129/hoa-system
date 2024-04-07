import dbConnect from "@/database/dbConnect";
import Category from "@/database/models/category.schema";
import { Response } from "@/types";

import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  await dbConnect();
  const { method } = req;

  if (method === "POST") {
    const { _id } = req.body;

    return await Category.findOneAndUpdate({ _id }, { $set: req.body })
      .then((e) =>
        res.json({
          code: 200,
          success: true,
          message: "Updated Successfully",
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
