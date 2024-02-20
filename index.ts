const { readFile, readFileSync } = require("fs");
const express = require("express");
import "./script/server";
import database from "./script/server";

const a: string = "hello world";

const app = express();

app.get("/", (request: any, response: any) => {
  readFile("./home.html", "utf8", (err: any, html: any) => {
    if (err) {
      console.error(err);
      response.status("500").send("sorry, an error has occurred");
    }
    response.send(html);
  });
});

app.get("/user", async (request: any, response: any) => {
  const _limit = Number(request?.query?.limit || 0) || 10;
  const _page = Number(request?.query?.page || 0) || 1;
  const _name = request?.query?.string
    ? decodeURIComponent(request?.query?.string)
    : "";
  let _sql = `SELECT * FROM actor`;
  if (_name) {
    _sql += ` WHERE first_name LIKE '%${_name}%' OR last_name LIKE '%${_name}%'`;
  }
  const sort = ` ORDER BY actor_id DESC LIMIT ${_limit} OFFSET ${
    (_page - 1) * 10
  } `;
  console.log({ _sql });
  database.query(_sql + sort, function (err: any, results: any) {
    if (err) throw err;
    console.log(results);
    if (results) response.json(results);
  });
});

const server = app.listen(process.env.PORT || 8080, () =>
  console.log("Express server listening on port " + server.address().port)
);

// export default app;
