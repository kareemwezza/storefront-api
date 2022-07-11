import { Router } from "express";
import * as controllers from "../../controller/product.controller";
import authenticate from "../../middlewares/authenticate";

const router = Router();

router.get("/", controllers.index);

router.get("/:productId", controllers.getById);

router.post("/", authenticate, controllers.create);

router.post("/category", controllers.getByCategory);

export default router;
