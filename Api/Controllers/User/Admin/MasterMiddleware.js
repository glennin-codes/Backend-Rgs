import jwt from "jsonwebtoken";

// Middleware to authenticate JWT and check working hours
export const MasterAdminMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    // Check if the user is an admin
    if (user.role === "master-admin") {
      req.user = user; 
      return next(); 
    }

    req.status(403).json({ message: "forbidden" });
  });
};
