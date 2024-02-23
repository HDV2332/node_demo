import { ERRORS } from "../definitions/errors";

const Address = require("../models/address.model");

exports.create = (request: any, response: any) => {
  if (!request || !request.body) {
    response.status(400).send({
      message: ERRORS.unexpected,
    });
  }

  //create address
  const address = new Address({
    id: new Date().getTime(),
    address: "String",
    address2: "String",
    district: "String",
    city_id: "",
    postal_code: "string",
    phone: "string",
    location: "string",
    last_update: "string",
  });

  Address.create(address, (error: any, data: any) => {
    if (error) {
      response.status(500).send({
        message: error.message || ERRORS.unexpected,
      });
    } else {
      response.send(data);
    }
  });
};

exports.getAll = (request: any, response: any) => {
  // data prep
  const _limit = Number(request?.query?.limit || 0) || 10;
  const _page = Number(request?.query?.page || 0) || 1;
  const _string = request?.query?.string
    ? decodeURIComponent(request?.query?.string)
    : "";

  Address.getAll(
    {
      limit: _limit,
      page: _page,
      string: _string,
    },
    (error: any, data: any) => {
      if (error)
        response.status(500).send({
          message: error.message || ERRORS.unexpected,
        });
      else response.send(data);
    }
  );
};

exports.getById = (request: any, response: any) => {
  const _id = request.params.addressId || "";
  if (!_id)
    response.status(400).send({
      message: ERRORS.unexpected,
    });
  Address.getById(request.params.addressId, (error: any, data: any) => {
    if (error) {
      if (error.code === ERRORS.not_found) {
        response.status(404).send({
          message: `Can not find address with id ${request.params.addressId}.`,
        });
      } else {
        response.status(500).send({
          message:
            "Error retrieving address with id " + request.params.addressId,
        });
      }
    } else response.send(data);
  });
};
