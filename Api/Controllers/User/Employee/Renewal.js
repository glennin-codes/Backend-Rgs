
import User from "../../../Models/User.js";
import generateNewPassword from "./Helper/generatePassword.js";
import moment from "moment-timezone";
// Renewal Endpoint
export const RenewaAcount = async (req, res) => {
    const timezone = "Africa/Mogadishu";
    const now = moment().tz(timezone);
    try {
      // Authenticate the master admin here (e.g., check admin credentials)
  
      const { id } = req.body;
  
      // Check if the account associated with the email is revoked
      const user = await User.findOne({ _id:id });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (!user.accountExpiration === null) {
        return res.status(400).json({ message: "Account is not revoked" });
      }
  
      // Generate a new password (you can use a library like `crypto` for this)
      const newPassword = generateNewPassword(8);
  
      // Update the user's password in the database
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await User.findByIdAndUpdate(user._id, {
         password: hashedPassword,
         accountExpiration: moment(now).add(1, "hours").toDate() });
  
      // Send an email to the user with their new credentials
     await  sendRenewalEmail(user.name,user.email,newPassword);
  
      return res.status(200).json({ message: "Account renewed successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  