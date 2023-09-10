import User from "../../../Models/User.js";
import bcrypt from "bcrypt";
// Registration route for master-admins
export const CreateMasterAdmin = async (req, res) => {
  try {
    if (req.body) {
      const email = req.body.email;
      const password = req.body.password;
      const checkUser = await User.findOne({ email: email });
      if (checkUser) {
        return res.status(409).json({ message: "User already exists" });
      }
      // Create a new master-admin user
      const hashedPassword = await bcrypt.hash(password, 10);
      const newMasterAdmin = new User({
        name: req.body.name,
        location: req.body.location,
        phone: req.body.phone,
        email: req.body.email,
        password: hashedPassword,
        photo: req.body.photo,
        role: "master-admin",
      });

      await newMasterAdmin.save();

      res
        .status(201)
        .json({ message: "Master-admin user created successfully" });
    } else {
      return res
        .status(400)
        .json({ message: "Please provide the required fields" });
    }
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: "Error creating master-admin user", error });
  }
};
