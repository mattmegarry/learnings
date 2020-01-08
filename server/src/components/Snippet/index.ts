import * as express from "express";
import { Request, Response } from "express";
const snippetRouter = express.Router();

import { getConnection } from "typeorm";
import { Snippet } from "../../entity/Snippet";
import { authorization } from "../../utils/auth";

snippetRouter.post("/:userId", authorization, async function(
  req: Request,
  res: Response
) {
  if (!req.body.snippetText) {
    return res.status(400).send(["Snippet text is required!"]);
  }
  try {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Snippet)
      .values([
        {
          questionText: req.body.questionText,
          snippetText: req.body.snippetText,
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

snippetRouter.get("/:userId/recent-snippets", authorization, async function(
  req: Request,
  res: Response
) {
  try {
    const snippets = await getConnection()
      .createQueryBuilder()
      .select("snippet")
      .from(Snippet, "snippet")
      .where("snippet.userId = :id", { id: res.locals.authorizedUser.id })
      .orderBy("snippet.updatedAt", "DESC")
      .limit(10)
      .getMany();

    const data = {
      snippets
    };
    console.log(data);
    return res.status(200).send(data);
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
});

snippetRouter.get("/test401", authorization, async function(
  req: Request,
  res: Response
) {
  return res.status(401).send();
});

export default snippetRouter;
