import * as express from "express";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import { createConnection } from "typeorm";

import router from "./components";

export default async () => {
  const app = await createConnection().then(async connection => {
    const app = express();
    app.use(logger("dev"));
    app.use(bodyParser.json());

    app.use("/", router);

    //TO DO: GLOBAL ERROR HANDLING GOES HERE

    return app;
  });
  return app;
};
