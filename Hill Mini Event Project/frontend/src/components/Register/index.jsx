// src/components/Register.jsx
import { useState } from 'react';
import API from '../../api';
import { setToken } from '../../auth';
import { useNavigate } from 'react-router-dom';
import './Register.css'; 
import Loader from '../Loder';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading when submitting the form

    try {
      const res = await API.post('/auth/register', form);
      setToken(res.data.token);
      navigate('/events');
    } catch (error) {
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading after the request is completed
    }
  };

  return (
    <>
      {isLoading && <Loader />} {/* Show loader if loading */}
      <form className="register-form" onSubmit={submit}>
        <h2 className="register-title">Register</h2>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="register-input"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="register-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          className="register-input"
          required
        />
        <button type="submit" className="register-button">Register</button>
      </form>
    </>
  );
}
