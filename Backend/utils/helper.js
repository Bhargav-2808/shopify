import axios from "axios";
import dotenv from "dotenv";
import crypto from "crypto";
import Shop from "../modals/shopSchema.js";
import jwt from "jsonwebtoken";
dotenv.config();

const generateHMAC = (message) => {
  return crypto
    .createHmac("sha256", process.env.CLIENTSECRET)
    .update(message)
    .digest("HEX");
};

const getShopData = async (token, shop) => {
  try {
    const res = await axios.get(`https://${shop}/admin/api/2021-07/shop.json`, {
      headers: {
        "X-Shopify-Access-Token": token,
      },
    });

    return res?.data?.shop;
  } catch (error) {
    throw new Error(error);
  }
};

const getToken = async (shop, code) => {
  const accessTokenPayload = {
    client_id: process.env.CLIENTID,
    client_secret: process.env.CLIENTSECRET,
    code,
  };

  // console.log(shop, code, accessTokenPayload);
  try {
    const res = await axios.post(
      `https://${shop}/admin/oauth/access_token`,
      accessTokenPayload
    );

    // console.log(res);
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

const getDbbToken = async (shop) => {
  try {
    const data = await Shop.findOne({
      where: {
        domain: shop,
      },
    });
    return data?.dataValues?.token;
  } catch (error) {
    throw new Error(error);
  }
};

const genratejwtToken = (id) => {
  try {
    return jwt.sign({ id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });
  } catch (error) {
    console.log(error)
  }
};

export { generateHMAC, getShopData, getToken, getDbbToken, genratejwtToken };
