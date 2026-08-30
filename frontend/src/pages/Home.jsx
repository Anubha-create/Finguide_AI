import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ShieldCheck, BrainCircuit, ArrowRight, BarChart3, Bot, GraduationCap } from 'lucide-react';

export const Home = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#dbeafe',
          border: '1px solid #bfdbfe', padding: '6px 16px', borderRadius: '30px',
          color: '#1e40af', fontSize: '13px', fontWeight: '700', marginBottom: '24px'
        }}>
          <BrainCircuit size={16} /> Intelligent Financial Advisory & XGBoost Forecasting
        </div>

        <h1 style={{ fontSize: '48px', fontWeight: '800', lineHeight: 1.2, color: '#0f172a', marginBottom: '20px', letterSpacing: '-1px' }}>
          Smart Wealth Growth Powered by <br />
          <span style={{ background: 'linear-gradient(90deg, #2563eb, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Machine Learning & Generative AI
          </span>
        </h1>

        <p style={{ fontSize: '18px', color: '#475569', maxWidth: '700px', margin: '0 auto 36px', lineHeight: 1.6 }}>
          FinGuide AI combines 5-year historical price data, XGBoost price trend forecasting, 
          interactive financial education, and Google Gemini AI for personalized stock recommendations.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <Link to="/register" className="btn-primary" style={{ padding: '14px 32px', fontSize: '16px' }}>
            Start Free Assessment <ArrowRight size={18} />
          </Link>
          <Link to="/education" className="btn-secondary" style={{ padding: '14px 32px', fontSize: '16px' }}>
            <GraduationCap size={18} /> Explore Education Hub
          </Link>
        </div>
      </div>

      {/* Feature Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        <div className="glass-panel" style={{ padding: '32px', background: '#ffffff' }}>
          <div style={{ background: '#dbeafe', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <BarChart3 size={24} color="#2563eb" />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '10px' }}>XGBoost Trend Forecasting</h3>
          <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.6 }}>
            Predict 30-day stock price trajectories evaluated on out-of-sample data with up to 97.97% accuracy across ETFs and equities.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '32px', background: '#ffffff' }}>
          <div style={{ background: '#f3e8ff', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <Bot size={24} color="#7c3aed" />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '10px' }}>Gemini Financial Advisor</h3>
          <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.6 }}>
            Ask questions about compound interest, portfolio rebalancing, and tax strategies with our integrated AI conversational guide.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '32px', background: '#ffffff' }}>
          <div style={{ background: '#ecfdf5', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <ShieldCheck size={24} color="#059669" />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '10px' }}>Risk Profile Assessment</h3>
          <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.6 }}>
            Personalize your asset allocation (Low, Medium, High risk) to ensure your investments align with your financial goals and volatility comfort.
          </p>
        </div>
      </div>
    </div>
  );
};
