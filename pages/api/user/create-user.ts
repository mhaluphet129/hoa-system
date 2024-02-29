import dbConnect from "@/database/dbConnect";
import User from "@/database/models/user.schema";

import type { NextApiRequest, NextApiResponse } from "next";

// TODO: add duplicate validation here
// TODO: then email the account credentials via node mailer

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { method } = req;

  if (method === "POST") {
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
  } else return res.json({ status: 500, message: "Error in the server." });
}

export default handler;
