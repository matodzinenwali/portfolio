import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginRequest, setAuthToken } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const token = await loginRequest(email, password);
      setAuthToken(token);
      login(token);
      navigate('/admin');
    } catch {
      setError('Login failed. Check your email and password.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="container login-page">
      <div className="login-window">
        <div className="login-titlebar mono">
          <span className="login-dot" />
          <span className="login-dot" />
          <span className="login-dot" />
          admin-login.sh
        </div>
        <form className="login-body" onSubmit={handleSubmit}>
          <p className="mono login-prompt">$ login --admin</p>

          <label className="login-field">
            <span className="mono">email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </label>

          <label className="login-field">
            <span className="mono">password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </label>

          {error && <p className="login-error mono">{error}</p>}

          <button type="submit" className="btn btn-primary login-submit" disabled={submitting}>
            {submitting ? 'authenticating...' : 'sign in'}
          </button>
        </form>
      </div>
    </section>
  );
}
