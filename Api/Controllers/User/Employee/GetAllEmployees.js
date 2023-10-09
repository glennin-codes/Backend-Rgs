// Used to get all employees
import User from "../../../Models/User.js";

export const getAllemployees = async (req, res) => {
  try {
    const rolesToQuery = ["admin", "user","master-admin"]; // Add "admin" to the roles to query

    const employees = await User.find({ role: { $in: rolesToQuery } });

    if (employees && employees.length > 0) {
      return res.status(200).json({ message: "employees fetched successfully", employees });
    } else {
      return res.status(404).json({ message: "No employees found" });
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error fetching employees", error });
  }
};
