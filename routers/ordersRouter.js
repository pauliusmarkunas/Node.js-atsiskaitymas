import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
} from "../controllers/ordersController.js";
const ordersRouter = express.Router();
import validateDBIdParam from "../middlewares/validateDBId.js";

// getAllOrders
ordersRouter.get("/", getAllOrders);

//getOrderById (by order id)
ordersRouter.get("/:id", validateDBIdParam, getOrderById);

//createOrder
ordersRouter.post("/", createOrder);

//updateOrder (connect to the user)
ordersRouter.put("/:id", validateDBIdParam, updateOrder);

//deleteOrder
ordersRouter.delete("/:id", validateDBIdParam, deleteOrder);

export default ordersRouter;
