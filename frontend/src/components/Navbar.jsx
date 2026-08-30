import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { TrendingUp, LayoutDashboard, Compass, ShieldAlert, MessageSquareText, User, LogOut, LogIn } from 'lucide-react';

export const Navbar = () => {
  const { token, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      background: 'rgba(11, 15, 25, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '14px 24px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            padding: '8px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <TrendingUp size={22} color="#fff" />
          </div>
          <span style={{ fontSize: '20px', fontWeight: '800', background: 'linear-gradient(90deg, #fff, #93c5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            FinGuide AI
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/dashboard" style={{
            display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '600',
            color: isActive('/dashboard') ? '#3b82f6' : '#9ca3af', transition: 'color 0.2s'
          }}>
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          
          <Link to="/recommendations" style={{
            display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '600',
            color: isActive('/recommendations') ? '#3b82f6' : '#9ca3af', transition: 'color 0.2s'
          }}>
            <Compass size={18} /> Recommendations
          </Link>

          <Link to="/risk-assessment" style={{
            display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '600',
            color: isActive('/risk-assessment') ? '#3b82f6' : '#9ca3af', transition: 'color 0.2s'
          }}>
            <ShieldAlert size={18} /> Risk Profile
          </Link>

          <Link to="/chat" style={{
            display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '600',
            color: isActive('/chat') ? '#3b82f6' : '#9ca3af', transition: 'color 0.2s'
          }}>
            <MessageSquareText size={18} /> AI Chatbot
          </Link>

          {token ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginLeft: '10px' }}>
              <Link to="/profile" style={{
                display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.08)',
                padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600'
              }}>
                <User size={16} color="#93c5fd" /> {user?.username || 'Profile'}
              </Link>
              <button onClick={handleLogout} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '13px' }}>
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Link to="/login" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                <LogIn size={16} /> Login
              </Link>
              <Link to="/register" className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
