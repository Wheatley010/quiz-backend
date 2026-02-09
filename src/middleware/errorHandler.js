// Global error-handling middleware
const errorHandler = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err);
  const status = err.status || 500;
  const payload = { message: err.message || 'Internal Server Error' };
  if (err.errors) payload.errors = err.errors;
  if (err.details) payload.details = err.details;
  return res.status(status).json(payload);
};

export default errorHandler;
