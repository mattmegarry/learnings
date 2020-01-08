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

collectionRouter.get(
  "/:userId/recent-collections",
  authorization,
  async function(req: Request, res: Response) {
    try {
      const collections = await getConnection()
        .createQueryBuilder()
        .select("collection")
        .from(Collection, "collection")
        .where("collection.userId = :id", { id: res.locals.authorizedUser.id })
        .orderBy("collection.updatedAt", "DESC")
        .limit(10)
        .getMany();

      const data = {
        collections
      };
      console.log(data);
      return res.status(200).send(data);
    } catch (e) {
      console.error(e);
      return res.status(500).end();
    }
  }
);

collectionRouter.post(
  "/:userId/collection-search",
  authorization,
  async function(req: Request, res: Response) {
    try {
      const matchingCollections = await getConnection().manager.query(
        `SELECT id, "collectionName" FROM public.collection WHERE "collectionName" ILIKE $1 AND "userId" = $2`,
        ["%" + req.body.searchTerm + "%", res.locals.authorizedUser.id]
      );

      const data = {
        matchingCollections
      };

      res.status(200).send(data);
    } catch (e) {
      console.error(e);
      return res.status(500).end();
    }
  }
);

export default collectionRouter;
