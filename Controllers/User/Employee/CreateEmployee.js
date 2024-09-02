// Used to create a new employee
import bcrypt from "bcrypt";
import User from "../../../Models/User.js";
import moment from "moment-timezone";
import { sendEmail } from "../../../Utils/Email/email.js";

export const CreateEmployee = async (req, res) => {
  const timezone = "Africa/Mogadishu";
  const now = moment().tz(timezone);
  try {
    if (req.body) {
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;
      const location =req.body.location;
      const phone=req.body.phone;

      const checkUser = await User.findOne({ email: email });
      if (checkUser) {
        return res.status(409).json({ message: "User already exists" });
      }
      // Check if a user with a similar location already exists
      const checkUserLocation = await User.findOne({ location: location ,role:'user'});
      if (checkUserLocation) {
        return res
          .status(409)
          .json({ "message": "A user with a similar location already exists. Please assign a different location." }          );
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);

      const verificationExpirationTime = moment(now).add(2, "hours");


      const newEmployee = new User({
        name: name,
        location: location,
        phone: phone,
        email: email,
        password: hashedPassword,
        // photo: req.body.photo,
        accountExpiration: verificationExpirationTime.toDate(),
      });
      console.log(newEmployee.accountExpiration);

      await newEmployee.save();
      await sendEmail(name, email, password);
      res.status(201).json({
        message: `Account for the new employ was created successfully. A verification email with login details has been sent to the user's email and will expire at ${verificationExpirationTime.format("hh:mm A")}. The user must verify their account within 2 hours to avoid deactivation.`,
      });
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
