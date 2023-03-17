import axios from "axios";
import dotenv from "dotenv";
import crypto from "crypto";
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

  try {
    const res = await axios.post(
      `https://${shop}/admin/oauth/access_token`,
      accessTokenPayload
    );

    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export { generateHMAC, getShopData, getToken };
