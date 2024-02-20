import dbConnect from "@/database/dbConnect";
import User from "@/database/models/user.schema";
import HomeOwner from "@/database/models/user_homeowner.schema";
import { PasswordGenerator as generatorPassword, sign } from "@/assets/js";

import type { NextApiRequest, NextApiResponse } from "next";

// TODO: add duplicate validation here
// TODO: then email the account credentials via node mailer
// TODO: encrypted password

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { method } = req;

  if (method === "POST") {
    return await HomeOwner.create(req.body).then(async (doc) => {
      let userObj = {
        username: req.body.email,
        password: generatorPassword(),
        type: "homeowner",
        homeownerId: doc._id,
      };

      return await User.create(userObj).then(async (e) => {
        return res.json({
          code: 200,
          success: true,
          data: {
            id: doc._id,
            userId: e._id,
          },
        });
      });
    });
  } else return res.json({ status: 500, message: "Error in the server." });
}

export default handler;
