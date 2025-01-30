import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/usersController.js";
import validateDBIdParam from "../middlewares/validateDBId.js";

const usersRouter = express.Router();

// getAllUsers
usersRouter.get("/", getAllUsers);

//getUserById
usersRouter.get("/:id", validateDBIdParam, getUserById);

//createUser
usersRouter.post("/", createUser);

//updateUser
usersRouter.put("/:id", validateDBIdParam, updateUser);

//deleteUser
usersRouter.delete("/:id", validateDBIdParam, deleteUser);

export default usersRouter;
