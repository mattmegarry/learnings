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
  const snippets = await getConnection()
    .createQueryBuilder()
    .select("snippet")
    .from(Snippet, "snippet")
    .where("snippet.userId = :id", { id: req.params.userId }) // Is it silly to use params here? If we just got user from DB anyway??
    .getMany();

  const data = {
    snippets
  };

  console.log(data);

  return res.status(200).send(data);
});

export default snippetRouter;
