import { Router, type IRouter } from "express";
import healthRouter from "./health";
import siweRouter from "./siwe";

const router: IRouter = Router();

router.use(healthRouter);
router.use(siweRouter);

export default router;
