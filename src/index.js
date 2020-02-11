const typeorm = require("typeorm");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const routes = require("./routes");

typeorm
  .createConnection()
  .then(async connection => {
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());

    app.use("/", routes);

    app.listen(3000, () => {
      console.log("server started on port 3000!");
    });
  })
  .catch(error => console.log(error));
