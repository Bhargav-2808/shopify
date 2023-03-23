import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import Shop from "../modals/shopSchema.js";

dotenv.config();

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log(token);
    try {
      const decode = jwt.verify(token, process.env.SECRET_KEY);

      const shopData = await Shop.findOne({
        where: {
          shopId: decode.id,
        },
      });

      req.shopData = shopData;

      next();
    } catch (error) {
      res.status(401);
      res.status(401).json({ error: "Not authorized, no token" });
    }
  }

  if (!token) {
    res.status(401).json({ error: "Not authorized, no token" });
  }
};

export default protect;
