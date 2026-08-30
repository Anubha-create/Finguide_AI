import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const RiskAssessment = () => {
  const { profile, fetchProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [answers, setAnswers] = useState({
    q1: 2, // Investment horizon
    q2: 3, // Volatility tolerance
    q3: 3, // Experience
    q4: 2  // Goal priority
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateScore = async () => {
    const totalScore = parseInt(answers.q1) + parseInt(answers.q2) + parseInt(answers.q3) + parseInt(answers.q4);
    setLoading(true);

    try {
      const res = await axios.post('/api/user/risk-assessment', { score: totalScore });
      setResult(res.data);
      if (fetchProfile) fetchProfile();
    } catch (err) {
      console.error('Failed to submit risk assessment:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{ background: 'rgba(16, 185, 129, 0.15)', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <ShieldCheck size={28} color="#34d399" />
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>Investor Risk Assessment</h1>
        <p style={{ color: '#9ca3af', fontSize: '15px' }}>
          Evaluate your risk tolerance score to receive tailored asset allocation recommendations.
        </p>
      </div>

      <div className="glass-panel" style={{ padding: '36px' }}>
        {/* Question 1 */}
        <div style={{ marginBottom: '28px' }}>
          <label style={{ fontSize: '15px', fontWeight: '700', display: 'block', marginBottom: '12px' }}>
            1. What is your expected investment timeframe?
          </label>
          <select className="glass-input" value={answers.q1} onChange={(e) => setAnswers({ ...answers, q1: e.target.value })}>
            <option value={1} style={{ background: '#121826' }}>Short term (&lt; 2 years) - Low Risk</option>
            <option value={3} style={{ background: '#121826' }}>Medium term (2 - 5 years) - Balanced</option>
            <option value={5} style={{ background: '#121826' }}>Long term (5+ years) - High Growth</option>
          </select>
        </div>

        {/* Question 2 */}
        <div style={{ marginBottom: '28px' }}>
          <label style={{ fontSize: '15px', fontWeight: '700', display: 'block', marginBottom: '12px' }}>
            2. How would you react if your portfolio value dropped by 15% in a market dip?
          </label>
          <select className="glass-input" value={answers.q2} onChange={(e) => setAnswers({ ...answers, q2: e.target.value })}>
            <option value={1} style={{ background: '#121826' }}>Sell everything immediately to prevent losses</option>
            <option value={3} style={{ background: '#121826' }}>Hold positions and wait for recovery</option>
            <option value={5} style={{ background: '#121826' }}>Buy more shares at lower prices</option>
          </select>
        </div>

        {/* Question 3 */}
        <div style={{ marginBottom: '28px' }}>
          <label style={{ fontSize: '15px', fontWeight: '700', display: 'block', marginBottom: '12px' }}>
            3. What is your investing experience level?
          </label>
          <select className="glass-input" value={answers.q3} onChange={(e) => setAnswers({ ...answers, q3: e.target.value })}>
            <option value={1} style={{ background: '#121826' }}>Beginner - Just getting started</option>
            <option value={3} style={{ background: '#121826' }}>Intermediate - Familiar with ETFs & Stocks</option>
            <option value={5} style={{ background: '#121826' }}>Advanced - Active trader & option strategies</option>
          </select>
        </div>

        {/* Question 4 */}
        <div style={{ marginBottom: '32px' }}>
          <label style={{ fontSize: '15px', fontWeight: '700', display: 'block', marginBottom: '12px' }}>
            4. What is your primary investment goal?
          </label>
          <select className="glass-input" value={answers.q4} onChange={(e) => setAnswers({ ...answers, q4: e.target.value })}>
            <option value={1} style={{ background: '#121826' }}>Capital Preservation & Stability</option>
            <option value={3} style={{ background: '#121826' }}>Balanced Growth & Moderate Income</option>
            <option value={5} style={{ background: '#121826' }}>Maximum Capital Growth</option>
          </select>
        </div>

        <button onClick={calculateScore} className="btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
          {loading ? 'Evaluating Risk Score...' : 'Calculate Risk Profile'}
        </button>

        {/* Assessment Result */}
        {result && (
          <div style={{
            marginTop: '32px', padding: '24px', borderRadius: '12px',
            background: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.3)',
            textAlign: 'center'
          }}>
            <CheckCircle2 size={36} color="#34d399" style={{ margin: '0 auto 10px' }} />
            <h3 style={{ fontSize: '20px', fontWeight: '800' }}>
              Your Risk Profile: <span style={{ color: '#60a5fa' }}>{result.risk_profile} Risk</span>
            </h3>
            <p style={{ color: '#9ca3af', fontSize: '14px', margin: '8px 0 20px' }}>
              Calculated Score: {result.risk_score} / 20 points
            </p>

            <button onClick={() => navigate('/recommendations')} className="btn-primary" style={{ padding: '10px 24px', fontSize: '14px' }}>
              View Personalized Recommendations <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
