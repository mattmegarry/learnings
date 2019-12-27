import * as express from "express";
import { Request, Response } from "express";

const homeRouter = express.Router();

homeRouter.get("/", async (req: Request, res: Response) => {
  res.json({ data: "Some nice data for the homepage!" });
});

export default homeRouter;
