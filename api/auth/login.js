/**
 * API Endpoint: /api/auth/login.js
 * 
 * Purpose:
 *   Handles administrative login requests, validates credentials against
 *   environment variables or fallback defaults, and issues an HttpOnly session cookie.
 */

export default async function handler(req, res) {
  // Guard: Reject non-POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    // Expected credentials from environment variables or default fallback for development
    const expectedUser = process.env.ADMIN_USER || 'admin';
    const expectedPass = process.env.ADMIN_PASS || 'admin123';

    // Validate credentials
    const isUserValid = username.trim() === expectedUser;
    const isPassValid = password === expectedPass;

    if (!isUserValid || !isPassValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    // Set secure HttpOnly session cookie
    // Max-Age=86400 (24 hours)
    const isProduction = process.env.NODE_ENV === 'production';
    const secureFlag = isProduction ? '; Secure' : '';
    const cookieHeader = `admin_session=authenticated; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400${secureFlag}`;

    res.setHeader('Set-Cookie', cookieHeader);

    return res.status(200).json({
      success: true,
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Error during login execution:', error);
    return res.status(500).json({
      success: false,
      message: 'An internal server error occurred'
    });
  }
}
