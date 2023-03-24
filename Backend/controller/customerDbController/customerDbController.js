import { Op } from "sequelize";
import Shopify from "shopify-api-node";
import { Address, Customer } from "../../modals/customerSchema.js";
import { getAllCustomer } from "../storeController/storeController.js";
const getDbCustomer = async (req, res) => {
  let data;
  const shopData = req.shopData;

  const pageNumber = parseInt(req.query.page);
  const sizeNumber = parseInt(req.query.size);
  const query = req.query.search;

  let page = 0,
    size = 8;
  if (!isNaN(pageNumber) && pageNumber > 0) {
    page = pageNumber;
  }

  if (!isNaN(sizeNumber) && sizeNumber > 0 && sizeNumber < 8) {
    size = sizeNumber;
  }
  try {
    const count = await Customer.findAll({
      where: {
        [Op.or]: [
          {
            first_name: {
              [Op.like]: `%${query}%`,
            },
          },

          {
            last_name: {
              [Op.like]: `%${query}%`,
            },
          },

          {
            phone: {
              [Op.like]: `%${query}%`,
            },
          },

          {
            state: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            tags: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            currency: {
              [Op.like]: `%${query}%`,
            },
          },
        ],
        shopId: shopData.shopId,
      },
    });

    data = await Customer.findAndCountAll({
      where: {
        [Op.or]: [
          {
            first_name: {
              [Op.like]: `%${query}%`,
            },
          },

          {
            last_name: {
              [Op.like]: `%${query}%`,
            },
          },

          {
            phone: {
              [Op.like]: `%${query}%`,
            },
          },

          {
            state: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            tags: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            currency: {
              [Op.like]: `%${query}%`,
            },
          },
        ],
        shopId: shopData.shopId,
      },
      include: Address,
      limit: size,
      offset: page * size,
    });

    res.status(201).json({
      data,
      totalPage: Math.ceil(count?.length / size),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const editDbCustomer = async (req, res) => {
  const shopData = req.shopData;
  const {
    email,
    first_name,
    last_name,

    phone,
  } = req.body;

  try {
    const shopify = new Shopify({
      shopName: shopData?.dataValues.domain,
      accessToken: shopData?.dataValues.token,
    });

    const response = await shopify.customer.update(req.params.id, {
      email: email,
      first_name: first_name,
      last_name: last_name,
      phone: phone,
    });

    if (response) {
      await getAllCustomer();

      res.status(201).json({ success: "Data updated Successfully" });
    }
  } catch (error) {
    console.log(error);
    res?.status(500).json({ error: error.message });
  }
};

const createDbCustomer = async (req, res) => {
  const shopData = req.shopData;
  const {
    email,
    first_name,
    last_name,
    state,
    tags,
    currency,
    phone,
    addresses,
  } = req.body;

  try {
    const shopify = new Shopify({
      shopName: shopData?.dataValues.domain,
      accessToken: shopData?.dataValues.token,
    });

    const response = await shopify.customer.create({
      email: email,
      first_name: first_name,
      last_name: last_name,
      phone: phone,
    });
    if (response) {
      const result = await Customer.create({
        email: response.email,
        first_name: response.first_name,
        last_name: response.last_name,
        state: response.state,
        tags: response.tags,
        currency: response.currency,
        phone: response.phone,
        customerId: response.id,
        shopId: shopData.dataValues.shopId,
      });

      res.status(201).json({ success: "Data created Successfully" });
    }
  } catch (error) {
    console.log(error);
    res?.status(500).json({ error });
  }
};

const deleteCustomer = async (req, res) => {
  const shopData = req.shopData;

  const shopify = new Shopify({
    shopName: shopData?.dataValues.domain,
    accessToken: shopData?.dataValues.token,
  });

  try {
    const response = await shopify.customer.delete(req.params.id);
    if (response) {
      await Customer.destroy({ where: { customerId: req.params.id } });

      await Address.destroy({
        where: { customerId: req.params.id },
      });

      await getAllCustomer();
      res.status(200).json({ success: "Data Deleted Successfully" });
    }
  } catch (error) {
    console.log("first", error);
    res?.status(500).json({ error: error.message });
  }
};
export { getDbCustomer, editDbCustomer, createDbCustomer, deleteCustomer };
