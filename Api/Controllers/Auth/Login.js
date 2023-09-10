import moment from "moment/moment.js";
import User from "../../Models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const Login = async (req, res) => {
  const now = moment();
  const dayOfWeek = now.day();
  try {
   
    // Continue with the login process if it's within allowed conditions
    const email = req.body.email;
    const pwd = req.body.password;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(pwd, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
     // Check if it's a weekend (Friday or Saturday)
     if (dayOfWeek === 5 || dayOfWeek === 6) {
      // Deny login for employees during weekends
      if (user.role === "user") {
        return res
          .status(403)
          .json({ message: "Access denied during weekends." });
      }
    } else {
      // Check if it's outside of working hours (8am to 5pm)
      const workingHoursStart = now
        .clone()
        .set({ hour: 8, minute: 0, second: 0 });
      const workingHoursEnd = now
        .clone()
        .set({ hour: 17, minute: 0, second: 0 });

      if (now.isBefore(workingHoursStart) || now.isAfter(workingHoursEnd)) {
        // Deny login for employees outside of working hours
        if (user.role=== "user") {
          return res
            .status(403)
            .json({ message: "Access denied outside working hours." });
        }
      }
    }

    const isWorkingHours = now.hour() >= 8 && now.hour() < 17;

    const payload = {
      id: user._id,
      name: user.name,
      role: user.role,
      isWorkingHours,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
};
// const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZmRjOWFkODc3ODhhMWUyMjhkMjYxOCIsIm5hbWUiOiJKb2hudGUiLCJyb2xlIjoidXNlciIsImlzV29ya2luZ0hvdXJzIjp0cnVlLCJpYXQiOjE2OTQzNTM5MjUsImV4cCI6MTY5NDM4MjcyNX0.dW7EaYylkwKU3xX8sIUH_OWPMfLmf8xeoloGhzfFLzo"
// const decoded= jwt.decode(token)
// console.log(decoded);