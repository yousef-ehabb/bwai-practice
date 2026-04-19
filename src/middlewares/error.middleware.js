const config = require('../config');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle Prisma errors
  if (err.code === 'P2002') {
    statusCode = 400;
    message = 'Unique constraint violation';
  } else if (err.code === 'P2025') {
    statusCode = 404;
    message = 'Resource not found';
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: config.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

module.exports = errorHandler;
