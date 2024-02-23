module.exports = (app: any) => {
  const addresses = require("../controllers/address.controller");

  // address
  app.post("/address", addresses.create);

  app.get("/address", addresses.getAll);

  app.get("/address/:addressId", addresses.getById);
};
