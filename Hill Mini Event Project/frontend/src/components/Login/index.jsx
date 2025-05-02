// src/components/Login.jsx
import { useState } from 'react';
import API from '../../api';
import { setToken } from '../../auth';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Loader from '../Loder';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading when submitting the form

    try {
      const res = await API.post('/auth/login', form);
      setToken(res.data.token);
      navigate('/events');
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false); // Stop loading after the request is completed
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <form className="login-form" onSubmit={submit}>
        <h2 className="login-title">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="login-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          className="login-input"
          required
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </>
  );
}
