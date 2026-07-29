//run once with command node src/scripts/createAdmin.js
import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

await mongoose.connect(process.env.MONGODB_URI);
const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
await User.create({ email: process.env.ADMIN_EMAIL, passwordHash });
console.log('Admin created');
process.exit(0);