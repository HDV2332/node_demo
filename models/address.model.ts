import { ERRORS } from "../definitions/errors";
import { IAddress } from "../definitions/interfaces/address.interface";
const database = require("./db");

const AddressContrustor = function (this: any, address: IAddress) {
  this.address_id = address.address_id;
  this.address = address.address;
  this.address2 = address.address2;
  this.district = address.district;
  this.city_id = address.city_id;
  this.postal_code = address.postal_code;
  this.phone = address.phone;
  this.location = address.location;
  this.last_update = address.last_update;
};

AddressContrustor.create = (newAddress: IAddress, result: any) => {
  let _address = JSON.parse(JSON.stringify(newAddress));
  const _geometry = _address.location || {};
  delete _address.location;

  const _sql = "INSERT INTO address SET location = POINT(?, ?), ? ";
  database.query(
    _sql,
    [_geometry.latitude, _geometry.longtitude, _address],
    (err: any, res: any) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, {
        ...newAddress,
        id: new Date().getTime(),
      });
    }
  );
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
  let mainSql = `SELECT * FROM address`;
  if (string) {
    mainSql += ` WHERE address LIKE '%${string}%' OR address2 LIKE '%${string}%' OR district LIKE '%${string}%'`;
  }
  const sort = ` ORDER BY address_id DESC LIMIT ${limit} OFFSET ${
    (page - 1) * 10
  } `;

  const countTotalSql = "SELECT COUNT(*) as total FROM address";

  database.query(
    `${mainSql + sort}; ${countTotalSql}`,
    (err: any, res: any) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, {
        addresses: res[0],
        total: res[1]?.total || 0,
      });
    }
  );
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
