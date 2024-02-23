const { readFile } = require("fs");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// a route for home page
app.get("/home", (request: any, response: any) => {
  response.json({ message: "NodeJs CRUD Application" });
});

app.get("/", (request: any, response: any) => {
  readFile("./home.html", "utf8", (err: any, html: any) => {
    if (err) {
      console.error(err);
      response.status("500").send("sorry, an error has occurred");
    }
    response.send(html);
  });
});

require("./routes/address.routes")(app);

const server = app.listen(process.env.PORT || 8080, () =>
  console.log("Express server listening on port " + server.address().port)
);
