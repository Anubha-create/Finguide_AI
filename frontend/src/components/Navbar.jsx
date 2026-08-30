import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { TrendingUp, LayoutDashboard, Compass, ShieldAlert, GraduationCap, MessageSquareText, User, LogOut, LogIn } from 'lucide-react';

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
      background: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '14px 24px',
      boxShadow: '0 2px 10px rgba(15, 23, 42, 0.04)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
            padding: '8px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <TrendingUp size={22} color="#ffffff" />
          </div>
          <span style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' }}>
            FinGuide AI
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/dashboard" style={{
            display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '600',
            color: isActive('/dashboard') ? '#2563eb' : '#475569', transition: 'color 0.2s'
          }}>
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          
          <Link to="/recommendations" style={{
            display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '600',
            color: isActive('/recommendations') ? '#2563eb' : '#475569', transition: 'color 0.2s'
          }}>
            <Compass size={18} /> Recommendations
          </Link>

          <Link to="/education" style={{
            display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '600',
            color: isActive('/education') ? '#2563eb' : '#475569', transition: 'color 0.2s'
          }}>
            <GraduationCap size={18} /> Education Hub
          </Link>

          <Link to="/risk-assessment" style={{
            display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '600',
            color: isActive('/risk-assessment') ? '#2563eb' : '#475569', transition: 'color 0.2s'
          }}>
            <ShieldAlert size={18} /> Risk Profile
          </Link>

          <Link to="/chat" style={{
            display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '600',
            color: isActive('/chat') ? '#2563eb' : '#475569', transition: 'color 0.2s'
          }}>
            <MessageSquareText size={18} /> AI Chatbot
          </Link>

          {token ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginLeft: '10px' }}>
              <Link to="/profile" style={{
                display: 'flex', alignItems: 'center', gap: '6px', background: '#f1f5f9',
                padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', color: '#0f172a'
              }}>
                <User size={16} color="#2563eb" /> {user?.username || 'Profile'}
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
