import jwt from 'jsonwebtoken';
import moment from 'moment';

// Middleware to authenticate JWT and check working hours
export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        // Token has expired, but allow access for admins
        if (user.role === 'admin'|| user.role === 'master-admin'){
          req.user = user; // Attach user information to the request
          return next();
        }
      }

      return res.status(403).json({ message: 'Invalid token' });
    }

    // Check if the user is an admin
    if (user.role === 'admin') {
      req.user = user; // Attach user information to the request
      return next(); // Allow admin access regardless of token expiry
    }
    const workingHours= moment().hour()  >=  8 && moment().hour() < 17;
    
    // Check the custom claim for working hours for non-admin users
    if (!workingHours) {
      return res.status(403).json({ message: 'Access denied outside working hours' });
    }

    req.user = user; // Attach user information to the request
    next();
  });
};
