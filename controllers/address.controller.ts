import { ERRORS } from "../definitions/errors";
import { getCurrentTimestamp, getRandomLocation } from "../helpers";
import { validateRequiredFieldsPayload } from "../helpers/validate";

const Address = require("../models/address.model");

exports.create = (request: any, response: any) => {
  if (!request || !request.body) {
    response.status(400).send({
      message: ERRORS.unexpected,
    });
  }

  const validate = validateRequiredFieldsPayload(request?.body, [
    "address",
    "district",
    "city_id",
    "phone",
  ]);

  if (!validate.status) {
    response.status(400).send({
      status: 400,
      message: `${validate.field || ""} is required`,
    });
  }

  //create address
  const _address = new Address({
    address_id: new Date().getTime(),
    address: request.body.address,
    address2: request.body.address2 || null,
    district: request.body.district,
    city_id: request.body.city_id,
    postal_code: request.body.postal_code || null,
    phone: request.body.phone,
    location: getRandomLocation(),
    last_update: getCurrentTimestamp(),
  });
  console.log({ body: request.body, _address });

  Address.create(_address, (error: any, data: any) => {
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
