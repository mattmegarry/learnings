import * as express from "express";
import { Request, Response } from "express";
const collectionRouter = express.Router();

import { getConnection } from "typeorm";
import { Collection } from "../../entity/Collection";
import { authorization } from "../../utils/auth";

collectionRouter.post("/:userId", authorization, async function(
  req: Request,
  res: Response
) {
  if (!req.body.collectionName) {
    return res.status(400).send(["Collection text is required!"]);
  }
  try {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Collection)
      .values([
        {
          collectionName: req.body.collectionName,
          userId: res.locals.authorizedUser.id
        }
      ])
      .execute();

    return res.status(200).send();
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
});

export default collectionRouter;
