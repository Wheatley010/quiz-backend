import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { sendPasswordChangeEmail } from '../services/emailService.js';

export const getProfile = async (req, res) => {
  res.json(req.user);
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { username, email, password } = req.body;

    if (email && email !== user.email) {
      const exists = await User.findOne({ email });
      if (exists) return res.status(400).json({ message: 'Email already in use' });
      user.email = email;
    }

    if (username) user.username = username;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    const updated = await user.save();

    // Отправляем письмо подтверждения если был изменен пароль
    if (password) {
      try {
        await sendPasswordChangeEmail(updated.email, updated.username);
      } catch (err) {
        console.error('Failed to send password change email:', err);
        // Обновление профиля продолжается даже если письмо не отправилось
      }
    }

    res.json({
      message: 'Profile updated',
      user: { id: updated._id, username: updated.username, email: updated.email, role: updated.role },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
