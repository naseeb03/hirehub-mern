import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Protect route: Verify JWT token and set user in the request
export const protect = async (req, res, next) => {
  try {
    let token;

    // Check if token exists in the Authorization header
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // If no token is found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
    }

    // Verify token and decode the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
      });
    }

    // Proceed to the next middleware
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized',
    });
  }
};

// Authorize route: Check if user has the required role
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this route',
      });
    }
    // Proceed to the next middleware if authorized
    next();
  };
};
