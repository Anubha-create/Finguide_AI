import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { UserPlus, AlertCircle, CheckCircle } from 'lucide-react';

export const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await axios.post('/api/auth/register', { username, password });
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '440px', margin: '80px auto', padding: '0 20px' }}>
      <div className="glass-panel" style={{ padding: '40px', background: '#ffffff' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginBottom: '8px', textAlign: 'center' }}>Create Account</h2>
        <p style={{ color: '#64748b', fontSize: '14px', textAlign: 'center', marginBottom: '24px' }}>
          Join FinGuide AI to start your financial forecasting journey.
        </p>

        {error && (
          <div style={{
            background: '#fef2f2', border: '1px solid #fecaca',
            color: '#b91c1c', padding: '10px 14px', borderRadius: '8px', fontSize: '13px',
            display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontWeight: '600'
          }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {success && (
          <div style={{
            background: '#ecfdf5', border: '1px solid #a7f3d0',
            color: '#047857', padding: '10px 14px', borderRadius: '8px', fontSize: '13px',
            display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontWeight: '600'
          }}>
            <CheckCircle size={16} /> {success}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '13px', color: '#475569', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Username</label>
            <input 
              type="text" 
              className="glass-input" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
              placeholder="choose a username"
            />
          </div>

          <div>
            <label style={{ fontSize: '13px', color: '#475569', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Password</label>
            <input 
              type="password" 
              className="glass-input" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="choose a password"
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading} style={{ justifyContent: 'center', marginTop: '10px' }}>
            <UserPlus size={18} /> {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p style={{ fontSize: '13px', color: '#64748b', textAlign: 'center', marginTop: '20px' }}>
          Already have an account? <Link to="/login" style={{ color: '#2563eb', fontWeight: '700' }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};
