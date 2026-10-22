
const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  error.code = "NOT_FOUND";

  next(error);
};

const errorHandler = (err, req, res, next) => {
  // Log error details internally for debugging
  console.error("Error:", {
    message: err.message,
    code: err.code,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
  });

  // Preserve an existing status code; default to 500
  const statusCode =
    res.statusCode === 200
      ? err.statusCode || 500
      : res.statusCode;

  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || "Internal Server Error",
      code: err.code || "SERVER_ERROR",
    },
  });
};


module.exports = {
  notFound,
  errorHandler,
};
