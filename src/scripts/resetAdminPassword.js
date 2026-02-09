import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import connectDB from '../config/db.js';

dotenv.config();

const newPassword = process.argv[2];
if (!newPassword) {
  console.error('Usage: node src/scripts/resetAdminPassword.js <newPassword>');
  process.exit(1);
}

const run = async () => {
  try {
    await connectDB();
    // find admin user (role admin) or fallback to ADMIN_EMAIL
    let admin = await User.findOne({ role: 'admin' });
    if (!admin) {
      const adminEmail = process.env.ADMIN_EMAIL;
      if (!adminEmail) throw new Error('No admin found and ADMIN_EMAIL not set');
      admin = await User.findOne({ email: adminEmail });
    }
    if (!admin) throw new Error('Admin user not found in database');

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(newPassword, salt);
    admin.password = hashed;
    await admin.save();

    console.log(`Admin password updated for ${admin.email}`);
    process.exit(0);
  } catch (err) {
    console.error('Error updating admin password:', err.message || err);
    process.exit(1);
  }
};

run();
