import dbConnect from "@/database/dbConnect";
import User from "@/database/models/user.schema";
import HomeOwner from "@/database/models/user_homeowner.schema";
import { PasswordGenerator as generatorPassword } from "@/assets/js";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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

      return await User.create(userObj).then((e) => {
        return res.json({
          status: 200,
          message: "New Home Owner successfully created",
          user: {
            ...e.toObject(),
            homeownerId: doc,
          },
        });
      });
    });

    // TODO: then email the account credentials via node mailer
  } else return res.json({ status: 500, message: "Error in the server." });
}
