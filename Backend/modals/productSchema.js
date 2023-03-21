import shopify from "../db/db.js";
import { DataTypes } from "sequelize";
import Shop from "./shopSchema.js";

const Product = shopify.define(
  "product",
  {
    body_html: {
      type: DataTypes.TEXT,
    },
    productId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    handle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    published_scope: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    template_suffix: {
      type: DataTypes.STRING,
  
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vendor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shopId: {
      type: DataTypes.STRING,
      references: {
        model: Shop,
        key: "shopId",
      },
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["productId"],
      },
    ],
  }
);
const Image = shopify.define(
  "image",
  {
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    productId: {
      type: DataTypes.STRING,
      references: {
        model: Product,
        key: "productId",
      },
    },
    imageId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    src: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    width: {
      type: DataTypes.INTEGER,
    },
    height: {
      type: DataTypes.INTEGER,
    },
    variant_ids: {
      type: DataTypes.JSON,
    },
    shopId: {
      type: DataTypes.STRING,
      references: {
        model: Shop,
        key: "shopId",
      },
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["imageId"],
      },
    ],
  }
);

const Variant = shopify.define("variant", {
  barcode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  productId: {
    type: DataTypes.STRING,
    references: {
      model: Product,
      key: "productId",
    },
  },
  imageId: {
    type: DataTypes.STRING,
    references: {
      model: Image,
      key: "imageId",
    },
  },
  variantId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  compare_at_price: {
    type: DataTypes.FLOAT,
  },
  grams: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  weight_unit: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  option1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  sku: {
    type: DataTypes.STRING,

  },
  taxable: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  shopId: {
    type: DataTypes.STRING,
    references: {
      model: Shop,
      key: "shopId",
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Product.hasMany(Variant);
Image.hasMany(Variant);

Product.sync()
  .then(() => {
    console.log("Product Table created!");
  })
  .catch((e) => {
    console.log(e);
  });
Image.sync()
  .then(() => {
    console.log("Image Table created!");
  })
  .catch((e) => {
    console.log(e);
  });
Variant.sync()
  .then(() => {
    console.log("Variant Table created!");
  })
  .catch((e) => {
    console.log(e);
  });

export { Product, Image, Variant };
