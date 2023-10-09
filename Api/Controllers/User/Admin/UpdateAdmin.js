import User from "../../../Models/User.js"
import bcrypt from "bcrypt";

export const UpdateAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the updated location already exists for another use

    const admin = await User.findOneAndUpdate(
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

    if (admin) {
      return res.status(200).json({ message: "User updated successfully" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
