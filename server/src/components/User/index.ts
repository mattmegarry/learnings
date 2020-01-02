import * as express from "express";
import { Request, Response } from "express";
const userRouter = express.Router();

import { hashSaltPassword } from "../../utils/auth";

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

export default userRouter;
