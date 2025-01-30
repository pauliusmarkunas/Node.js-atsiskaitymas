import express from "express";
const ordersRouter = express.Router();

// getAllOrders
ordersRouter.get("/");

//getOrderById
ordersRouter.get("/:id");

//createOrder
ordersRouter.post("/");

//updateOrder (connect to the user)
ordersRouter.put("/:id");

//deleteOrder
ordersRouter.delete("/:id");

export default ordersRouter;
