import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { User, Save, CheckCircle2 } from 'lucide-react';

export const Profile = () => {
  const { profile, setProfile, fetchProfile } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: '',
    age: 25,
    investing_experience: 'Beginner',
    investment_goals: 'Growth',
    investment_horizon: 'Medium',
    risk_profile: 'Medium'
  });

  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        age: profile.age || 25,
        investing_experience: profile.investing_experience || 'Beginner',
        investment_goals: profile.investment_goals || 'Growth',
        investment_horizon: profile.investment_horizon || 'Medium',
        risk_profile: profile.risk_profile || 'Medium'
      });
    }
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setLoading(true);

    try {
      await axios.post('/api/user/update', formData);
      setSuccess('Profile updated successfully!');
      if (fetchProfile) fetchProfile();
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ background: '#dbeafe', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <User size={28} color="#2563eb" />
        </div>
        <h1 style={{ fontSize: '30px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>Investor Profile & Settings</h1>
        <p style={{ color: '#475569', fontSize: '14px' }}>
          Manage your personal financial parameters and investment preferences.
        </p>
      </div>

      <div className="glass-panel" style={{ padding: '36px', background: '#ffffff' }}>
        {success && (
          <div style={{
            background: '#ecfdf5', border: '1px solid #a7f3d0',
            color: '#047857', padding: '10px 14px', borderRadius: '8px', fontSize: '13px',
            display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontWeight: '600'
          }}>
            <CheckCircle2 size={16} /> {success}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ fontSize: '13px', color: '#475569', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Full Name</label>
            <input 
              type="text" 
              className="glass-input" 
              value={formData.name} 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
            />
          </div>

          <div>
            <label style={{ fontSize: '13px', color: '#475569', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Age</label>
            <input 
              type="number" 
              className="glass-input" 
              value={formData.age} 
              onChange={(e) => setFormData({ ...formData, age: e.target.value })} 
            />
          </div>

          <div>
            <label style={{ fontSize: '13px', color: '#475569', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Investing Experience</label>
            <select className="glass-input" value={formData.investing_experience} onChange={(e) => setFormData({ ...formData, investing_experience: e.target.value })}>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '13px', color: '#475569', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Primary Goal</label>
            <input 
              type="text" 
              className="glass-input" 
              value={formData.investment_goals} 
              onChange={(e) => setFormData({ ...formData, investment_goals: e.target.value })} 
            />
          </div>

          <div>
            <label style={{ fontSize: '13px', color: '#475569', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Risk Profile</label>
            <select className="glass-input" value={formData.risk_profile} onChange={(e) => setFormData({ ...formData, risk_profile: e.target.value })}>
              <option value="Low">Low Risk</option>
              <option value="Medium">Medium Risk</option>
              <option value="High">High Risk</option>
            </select>
          </div>

          <button type="submit" className="btn-primary" disabled={loading} style={{ justifyContent: 'center', marginTop: '10px' }}>
            <Save size={18} /> {loading ? 'Saving Settings...' : 'Save Profile Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};
