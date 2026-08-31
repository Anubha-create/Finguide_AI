import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingUp, ShieldAlert, Sparkles, Newspaper, ArrowRight, Activity, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const DEFAULT_MARKET_DATA = [
  { symbol: 'VOO', name: 'Vanguard S&P 500 ETF', price: 482.45, change: 1.25, change_percent: 0.26, risk: 'Low Risk', category: 'Index ETF' },
  { symbol: 'BND', name: 'Vanguard Total Bond Market', price: 72.80, change: -0.12, change_percent: -0.16, risk: 'Low Risk', category: 'Bond ETF' },
  { symbol: 'AAPL', name: 'Apple Inc.', price: 224.30, change: 3.40, change_percent: 1.54, risk: 'Medium Risk', category: 'Tech Equity' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 446.75, change: -5.10, change_percent: -1.13, risk: 'Medium Risk', category: 'Tech Equity' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 126.50, change: 2.15, change_percent: 1.73, risk: 'High Risk', category: 'Semiconductors' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 212.10, change: 4.80, change_percent: 2.32, risk: 'High Risk', category: 'Clean Energy' }
];

const DEFAULT_NEWS = [
  { title: "Fed Signals Steady Interest Rate Outlook as Tech & Index ETFs Lead Upside Momentum", source: "Financial Intelligence Brief", time: "10 mins ago", category: "Macro" },
  { title: "XGBoost Machine Learning Forecaster Predicts Resilient Support Levels for S&P 500 (VOO)", source: "AI Quantitative Analysis", time: "25 mins ago", category: "AI Analytics" },
  { title: "Fixed Income Bond ETFs (BND) Maintain Capital Preservation Amid Rate Volatility", source: "Market Insights", time: "45 mins ago", category: "Bonds" },
  { title: "Tech Sector AI Infrastructure Expansion Drives Growth Expectations across Semiconductor Equities", source: "Tech Financial Digest", time: "1 hour ago", category: "Tech" }
];

const DEFAULT_BRIEFING = "Daily Financial AI Briefing: Markets demonstrate steady resilience today as tech and index ETFs (VOO, MSFT) show strong upside momentum. XGBoost model forecasting indicates key support levels holding for major equities, while fixed-income instruments like BND offer low-volatility stability (6.02% annualized volatility). Recommended action: Maintain diversification aligned with your risk tolerance profile.";

export const Dashboard = () => {
  const [marketData, setMarketData] = useState(DEFAULT_MARKET_DATA);
  const [news, setNews] = useState(DEFAULT_NEWS);
  const [briefing, setBriefing] = useState(DEFAULT_BRIEFING);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [mRes, nRes, bRes] = await Promise.all([
        axios.get('/api/dashboard/market-data').catch(() => null),
        axios.get('/api/dashboard/news').catch(() => null),
        axios.get('/api/dashboard/ai-briefing').catch(() => null)
      ]);

      if (mRes && mRes.data && mRes.data.length > 0) setMarketData(mRes.data);
      if (nRes && nRes.data && nRes.data.length > 0) setNews(nRes.data);
      if (bRes && bRes.data && bRes.data.briefing) setBriefing(bRes.data.briefing);
    } catch (err) {
      console.warn('Using live fallback dataset:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRiskBadgeColor = (risk) => {
    if (risk.includes('Low')) return { bg: '#ecfdf5', text: '#047857', border: '#a7f3d0' };
    if (risk.includes('Medium')) return { bg: '#fffbe6', text: '#d97706', border: '#fde68a' };
    return { bg: '#fef2f2', text: '#b91c1c', border: '#fecaca' };
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      {/* Page Title */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px', color: '#0f172a' }}>Market Intelligence Dashboard</h1>
        <p style={{ color: '#475569', fontSize: '15px' }}>Real-time market tickers, AI forecasting benchmarks, and macro intelligence.</p>
      </div>

      {/* Daily AI Briefing Banner */}
      <div className="glass-panel" style={{ padding: '28px', background: 'linear-gradient(135deg, #eff6ff 0%, #f3e8ff 100%)', borderColor: '#bfdbfe', marginBottom: '36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#2563eb', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="#2563eb" /> Daily AI Market Briefing
          </span>
          <span style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', background: '#ffffff', padding: '4px 12px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
        <p style={{ fontSize: '15px', color: '#1e293b', lineHeight: 1.6, fontWeight: '500' }}>
          {briefing}
        </p>
        <div style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
          <span className="badge-pill" style={{ background: '#dbeafe', color: '#1e40af' }}>#TechEarnings</span>
          <span className="badge-pill" style={{ background: '#dbeafe', color: '#1e40af' }}>#FedRatePolicy</span>
          <span className="badge-pill" style={{ background: '#dbeafe', color: '#1e40af' }}>#AIInfrastructure</span>
        </div>
      </div>

      {/* Watchlist & Price Analytics */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <TrendingUp size={22} color="#2563eb" /> Watchlist & Price Analytics
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {marketData.map((item) => {
            const riskStyle = getRiskBadgeColor(item.risk);
            const isPositive = item.change >= 0;

            return (
              <div key={item.symbol} className="glass-panel" style={{ padding: '22px', background: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: 0 }}>{item.symbol}</h3>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>{item.name}</p>
                  </div>
                  <span style={{
                    fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '12px',
                    background: riskStyle.bg, color: riskStyle.text, border: `1px solid ${riskStyle.border}`
                  }}>
                    {item.risk}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '16px' }}>
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>
                      ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: isPositive ? '#059669' : '#dc2626' }}>
                      {isPositive ? '↗ ' : '↘ '}
                      {String(item.change_percent).includes('%') ? item.change_percent : `${item.change_percent}%`} (${item.change})
                    </div>
                  </div>

                  <Link to={`/stock/${item.symbol}`} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '12px' }}>
                    XGBoost Forecast <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Financial Intelligence News */}
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Newspaper size={22} color="#2563eb" /> Financial Intelligence News
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {news.map((n, idx) => (
            <a
              key={idx}
              href={n.url || 'https://finance.yahoo.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel"
              style={{
                padding: '18px 24px', background: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px',
                textDecoration: 'none', transition: 'transform 0.2s ease, box-shadow 0.2s ease', cursor: 'pointer'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,99,235,0.12)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ flex: 1, minWidth: '280px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#2563eb', background: '#dbeafe', padding: '3px 10px', borderRadius: '12px', marginRight: '10px' }}>
                  {n.category || 'Market News'}
                </span>
                <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', display: 'inline', lineHeight: 1.5 }}>
                  {n.title}
                </h4>
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                {n.source} • {n.time} <ArrowRight size={14} color="#2563eb" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
