import { Router } from "express";
import * as controllers from "../../controller/user.controller";
import authenticate from "../../middlewares/authenticate";

const router = Router();

router.get("/", authenticate, controllers.index);

router.get("/:id", authenticate, controllers.show);

router.post("/", controllers.create);

router.post("/authenticate", controllers.authanticate);

export default router;
