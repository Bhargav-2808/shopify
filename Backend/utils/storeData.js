import axios from "axios";
import { getDbbToken } from "./helper.js";
import Shopify from "shopify-api-node";

const getStoreCustomer = async (shop) => {
  const token = await getDbbToken(shop);
  let customer = [];

  const shopify = new Shopify({
    shopName: shop,
    accessToken: token,
  });

  await (async () => {
    let params = { limit: 10 };

    do {
      const customers = await shopify.customer.list(params);

      customer = [...customer, ...customers];

      params = products.nextPageParameters;
    } while (params !== undefined);
  })().catch(console.error);
  return customer;
};

const getStoreProduct = async (shop) => {
  const token = await getDbbToken(shop);
  let product = [];

  const shopify = new Shopify({
    shopName: shop,
    accessToken: token,
  });

  await (async () => {
    let params = { limit: 10 };

    do {
      const products = await shopify.product.list(params);
      product = [...product, ...products];

      params = products.nextPageParameters;
    } while (params !== undefined);
  })().catch(console.error);
  return product;
};

export { getStoreCustomer, getStoreProduct };
