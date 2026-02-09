import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const PORT = process.env.PORT || 5000;

const ensureAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
      console.log('Admin user already exists');
      return;
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@mail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123456';
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(adminPassword, salt);

    const admin = await User.create({
      username: adminUsername,
      email: adminEmail,
      password: hashed,
      role: 'admin',
    });

    console.log('Admin user created:', admin.email);
  } catch (err) {
    console.error('Failed to ensure admin user', err);
  }
};

connectDB().then(async () => {
  await ensureAdmin();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
