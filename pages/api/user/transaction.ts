import dbConnect from "@/database/dbConnect";
import Transaction from "@/database/models/transaction.schema";
import {
  ExtendedResponse,
  Response,
  Transaction as TransactionProp,
} from "@/types";
import mongoose from "mongoose";

import type { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response | ExtendedResponse<TransactionProp[]>>
) {
  await dbConnect();
  const { method } = req;

  if (method === "POST") {
    return await Transaction.create(req.body)
      .then((e) => {
        return res.json({
          code: 200,
          success: true,
          message: "Successfully Added New Transaction",
        });
      })
      .catch((e) => {
        console.log(e);
        return res.json({
          code: 500,
          success: false,
          message: "Error in the server.",
        });
      });
  } else {
    const { userId } = req.query;
    console.log(userId);
    return await Transaction.aggregate([
      ...(userId
        ? [
            {
              $match: { userId: new mongoose.Types.ObjectId(userId as string) },
            },
          ]
        : []),
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          pipeline: [
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
          ],
          as: "userId",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categorySelected",
          foreignField: "_id",
          as: "categorySelected",
        },
      },
      {
        $unwind: "$userId",
      },
      {
        $addFields: {
          totalFee: {
            $sum: "$categorySelected.fee",
          },
        },
      },
    ])
      .then((e) =>
        res.json({
          code: 200,
          success: true,
          data: e as any,
        })
      )
      .catch((e) => {
        console.log(e);
        return res.json({
          code: 500,
          success: false,
          message: "Error in the server.",
        });
      });
  }
}

export default handler;
