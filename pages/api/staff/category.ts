import dbConnect from "@/database/dbConnect";
import Category from "@/database/models/category.schema";
import { Category as CategoryProp, ExtendedResponse } from "@/types";

import type { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExtendedResponse<CategoryProp[]>>
) {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    return await Category.find()
      .then((e) =>
        res.json({
          code: 200,
          success: true,
          data: e,
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
    return await Category.create(req.body)
      .then((e) =>
        res.json({
          code: 200,
          success: true,
          message: "New Category Added Successfully",
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
  }
}

export default handler;
