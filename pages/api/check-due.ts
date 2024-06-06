import dbConnect from "@/database/dbConnect";
import Homeowner from "@/database/models/user_homeowner.schema";
import Category from "@/database/models/category.schema";
import Transaction from "@/database/models/transaction.schema";
import Notification from "@/database/models/notification.schema";
import { ExtendedResponse } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

import "@/database/models/notification.schema";

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
      {
        $unwind: {
          path: "$yearlyDue",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);

    homeowners.map(async (e) => {
      if (!e.monthlyDue) {
        await Transaction.create({
          homeownerId: e._id,
          categorySelected: [monthlyId],
          dateCollected: e.monthlyDueDate,
        });
      }
      if (!e.yearlyDue) {
        await Transaction.create({
          homeownerId: e._id,
          categorySelected: [yearlyId],
          dateCollected: e.yearlyDueDate,
        });
      }
    });

    let transactions = await Transaction.aggregate([
      {
        $match: { status: "pending", dateCollected: { $lte: new Date() } },
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
        $lookup: {
          from: "users",
          localField: "homeownerId",
          foreignField: "homeownerId",
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
              $unwind: "$homeownerId",
            },
            {
              $set: {
                name: {
                  $concat: ["$homeownerId.name", " ", "$homeownerId.lastname"],
                },
              },
            },
            {
              $project: {
                name: 1,
                _id: 1,
              },
            },
          ],
          as: "userId",
        },
      },
      {
        $unwind: {
          path: "$userId",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $set: {
          name: "$userId.name",
          userId: "$userId._id",
        },
      },
      {
        $lookup: {
          from: "notications",
          localField: "userId",
          foreignField: "userId",
          as: "notifications",
        },
      },
      {
        $unwind: {
          path: "$notifications",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);

    transactions.map(async (e) => {
      if (!e.notifications) {
        await Notification.create({
          type: "due",
          title: "Due",
          description: `You have due balance to pay for ${e.categorySelected
            .map((e: any) => e.category)
            .join(", ")}.`,
          userId: e.userId,
          status: "error",
        });

        await Notification.create({
          type: "due",
          title: "Due",
          description: `${
            e.name
          } exceed the date to pay the due balances for the ${e.categorySelected
            .map((e: any) => e.category)
            .join(", ")}.`,
          status: "error",
        });
      }
    });

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
