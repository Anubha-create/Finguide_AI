import React, { useState } from 'react';
import axios from 'axios';
import { Bot, User, Send, Sparkles, HelpCircle } from 'lucide-react';

const KNOWLEDGE_BASE = {
  compound: "Compound interest is interest earned on both initial principal and all accumulated interest from previous periods. Over long horizons (20-30 years), compounding creates exponential wealth growth.",
  voo: "Vanguard S&P 500 ETF (VOO) holds shares in 500 of the largest, most established U.S. corporations across tech, healthcare, and consumer sectors, offering broad diversification with an ultra-low 0.03% expense ratio.",
  xgboost: "XGBoost (Extreme Gradient Boosting) builds an ensemble of shallow decision trees sequentially. FinGuide AI feeds historical prices, 20-day SMAs, volatility metrics, and lag features (Close_{t-1}) into XGBoost to forecast future price trajectories.",
  bnd: "Vanguard Total Bond Market ETF (BND) holds thousands of investment-grade U.S. government and corporate bonds, delivering regular yield income and low price volatility (6.02%) for capital preservation.",
  risk: "Asset allocation matches your risk profile: Low Risk emphasizes bond ETFs (70% BND / 30% VOO); Medium Risk balances growth (60% VOO / 20% AAPL / 20% BND); High Risk focuses on tech growth equities."
};

export const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello! I am FinGuide AI, your financial advisory assistant powered by Google Gemini AI & XGBoost analytics. How can I help you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sampleQuestions = [
    "What is compound interest?",
    "Explain S&P 500 ETF (VOO)",
    "How does XGBoost stock prediction work?",
    "What is Total Bond Market ETF (BND)?"
  ];

  const handleSend = async (queryText) => {
    const q = queryText || input;
    if (!q.trim()) return;

    const newMsgs = [...messages, { sender: 'user', text: q }];
    setMessages(newMsgs);
    if (!queryText) setInput('');
    setLoading(true);

    try {
      const res = await axios.post('/api/chat/query', { question: q });
      if (res.data && res.data.answer) {
        setMessages([...newMsgs, { sender: 'ai', text: res.data.answer }]);
      } else {
        setMessages([...newMsgs, { sender: 'ai', text: getFallbackAnswer(q) }]);
      }
    } catch (err) {
      setMessages([...newMsgs, { sender: 'ai', text: getFallbackAnswer(q) }]);
    } finally {
      setLoading(false);
    }
  };

  const getFallbackAnswer = (question) => {
    const lower = question.toLowerCase();
    if (lower.includes('compound')) return KNOWLEDGE_BASE.compound;
    if (lower.includes('voo') || lower.includes('s&p')) return KNOWLEDGE_BASE.voo;
    if (lower.includes('xgboost') || lower.includes('predict') || lower.includes('forecast')) return KNOWLEDGE_BASE.xgboost;
    if (lower.includes('bnd') || lower.includes('bond')) return KNOWLEDGE_BASE.bnd;
    if (lower.includes('risk') || lower.includes('profile') || lower.includes('allocation')) return KNOWLEDGE_BASE.risk;

    return "FinGuide AI combines XGBoost machine learning price forecasting with financial wisdom to help you optimize asset allocation, understand market volatility, and build long-term wealth.";
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
          width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
          boxShadow: '0 8px 20px rgba(37, 99, 235, 0.25)'
        }}>
          <Bot size={28} color="#ffffff" />
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px', color: '#0f172a' }}>Gemini AI Financial Advisor</h1>
        <p style={{ color: '#475569', fontSize: '15px' }}>Real-time Q&amp;A on investing, portfolio strategies, compound growth, and market metrics.</p>
      </div>

      <div className="glass-panel" style={{ padding: '24px', background: '#ffffff', minHeight: '480px', display: 'flex', flexDirection: 'column' }}>
        {/* Chat History */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', marginBottom: '20px' }}>
          {messages.map((m, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '12px', justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start' }}>
              {m.sender === 'ai' && (
                <div style={{ background: '#dbeafe', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Bot size={20} color="#2563eb" />
                </div>
              )}
              <div style={{
                maxWidth: '75%', padding: '14px 18px', borderRadius: '16px', fontSize: '14px', lineHeight: 1.6,
                background: m.sender === 'user' ? '#2563eb' : '#f8fafc',
                color: m.sender === 'user' ? '#ffffff' : '#334155',
                border: m.sender === 'user' ? 'none' : '1px solid #e2e8f0',
                borderBottomLeftRadius: m.sender === 'ai' ? '4px' : '16px',
                borderBottomRightRadius: m.sender === 'user' ? '4px' : '16px'
              }}>
                {m.text}
              </div>
              {m.sender === 'user' && (
                <div style={{ background: '#2563eb', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', flexShrink: 0 }}>
                  <User size={18} />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: '#64748b', fontSize: '13px' }}>
              <Bot size={20} color="#2563eb" /> AI is analyzing financial market data...
            </div>
          )}
        </div>

        {/* Sample Prompt Chips */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '12px' }}>
          {sampleQuestions.map((sq, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(sq)}
              style={{
                fontSize: '12px', fontWeight: '600', color: '#2563eb', background: '#eff6ff', border: '1px solid #bfdbfe',
                padding: '6px 12px', borderRadius: '16px', cursor: 'pointer', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '4px'
              }}
            >
              <Sparkles size={12} /> {sq}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} style={{ display: 'flex', gap: '12px' }}>
          <input
            type="text"
            className="glass-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask any financial or stock forecast question..."
            style={{ flex: 1 }}
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
