import dotenv from 'dotenv'
import bcrypt from 'bcryptjs';
import  db  from '../config/dbconnect.js'
import express from 'express'
dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email, password, first_name, last_name,birth_day , PR_arm , PR_bench_press, PR_leg_press,description,gender } = req.body;

    // 1. Verifică dacă există deja user
    const existing = await db.pool.query(
      'SELECT id FROM Users WHERE email = ?',
      [email]
    );
    if (existing.length) {
      return res.status(400).json({ message: 'Email-ul este deja folosit.' });
    }

    // 2. Hash-uiește parola
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    // 3. Inserează user-ul cu firstName și lastName
    const info = await db.pool.query(
      `INSERT INTO Users (email, password_hash, first_name, last_name , birth_day , PR_arm , PR_bench_press, PR_leg_press,description,gender)
       VALUES (?, ?, ?, ?,?, ?, ?, ?, ?, ?)`,
      [email, hashed, first_name, last_name , birth_day , PR_arm , PR_bench_press, PR_leg_press,description,gender]
    );
    const newUserId = info.insertId;

    // 4. Inserează rolul implicit
    const defaultRoleId = 2;
    await db.pool.query(
      `INSERT INTO User_Roles (user_id, role_id)
       VALUES (?, ?)`,
      [newUserId, defaultRoleId]
    );

    // 5. Trimite răspuns de succes
    res.status(201).json({ message: 'Cont creat cu succes.' });
  } catch (err) {
    console.error('Registration error stack:', err.stack || err);
    return res.status(500).json({ message: err.message });
  }
});

export default router
