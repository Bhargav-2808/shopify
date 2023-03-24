import { Op } from "sequelize";
import { Variant, Image, Product } from "../../modals/productSchema.js";

const getDbProduct = async (req, res) => {
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
    const count = await Product.findAll({
      where: {
        [Op.or]: [
          {
            body_html: {
              [Op.like]: `%${query}%`,
            },
          },

          {
            handle: {
              [Op.like]: `%${query}%`,
            },
          },

          {
            product_type: {
              [Op.like]: `%${query}%`,
            },
          },

          {
            published_scope: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            status: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            tags: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            template_suffix: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            title: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            vendor: {
              [Op.like]: `%${query}%`,
            },
          },
        ],
        shopId: shopData.shopId,
      },
    });

    data = await Product.findAndCountAll({
      where: {
        [Op.or]: [
          {
            body_html: {
              [Op.like]: `%${query}%`,
            },
          },

          {
            handle: {
              [Op.like]: `%${query}%`,
            },
          },

          {
            product_type: {
              [Op.like]: `%${query}%`,
            },
          },

          {
            published_scope: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            status: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            tags: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            template_suffix: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            title: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            vendor: {
              [Op.like]: `%${query}%`,
            },
          },
        ],
        shopId: shopData.shopId,
      },
      include: [{ model: Image }, { model: Variant }],
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
export { getDbProduct };
