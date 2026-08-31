import React, { useState } from 'react';
import axios from 'axios';
import { Bot, User, Send, Sparkles, HelpCircle } from 'lucide-react';

const DETAILED_FINANCE_ANSWERS = {
  stock: "A stock (also known as equity) represents fractional ownership in a corporation. When you buy a share, you own a piece of the company's assets and future earnings. Investors earn returns through capital gains (share price appreciation) and quarterly dividend payouts.",
  share: "A share is a single unit of equity ownership in a corporation. Holding shares entitles you to vote on corporate decisions and receive a portion of profits distributed as dividends.",
  bond: "A bond is a fixed-income instrument representing a loan made by an investor to a borrower (typically a corporation or government). Bonds pay regular interest coupon payments and return the principal upon maturity.",
  etf: "An Exchange-Traded Fund (ETF) pools investor capital into a diversified basket of stocks, bonds, or commodities trading under one ticker. VOO (S&P 500 ETF) and BND (Total Bond Market ETF) are core examples.",
  compound: "Compound interest is interest earned on initial principal plus all previously accumulated interest. Over long horizons (20-30 years), compounding creates exponential wealth growth.",
  voo: "Vanguard S&P 500 ETF (VOO) tracks the 500 largest publicly traded American corporations across tech, healthcare, finance, and consumer sectors, offering broad diversification with an ultra-low 0.03% expense ratio.",
  bnd: "Vanguard Total Bond Market ETF (BND) holds thousands of investment-grade U.S. government and corporate bonds, delivering regular yield income and low price volatility (6.02%) for capital preservation.",
  xgboost: "XGBoost (Extreme Gradient Boosting) builds an ensemble of shallow decision trees sequentially. FinGuide AI feeds historical prices, 20-day SMAs, volatility metrics, and lag features (Close_{t-1}) into XGBoost to forecast future price trajectories with 88-97% historical accuracy.",
  dividend: "A dividend is a distribution of cash or additional shares paid by a corporation to its eligible shareholders out of quarterly net profits.",
  pe: "The Price-to-Earnings (P/E) ratio measures a company's market price per share relative to its earnings per share (EPS). High P/E ratios reflect strong market growth expectations.",
  risk: "Asset allocation matches your risk profile: Low Risk emphasizes bond ETFs (70% BND / 30% VOO); Medium Risk balances growth (60% VOO / 20% AAPL / 20% BND); High Risk focuses on tech growth equities (NVDA, TSLA)."
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
    "What is stock?",
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
      const res = await axios.post('/api/chat', { message: q, question: q });
      const aiReply = res.data?.reply || res.data?.answer;
      if (aiReply) {
        setMessages([...newMsgs, { sender: 'ai', text: aiReply }]);
      } else {
        setMessages([...newMsgs, { sender: 'ai', text: getSmartAnswer(q) }]);
      }
    } catch (err) {
      console.error("Chat request error:", err);
      setMessages([...newMsgs, { sender: 'ai', text: getSmartAnswer(q) }]);
    } finally {
      setLoading(false);
    }
  };

  const getSmartAnswer = (question) => {
    const lower = question.toLowerCase();
    for (const [key, answer] of Object.entries(DETAILED_FINANCE_ANSWERS)) {
      if (lower.includes(key)) return answer;
    }
    return "FinGuide AI combines XGBoost machine learning price forecasting with financial wisdom. Stocks represent equity ownership, ETFs provide diversification (VOO), bond funds preserve capital (BND), and asset allocation balances portfolio risk.";
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
