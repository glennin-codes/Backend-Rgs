import jwt from 'jsonwebtoken';
import moment from 'moment-timezone';

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
      console.error('Token verification error:', err);
      return res.status(403).json({ message: 'Invalid token',err:err });
    }
    const timezone = 'Africa/Mogadishu';
    const now = moment().tz(timezone);
  
    // Check if the user is an admin
    if (user.role === 'admin') {
      req.user = user; // Attach user information to the request
      return next(); // Allow admin access regardless of token expiry
    }
    const workingHours= now.hour()  >=  7 && now.hour() < 20;
    
    // Check the custom claim for working hours for non-admin users
    if (!workingHours) {
      if(user.role === 'user'){

      return res.status(403).json({ message: 'Access denied outside working hours' });
      }

    }


    req.user = user; // Attach user information to the request
    next();
  });
};
