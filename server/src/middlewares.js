const { PROD } = require('./constants');

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // forwards error to next middleware
};

// Error Handling Middleware - End Point For All Errors
const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    // don't do stack in production
    stack: PROD ? 'pancake' : error.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
