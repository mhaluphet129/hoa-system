import dbConnect from "@/database/dbConnect";
import Treasurer from "@/database/models/user_treasurer.schema";
import { ExtendedResponse, Treasurer as TreasurerProp } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExtendedResponse<TreasurerProp>>
) {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
  } else {
    let { _id } = req.body;

    if (_id) {
      return await Treasurer.findOneAndUpdate(
        { _id },
        { $set: req.body },
        { returnOriginal: false }
      )
        .then((e) =>
          res.json({
            code: 200,
            success: true,
            data: e,
            message: "Successfully Updated",
          })
        )
        .catch((e) => {
          console.log(e);
          return res.json({
            code: 500,
            success: false,
            message: "Error in the Server",
          });
        });
    } // update
    else {
      return await Treasurer.create(req.body)
        .then((e) => res.json({ code: 200, success: true, data: e }))
        .catch((e) => {
          console.log(e);
          return res.json({
            code: 500,
            success: false,
            message: "Error in the Server",
          });
        });
    }
  }
}

export default handler;
