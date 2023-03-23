import { Op } from "sequelize";
import { Address, Customer } from "../../modals/customerSchema.js";
const getDbCustomer = async (req, res) => {
  let data;
  const shopData = req.shopData;

  const pageNumber = parseInt(req.query.page);
  const sizeNumber = parseInt(req.query.size);
  const query = req.query.search;

  let page = 0,
    size = 10;
  if (!isNaN(pageNumber) && pageNumber > 0) {
    page = pageNumber;
  }

  if (!isNaN(sizeNumber) && sizeNumber > 0 && sizeNumber < 10) {
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
export { getDbCustomer };
