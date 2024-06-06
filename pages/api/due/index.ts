import dbConnect from "@/database/dbConnect";
import Transaction from "@/database/models/transaction.schema";
import dayjs from "dayjs";
import mongoose from "mongoose";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import type { NextApiRequest, NextApiResponse } from "next";

import { ExtendedResponse, Transaction as TransactionProp } from "@/types";

dayjs.extend(utc);
dayjs.extend(timezone);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExtendedResponse<TransactionProp[]>>
) {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    if (req.query._id) {
    } else {
      // let due: any = [];

      let { page, pageSize, category, status, homeownerId, project } =
        req.query;
      if (!page) page = "1";
      const _page = Number.parseInt(page!.toString()) - 1;

      if (!pageSize) pageSize = "10";

      let query = [];

      // if (fromDate)
      //   query.push({
      //     dateCollected: {
      //       $gte: dayjs(fromDate as string)
      //         .tz("Asia/Manila")
      //         .startOf("day")
      //         .toDate(),
      //     },
      //   });
      // if (toDate)
      //   query.push({
      //     dateCollected: {
      //       ...(!fromDate
      //         ? {
      //             $gte: dayjs(toDate as string)
      //               .tz("Asia/Manila")
      //               .startOf("day")
      //               .toDate(),
      //           }
      //         : {}),
      //       $lte: dayjs(toDate as string)
      //         .tz("Asia/Manila")
      //         .endOf("day")
      //         .toDate(),
      //     },
      //   });

      if (category) query.push({ categorySelected: { $in: [category] } });
      if (homeownerId)
        query.push({
          homeownerId: new mongoose.Types.ObjectId(homeownerId as string),
        });
      if (status) {
        if (status == "Completed") query.push({ status: "completed" });
        else if (status == "Overdue") {
          query.push({
            dateCollected: {
              $lt: dayjs().tz("Asia/Manila").startOf("day").toDate(),
            },
          });
          query.push({ status: "pending" });
        } else {
          query.push({
            dateCollected: {
              $gte: dayjs().tz("Asia/Manila").startOf("day").toDate(),
            },
          });
          query.push({ status: "pending" });
        }
      }

      const total = await Transaction.countDocuments(
        query.length > 0 ? { $and: query } : {}
      );

      if (project) project = JSON.parse(project as string);

      let transaction = await Transaction.find(
        query.length > 0 ? { $and: query } : {},
        project
      )
        .populate("homeownerId collectedBy categorySelected")
        .skip(_page * Number.parseInt(pageSize!.toString()))
        .limit(Number.parseInt(pageSize!.toString()));

      // if (transaction.length > 0) {
      //   transaction.map((e) => {
      //     let catSelect = e.categorySelected;
      //     catSelect.map((_: any) => {
      //       due.push({
      //         userId: e.userId,
      //         homeownerId: e.homeownerId,
      //         collectedBy: e.collectedBy,
      //         paymentType: e.paymentType,
      //         categoryId: _,
      //         status: e.status,
      //       });
      //     });
      //   });
      // }

      return res.json({
        code: 200,
        success: true,
        data: transaction as any,
        meta: { total },
      });
    }
  } else {
    if (req.body._id)
      return Transaction.findOneAndUpdate(
        { _id: req.body._id },
        { $set: req.body }
      )
        .then((e) =>
          res.json({
            code: 200,
            success: true,
            message: "Succesfully Updated",
            data: e,
          })
        )
        .catch((e) => {
          console.log(e);
          return res.json({
            code: 500,
            success: false,
            message: "Error in the Server.",
          });
        });
    else
      return await Transaction.create(req.body)
        .then((e) =>
          res.json({
            code: 200,
            success: true,
            message: "Succesfully Created",
            data: e,
          })
        )
        .catch((e) => {
          console.log(e);
          return res.json({
            code: 500,
            success: false,
            message: "Error in the Server.",
          });
        });
  }
}

export default handler;
