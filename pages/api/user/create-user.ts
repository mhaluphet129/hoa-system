import dbConnect from "@/database/dbConnect";
import User from "@/database/models/user.schema";
import HomeOwner from "@/database/models/user_homeowner.schema";
import Staff from "@/database/models/user_staff.schema";
import Treasurer from "@/database/models/user_treasurer.schema";

import type { NextApiRequest, NextApiResponse } from "next";

// TODO: add duplicate validation here
// TODO: then email the account credentials via node mailer

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { method } = req;

  if (method === "POST") {
    return new Promise(async (resolve, reject) => {
      const { type, username, password } = req.body;
      let stakeholder: any;
      switch (type) {
        case "homeowner": {
          stakeholder = await HomeOwner.create(req.body.homeowner);
          break;
        }
        case "staff": {
          stakeholder = await Staff.create(req.body.staff);
          break;
        }
        case "treasurer": {
          stakeholder = await Treasurer.create(req.body.treasurer);
          break;
        }
        case "bod": {
          break;
        }
        default:
          throw reject("Invalid Type");
      }

      if (stakeholder) {
        resolve(
          JSON.stringify({
            stakeholder,
            type,
            username,
            password,
          })
        );
      }
    })
      .then(async (e) => {
        if (typeof e == "string") {
          const { stakeholder, type, username, password } = JSON.parse(e);

          let userObj = {
            username,
            password,
            [`${type}Id`]: stakeholder._id,
            type,
            ...stakeholder,
          };

          return await User.create(userObj)
            .then((e) => {
              return res.json({
                code: 200,
                success: true,
                message: "Created successfully created",
                user: {
                  ...e.toObject(),
                  [type]: stakeholder,
                },
              });
            })
            .catch((e) => console.log(e));
        }
      })
      .catch((e) => {});
  } else return res.json({ status: 500, message: "Error in the server." });
}

export default handler;
