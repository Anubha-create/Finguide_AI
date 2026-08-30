import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ShieldCheck, BrainCircuit, ArrowRight, BarChart3, Bot } from 'lucide-react';

export const Home = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.3)', padding: '6px 16px', borderRadius: '30px',
          color: '#a5b4fc', fontSize: '13px', fontWeight: '600', marginBottom: '24px'
        }}>
          <BrainCircuit size={16} /> Intelligent Financial Advisory & XGBoost Forecasting
        </div>

        <h1 style={{ fontSize: '48px', fontWeight: '800', lineHeight: 1.2, marginBottom: '20px' }}>
          Smart Wealth Growth Powered by <br />
          <span style={{ background: 'linear-gradient(90deg, #60a5fa, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Machine Learning & Generative AI
          </span>
        </h1>

        <p style={{ fontSize: '18px', color: '#9ca3af', maxWidth: '700px', margin: '0 auto 36px' }}>
          FinGuide AI combines 5-year historical price data, XGBoost price trend forecasting, and 
          Google Gemini AI to give you personalized stock recommendations and financial advice.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <Link to="/register" className="btn-primary" style={{ padding: '14px 32px', fontSize: '16px' }}>
            Start Free Assessment <ArrowRight size={18} />
          </Link>
          <Link to="/dashboard" className="btn-secondary" style={{ padding: '14px 32px', fontSize: '16px' }}>
            Explore Market Live
          </Link>
        </div>
      </div>

      {/* Feature Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.15)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <BarChart3 size={24} color="#60a5fa" />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '10px' }}>XGBoost Trend Forecasting</h3>
          <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: 1.6 }}>
            Predict 30-day stock price trajectories evaluated on out-of-sample data with up to 97.97% accuracy across ETFs and equities.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ background: 'rgba(139, 92, 246, 0.15)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <Bot size={24} color="#c084fc" />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '10px' }}>Gemini Financial Advisor</h3>
          <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: 1.6 }}>
            Ask questions about compound interest, portfolio rebalancing, and tax strategies with our integrated AI conversational guide.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <ShieldCheck size={24} color="#34d399" />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '10px' }}>Risk Profile Assessment</h3>
          <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: 1.6 }}>
            Personalize your asset allocation (Low, Medium, High risk) to ensure your investments align with your financial goals and volatility comfort.
          </p>
        </div>
      </div>
    </div>
  );
};
