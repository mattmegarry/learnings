import * as express from "express";
import { Request, Response } from "express";
import * as bodyParser from "body-parser";
import * as logger from "morgan";

const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());

app.get("/test", function(req: Request, res: Response) {
  res.json({ message: "It works!!" });
});

//TO DO: GLOBAL ERROR HANDLING GOES HERE

module.exports = app;
