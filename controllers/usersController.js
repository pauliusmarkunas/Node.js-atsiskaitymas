import userModel from "../models/User.js";

export async function createUser(req, res) {
  const { name, email, age } = req.body;

  try {
    if (!name || !email) {
      throw new Error("name and email are required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const emailExists = await userModel.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ error: "Email already in use" });
    }

    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }

    const newUser = new userModel({
      name,
      email,
      age,
    });

    if (age && (typeof age !== "number" || age < 0)) {
      throw new Error(
        "Invalid age value, type should be Number and value - more than 0"
      );
    }

    await newUser.save();

    res.status(200).json(newUser);
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ error: error.message });
  }
}

export async function getAllUsers(req, res) {
  try {
    const allUsers = await userModel.find().select("-__v");

    res.status(200).json(allUsers);
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ error: error.message });
  }
}

export async function getUserById(req, res) {
  try {
    const { id } = req.params;

    const user = await userModel.findById(id).select("-__v");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ error: error.message });
  }
}

export async function updateUser(req, res) {
  try {
    const { id } = req.params;

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { name, email, age } = req.body;

    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (email !== undefined) updateFields.email = email;
    if (age !== undefined) {
      // Check if age is a valid number
      if (typeof age !== "number" || age < 0) {
        throw new Error("Invalid age value");
      }
      updateFields.age = age;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (updateFields.email && !emailRegex.test(updateFields.email)) {
      throw new Error("Invalid email format");
    }

    const userUpdate = await userModel
      .findByIdAndUpdate(id, updateFields, {
        new: true,
      })
      .select("-__v");

    res.status(200).json(userUpdate);
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ error: error.message });
  }
}

export async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const user = await userModel.findByIdAndDelete(id).select("-__v");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ error: error.message });
  }
}
