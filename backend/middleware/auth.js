const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader?.replace('Bearer ', '');
  
  console.log('Auth middleware - Header present:', !!authHeader);
  console.log('Auth middleware - Token extracted:', !!token);

  if (!token) {
    console.log('Auth middleware - No token provided');
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Auth middleware - Token decoded, user ID:', decoded.user?.id);
    
    const user = await User.findById(decoded.user.id).select('-password');
    console.log('Auth middleware - User found:', !!user, 'Active:', user?.isActive);
    
    if (!user || !user.isActive) {
      console.log('Auth middleware - User not found or inactive');
      return res.status(401).json({ message: 'Token is not valid' });
    }

    req.user = user;
    console.log('Auth middleware - Success, proceeding');
    next();
  } catch (error) {
    console.log('Auth middleware - Token verification failed:', error.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};