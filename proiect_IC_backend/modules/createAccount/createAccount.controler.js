import { createAccountBusiness } from './createAccount.business.js';

export async function createAccountController(req, res, next) {
  try {
    await createAccountBusiness(req,res);

    res.status(201).json({ message: 'Account created successfully. Please log in.' });

  } catch (err) {
    console.error('Create Account error:', err.stack || err);
    res.status(400).json({ message: err.message || 'Account creation failed' });
  }
}
