import multer from 'multer';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { findUserByEmail, createUser, assignDefaultRole, addUserTogym } from './createAccount.model.js';

// Multer storage config (same as your setup)
const storage = multer.diskStorage({
  destination(req, file, cb) {
    const uploadDir = path.join(process.cwd(), 'uploads/profile_photos');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    const timestamp = Date.now();
    const randomStr = crypto.randomBytes(3).toString('hex');
    const filename = `${timestamp}_${randomStr}${ext}`;
    cb(null, filename);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) cb(null, true);
  else cb(new Error('Only image files are allowed!'), false);
};

const upload = multer({ storage, fileFilter });

// Promise wrapper around multer middleware
function multerUpload(req, res) {
  return new Promise((resolve, reject) => {
    upload.single('profile_photo')(req, res, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

export async function createAccountBusiness(req, res) {
    // Wait until multer finishes processing the form and file
    await multerUpload(req, res);

    // Now req.body and req.file are ready
    const {
      email,
      password,
      first_name,
      last_name,
      birth_day,
      PR_arm,
      PR_bench_press,
      PR_leg_press,
      description,
      gender,
      gym_id
    } = req.body;

    // Check if email already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw new Error('Email is already used.');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Get relative path to photo or null if no file uploaded
    const photo_location = req.file
      ? path.relative(process.cwd(), req.file.path).replace(/\\/g, '/')
      : null;

    // Create user in DB
    const newUserId = await createUser({
      email,
      password_hash: hashedPassword,
      first_name,
      last_name,
      birth_day,
      PR_arm,
      PR_bench_press,
      PR_leg_press,
      description,
      gender,
      profile_photo: photo_location
    });

    // Assign default role
    await assignDefaultRole(newUserId);
    await addUserTogym(newUserId,gym_id);

}
