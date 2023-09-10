import jwt from "jsonwebtoken";

// Middleware to authenticate JWT and check working hours
export const AllAdminMiddleware = (req, res, next) => {
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
    if (user.role === "admin" || user.role === "master-admin") {
      req.user = user; // Attach user information to the request
      return next(); // Allow admin access regardless of token expiry
    }

    res.status(403).json({ message: "forbidden" });
  });
};
