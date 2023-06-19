import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Error signing in');
      }

      const { token, user } = await response.json();
      sessionStorage.setItem('token', token);
      onLogin(user);
      navigate('/');

      console.log('Sign-in successful:', token, user);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px', // Adds space between lines
      }}>
      <h2>Sign In</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          placeholder="Username"
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          placeholder="Password"
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '10px',
          }}>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSignIn}
            style={{
              backgroundColor: '#C3CDE6',
              color: 'white',
              border: 'none',
            }}>
            Sign In
          </button>
        </div>
        <div>
          Don't have an account? <a href="/sign-up">Sign Up</a>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
