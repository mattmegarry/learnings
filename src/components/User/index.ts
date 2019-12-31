import * as express from "express";
import { Request, Response } from "express";
const userRouter = express.Router();

import { getConnection } from "typeorm";
import { User } from "../../entity/User";

userRouter.get("/:id", async function(req: Request, res: Response) {
  const userRepository = getConnection().getRepository(User);
  const results = await userRepository.findOne(req.params.id);
  return res.send(results);
});

userRouter.post("/", async function(req: Request, res: Response) {
  const userRepository = getConnection().getRepository(User);
  const user = await userRepository.create(req.body);
  const results = await userRepository.save(user);
  return res.send(results);
});

userRouter.put("/:id", async function(req: Request, res: Response) {
  const userRepository = getConnection().getRepository(User);
  const user = await userRepository.findOne(req.params.id);
  userRepository.merge(user, req.body);
  const results = await userRepository.save(user);
  return res.send(results);
});

userRouter.delete("/:id", async function(req: Request, res: Response) {
  const userRepository = getConnection().getRepository(User);
  const results = await userRepository.delete(req.params.id);
  return res.send(results);
});

export default userRouter;
