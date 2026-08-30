import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { TrendingUp, TrendingDown, Sparkles, Newspaper, ArrowRight, Activity } from 'lucide-react';

export const Dashboard = () => {
  const [marketData, setMarketData] = useState([]);
  const [news, setNews] = useState([]);
  const [briefing, setBriefing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [mRes, nRes, bRes] = await Promise.all([
        axios.get('/api/dashboard/market-data'),
        axios.get('/api/dashboard/news'),
        axios.get('/api/dashboard/ai-briefing')
      ]);
      setMarketData(mRes.data);
      setNews(nRes.data);
      setBriefing(bRes.data);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRiskBadgeClass = (risk) => {
    if (risk === 'Low') return 'badge-low';
    if (risk === 'High') return 'badge-high';
    return 'badge-medium';
  };

  if (loading) {
    return (
      <div style={{ maxWidth: '1200px', margin: '80px auto', textAlign: 'center', color: '#9ca3af' }}>
        <Activity size={32} className="animate-spin" style={{ margin: '0 auto 16px', color: '#60a5fa' }} />
        <p>Loading real-time market data & AI briefing...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>Market Dashboard</h1>
        <p style={{ color: '#9ca3af', fontSize: '15px' }}>
          Real-time market tickers, AI forecasting benchmarks, and macro intelligence.
        </p>
      </div>

      {/* AI Briefing Banner */}
      {briefing && (
        <div className="glass-panel" style={{
          padding: '24px 30px',
          marginBottom: '40px',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15))',
          borderColor: 'rgba(139, 92, 246, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c084fc', fontWeight: '700', fontSize: '15px' }}>
              <Sparkles size={18} /> Daily AI Market Briefing
            </div>
            <span style={{ fontSize: '12px', color: '#9ca3af', background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: '12px' }}>
              {briefing.date}
            </span>
          </div>
          <p style={{ color: '#e5e7eb', fontSize: '15px', lineHeight: 1.6, marginBottom: '14px' }}>
            {briefing.briefing}
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {briefing.key_drivers?.map((driver, idx) => (
              <span key={idx} style={{ fontSize: '12px', color: '#93c5fd', background: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.25)', padding: '3px 10px', borderRadius: '14px' }}>
                #{driver}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Stock Cards Grid */}
      <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>Watchlist & Price Analytics</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px', marginBottom: '48px' }}>
        {marketData.map((item) => (
          <div key={item.ticker} className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '18px', fontWeight: '800', color: '#fff' }}>{item.ticker}</span>
                <p style={{ fontSize: '12px', color: '#9ca3af' }}>{item.name}</p>
              </div>
              <span className={getRiskBadgeClass(item.risk)}>{item.risk} Risk</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '800' }}>${item.price.toFixed(2)}</div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: '600',
                  color: item.change >= 0 ? '#34d399' : '#f87171'
                }}>
                  {item.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {item.change_percent} (${item.change >= 0 ? `+${item.change}` : item.change})
                </div>
              </div>

              <Link to={`/stock/${item.ticker}`} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '12px' }}>
                XGBoost Forecast <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* News Feed */}
      <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Newspaper size={20} color="#60a5fa" /> Financial Intelligence News
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        {news.map((item) => (
          <div key={item.id} className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px', color: '#9ca3af' }}>
              <span style={{ color: '#60a5fa', fontWeight: '600' }}>{item.category}</span>
              <span>{item.time} • {item.source}</span>
            </div>
            <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '8px', lineHeight: 1.4 }}>{item.title}</h3>
            <p style={{ fontSize: '13px', color: '#9ca3af', lineHeight: 1.5 }}>{item.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
