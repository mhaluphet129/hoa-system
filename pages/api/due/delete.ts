import dbConnect from "@/database/dbConnect";
import Transaction from "@/database/models/transaction.schema";
import { ExtendedResponse, Response } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExtendedResponse<Response>>
) {
  await dbConnect();
  const { method } = req;

  if (method != "GET")
    return res.json({
      code: 405,
      success: false,
      message: "Incorrect Request Method",
    });

  return await Transaction.findOneAndDelete({ _id: req.query.id })
    .then(() =>
      res.json({ code: 200, success: false, message: "Successfully Deleted" })
    )
    .catch((e) => {
      console.log(e);
      return res.json({
        code: 500,
        success: false,
        message: "Error in the Server",
      });
    });
}

export default handler;
