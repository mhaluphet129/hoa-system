import dbConnect from "@/database/dbConnect";
import User from "@/database/models/user.schema";
import HomeOwner from "@/database/models/user_homeowner.schema";
import { PasswordGenerator as generatorPassword, sign } from "@/assets/js";

import type { NextApiRequest, NextApiResponse } from "next";

// TODO: then email for account updated confirmation

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { method } = req;

  if (method === "POST") {
    const { id } = req.body;
    console.log(id);
    let homeOwnerId = await User.findOne({ _id: id })
      .lean()
      .then((e) => e?.homeownerId);

    return await HomeOwner.findOneAndUpdate(
      { _id: homeOwnerId },
      { $set: req.body }
    ).then(() => {
      return res.json({
        code: 200,
        success: true,
      });
    });
  } else return res.json({ status: 500, message: "Error in the server." });
}

export default handler;
