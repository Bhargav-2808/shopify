import shopify from "../db/db.js";
import { DataTypes } from "sequelize";

const Shop = shopify.define(
  "shop",
  {
    shopName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    domain: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shopId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["shopId"],
      },
    ],
  }
);

Shop.sync()
  .then(() => {
    console.log("Shop Table created!");
  })
  .catch((e) => {
    console.log(e);
  });

export default Shop;
