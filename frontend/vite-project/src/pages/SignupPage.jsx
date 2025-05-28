import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

const SignupPage = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/auth/signup`, form);
      localStorage.setItem('token', res.data.token);
      navigate('/login'); // optional: redirect to login first
    } catch (err) {
      alert('Signup failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSignup} style={styles.form}>
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
          style={styles.input}
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Sign Up</button>
        <button type="button" style={styles.button} onClick={() => navigate('/login')}>
          Already have an account? Login
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  form: { display: 'flex', flexDirection: 'column', width: '300px', gap: '10px' },
  input: { padding: '10px' },
  button: { padding: '10px' },
};

export default SignupPage;
