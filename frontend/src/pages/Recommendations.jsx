import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Compass, ArrowRight, Activity, Award, ShieldAlert, CheckCircle2 } from 'lucide-react';

const FALLBACK_RECOMMENDATIONS = [
  {'ticker': 'VOO', 'name': 'Vanguard S&P 500 ETF', 'type': 'ETF', 'risk': 'Low', 'expected_return': '8-10%', 'volatility': '16.81%', 'accuracy': '88.89%'},
  {'ticker': 'BND', 'name': 'Vanguard Total Bond Market ETF', 'type': 'Bond ETF', 'risk': 'Low', 'expected_return': '4-5%', 'volatility': '6.02%', 'accuracy': '97.97%'},
  {'ticker': 'AAPL', 'name': 'Apple Inc.', 'type': 'Stock', 'risk': 'Medium', 'expected_return': '12-15%', 'volatility': '27.43%', 'accuracy': '91.60%'},
  {'ticker': 'MSFT', 'name': 'Microsoft Corp.', 'type': 'Stock', 'risk': 'Medium', 'expected_return': '14-18%', 'volatility': '26.36%', 'accuracy': '92.91%'},
  {'ticker': 'NVDA', 'name': 'NVIDIA Corp.', 'type': 'Stock', 'risk': 'High', 'expected_return': '20-30%', 'volatility': '51.65%', 'accuracy': '76.17%'},
  {'ticker': 'TSLA', 'name': 'Tesla Inc.', 'type': 'Stock', 'risk': 'High', 'expected_return': '25-35%', 'volatility': '58.89%', 'accuracy': '94.79%'}
];

export const Recommendations = () => {
  const { profile } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState(FALLBACK_RECOMMENDATIONS);
  const [selectedRiskFilter, setSelectedRiskFilter] = useState('All');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRecommendations(selectedRiskFilter);
  }, [selectedRiskFilter]);

  const fetchRecommendations = async (riskTab) => {
    try {
      setLoading(true);
      const riskParam = riskTab !== 'All' ? `?risk=${riskTab}` : '';
      const res = await axios.get(`/api/stocks/recommendations${riskParam}`);
      if (res.data && res.data.length > 0) {
        setRecommendations(res.data);
      } else {
        filterFallback(riskTab);
      }
    } catch (err) {
      console.warn('Using fallback recommendations:', err);
      filterFallback(riskTab);
    } finally {
      setLoading(false);
    }
  };

  const filterFallback = (riskTab) => {
    if (riskTab === 'All') {
      setRecommendations(FALLBACK_RECOMMENDATIONS);
    } else {
      setRecommendations(FALLBACK_RECOMMENDATIONS.filter(r => r.risk === riskTab));
    }
  };

  const getRiskBadge = (risk) => {
    if (risk === 'Low') return 'badge-low';
    if (risk === 'High') return 'badge-high';
    return 'badge-medium';
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '32px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ background: '#dbeafe', padding: '8px', borderRadius: '12px', display: 'flex' }}>
              <Compass size={24} color="#2563eb" />
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a' }}>AI Stock & ETF Recommendations</h1>
          </div>
          <p style={{ color: '#475569', fontSize: '15px' }}>
            Tailored portfolio allocation based on risk scoring and quantitative XGBoost forecasts.
          </p>
        </div>

        {profile && (
          <div className="glass-panel" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '12px', background: '#ffffff' }}>
            <ShieldAlert size={20} color="#2563eb" />
            <div>
              <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Active Risk Profile</div>
              <div style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>{profile.risk_profile} Risk</div>
            </div>
          </div>
        )}
      </div>

      {/* Risk Filter Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '32px', flexWrap: 'wrap' }}>
        {['All', 'Low', 'Medium', 'High'].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedRiskFilter(tab)}
            style={{
              padding: '10px 22px',
              borderRadius: '24px',
              fontWeight: '700',
              fontSize: '13px',
              border: '1px solid',
              borderColor: selectedRiskFilter === tab ? '#2563eb' : '#e2e8f0',
              background: selectedRiskFilter === tab ? '#2563eb' : '#ffffff',
              color: selectedRiskFilter === tab ? '#ffffff' : '#475569',
              boxShadow: selectedRiskFilter === tab ? '0 4px 12px rgba(37, 99, 235, 0.25)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            {tab === 'All' ? 'All Asset Classes' : `${tab} Risk Portfolios`}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
          <Activity size={32} className="animate-spin" style={{ margin: '0 auto 16px', color: '#2563eb' }} />
          <p>Generating personalized asset recommendations...</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
          {recommendations.map((item) => (
            <div key={item.ticker} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#ffffff' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a' }}>{item.ticker}</h3>
                    <p style={{ fontSize: '13px', color: '#64748b' }}>{item.name}</p>
                  </div>
                  <span className={getRiskBadge(item.risk)}>{item.risk} Risk</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', margin: '20px 0' }}>
                  <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>Target Return</div>
                    <div style={{ fontSize: '16px', fontWeight: '800', color: '#059669' }}>{item.expected_return}</div>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>XGBoost Accuracy</div>
                    <div style={{ fontSize: '16px', fontWeight: '800', color: '#2563eb', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Award size={16} /> {item.accuracy}
                    </div>
                  </div>
                </div>
              </div>

              <Link to={`/stock/${item.ticker}`} className="btn-primary" style={{ justifyContent: 'center', width: '100%', fontSize: '13px', padding: '12px' }}>
                Analyze XGBoost Forecast <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
