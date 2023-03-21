import shopify from "../db/db.js";
import { DataTypes } from "sequelize";
import Shop from "./shopSchema.js";

const Customer = shopify.define(
  "customer",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tags: {
      type: DataTypes.STRING,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
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
        fields: ["customerId"],
      },
    ],
  }
);

const Address = shopify.define(
  "address",
  {
    customerId: {
      type: DataTypes.STRING,
      references: {
        model: Customer,
        key: "customerId",
      },
    },
    addressId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
    },
    address1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address2: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    province: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    country_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_default: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);

Customer.hasMany(Address, { foreignKey: "customerId" });
Shop.hasMany(Customer, { foreignKey: "shopId" });

Customer.sync()
  .then(() => {
    console.log("Customer Table created!");
  })
  .catch((e) => {
    console.log(e);
  });

Address.sync()
  .then(() => {
    console.log("Address Table created!");
  })
  .catch((e) => {
    console.log(e);
  });

export { Customer, Address };
