// Used to create a new employee
import bcrypt from "bcrypt";
import User from "../../../Models/User.js";
import moment from "moment-timezone";
import { sendEmail } from "../../../Util/Email/email.js";

export const CreateEmployee = async (req, res) => {
  const timezone = "Africa/Mogadishu";
  const now = moment().tz(timezone);
  try {
    if (req.body) {
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;

      const checkUser = await User.findOne({ email: email });
      if (checkUser) {
        return res.status(409).json({ message: "User already exists" });
      }

      // Create a new master-admin user
      const hashedPassword = await bcrypt.hash(password, 10);
      const newEmployee = new User({
        name: req.body.name,
        location: req.body.location,
        phone: req.body.phone,
        email: req.body.email,
        password: hashedPassword,
        photo: req.body.photo,
        accountExpiration: moment(now).add(2, "hours").toDate(),
      });
      console.log(newEmployee.accountExpiration);

      await newEmployee.save();
      await sendEmail(name, email, password);
      res.status(201).json({ message: "Employee user created successfully" });
    } else {
      return res
        .status(400)
        .json({ message: "Please provide the required fields" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error creating employee user", error });
  }
};
