import User from "../../../Models/User.js";
import bcrypt from "bcrypt";

export const UpdateEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the updated location already exists for another user
    const existingUserWithLocation = await User.findOne({
      location: req.body.location,
      _id: { $ne: id }, // Exclude the current user being updated
    });

    if (existingUserWithLocation) {
      return res
        .status(409)
        .json({ message: "Location already exists for another user" });
    }

    const employee = await User.findOneAndUpdate(
      { _id: id },
      {
        name: req.body.name,
        location: req.body.location,
        phone: req.body.phone,
        email: req.body.email,
        password: hashedPassword,
      },
      { new: true }
    );

    if (employee) {
      return res.status(200).json({ message: "User updated successfully" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
