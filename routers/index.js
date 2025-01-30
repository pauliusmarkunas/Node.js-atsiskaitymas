import express from "express";
import usersRouter from "./usersRouter.js";
import ordersRouter from "./ordersRouter.js";

const router = express.Router();

router.use("/users", usersRouter);
router.use("/orders", ordersRouter);

export default router;
