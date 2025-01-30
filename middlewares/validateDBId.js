import mongoose from "mongoose";

export default function validateDBIdParam(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid id format" });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
