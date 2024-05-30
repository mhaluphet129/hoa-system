import dbConnect from "@/database/dbConnect";
import Homeowner from "@/database/models/user.schema";
import Transaction from "@/database/models/transaction.schema";
import { ExtendedResponse, DashboardData } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExtendedResponse<DashboardData>>
) {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    const homeowners = await Homeowner.find({ type: "homeowner" }).populate(
      "homeownerId"
    );
    const transaction = await Transaction.find();

    return res.json({
      code: 200,
      success: true,
      data: {
        homeowners: homeowners.map((e) => ({
          name: typeof e.homeownerId == "object" ? e.homeownerId.name : null,
          lastname:
            typeof e.homeownerId == "object" ? e.homeownerId.lastname : null,
          status: e.status,
        })),
        transaction,
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
