import { loginUserBusiness } from './auth.business.js';

export async function loginController(req, res, next) {
  try {
    const { email, password } = req.body;
    const token = await loginUserBusiness(email, password);

    res.cookie('authToken', token, {
      httpOnly: true,
      secure: false,  // Set to true in production (HTTPS)
      sameSite: 'lax',
      maxAge: 3600_000 // 1 hour
    });

    res.status(200).json({ message: 'Login successful' });

  } catch (err) {
    console.error('Login error:', err.stack || err);
    res.status(400).json({ message: err.message || 'Login failed' });
  }
}
