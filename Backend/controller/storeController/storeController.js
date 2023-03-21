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
      const customerExist = await Customer.findOne({
        where: {
          customerId: item.id,
        },
      });

      if (customerExist) {
        result = await Customer.update(
          {
            email: item.email,
            first_name: item.first_name,
            last_name: item.last_name,
            state: item.state,
            tags: item.tags,
            currency: item.currency,
            phone: item.phone,
          },
          {
            where: {
              customerId: item.id,
            },
          }
        );
      } else {
        result = await Customer.create({
          email: item.email,
          first_name: item.first_name,
          last_name: item.last_name,
          state: item.state,
          tags: item.tags,
          currency: item.currency,
          phone: item.phone,
          customerId: item.id,
          shopId: shopData.dataValues.shopId,
        });
      }

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
    if (result) {
      res.status(200).json({ success: "Data Synced Successfully" });
    }
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


  try {
    const shopData = await Shop.findOne({
      where: {
        domain: "firstlucentapp.myshopify.com",
      },
    });

    data.map(async (item) => {
      const productExist = await Product.findOne({
        where: {
          productId: item.id,
        },
      });

      if (productExist) {
        result = await Product.update(
          {
            title: item.title,
            body_html: item.body_html,
            vendor: item.vendor,
            product_type: item.product_type,
            handle: item.handle,
            template_suffix: item.template_suffix,
            status: item.status,
            published_scope: item.published_scope,
            tags: item.tags,
          },
          {
            where: {
              productId: item.id,
            },
          }
        );
      } else {
        result = await Product.create({
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
        });
      }
      item.images.map(async (i) => {
        const imageExist = await Image.findOne({
          where: {
            imageId: i.id,
          },
        });

        if (imageExist) {
          await Image.update(
            {
              position: i.position,
              width: i.position,
              height: i.position,
              src: i.position,
              variant_ids: i.variant_ids,
            },
            {
              where: {
                imageId: i.id,
              },
            }
          );
        } else {
          await Image.create({
            productId: i.product_id,
            imageId: i.id,
            position: i.position,
            width: i.width,
            height: i.height,
            src: i.src,
            variant_ids: i.variant_ids,
            shopId: shopData.dataValues.shopId,
          });
        }
      });
      item.variants.map(async (i) => {
        console.log(i.id, "variantId");
        const variantExist = await Variant.findOne({
          where: {
            variantId: i.id,
          },
        });

        if (variantExist) {
          await Variant.update(
            {
              price: i.price,
              sku: i.sku,
              position: i.position,
              compare_at_price: i.compare_at_price,
              option1: i.option1,
              taxable: i.taxable,
              barcode: i.barcode,
              grams: i.grams,
              weight: i.weight,
              weight_unit: i.weight_unit,
              title: i.title,
            },
            {
              where: {
                variantId: i.id,
              },
            }
          );
        } else {
          await Variant.create({
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
          });
        }
      });
    });

   
      res.status(200).json({ success: "Product Data Synced Successfully" });
    
  } catch (error) {
    res?.status(500).json({ error: error.message });
  }


};

export { getAllCustomer, getCustomer, getAllProduct };
