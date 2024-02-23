/**
 * SCHEMA belike:
 * struture:
 * {
 *  id: [Primry key] Number (Auto increase),
 *  address: String,
 *  address2: String,
 *  district: String,
 *  city_id: Number,
 *  postal_code: Varchar,
 *  phone: Varchar,
 *  location: Geometry,
 *  last_update: Timestamp,
 * }
 */

import { ERRORS } from "../definitions/errors";
import { IAddress } from "../definitions/interfaces/address.interface";
const database = require("./db");

const AddressContrustor = function (address: IAddress) {};

AddressContrustor.create = (newAddress: IAddress, result: any) => {
  const _sql = "INSERT INTO adress SET ?";
  database.query(_sql, newAddress, (err: any, res: any) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, {
      ...newAddress,
      id: new Date().getTime(),
    });
  });
};

AddressContrustor.getAll = (
  request: {
    limit: number;
    page: number;
    string: string;
  },
  result: any
) => {
  const { limit, page, string } = request;
  let _sql = `SELECT * FROM address`;
  if (string) {
    _sql += ` WHERE address LIKE '%${string}%' OR address2 LIKE '%${string}%' OR district LIKE '%${string}%'`;
  }
  const sort = ` ORDER BY address_id DESC LIMIT ${limit} OFFSET ${
    (page - 1) * 10
  } `;

  database.query(_sql + sort, (err: any, res: any) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

AddressContrustor.getById = (id: string, result: any) => {
  const _sql = `SELECT * FROM address WHERE address_id = ${id}`;
  database.query(_sql, (err: any, res: any) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res?.length) {
      result(null, res[0]);
      return;
    }
    result({ code: ERRORS.not_found }, null);
  });
};

module.exports = AddressContrustor;
