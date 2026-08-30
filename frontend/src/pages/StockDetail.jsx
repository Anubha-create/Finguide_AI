import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ArrowLeft, TrendingUp, TrendingDown, ShieldCheck, Activity, Award, BarChart2, Calendar } from 'lucide-react';

export const StockDetail = () => {
  const { ticker } = useParams();
  const [data, setData] = useState(null);
  const [timeframe, setTimeframe] = useState('1M');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStockForecast(timeframe);
  }, [ticker, timeframe]);

  const fetchStockForecast = async (tf) => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/stocks/${ticker}/predict?timeframe=${tf}`);
      setData(res.data);
    } catch (err) {
      console.error('Failed to load stock prediction:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !data) {
    return (
      <div style={{ maxWidth: '1200px', margin: '80px auto', textAlign: 'center', color: '#64748b' }}>
        <Activity size={32} className="animate-spin" style={{ margin: '0 auto 16px', color: '#2563eb' }} />
        <p>Running XGBoost Regressor model & generating forecast for {ticker} ({timeframe})...</p>
      </div>
    );
  }

  const { insight, forecast, history_sample, current_price, name } = data || {};

  const chartData = [
    ...(history_sample || []).map(h => ({ date: h.date, Historical: h.close })),
    ...(forecast || []).map(f => ({ date: f.date, Forecast: f.predicted_close }))
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <Link to="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '14px', fontWeight: '600', marginBottom: '24px' }}>
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      {/* Header Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '32px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#0f172a' }}>{ticker}</h1>
            <span style={{ fontSize: '15px', color: '#64748b', fontWeight: '500' }}>{name}</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', marginTop: '6px' }}>
            ${current_price ? current_price.toFixed(2) : '0.00'}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div className="glass-panel" style={{ padding: '12px 20px', textAlign: 'center', background: '#ffffff' }}>
            <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Model Accuracy</div>
            <div style={{ fontSize: '20px', fontWeight: '800', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
              <Award size={18} /> {insight?.model_accuracy}%
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '12px 20px', textAlign: 'center', background: '#ffffff' }}>
            <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Annualized Volatility</div>
            <div style={{ fontSize: '20px', fontWeight: '800', color: '#2563eb' }}>
              {insight?.annualized_volatility}%
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '12px 20px', textAlign: 'center', background: '#ffffff' }}>
            <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Predicted Trend</div>
            <div style={{
              fontSize: '20px', fontWeight: '800',
              color: insight?.trend === 'Upward' ? '#059669' : '#dc2626',
              display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center'
            }}>
              {insight?.trend === 'Upward' ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
              {insight?.trend}
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px', background: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart2 size={20} color="#2563eb" /> XGBoost Price Trajectory Forecast
          </h3>

          {/* Timeframe Selector Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f1f5f9', padding: '4px', borderRadius: '12px' }}>
            <Calendar size={16} color="#64748b" style={{ marginLeft: '8px', marginRight: '4px' }} />
            {['1D', '1W', '1M', '1Y', 'ALL'].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '700',
                  border: 'none',
                  background: timeframe === tf ? '#ffffff' : 'transparent',
                  color: timeframe === tf ? '#2563eb' : '#64748b',
                  boxShadow: timeframe === tf ? '0 2px 6px rgba(15, 23, 42, 0.08)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', fontSize: '13px', marginBottom: '16px' }}>
          <span style={{ color: '#2563eb', fontWeight: '700' }}>● Historical Data ({timeframe})</span>
          <span style={{ color: '#7c3aed', fontWeight: '700' }}>● XGBoost Predictive Forecast</span>
        </div>

        <div style={{ width: '100%', height: 380 }}>
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis domain={['auto', 'auto']} stroke="#64748b" tick={{ fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ background: '#ffffff', borderColor: '#e2e8f0', borderRadius: '10px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', color: '#0f172a' }}
              />
              <Line type="monotone" dataKey="Historical" stroke="#2563eb" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="Forecast" stroke="#7c3aed" strokeWidth={3} strokeDasharray="4 4" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Model Insight Details */}
      <div className="glass-panel" style={{ padding: '24px', background: '#ffffff' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', marginBottom: '12px' }}>XGBoost Technical Breakdown</h3>
        <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.6 }}>
          The XGBoost Regressor model evaluates price sequences, SMA_20 moving average, and volatility indices for <strong>{ticker}</strong> over timeframe <strong>{timeframe}</strong>. 
          The model achieved an out-of-sample accuracy of <strong style={{ color: '#059669' }}>{insight?.model_accuracy}%</strong>. 
          Predicted slope rate: <strong style={{ color: insight?.trend === 'Upward' ? '#059669' : '#dc2626' }}>{insight?.predicted_slope}</strong>.
        </p>
      </div>
    </div>
  );
};
