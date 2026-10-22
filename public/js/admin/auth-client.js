/**
 * MODULE: src/js/admin/auth-client.js
 * 
 * Purpose:
 *   Handles client-side login form submission, loading state, error alerts,
 *   and authentication session checking.
 */

/**
 * Initializes the login form handlers and event listeners.
 */
export function initLoginForm() {
  const loginForm = document.getElementById('admin-login-form');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const loginBtn = document.getElementById('login-btn');
  const btnSpinner = document.getElementById('login-spinner');
  const btnText = document.getElementById('login-btn-text');
  const errorMessage = document.getElementById('error-message');

  if (!loginForm) {
    return;
  }

  // Helper to show/hide error alerts
  function showError(msg) {
    if (!errorMessage) return;
    errorMessage.textContent = msg;
    errorMessage.classList.remove('hidden');
  }

  function hideError() {
    if (!errorMessage) return;
    errorMessage.textContent = '';
    errorMessage.classList.add('hidden');
  }

  // Helper to toggle button loading state
  function setLoading(isLoading) {
    if (!loginBtn) return;
    loginBtn.disabled = isLoading;
    if (btnSpinner) {
      if (isLoading) {
        btnSpinner.classList.remove('hidden');
      } else {
        btnSpinner.classList.add('hidden');
      }
    }
    if (btnText) {
      btnText.textContent = isLoading ? 'Signing in...' : 'Sign In';
    }
  }

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideError();

    const username = usernameInput ? usernameInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value : '';

    if (!username || !password) {
      showError('Please enter both username and password.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        // Successful login: redirect to dashboard
        window.location.href = '/admin/dashboard';
      } else {
        // Display returned error or fallback
        showError(data.message || 'Invalid username or password.');
        setLoading(false);
      }
    } catch (err) {
      console.error('Login network error:', err);
      showError('Unable to connect to the server. Please try again.');
      setLoading(false);
    }
  });
}

// Session verification check for protected pages
export async function checkSession() {
  try {
    const res = await fetch('/api/auth/verify-session');
    if (!res.ok) return false;
    const data = await res.json();
    return Boolean(data.authenticated);
  } catch {
    return false;
  }
}

// Initialize on DOM ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLoginForm);
  } else {
    initLoginForm();
  }
}
