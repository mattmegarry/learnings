import * as express from "express";
import { Request, Response } from "express";
const userRouter = express.Router();

userRouter.get("/", async (req: Request, res: Response) => {
  res.json({ data: ["Jimmy", "Jilly", "Gina"] });
});

export default userRouter;
