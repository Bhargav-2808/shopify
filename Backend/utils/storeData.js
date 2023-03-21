import axios from "axios";
import { getDbbToken } from "./helper.js";

const getStoreCustomer = async (shop) => {
  const token = await getDbbToken(shop);
  let customers = [];
  let url = `https://${shop}/admin/api/2023-01/customers.json?limit=20`;
  while (url) {
    const data = await axios.get(url, {
      headers: {
        "x-shopify-access-token": token,
      },
    });
    customers = [...customers, ...data?.data?.customers];

    let newUrl = data.headers.link.split(", ");

    let nextUrl = newUrl.filter((item) => {
      return item.includes('rel="next"');
    })[0];

    if (!nextUrl) {
      url = false;
    } else {
      url = nextUrl.match(/<(.*?)>/)[1];
    }
  }
  return customers;
};

const getStoreProduct = async (shop) => {
  const token = await getDbbToken(shop);
  let products = [];
  let url = `https://${shop}/admin/api/2023-01/products.json?limit=20`;
  while (url) {
    const data = await axios.get(url, {
      headers: {
        "x-shopify-access-token": token,
      },
    });
    products = [...products, ...data?.data?.products];

    let newUrl = data.headers.link.split(", ");

    let nextUrl = newUrl.filter((item) => {
      return item.includes('rel="next"');
    })[0];

    if (!nextUrl) {
      url = false;
    } else {
      url = nextUrl.match(/<(.*?)>/)[1];
    }
  }
  return products;
};

export { getStoreCustomer, getStoreProduct };
