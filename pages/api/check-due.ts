import dbConnect from "@/database/dbConnect";
import Homeowner from "@/database/models/user_homeowner.schema";
import Category from "@/database/models/category.schema";
import Transaction from "@/database/models/transaction.schema";
import { ExtendedResponse } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExtendedResponse<any>>
) {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    let monthlyId = await Category.findOne({
      type: "due",
      category: "Monthly Due",
    }).then((e) => e._id);
    let yearlyId = await Category.findOne({
      type: "due",
      category: "Yearly Due",
    }).then((e) => e._id);

    let homeowners = await Homeowner.aggregate([
      {
        $lookup: {
          from: "transactions",
          let: {
            homeownerId: "$_id",
          },
          pipeline: [
            {
              $match: {
                categorySelected: { $in: [monthlyId] },
              },
            },
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$homeownerId", "$$homeownerId"] },
                    {
                      $gte: [
                        "$createdAt",
                        new Date(
                          new Date().getFullYear(),
                          new Date().getMonth(),
                          1
                        ),
                      ],
                    },
                    {
                      $lt: [
                        "$createdAt",
                        new Date(
                          new Date().getFullYear(),
                          new Date().getMonth() + 1,
                          1
                        ),
                      ],
                    },
                  ],
                },
              },
            },
          ],
          as: "monthlyDue",
        },
      },
      {
        $lookup: {
          from: "transactions",
          let: {
            homeownerId: "$_id",
          },
          pipeline: [
            {
              $match: {
                categorySelected: { $in: [yearlyId] },
              },
            },
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$homeownerId", "$$homeownerId"] },
                    {
                      $gte: [
                        "$createdAt",
                        new Date(new Date().getFullYear(), 0, 1),
                      ],
                    },
                    {
                      $lte: [
                        "$createdAt",
                        new Date(new Date().getFullYear(), 11, 31),
                      ],
                    },
                  ],
                },
              },
            },
          ],
          as: "yearlyDue",
        },
      },
      {
        $unwind: {
          path: "$monthlyDue",
          preserveNullAndEmptyArrays: true,
        },
      },
      // {
      //   $unwind: {
      //     path: "$yearlyDue",
      //     preserveNullAndEmptyArrays: true,
      //   },
      // },
    ]);
    console.log(homeowners);
    // homeowners.map(async (e) => {
    //   if (!e.monthlyDue) {
    //     await Transaction.create({
    //       userId: e._id,
    //       categorySelected: [monthlyId],
    //       dateCollected: e.monthlyDueDate,
    //     });
    //   }
    //   if (!e.yearlyDue) {
    //     await Transaction.create({
    //       userId: e._id,
    //       categorySelected: [yearlyId],
    //       dateCollected: e.yearlyDueDate,
    //     });
    //   }
    // });

    return res.json({
      code: 200,
      success: true,
      data: {
        homeowners,
      },
    });
  } else
    return res.json({
      code: 405,
      success: false,
      message: "Incorrect Request Method",
    });
}

export default handler;
