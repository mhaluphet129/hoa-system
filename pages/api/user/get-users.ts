import dbConnect from "@/database/dbConnect";
import User from "@/database/models/user.schema";
import { ExtendedResponse, User as UserType } from "@/types";

import type { NextApiRequest, NextApiResponse } from "next";

// TODO: then email the account credentials via node mailer

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExtendedResponse<UserType[]>>
) {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    const { type, search } = req.query;
    let query = [];

    var re;

    if (search && search != "") {
      re = new RegExp(search!.toString().trim(), "i");
      query.push({
        $or: [
          { "homeownerId.name": { $regex: re } },
          { "homeownerId.lastname": { $regex: re } },
        ],
      });
    }

    if (type) query.push({ type });

    return await User.aggregate([
      { $match: {} },
      {
        $lookup: {
          from: "homeowners",
          localField: "homeownerId",
          foreignField: "_id",
          as: "homeownerId",
        },
      },
      {
        $unwind: {
          path: "$homeownerId",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "staffs",
          localField: "staffId",
          foreignField: "_id",
          as: "staffId",
        },
      },
      {
        $unwind: {
          path: "$staffId",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "treasurers",
          localField: "treasurerId",
          foreignField: "_id",
          as: "treasurerId",
        },
      },
      {
        $unwind: {
          path: "$treasurerId",
          preserveNullAndEmptyArrays: true,
        },
      },
      ...(query.length > 0 ? [{ $match: { $and: query } }] : []),
    ])

      .then((e) =>
        res.json({ code: 200, success: true, data: e as UserType[] })
      )
      .catch((e) => {
        console.log(e);
        return res.json({
          code: 500,
          success: false,
          message: "Error in the server",
        });
      });
  } else
    return res.json({
      success: false,
      code: 500,
      message: "Error in the server.",
    });
}

export default handler;
