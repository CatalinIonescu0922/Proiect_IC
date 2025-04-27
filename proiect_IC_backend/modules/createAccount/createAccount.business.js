import bcrypt from 'bcryptjs';
import { findUserByEmail, createUser, assignDefaultRole } from './createAccount.model.js';

export async function createAccountBusiness(userData) {
  const { email, password, first_name, last_name, birth_day, PR_arm, PR_bench_press, PR_leg_press, description, gender } = userData;

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error('Email is already used.');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUserId = await createUser({
    email,
    password_hash :hashedPassword,
    first_name,
    last_name,
    birth_day,
    PR_arm,
    PR_bench_press,
    PR_leg_press,
    description,
    gender
  });

  await assignDefaultRole(newUserId);
}
