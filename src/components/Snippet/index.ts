import * as express from "express";
import { Request, Response } from "express";
const snippetRouter = express.Router();

import { getConnection } from "typeorm";
import { Snippet } from "../../entity/Snippet";

snippetRouter.post("/", async function(req: Request, res: Response) {
  // REAL-LIFE --> IS THIS USER ACTUALLY LOGGED IN AND THE ONE MAKING THIS REQUEST??
  // at least you will require 'A' valid user uuid lol... not OK.

  const snippetRepository = getConnection().getRepository(Snippet);
  const results = await snippetRepository.save(req.body);
  return res.send(results);
});

export default snippetRouter;
