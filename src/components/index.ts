import * as express from "express";
const router = express.Router();

import home from "./Home";
import user from "./User";
import snippet from "./Snippet";

router.use("/", home);
router.use("/users", user);
router.use("/snippets", snippet);

export default router;
