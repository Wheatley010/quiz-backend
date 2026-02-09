import { validationResult } from 'express-validator';

// runValidations receives an array of express-validator validation chains
// and returns a middleware that executes them and checks for errors.
const runValidations = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((v) => v.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({ status: 400, message: 'Validation failed', errors: errors.array() });
  }
  return next();
};

export default runValidations;
