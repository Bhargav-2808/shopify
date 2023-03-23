import {
  generateHMAC,
  genratejwtToken,
  getShopData,
  getToken,
} from "../utils/helper.js";
import dotenv from "dotenv";
import Shop from "../modals/shopSchema.js";
import {
  getAllCustomer,
  getAllProduct,
} from "../controller/storeController/storeController.js";
dotenv.config();

const redirectUrl = (req, res) => {
  const { shop } = req.query;

  try {
    const redirectURL = `https://${shop}.myshopify.com/admin/oauth/authorize?client_id=${process.env.CLIENTID}&scope=${process.env.SHOPIFY_APP_SCOPES}&redirect_uri=${process.env.APP_URL}/api/auth&state=nonce`;
    res.redirect(redirectURL);
    // res.status(200).json({ redirectURL });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const generateToken = async (req, res) => {
  const { code, host, shop, state, timestamp, hmac } = req.query;
  const obj = {
    code,
    host,
    shop,
    state,
    timestamp,
  };

  const message = new URLSearchParams(obj).toString();
  const genHash = generateHMAC(message);

  if (genHash === hmac) {
    try {
      const data = await getToken(req.query.shop, code);
      const shopData = await getShopData(
        data?.data?.access_token,
        req.query.shop
      );

      let response;

      const jwtToken = genratejwtToken(shopData.id);
      console.log(jwtToken, "47");

      if (data) {
        const shopExist = await Shop.findOne({
          where: { shopId: shopData.id },
        });

        try {
          if (shopExist) {
            response = await Shop.update(
              {
                shopName: shopData.name,
                email: shopData.email,
                domain: shopData.domain,
                shopId: shopData.id,
              },
              {
                where: {
                  shopId: shopData.id,
                },
              }
            );
          } else {
            response = await Shop.create({
              shopName: shopData.name,
              email: shopData.email,
              domain: shopData.domain,
              shopId: shopData.id,
              token: data?.data?.access_token,
            });
            getAllCustomer();
            getAllProduct();
          }

          if (response) {
            res.redirect(`http://localhost:3000/dashboard?token=${jwtToken}`);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(400).json({ error: "Invalid HMAC" });
  }
};

export { redirectUrl, generateToken };
