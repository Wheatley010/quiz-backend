import express from 'express';
import { check } from 'express-validator';
import runValidations from '../middleware/validationMiddleware.js';
import { register, login, registerAdmin } from '../controllers/authController.js';

const router = express.Router();

router.post(
	'/register',
	runValidations([
		check('username').notEmpty().withMessage('username is required'),
		check('email').isEmail().withMessage('valid email is required'),
		check('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters'),
	]),
	register
);

router.post(
	'/login',
	runValidations([
		check('email').isEmail().withMessage('valid email is required'),
		check('password').notEmpty().withMessage('password is required'),
	]),
	login
);

router.post('/register-admin', registerAdmin);
export default router;
