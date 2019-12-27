import * as express from "express";
import * as bodyParser from "body-parser";
import * as logger from "morgan";

import router from "./components";

const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());

app.use("/", router);

//TO DO: GLOBAL ERROR HANDLING GOES HERE

module.exports = app;
