import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ArrowLeft, TrendingUp, TrendingDown, ShieldCheck, Activity, Award, BarChart2 } from 'lucide-react';

export const StockDetail = () => {
  const { ticker } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStockForecast();
  }, [ticker]);

  const fetchStockForecast = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/stocks/${ticker}/predict`);
      setData(res.data);
    } catch (err) {
      console.error('Failed to load stock prediction:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !data) {
    return (
      <div style={{ maxWidth: '1200px', margin: '80px auto', textAlign: 'center', color: '#9ca3af' }}>
        <Activity size={32} className="animate-spin" style={{ margin: '0 auto 16px', color: '#60a5fa' }} />
        <p>Running XGBoost Regressor model & generating 30-day forecast for {ticker}...</p>
      </div>
    );
  }

  const { insight, forecast, history_sample, current_price, name } = data;

  // Combine historical sample and forecast data for chart visualization
  const chartData = [
    ...history_sample.map(h => ({ date: h.date, Historical: h.close })),
    ...forecast.map(f => ({ date: f.date, Forecast: f.predicted_close }))
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <Link to="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#9ca3af', fontSize: '14px', marginBottom: '24px' }}>
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      {/* Header Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '32px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: '800' }}>{ticker}</h1>
            <span style={{ fontSize: '14px', color: '#9ca3af' }}>{name}</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '800', marginTop: '6px' }}>
            ${current_price.toFixed(2)}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <div className="glass-panel" style={{ padding: '12px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase' }}>Model Accuracy</div>
            <div style={{ fontSize: '20px', fontWeight: '800', color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Award size={18} /> {insight.model_accuracy}%
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '12px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase' }}>Annualized Volatility</div>
            <div style={{ fontSize: '20px', fontWeight: '800', color: '#60a5fa' }}>
              {insight.annualized_volatility}%
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '12px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase' }}>Predicted Trend</div>
            <div style={{
              fontSize: '20px', fontWeight: '800',
              color: insight.trend === 'Upward' ? '#34d399' : '#f87171',
              display: 'flex', alignItems: 'center', gap: '4px'
            }}>
              {insight.trend === 'Upward' ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
              {insight.trend}
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart2 size={20} color="#3b82f6" /> 30-Day XGBoost Price Trajectory Forecast
          </h3>
          <div style={{ display: 'flex', gap: '16px', fontSize: '13px' }}>
            <span style={{ color: '#3b82f6', fontWeight: '600' }}>● Historical (30D)</span>
            <span style={{ color: '#c084fc', fontWeight: '600' }}>● XGBoost Forecast (30D)</span>
          </div>
        </div>

        <div style={{ width: '100%', height: 380 }}>
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" stroke="#6b7280" tick={{ fontSize: 11 }} />
              <YAxis domain={['auto', 'auto']} stroke="#6b7280" tick={{ fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ background: '#121826', borderColor: 'rgba(99, 102, 241, 0.3)', borderRadius: '8px', color: '#fff' }}
              />
              <Line type="monotone" dataKey="Historical" stroke="#3b82f6" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="Forecast" stroke="#c084fc" strokeWidth={3} strokeDasharray="4 4" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Model Insight Details */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>XGBoost Technical Breakdown</h3>
        <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: 1.6 }}>
          The XGBoost Regressor model is trained on historical closing prices, 20-day Simple Moving Average (SMA), 
          and volatility indices. For <strong>{ticker}</strong>, the model achieved an out-of-sample testing accuracy of 
          <strong style={{ color: '#34d399' }}> {insight.model_accuracy}%</strong> (Mean Absolute Percentage Error evaluation). 
          The predicted price change slope over the next period is <strong style={{ color: insight.trend === 'Upward' ? '#34d399' : '#f87171' }}>{insight.predicted_slope}</strong>.
        </p>
      </div>
    </div>
  );
};
