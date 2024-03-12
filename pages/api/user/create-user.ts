import dbConnect from "@/database/dbConnect";
import User from "@/database/models/user.schema";

import type { NextApiRequest, NextApiResponse } from "next";

// TODO: then email the account credentials via node mailer

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { method } = req;

  if (method != "POST")
    return res.json({ status: 500, message: "Error in the server." });

  let flag = await User.findOne({ username: req.body.username });

  if (flag)
    return res.json({
      code: 409,
      success: false,
      message: "Username/Email already taken.",
    });
  return await User.create(req.body)
    .then((e) => {
      return res.json({
        code: 200,
        success: true,
        message: "Created successfully created",
        user: e,
      });
    })
    .catch((e) => console.log(e));
}

export default handler;
