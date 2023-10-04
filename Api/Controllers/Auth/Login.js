import User from "../../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment-timezone";

export const Login = async (req, res) => {
  const timezone = "Africa/Mogadishu";
  const now = moment().tz(timezone);
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
    if (user.accountExpiration) {
      // Calculate the allowed login window (e.g., 2 hours from the account creation time)
      const accountExpirationTime = moment(user.accountExpiration);
      const loginWindowEnd = accountExpirationTime.clone().add(2, "hours");

      if (now.isAfter(loginWindowEnd)) {
        // Account has passed the login window, deny login
        return res
          .status(403)
          .json({
            message:
              "Access denied. Account login window expired. Please contact support.",
          });
      } else {
        // Nullify the "accountExpiration" to treat the user as an old employee for future logins
        user.accountExpiration = null;
        await user.save();
        if (dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0) {
          // Deny login for employees during weekends
          if (user.role === "user") {
            return res
              .status(403)
              .json({ message: "Your verification was a success you can login later,cause no access is granted during weekends." });
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
            if (user.role === "user") {
              return res
                .status(403)
                .json({ message: "Your verification was a success you can login later,cause no access is granted  outside working hours." });
            }
          }
        }
      }
    }
    // Check if it's a weekend (Friday or Saturday)
    if (dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0) {
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
        if (user.role === "user") {
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
      location: user.location,
      photo: user.photo,
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
