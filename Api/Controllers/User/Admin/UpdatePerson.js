import User from "../../../Models/User.js";
import bcrypt from "bcrypt";

export const UpdatePerson = async (req, res) => {
  try {
    const id = req.params.id;

    // Create an object to hold the fields to update
    const updateFields = {};

    // Check if name is provided in the request body
    if (req.body.name) {
      updateFields.name = req.body.name;
    }

    // Check if location is provided in the request body
    if (req.body.location) {
      updateFields.location = req.body.location;
    }

    // Check if phone is provided in the request body
    if (req.body.phone) {
      updateFields.phone = req.body.phone;
    }

    // Check if email is provided in the request body
    if (req.body.email) {
      updateFields.email = req.body.email;
    }

    // Check if password is provided in the request body
    if (req.body.password) {
      // Hash the provided password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      updateFields.password = hashedPassword;
    }

    // Use $set operator to update only the specified fields
    const person = await User.findOneAndUpdate({ _id: id }, { $set: updateFields }, { new: true });

    if (person) {
      return res.status(200).json({ message: "User updated successfully" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
