import * as express from "express";
import { Request, Response } from "express";
const userRouter = express.Router();

import { passwordMatches, createToken } from "../../utils/auth";

import { getConnection } from "typeorm";
import { User } from "../../entity/User";
import validationErrors from "../../utils/validation";

userRouter.post("/signup", async function(req: Request, res: Response) {
  try {
    const userRepository = getConnection().getRepository(User);
    const user = await userRepository.create(req.body);

    const errorMessages = await validationErrors(user);
    if (errorMessages) {
      res.status(400).send(errorMessages);
    } else {
      const results = await userRepository.save(user);
      res.status(200).send(results);
    }
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .send([
        "Oops! Something went wrong. Please try again or contact support"
      ]);
  }
});

userRouter.post("/login", async function(req: Request, res: Response) {
  try {
    const email = req.body.email;
    const userRepository = getConnection().getRepository(User);
    const user = await userRepository
      .createQueryBuilder()
      .select("user")
      .addSelect("user.password")
      .from(User, "user")
      .where("user.email = :email", { email: email })
      .getOne();

    if (await passwordMatches(req.body.password, user.password)) {
      res.status(200).send({
        message: "Login successful",
        token: createToken(user.id),
        user: { id: user.id, username: user.username }
      });
    } else {
      res.status(401).send(["Login failed. Please try again..."]);
    }
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .send([
        "Oops! Something went wrong. Please try again or contact support"
      ]);
  }
});

export default userRouter;
