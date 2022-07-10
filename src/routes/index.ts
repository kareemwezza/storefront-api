import { Router } from "express";
import userRoutes from "./api/user.routes";
import productRoutes from "./api/products.routes";
import ordersRoutes from "./api/orders.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/orders", ordersRoutes);

export default router;
