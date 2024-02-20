import dbConnect from "@/database/dbConnect";
import User from "@/database/models/user.schema";

import type { NextApiRequest, NextApiResponse } from "next";

// TODO: then email the account credentials via node mailer

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { method } = req;

  if (method === "POST") {
    const { id } = req.body;

    return await User.findOneAndUpdate({ _id: id }, { $set: req.body })
      .then((e) => res.json({ code: 200, success: true }))
      .catch((e) => {
        console.log(e);
        return res.json({
          code: 500,
          success: false,
          data: {
            message: "Error in the server",
          },
        });
      });
  } else return res.json({ status: 500, message: "Error in the server." });
}

export default handler;
