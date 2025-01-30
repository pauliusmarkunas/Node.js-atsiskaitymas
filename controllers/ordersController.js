import orderModel from "../models/Order.js";
import mongoose from "mongoose";

export async function createOrder(req, res) {
  const { userId, product, quantity, status } = req.body;

  if (!userId || !product || !quantity || !status) {
    return res
      .status(400)
      .json({ error: "userId, product, quantity and status are required" });
  }

  const statusOptions = ["pending", "shipped", "delivered"];
  if (!statusOptions.includes(status)) {
    return res.status(400).json({
      error: `status is not valid ("pending", "shipped", "delivered")`,
    });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid id format" });
  }

  try {
    const order = new orderModel({
      userId,
      product,
      quantity,
      status,
    });

    await order.save();

    res.status(200).json(order);
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ error: error.message });
  }
}

export async function getAllOrders(req, res) {
  try {
    const allOrders = await orderModel.find().select("-__v");

    res.status(200).json(allOrders);
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ error: error.message });
  }
}

export async function getOrderById(req, res) {
  try {
    const { id } = req.params;

    const order = await orderModel.findById(id).select("-__v");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ error: error.message });
  }
}

export async function updateOrder(req, res) {
  try {
    const { id } = req.params;

    const order = await orderModel.findById(id).select("-__v");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const { userId, product, quantity, status } = req.body;

    const orderData = {};

    if (userId) orderData.userId = userId;
    if (product) orderData.product = product;
    if (quantity !== undefined) orderData.quantity = quantity;
    if (status) orderData.status = status;

    if (
      orderData.userId &&
      !mongoose.Types.ObjectId.isValid(orderData.userId)
    ) {
      return res.status(400).json({ error: "Invalid user id format" });
    }

    const statusOptions = ["pending", "shipped", "delivered"];
    if (orderData.status && !statusOptions.includes(orderData.status)) {
      return res.status(400).json({
        error: `status is not valid ("pending", "shipped", "delivered")`,
      });
    }

    if (orderData.quantity !== undefined && orderData.quantity < 1) {
      return res.status(400).json({
        error: `quantity should me more then 0`,
      });
    }

    const orderUpdate = await orderModel
      .findByIdAndUpdate(id, orderData, {
        new: true,
      })
      .select("-__v");

    res.status(200).json(orderUpdate);
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ error: error.message });
  }
}

export async function deleteOrder(req, res) {
  const { id } = req.params;
  try {
    const order = await orderModel.findByIdAndDelete(id).select("-__v");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ error: error.message });
  }
}
