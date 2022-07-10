import { Router } from "express";
import * as controllers from "../../controller/order.controller";
import authenticate from "../../middlewares/authenticate";

const router = Router();

router.get("/current", authenticate, controllers.getCurrent);
router.post("/", authenticate, controllers.createOrder);

export default router;
