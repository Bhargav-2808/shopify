import axios from "axios";
import { getDbbToken } from "../../utils/helper.js";
import { getStoreCustomer, getStoreProduct } from "../../utils/storeData.js";
import { Address, Customer } from "../../modals/customerSchema.js";
import Shop from "../../modals/shopSchema.js";
import { Image, Product, Variant } from "../../modals/productSchema.js";
const getAllCustomer = async (req, res) => {
  let result;

  try {
    const data = await getStoreCustomer("firstlucentapp.myshopify.com");
    const shopData = await Shop.findOne({
      where: {
        domain: "firstlucentapp.myshopify.com",
      },
    });

    data.map(async (item) => {
      result = await Customer.upsert(
        {
          email: item.email,
          first_name: item.first_name,
          last_name: item.last_name,
          state: item.state,
          tags: item.tags,
          currency: item.currency,
          phone: item.phone,
          customerId: item.id,
          shopId: shopData.dataValues.shopId,
        },
        {
          where: {
            customerId: item.id,
          },
        }
      );

      item.addresses.map(async (i) => {
        const addressExist = await Address.findOne({
          where: {
            addressId: i.id,
          },
        });

        if (addressExist) {
          await Address.update(
            {
              first_name: i.first_name,
              last_name: i.last_name,
              company: i.company,
              address1: i.address1,
              address2: i.address2,
              city: i.city,
              province: i.province,
              country: i.country,
              zip: i.zip,
              phone: i.phone,
              name: i.name,
              country_name: i.country_name,
              is_default: i.default,
              customerId: item.id,
              addressId: i.id,
            },
            {
              where: {
                addressId: i.id,
              },
            }
          );
        } else {
          await Address.create({
            first_name: i.first_name,
            last_name: i.last_name,
            company: i.company,
            address1: i.address1,
            address2: i.address2,
            city: i.city,
            province: i.province,
            country: i.country,
            zip: i.zip,
            phone: i.phone,
            name: i.name,
            country_name: i.country_name,
            is_default: i.default,
            customerId: item.id,
            addressId: i.id,
          });
        }
      });
    });

    res.status(200).json({ success: "Data Synced Successfully" });
  } catch (error) {
    res?.status(500).json({ error: error.message });
  }
};

const getCustomer = async (req, res) => {
  try {
    const { shop, id } = req.query;
    const token = await getDbbToken(shop);
    const data = await axios.get(
      `https://${shop}/admin/api/2023-01/customers/${id}.json`,
      {
        headers: {
          "x-shopify-access-token": token,
        },
      }
    );

    res.status(200).json({ customer: data?.data?.customers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllProduct = async (req, res) => {
  const data = await getStoreProduct("firstlucentapp.myshopify.com");
  let result;

  console.log(data);
  try {
    const shopData = await Shop.findOne({
      where: {
        domain: "firstlucentapp.myshopify.com",
      },
    });

    data.map(async (item) => {
      result = await Product.upsert(
        {
          productId: item.id,
          shopId: shopData.dataValues.shopId,
          title: item.title,
          body_html: item.body_html,
          vendor: item.vendor,
          product_type: item.product_type,
          handle: item.handle,
          template_suffix: item.template_suffix,
          status: item.status,
          published_scope: item.published_scope,
          tags: item.tags,
          shopId: shopData.dataValues.shopId,
        },
        {
          where: {
            productId: item.id,
          },
        }
      );

      item.images.map(async (i) => {
        await Image.upsert(
          {
            productId: i.product_id,
            imageId: i.id,
            position: i.position,
            width: i.width,
            height: i.height,
            src: i.src,
            variant_ids: i.variant_ids,
            shopId: shopData.dataValues.shopId,
          },
          {
            where: {
              imageId: i.id,
            },
          }
        );
      });
      item.variants.map(async (i) => {
        await Variant.upsert(
          {
            productId: i.product_id,
            price: i.price,
            sku: i.sku,
            position: i.position,
            compare_at_price: i.compare_at_price,
            option1: i.option1,
            taxable: i.taxable,
            barcode: i.barcode,
            grams: i.grams,
            weight: i.weight,
            title: i.title,
            weight_unit: i.weight_unit,
            imageId: i.image_id,
            variantId: i.id,
            shopId: shopData.dataValues.shopId,
          },
          {
            where: {
              variantId: i.id,
            },
          }
        );
      });
    });

    res.status(200).json({ success: "Product Data Synced Successfully" });
  } catch (error) {
    res?.status(500).json({ error: error.message });
  }
};

export { getAllCustomer, getCustomer, getAllProduct };
