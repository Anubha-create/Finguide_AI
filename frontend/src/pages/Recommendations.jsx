import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Compass, ArrowRight, Activity, Award, ShieldAlert } from 'lucide-react';

export const Recommendations = () => {
  const { profile } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/stocks/recommendations');
      setRecommendations(res.data);
    } catch (err) {
      console.error('Failed to load recommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRiskBadge = (risk) => {
    if (risk === 'Low') return 'badge-low';
    if (risk === 'High') return 'badge-high';
    return 'badge-medium';
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '32px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Compass size={28} color="#60a5fa" />
            <h1 style={{ fontSize: '32px', fontWeight: '800' }}>AI Stock & ETF Recommendations</h1>
          </div>
          <p style={{ color: '#9ca3af', fontSize: '15px' }}>
            Tailored portfolio allocation based on your evaluated risk score.
          </p>
        </div>

        {profile && (
          <div className="glass-panel" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShieldAlert size={20} color="#93c5fd" />
            <div>
              <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase' }}>Active Risk Profile</div>
              <div style={{ fontSize: '16px', fontWeight: '700', color: '#fff' }}>{profile.risk_profile} Risk</div>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#9ca3af' }}>
          <Activity size={32} className="animate-spin" style={{ margin: '0 auto 16px', color: '#60a5fa' }} />
          <p>Generating personalized asset recommendations...</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
          {recommendations.map((item) => (
            <div key={item.ticker} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: '800' }}>{item.ticker}</h3>
                    <p style={{ fontSize: '13px', color: '#9ca3af' }}>{item.name}</p>
                  </div>
                  <span className={getRiskBadge(item.risk)}>{item.risk} Risk</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', margin: '20px 0' }}>
                  <div style={{ background: 'rgba(255,255,255,0.04)', padding: '10px 14px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>Target Return</div>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: '#34d399' }}>{item.expected_return}</div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.04)', padding: '10px 14px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>XGBoost Accuracy</div>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Award size={14} /> {item.accuracy}
                    </div>
                  </div>
                </div>
              </div>

              <Link to={`/stock/${item.ticker}`} className="btn-primary" style={{ justifyContent: 'center', width: '100%', fontSize: '13px' }}>
                Analyze XGBoost Forecast <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
