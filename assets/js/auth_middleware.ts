import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import jwt from "jsonwebtoken";

const authenticate =
  (handler: NextApiHandler): NextApiHandler =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authorizationHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    let userData: any;

    try {
      userData = jwt.verify(token, process.env.JWT_PRIVATE_KEY ?? "");
    } catch {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = { ...userData, token };

    return handler(req, res);
  };

export default authenticate;
