import dbConnect from "@/database/dbConnect";
import Transaction from "@/database/models/transaction.schema";
import Category from "@/database/models/category.schema";
import {
  ExtendedResponse,
  Response,
  Transaction as TransactionProp,
} from "@/types";
import mongoose from "mongoose";

import type { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    Response | ExtendedResponse<[TransactionProp[], TransactionProp[]]>
  >
) {
  await dbConnect();
  const { method } = req;

  if (method === "POST") {
    // separate the transaction if not the same type
    const { categorySelected, complete } = req.body;
    const yearlyId = await Category.findOne({ category: "Yearly Due" }).then(
      (e) => e._id
    );
    const monthlyId = await Category.findOne({ category: "Monthly Due" }).then(
      (e) => e._id
    );

    let serviceIds = categorySelected.filter(
      (e: string) => ![yearlyId.toString(), monthlyId.toString()].includes(e)
    );
    let dueIds = categorySelected.filter((e: string) =>
      [yearlyId.toString(), monthlyId.toString()].includes(e)
    );

    try {
      if (serviceIds?.length > 0 ?? false)
        await Transaction.create({
          ...req.body,
          categorySelected: serviceIds,
          status: complete ? "completed" : "pending",
        });
      if (dueIds?.length > 0 ?? false)
        await Transaction.create({
          ...req.body,
          categorySelected: dueIds,
          status: complete ? "completed" : "pending",
        });

      return res.json({
        code: 200,
        success: true,
        message: "Successfully Added New Transaction",
      });
    } catch (e) {
      console.log(e);
      return res.json({
        code: 500,
        success: false,
        message: "Error in the server.",
      });
    }
  } else {
    const { userId } = req.query;

    return await Transaction.aggregate([
      ...(userId
        ? [
            {
              $match: {
                homeownerId: new mongoose.Types.ObjectId(userId as string),
              },
            },
          ]
        : []),
      {
        $lookup: {
          from: "homeowners",
          localField: "homeownerId",
          foreignField: "_id",
          as: "homeownerId",
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
        $unwind: "$homeownerId",
      },
      {
        $addFields: {
          totalFee: {
            $sum: "$categorySelected.fee",
          },
        },
      },
    ])
      .then(async (e: any) => {
        const yearlyId = await Category.findOne({
          category: "Yearly Due",
        }).then((e) => e._id);
        const monthlyId = await Category.findOne({
          category: "Monthly Due",
        }).then((e) => e._id);

        let services = e.filter(
          (_: any) =>
            !_.categorySelected
              .map((__: any) => __._id.toString())
              .includes(yearlyId.toString()) &&
            !_.categorySelected
              .map((__: any) => __._id.toString())
              .includes(monthlyId.toString())
        );

        let dues = e.filter(
          (_: any) =>
            _.categorySelected
              .map((__: any) => __._id.toString())
              .includes(yearlyId.toString()) ||
            _.categorySelected
              .map((__: any) => __._id.toString())
              .includes(monthlyId.toString())
        );

        return res.json({
          code: 200,
          success: true,
          data: [dues, services],
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
  }
}

export default handler;
