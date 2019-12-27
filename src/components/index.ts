import * as express from "express";
const router = express.Router();

import home from "./Home";
import user from "./User";

router.use("/", home);
router.use("/users", user);

export default router;
