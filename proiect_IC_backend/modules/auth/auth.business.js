import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config_obj from '../../config/env.js';
import { findUserByEmail, findUserRoles } from './auth.model.js';

export async function loginUserBusiness(email, password) {
  // 1) Find user by email
  const user = await findUserByEmail(email);
  // console.log(user)
  if (!user) {
    throw new Error('User not found');
  }

  // 2) Check password
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    throw new Error('Invalid password');
  }

  // 3) Get roles
  const roles = await findUserRoles(user.id);

  if (roles.length === 0) {
    throw new Error('User has no role assigned.');
  }

  // 4) Generate JWT
  const payload = {
    id: user.id,
    email: user.email,
    roles: roles // List of roles
  };

  const token = jwt.sign(payload, config_obj.secret_key, { expiresIn: '1h' });

  return token;
}
