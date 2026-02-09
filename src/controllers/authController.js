import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import ApiError from '../errors/ApiError.js';
import { sendWelcomeEmail } from '../services/emailService.js';

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      if (userExists.email === email) {
        return next(new ApiError(400, 'Email already exists'));
      }
      if (userExists.username === username) {
        return next(new ApiError(400, 'Username already exists'));
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Отправляем приветственное письмо (не ждем, чтобы не замедлять ответ)
    try {
      console.log('[Auth] Attempting to send welcome email...');
      await sendWelcomeEmail(email, username);
      console.log('[Auth] Welcome email sent successfully');
    } catch (err) {
      console.error('[Auth] Failed to send welcome email:', err.message);
      console.error('[Auth] Full error:', err);
      // Регистрация продолжается даже если письмо не отправилось
    }

    res.status(201).json({
      message: 'User registered successfully',
      userId: user._id,
    });
  } catch (error) {
    console.error('[Auth Register Error]:', error.message);
    console.error('[Auth Register Full Error]:', error);
    return next(new ApiError(500, 'Server error'));
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(new ApiError(400, 'Invalid credentials'));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ApiError(400, 'Invalid credentials'));
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (error) {
    return next(new ApiError(500, 'Server error'));
  }
};

export const registerAdmin = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // ensure only one admin exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      return next(new ApiError(400, 'Admin already exists'));
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new ApiError(400, 'User already exists'));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: 'admin',
    });

    res.status(201).json({ message: 'Admin user created', userId: user._id });
  } catch (error) {
    return next(new ApiError(500, 'Server error'));
  }
};
