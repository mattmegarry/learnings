import * as express from "express";
const router = express.Router();

import home from "./Home";
import user from "./User";
import snippet from "./Snippet";
import collection from "./Collection";

router.use("/", home);
router.use("/users", user);

router.use("/users", snippet);
router.use("/snippets", snippet);
router.use("/collections", collection);

export default router;
