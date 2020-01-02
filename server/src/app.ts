require("dotenv").config();

import * as express from "express";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as cors from "cors";
import * as createError from "http-errors";
import { createConnection } from "typeorm";

import router from "./components";

export default async () => {
  const app = await createConnection().then(async connection => {
    const app = express();

    app.use(
      cors({
        origin: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
        exposedHeaders: ["x-auth-token"]
      })
    );

    app.use(logger("dev"));
    app.use(bodyParser.json());

    app.use("/", router);

    app.use(function(req, res, next) {
      next(createError(404));
    });

    app.use(function(err, req, res, next) {
      console.error(err);

      res.status(err.status || 500);
      res.json(
        err.status === 404
          ? { error: "Resource Not Found" }
          : { error: "Unexpected Error - Sorry!" }
      );
    });

    return app;
  });
  return app;
};
