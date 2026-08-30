import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const RiskAssessment = () => {
  const [q1, setQ1] = useState('Short term (< 2 years) - Low Risk');
  const [q2, setQ2] = useState('Hold positions and wait for recovery');
  const [q3, setQ3] = useState('Intermediate - Familiar with ETFs & Stocks');
  const [q4, setQ4] = useState('Capital Preservation & Stability');

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const { fetchProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCalculate = async (e) => {
    e.preventDefault();
    setLoading(true);

    let riskLevel = 'Medium Risk';
    let score = 55;
    let allocation = { stocks: 60, bonds: 30, cash: 10 };
    let recommendations = [
      { symbol: 'VOO', name: 'Vanguard S&P 500 ETF', risk: 'Low Risk', alloc: '40%' },
      { symbol: 'BND', name: 'Vanguard Total Bond Market', risk: 'Low Risk', alloc: '30%' },
      { symbol: 'AAPL', name: 'Apple Inc.', risk: 'Medium Risk', alloc: '20%' },
      { symbol: 'MSFT', name: 'Microsoft Corp.', risk: 'Medium Risk', alloc: '10%' }
    ];

    if (q1.includes('Short term') || q4.includes('Capital Preservation')) {
      riskLevel = 'Low Risk';
      score = 30;
      allocation = { stocks: 30, bonds: 60, cash: 10 };
      recommendations = [
        { symbol: 'BND', name: 'Vanguard Total Bond Market', risk: 'Low Risk', alloc: '60%' },
        { symbol: 'VOO', name: 'Vanguard S&P 500 ETF', risk: 'Low Risk', alloc: '30%' }
      ];
    } else if (q1.includes('Long term') || q4.includes('Aggressive Growth')) {
      riskLevel = 'High Risk';
      score = 85;
      allocation = { stocks: 85, bonds: 10, cash: 5 };
      recommendations = [
        { symbol: 'NVDA', name: 'NVIDIA Corp.', risk: 'High Risk', alloc: '35%' },
        { symbol: 'TSLA', name: 'Tesla Inc.', risk: 'High Risk', alloc: '25%' },
        { symbol: 'AAPL', name: 'Apple Inc.', risk: 'Medium Risk', alloc: '25%' }
      ];
    }

    const calculatedData = {
      risk_score: score,
      risk_level: riskLevel,
      target_allocation: allocation,
      recommended_assets: recommendations
    };

    try {
      await axios.post('/api/user/risk-profile', { q1, q2, q3, q4 });
      if (fetchProfile) fetchProfile();
    } catch (err) {
      console.warn('Backend API unreached, displaying instant calculated risk profile:', err);
    } finally {
      setResult(calculatedData);
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #059669, #10b981)',
          width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
          boxShadow: '0 8px 20px rgba(5, 150, 105, 0.25)'
        }}>
          <ShieldCheck size={28} color="#ffffff" />
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px', color: '#0f172a' }}>Investor Risk Assessment</h1>
        <p style={{ color: '#475569', fontSize: '15px' }}>Evaluate your risk tolerance score to receive tailored asset allocation recommendations.</p>
      </div>

      <div className="glass-panel" style={{ padding: '32px', background: '#ffffff', marginBottom: '36px' }}>
        <form onSubmit={handleCalculate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', display: 'block', marginBottom: '8px' }}>
              1. What is your expected investment timeframe?
            </label>
            <select className="glass-input" value={q1} onChange={(e) => setQ1(e.target.value)}>
              <option value="Short term (< 2 years) - Low Risk">Short term (&lt; 2 years) - Low Risk</option>
              <option value="Medium term (2-5 years) - Balanced">Medium term (2-5 years) - Balanced</option>
              <option value="Long term (5+ years) - Growth">Long term (5+ years) - Growth</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', display: 'block', marginBottom: '8px' }}>
              2. How would you react if your portfolio value dropped by 15% in a market dip?
            </label>
            <select className="glass-input" value={q2} onChange={(e) => setQ2(e.target.value)}>
              <option value="Sell immediately to cut losses">Sell immediately to cut losses (Low Risk)</option>
              <option value="Hold positions and wait for recovery">Hold positions and wait for recovery (Balanced)</option>
              <option value="Buy more shares at discounted prices">Buy more shares at discounted prices (High Risk)</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', display: 'block', marginBottom: '8px' }}>
              3. What is your investing experience level?
            </label>
            <select className="glass-input" value={q3} onChange={(e) => setQ3(e.target.value)}>
              <option value="Beginner - New to investing">Beginner - New to investing</option>
              <option value="Intermediate - Familiar with ETFs & Stocks">Intermediate - Familiar with ETFs &amp; Stocks</option>
              <option value="Advanced - Experienced with Quantitative Models">Advanced - Experienced with Quantitative Models</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', display: 'block', marginBottom: '8px' }}>
              4. What is your primary investment goal?
            </label>
            <select className="glass-input" value={q4} onChange={(e) => setQ4(e.target.value)}>
              <option value="Capital Preservation & Stability">Capital Preservation &amp; Stability</option>
              <option value="Balanced Capital Growth & Income">Balanced Capital Growth &amp; Income</option>
              <option value="Aggressive Maximum Capital Appreciation">Aggressive Maximum Capital Appreciation</option>
            </select>
          </div>

          <button type="submit" className="btn-primary" disabled={loading} style={{ justifyContent: 'center', marginTop: '12px' }}>
            {loading ? 'Evaluating Risk Score...' : 'Calculate Risk Profile'}
          </button>
        </form>
      </div>

      {/* Calculated Risk Profile Result */}
      {result && (
        <div className="glass-panel" style={{ padding: '32px', background: '#f8fafc', border: '1px solid #bfdbfe' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Your Calculated Profile</span>
              <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: '4px 0 0' }}>{result.risk_level}</h2>
            </div>
            <div style={{ background: '#2563eb', color: '#ffffff', fontSize: '24px', fontWeight: '800', width: '54px', height: '54px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {result.risk_score}
            </div>
          </div>

          {/* Allocation Breakdown */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <div style={{ background: '#ffffff', padding: '16px', borderRadius: '10px', textAlign: 'center', border: '1px solid #cbd5e1' }}>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Equities / Stocks</span>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#2563eb', marginTop: '4px' }}>{result.target_allocation.stocks}%</div>
            </div>
            <div style={{ background: '#ffffff', padding: '16px', borderRadius: '10px', textAlign: 'center', border: '1px solid #cbd5e1' }}>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Fixed Income / Bonds</span>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#059669', marginTop: '4px' }}>{result.target_allocation.bonds}%</div>
            </div>
            <div style={{ background: '#ffffff', padding: '16px', borderRadius: '10px', textAlign: 'center', border: '1px solid #cbd5e1' }}>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Liquid Cash</span>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#7c3aed', marginTop: '4px' }}>{result.target_allocation.cash}%</div>
            </div>
          </div>

          <button onClick={() => navigate('/recommendations')} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            View Tailored Stock Recommendations <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
