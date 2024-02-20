const { EventEmitter } = require("events");
const { readFile, readFileSync } = require("fs");
const express = require("express");

const emitTest = new EventEmitter();

readFile("./hello.txt", "utf8", (err, txt) => {
  console.log(txt, "reading file asynchronously");
});

const txt = readFileSync("./hello.txt", "utf8");
console.log(txt);

emitTest.on("lunch", () => {
  console.log("sushi 🍣");
});

setTimeout(() => {
  console.log("timed out");
}, 2000);

process.on("exit", () => {
  console.log("exiting process");
});

emitTest.emit("lunch");

const app = express();

app.get("/", (request, response) => {
  readFile("./home.html", "utf8", (err, html) => {
    if (err) {
      console.error(err);
      response.status("500").send("sorry, an error has occurred");
    }
    response.send(html);
  });
});

// app.get("/test", (request, response) => {
//   readFile("./test.html", "utf8", (err, html) => {
//     if (err) {
//       console.error(err);
//       response.status("500").send("sorry, an error has occurred");
//     }
//     response.json({ key: "value" });
//     // response.send(html);
//   });
// });

// app.listen(process.env.PORT || 8080, () => console.log("app available on port 8080"));