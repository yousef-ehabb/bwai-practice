const jwt = require('jsonwebtoken');
const config = require('../config');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const token = authHeader.split(' ')[1];
    
    // In a real Supabase setup, tokens are verified against the JWT Secret
    // For this MVP, we decode it. You should set SUPABASE_JWT_SECRET in .env
    const decoded = jwt.verify(token, config.SUPABASE_JWT_SECRET);
    
    // Attach user to request
    // Decoded usually contains 'sub' as the user ID in Supabase
    const user = await prisma.user.findUnique({
      where: { id: decoded.sub },
    });

    if (!user) {
      // If user exists in Auth but not in our DB yet, we might need to create them
      // This is common for the first login
      return res.status(401).json({ message: 'User not found in database' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
    next();
  };
};

module.exports = { authenticate, authorize };
