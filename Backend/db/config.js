const config = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "root",
  DB: "shopify",
  dialect: "mysql",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idel: 10000,
  },
};


export default config;