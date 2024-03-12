import dbConnect from "@/database/dbConnect";
import User from "@/database/models/user.schema";
import { ExtendedResponse, ProtectedUser } from "@/types";
import mongoose from "mongoose";

import type { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExtendedResponse<ProtectedUser>>
) {
  await dbConnect();

  const { method } = req;

  if (method?.toLocaleUpperCase() === "GET") {
    const { type, id } = req.query;

    let query = {
      from: "",
      localField: "",
      as: "",
    };

    switch (type) {
      case "staff": {
        query = {
          from: "staffs",
          localField: "staffId",
          as: "staffId",
        };
        break;
      }
      case "homeowner": {
        query = {
          from: "homeowners",
          localField: "homeownerId",
          as: "homeownerId",
        };
        break;
      }
      case "treasurer": {
        query = {
          from: "treasurers",
          localField: "treasurerId",
          as: "treasurerId",
        };
        break;
      }
      case "bod": {
        break;
      }
    }

    try {
      let user = await User.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(id as string),
          },
        },
        {
          $lookup: {
            ...query,
            foreignField: "_id",
          },
        },
        {
          $unwind: `$${query.as}`,
        },
      ]);

      res.json({
        code: 200,
        success: true,
        data: user[0],
      });
    } catch (e) {
      console.log(e);
      res.json({
        code: 500,
        success: false,
        message: "Error in the server.",
      });
    }
  } else {
    res.json({
      code: 405,
      success: false,
      message: "Incorrect Request Method",
    });
  }
}

export default handler;
