import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/usersController.js";
import validateUserIdParam from "../middlewares/validateUserId.js";

const usersRouter = express.Router();

// getAllUsers
usersRouter.get("/", getAllUsers);

//getUserById
usersRouter.get("/:id", validateUserIdParam, getUserById);

//createUser
usersRouter.post("/", createUser);

//updateUser
usersRouter.put("/:id", validateUserIdParam, updateUser);

//deleteUser
usersRouter.delete("/:id", validateUserIdParam, deleteUser);

export default usersRouter;
