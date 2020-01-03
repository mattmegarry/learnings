import * as express from "express";
import { Request, Response } from "express";
const snippetRouter = express.Router();

import { getConnection } from "typeorm";
import { Snippet } from "../../entity/Snippet";
import { authorization } from "../../utils/auth";

snippetRouter.post("/", async function(req: Request, res: Response) {
  // REAL-LIFE --> IS THIS USER ACTUALLY LOGGED IN AND THE ONE MAKING THIS REQUEST??
  // at least you will require 'A' valid user uuid lol... not OK.

  const snippetRepository = getConnection().getRepository(Snippet);
  const results = await snippetRepository.save(req.body);
  return res.send(results);
});

snippetRouter.get("/:userId/snippets", authorization, async function(
  req: Request,
  res: Response
) {
  try {
    const snippets = await getConnection()
      .createQueryBuilder()
      .select("snippet")
      .from(Snippet, "snippet")
      .where("snippet.userId = :id", { id: res.locals.authorizedUser.id })
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
