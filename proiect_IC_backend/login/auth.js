// backend/login/auth.js

import dotenv from 'dotenv'
import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../config/dbconnect.js'
const router = express.Router();
dotenv.config();

// montat în server.js cu:
//    app.use('/login', require('./login/auth'));
// deci răspunde la POST http://localhost:8000/login
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Attempt login:', email);

    // 1) Găsește user-ul după email
    const users = await db.query(
      'SELECT * FROM `Users` WHERE `email` = ?',
      [email]
    );
    console.log('Found users:', users);
    if (users.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }
    const user = users[0];

    // 2) Verifică parola
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // 3) Ia rolul user-ului din user_roles (toate literele mici)
    const roles = await db.query(
      `SELECT r.*
         FROM Roles r
         JOIN user_roles ur ON ur.role_id = r.id
        WHERE ur.user_id = ?`,
      [user.id]
    );
    if (roles.length === 0) {
      return res
        .status(500)
        .json({ message: 'User has no role assigned.' });
    }

    // 4) Ia permisiunile rolului din Role_permisions și Permisions
    // const perms = await db.query(
    //   `SELECT p.name
    //      FROM Permisions p
    //      JOIN Role_permisions rp ON rp.permision_id = p.id
    //     WHERE rp.role_id = ?`,
    //   [role.id]
    // );
    // const permissionNames = perms.map(p => p.name);

    // 5) Generează JWT
    const payload = {
      id:          user.id,
      email:       user.email,
      roles: role
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '1h'
    });

    // 6) Trimite cookie + răspuns JSON
    res.cookie('authToken', token, {
      httpOnly: true,
      secure:   false,   // true în prod cu HTTPS
      sameSite: 'lax',
      maxAge:   3600_000
    });
    res.status(200).json({ message: 'Login successful' });

  } catch (err) {
    console.error('Login error stack:', err.stack || err);
    res
      .status(500)
      .json({ message: 'Internal server error: ' + err.message });
  }
});

export default router