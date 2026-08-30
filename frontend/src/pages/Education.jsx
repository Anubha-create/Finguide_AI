import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GraduationCap, BookOpen, CheckCircle, Clock, Award, HelpCircle, ChevronRight, ChevronLeft, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';

const DEFAULT_EDUCATION_MODULES = {
  Beginner: [
    {
      id: 'b1',
      title: 'Stock Market Foundations & Equity Ownership',
      category: 'Basics',
      duration: '15 mins',
      summary: 'Comprehensive guide on shares, stock exchanges, market vs limit orders, dividends, and equity ownership.',
      content: [
        "A stock (also known as equity) represents fractional ownership in a corporation. When you purchase a share of stock in a public company like Apple or Microsoft, you become a shareholder, giving you a legal claim to a proportion of the company's assets and future earnings.",
        "Stock Exchanges & Orders: Stocks trade on centralized stock exchanges such as the New York Stock Exchange (NYSE) or NASDAQ. When buying or selling, investors use two primary order types: a Market Order (executes immediately at the current market price) and a Limit Order (executes only at a specified target price or better).",
        "How Investors Earn Returns: Shareholders generate wealth through two main mechanisms: 1) Capital Gains (selling a stock at a higher price than what you paid), and 2) Dividend Payouts (quarterly cash distributions paid by profitable corporations to reward shareholders)."
      ],
      quiz: [
        {
          question: "What does owning a share of stock in a corporation grant you?",
          options: ["Fractional equity ownership and claim on earnings", "A guaranteed loan repayment from the bank", "Total legal control over company managers", "Immunity from market price drops"],
          correctIndex: 0,
          explanation: "A stock share represents fractional ownership of the company's equity and future earnings."
        },
        {
          question: "What is the difference between a Market Order and a Limit Order?",
          options: [
            "Market Orders execute immediately at current price; Limit Orders execute at a target price or better",
            "Limit Orders execute instantly; Market Orders take 3 days to process",
            "Market Orders are only for buying bonds; Limit Orders are for buying cryptocurrency",
            "There is no difference between them"
          ],
          correctIndex: 0,
          explanation: "Market Orders execute right away at market prices, whereas Limit Orders specify an exact execution price constraint."
        }
      ]
    },
    {
      id: 'b2',
      title: 'Index Funds, ETFs & Passive Wealth Building (VOO, BND)',
      category: 'ETFs',
      duration: '18 mins',
      summary: 'Deep dive into Exchange-Traded Funds, broad-market index tracking, expense ratios, and asset diversification.',
      content: [
        "What is an ETF? An Exchange-Traded Fund (ETF) is an investment fund traded on stock exchanges, much like individual stocks. An ETF holds a diversified basket of assets—such as stocks, bonds, or commodities—and tracks an underlying benchmark index.",
        "S&P 500 Index Funds (VOO): Vanguard S&P 500 ETF (VOO) holds shares in 500 of the largest, most established U.S. corporations across tech, healthcare, finance, and consumer sectors. Investing in VOO provides instant diversification, eliminating single-stock risk.",
        "Fixed Income & Bond ETFs (BND): Vanguard Total Bond Market ETF (BND) holds thousands of U.S. government and investment-grade corporate bonds. Fixed income ETFs pay regular interest yields and exhibit significantly lower price volatility (6.02% annualized) than stock funds, preserving capital."
      ],
      quiz: [
        {
          question: "Why is buying an ETF like VOO generally safer than buying a single company stock?",
          options: [
            "It spreads risk across 500 top companies instead of relying on one firm's performance",
            "The government guarantees VOO will never lose value",
            "VOO pays 50% dividend yields every month",
            "ETFs do not trade on stock exchanges"
          ],
          correctIndex: 0,
          explanation: "Broad-market ETFs provide instant diversification across hundreds of companies, drastically reducing single-company default risk."
        }
      ]
    },
    {
      id: 'b3',
      title: 'The Power of Exponential Compounding & Dollar-Cost Averaging',
      category: 'Wealth Building',
      duration: '14 mins',
      summary: 'Master the mathematical principles of compound interest, long-term time horizons, and Dollar-Cost Averaging (DCA).',
      content: [
        "The Compound Interest Mechanics: Compound interest is interest earned not only on your initial investment principal but also on all accumulated interest from previous periods. Over long periods (20 to 30 years), exponential growth causes investment earnings to outweigh annual contributions.",
        "Dollar-Cost Averaging (DCA): DCA is an investment strategy where an investor divides up the total amount to be invested into periodic purchases of a target asset (e.g. $500 every month) regardless of asset price.",
        "Emergency Reserve Foundation: Before investing aggressively in equities, financial advisors recommend keeping 3 to 6 months of essential living expenses in a high-yield liquid savings account."
      ],
      quiz: [
        {
          question: "How does Dollar-Cost Averaging (DCA) protect investors during market downturns?",
          options: [
            "By automatically purchasing more shares at lower prices when the market drops",
            "By guaranteeing a fixed 10% annual return from the government",
            "By selling all stocks as soon as prices drop 5%",
            "By converting all cash into gold bars"
          ],
          correctIndex: 0,
          explanation: "DCA invests fixed dollar amounts regularly, ensuring you buy more shares when prices are cheap and fewer when expensive."
        }
      ]
    }
  ],
  Intermediate: [
    {
      id: 'i1',
      title: 'Modern Portfolio Theory, Risk Profiles & Rebalancing',
      category: 'Portfolio Management',
      duration: '20 mins',
      summary: 'Learn asset allocation strategies, target risk tolerance profiles (Low, Medium, High), and systematic portfolio rebalancing.',
      content: [
        "Modern Portfolio Theory (MPT): Pioneered by Nobel laureate Harry Markowitz, MPT demonstrates that an asset's risk and return should not be assessed alone, but by how it contributes to an overall portfolio's risk and return profile.",
        "Risk Profiles & Asset Allocation: Portfolios are tailored to investor risk tolerance: Low Risk (70% BND / 30% VOO), Medium Risk (60% VOO / 20% AAPL / 20% BND), and High Risk (80% Tech / 20% AI).",
        "Systematic Rebalancing: Periodically selling a portion of overperforming assets and buying underperforming assets to restore original target risk weightings."
      ],
      quiz: [
        {
          question: "What is the primary objective of systematic portfolio rebalancing?",
          options: [
            "To restore the portfolio back to its target risk and asset allocation weightings",
            "To double the number of stock trades every day",
            "To avoid paying capital gains taxes permanently",
            "To convert all equity holdings into corporate bonds"
          ],
          correctIndex: 0,
          explanation: "Rebalancing prevents your portfolio from becoming overly risky when certain equities outgrow their target allocation percentage."
        }
      ]
    }
  ],
  Advanced: [
    {
      id: 'a1',
      title: 'Quantitative AI & XGBoost Regressor Price Forecasting',
      category: 'Quantitative AI',
      duration: '25 mins',
      summary: 'Deep dive into decision-tree gradient boosting, temporal lag features, and out-of-sample MAPE evaluation.',
      content: [
        "XGBoost Architecture: Extreme Gradient Boosting (XGBoost) builds an ensemble of shallow decision trees sequentially, where each new tree corrects errors made by previous trees.",
        "Feature Engineering in Financial Time Series: FinGuide AI feeds technical indicators into XGBoost, including 20-day Simple Moving Average (SMA_20), annualized volatility, price slopes, and lag features (Close_{t-1}).",
        "Model Accuracy Evaluation: Evaluated on unseen 20% test data using Mean Absolute Percentage Error (MAPE). Model Accuracy = (1 - MAPE) * 100."
      ],
      quiz: [
        {
          question: "In FinGuide AI's XGBoost forecaster, how is out-of-sample Model Accuracy calculated?",
          options: [
            "(1 - MAPE) * 100 evaluated on unseen 20% test data",
            "Checking past 1-day change only",
            "Random guessing against the S&P 500",
            "Highest historical stock price point"
          ],
          correctIndex: 0,
          explanation: "Model Accuracy = (1 - Mean Absolute Percentage Error) * 100 evaluated strictly on unseen out-of-sample testing data."
        }
      ]
    }
  ]
};

const MASTER_QUIZZES = {
  Beginner: [
    { id: 1, question: "What does buying a share of a stock represent?", options: ["A loan to a company", "Fractional equity ownership in a corporation", "A government bond certificate", "A fixed-rate saving deposit"], correctIndex: 1, explanation: "A share of stock represents true fractional ownership in equity." },
    { id: 2, question: "Which ETF tracks the 500 largest publicly traded companies in the U.S.?", options: ["BND", "VOO", "GLD", "VNQ"], correctIndex: 1, explanation: "Vanguard S&P 500 ETF (VOO) tracks the 500 largest publicly traded American corporations." },
    { id: 3, question: "What is compound interest?", options: ["Interest calculated only on principal", "Interest earned on both principal and accumulated interest", "A penalty fee", "A fixed expense"], correctIndex: 1, explanation: "Interest earned on principal plus all previously accumulated interest." },
    { id: 4, question: "Which asset class is generally considered to have lower volatility than growth stocks?", options: ["Cryptocurrency", "Penny stocks", "High-yield tech stocks", "Total Bond Market ETFs (BND)"], correctIndex: 3, explanation: "BND provides capital preservation and low volatility." },
    { id: 5, question: "What is a dividend?", options: ["A share of company profits paid to shareholders", "A loan fee", "A tax penalty", "The total price of a stock"], correctIndex: 0, explanation: "Quarterly cash distributions paid by profitable corporations to shareholders." },
    { id: 6, question: "What is the primary purpose of an emergency fund?", options: ["Buying cryptocurrency", "Covering 3-6 months of essential living expenses", "Day trading options", "Paying corporate taxes"], correctIndex: 1, explanation: "Covers 3-6 months of living expenses during unforeseen events." },
    { id: 7, question: "What does 'liquidity' mean in investing?", options: ["How easily an asset can be converted into cash", "The total debt of a corporation", "The annual inflation rate", "The trading volume"], correctIndex: 0, explanation: "How quickly an asset can be bought or sold for cash." },
    { id: 8, question: "What is an Exchange-Traded Fund (ETF)?", options: ["A single stock", "A basket of securities trading on an exchange", "A non-tradable savings bond", "A private bank loan"], correctIndex: 1, explanation: "Pools investor money into a basket of stocks or bonds." },
    { id: 9, question: "What is market capitalization (Market Cap)?", options: ["Total dollar value of a company's outstanding shares", "Total number of employees", "Price of one share", "Quarterly dividend yield"], correctIndex: 0, explanation: "Market Cap = (Outstanding Shares) × (Share Price)." },
    { id: 10, question: "Which strategy helps reduce the impact of short-term market volatility when investing regularly?", options: ["Market timing", "Dollar-Cost Averaging (DCA)", "Buying at peaks", "Panic selling"], correctIndex: 1, explanation: "Investing equal dollar amounts at regular intervals regardless of share price." }
  ],
  Intermediate: [
    { id: 1, question: "What does a Golden Cross technical indicator signal?", options: ["Short-term moving average crossing above long-term moving average (Bullish)", "Bankruptcy", "Stock price zero", "Bearish crossover"], correctIndex: 0, explanation: "SMA_20 crossing above SMA_50 signals bullish upward price momentum." },
    { id: 2, question: "What does a Price-to-Earnings (P/E) ratio measure?", options: ["Dividend frequency", "Ratio of stock price to earnings per share (EPS)", "Revenue minus expenses", "Annual volatility"], correctIndex: 1, explanation: "Compares market price per share to annual earnings per share." },
    { id: 3, question: "What is asset allocation?", options: ["Investing 100% into one stock", "Dividing portfolio among asset categories (Stocks, Bonds, Cash)", "Borrowing for options", "Selling assets for tax"], correctIndex: 1, explanation: "Balances portfolio risk and return across asset classes." },
    { id: 4, question: "If interest rates rise, what typically happens to bond prices?", options: ["Bond prices rise", "Bond prices fall", "Bond prices remain unaffected", "Bond yields drop to zero"], correctIndex: 1, explanation: "Bond prices and interest rates move in opposite directions." },
    { id: 5, question: "What is a Simple Moving Average (SMA_20)?", options: ["Average closing price over past 20 trading days", "Maximum price in 20 years", "Dividend yield / 20", "Volume in 20 hours"], correctIndex: 0, explanation: "Unweighted mean of closing prices over 20 trading periods." },
    { id: 6, question: "What is Modern Portfolio Theory (MPT)?", options: ["Penny stock strategy", "Framework to maximize return for a given risk level", "Holding cash only", "Buying on Mondays"], correctIndex: 1, explanation: "Optimizes portfolio return relative to variance risk." },
    { id: 7, question: "What does a beta greater than 1.0 indicate for a stock?", options: ["Less volatile than market", "More volatile than overall market", "Zero dividends", "Negative earnings"], correctIndex: 1, explanation: "Beta > 1.0 means wider price swings than the benchmark market index." },
    { id: 8, question: "What is the difference between growth stocks and value stocks?", options: ["Growth = higher valuations/fast growth; Value = below intrinsic value", "Growth pays higher dividends", "Value stocks are tech only", "Growth has no price"], correctIndex: 0, explanation: "Growth reinvests for expansion; Value trades at a discount fundamental multiple." },
    { id: 9, question: "What is rebalancing a portfolio?", options: ["Realigning asset weightings back to target risk allocation", "Closing bank accounts", "Crypto buying", "Switching brokers"], correctIndex: 0, explanation: "Restores target risk profile when market moves shift allocations." },
    { id: 10, question: "What does an inverted yield curve historically signal?", options: ["Economic acceleration", "Potential impending economic recession", "Low volatility", "Zero inflation"], correctIndex: 1, explanation: "Inverted yield curve has preceded nearly every U.S. recession." }
  ],
  Advanced: [
    { id: 1, question: "In FinGuide AI's XGBoost forecaster, how is Model Accuracy calculated?", options: ["Random guessing", "(1 - MAPE) * 100 on unseen out-of-sample test data", "Past 1-day change", "Highest price point"], correctIndex: 1, explanation: "Accuracy = (1 - MAPE) * 100 evaluated on unseen test data." },
    { id: 2, question: "What does the Sharpe Ratio evaluate?", options: ["Revenue growth", "Risk-adjusted return relative to risk-free rate per unit of volatility", "Hedge fund leverage", "Dividend yield"], correctIndex: 1, explanation: "Sharpe = (Portfolio Return - Risk-Free Rate) / Annualized Volatility." },
    { id: 3, question: "How is 5-year annualized volatility calculated for daily stock data?", options: ["Standard deviation of daily log returns multiplied by sqrt(252)", "Price divided by 5", "Max minus Min price", "Total volume"], correctIndex: 0, explanation: "Annualized Volatility = StdDev(Daily Returns) × √252." },
    { id: 4, question: "In gradient boosting algorithms like XGBoost, what role do decision trees play?", options: ["Weak learners combined sequentially to minimize gradient loss", "Password storage", "Interest calculation", "Deleting features"], correctIndex: 0, explanation: "Builds decision tree ensembles sequentially to minimize objective loss." },
    { id: 5, question: "What is Maximum Drawdown (MDD)?", options: ["Maximum observed peak-to-trough loss before a new peak", "Maximum annual dividend", "Highest price reached", "Total cash deposited"], correctIndex: 0, explanation: "Measures peak-to-trough decline during a record period." },
    { id: 6, question: "What is the key advantage of using lag features (Close_{t-1}, SMA_20) in time-series forecasting?", options: ["Capturing temporal momentum and autocorrelation patterns", "Guaranteeing 100% predictions", "Removing GPUs", "Converting to bonds"], correctIndex: 0, explanation: "Allows models to capture momentum and autocorrelation." },
    { id: 7, question: "What is Delta in options trading?", options: ["Rate of change of option price per $1 move in underlying asset", "Expiration time", "Volatility", "Risk-free rate"], correctIndex: 0, explanation: "Option price sensitivity relative to $1 stock move." },
    { id: 8, question: "What is the Value at Risk (VaR) metric?", options: ["Statistical estimate of max expected loss over time horizon at confidence level (95%)", "Market cap of S&P 500", "Minimum broker profit", "Average tech yield"], correctIndex: 0, explanation: "Quantifies max expected loss under normal market conditions." },
    { id: 9, question: "What is the main objective of a Delta-Neutral hedging strategy?", options: ["Portfolio immune to small price moves by balancing deltas", "Maximize long exposure", "Double volatility", "Eliminate tax"], correctIndex: 0, explanation: "Balances long and short deltas so net delta is zero." },
    { id: 10, question: "How does Federal Reserve Quantitative Tightening (QT) affect market liquidity?", options: ["Increases bank cash", "Contracts central bank balance sheet, removing market liquidity", "Lowers interest rates to zero", "Guarantees index gains"], correctIndex: 1, explanation: "Contracts central bank balance sheet, reducing market reserves." }
  ]
};

export const Education = () => {
  const [modules, setModules] = useState(DEFAULT_EDUCATION_MODULES);
  const [activeTab, setActiveTab] = useState('Beginner');
  const [selectedModule, setSelectedModule] = useState(DEFAULT_EDUCATION_MODULES.Beginner[0]);
  
  const [moduleAnswers, setModuleAnswers] = useState({});
  const [viewMode, setViewMode] = useState('read');

  const [quizIndex, setQuizIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const res = await axios.get('/api/education/modules');
      if (res.data && res.data.Beginner) {
        setModules(res.data);
        if (res.data.Beginner.length > 0) setSelectedModule(res.data.Beginner[0]);
      }
    } catch (err) {
      console.warn('Using default education dataset:', err);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setModuleAnswers({});
    setQuizIndex(0);
    setUserAnswers({});
    setQuizFinished(false);
    const tabList = modules[tab] || DEFAULT_EDUCATION_MODULES[tab] || [];
    if (tabList.length > 0) {
      setSelectedModule(tabList[0]);
    }
  };

  const handleModuleQuizSelect = (qIdx, optIdx) => {
    setModuleAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const currentMasterQuizList = MASTER_QUIZZES[activeTab] || MASTER_QUIZZES.Beginner;
  const currentQuestion = currentMasterQuizList[quizIndex] || currentMasterQuizList[0];

  const handleOptionSelect = (optionIdx) => {
    if (quizFinished) return;
    setUserAnswers(prev => ({ ...prev, [quizIndex]: optionIdx }));
  };

  const handleNextQuestion = () => {
    if (quizIndex < currentMasterQuizList.length - 1) {
      setQuizIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handlePrevQuestion = () => {
    if (quizIndex > 0) {
      setQuizIndex(prev => prev - 1);
    }
  };

  const handleResetQuiz = () => {
    setQuizIndex(0);
    setUserAnswers({});
    setQuizFinished(false);
  };

  const calculateTotalScore = () => {
    let score = 0;
    currentMasterQuizList.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) score += 1;
    });
    return score;
  };

  const currentModuleList = modules[activeTab] || DEFAULT_EDUCATION_MODULES[activeTab] || [];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
          width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
          boxShadow: '0 8px 20px rgba(37, 99, 235, 0.25)'
        }}>
          <GraduationCap size={28} color="#ffffff" />
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px', color: '#0f172a' }}>Financial Education & Practice Hub</h1>
        <p style={{ color: '#475569', fontSize: '15px', maxWidth: '650px', margin: '0 auto' }}>
          Read in-depth lessons and solve targeted practice questions based directly on the reading material.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {['Beginner', 'Intermediate', 'Advanced'].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            style={{
              padding: '12px 28px',
              borderRadius: '30px',
              fontWeight: '700',
              fontSize: '14px',
              border: '1px solid',
              borderColor: activeTab === tab ? '#2563eb' : '#e2e8f0',
              background: activeTab === tab ? '#2563eb' : '#ffffff',
              color: activeTab === tab ? '#ffffff' : '#475569',
              boxShadow: activeTab === tab ? '0 4px 14px rgba(37, 99, 235, 0.3)' : '0 2px 4px rgba(0,0,0,0.02)',
              transition: 'all 0.2s ease'
            }}
          >
            {tab === 'Beginner' && '🌱 '}
            {tab === 'Intermediate' && '🚀 '}
            {tab === 'Advanced' && '⚡ '}
            {tab} Investor
          </button>
        ))}
      </div>

      {/* Mode Switcher */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '36px' }}>
        <button
          onClick={() => setViewMode('read')}
          style={{
            padding: '10px 22px', borderRadius: '20px', fontSize: '13px', fontWeight: '700', border: '1px solid',
            borderColor: viewMode === 'read' ? '#2563eb' : '#cbd5e1',
            background: viewMode === 'read' ? '#dbeafe' : '#ffffff',
            color: viewMode === 'read' ? '#1e40af' : '#475569',
            display: 'flex', alignItems: 'center', gap: '6px'
          }}
        >
          <BookOpen size={16} /> Read Lessons & Lesson Quizzes
        </button>

        <button
          onClick={() => setViewMode('test')}
          style={{
            padding: '10px 22px', borderRadius: '20px', fontSize: '13px', fontWeight: '700', border: '1px solid',
            borderColor: viewMode === 'test' ? '#7c3aed' : '#cbd5e1',
            background: viewMode === 'test' ? '#f3e8ff' : '#ffffff',
            color: viewMode === 'test' ? '#6b21a8' : '#475569',
            display: 'flex', alignItems: 'center', gap: '6px'
          }}
        >
          <Award size={16} /> Take {activeTab} Master Practice Test (10 Qs)
        </button>
      </div>

      {viewMode === 'read' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) minmax(400px, 1.8fr)', gap: '28px', marginBottom: '40px' }}>
          {/* Left Column: Lesson List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={18} color="#2563eb" /> {activeTab} Reading Curriculum
            </h3>

            {currentModuleList.map((item) => {
              const isSelected = selectedModule?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => { setSelectedModule(item); setModuleAnswers({}); }}
                  className="glass-panel"
                  style={{
                    padding: '20px',
                    cursor: 'pointer',
                    borderColor: isSelected ? '#2563eb' : '#e2e8f0',
                    borderWidth: isSelected ? '2px' : '1px',
                    background: isSelected ? '#eff6ff' : '#ffffff'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: '700', color: '#2563eb', background: '#dbeafe', padding: '3px 10px', borderRadius: '12px' }}>
                      {item.category}
                    </span>
                    <span style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={14} /> {item.duration}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>{item.title}</h4>
                  <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>{item.summary}</p>
                </div>
              );
            })}
          </div>

          {/* Right Column: In-Depth Lesson Content + Lesson-Based Practice Questions */}
          <div>
            {selectedModule ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div className="glass-panel" style={{ padding: '32px', background: '#ffffff' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2563eb', fontWeight: '700', fontSize: '13px', marginBottom: '12px' }}>
                    <Award size={16} /> {activeTab} Level Lesson
                  </div>
                  <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginBottom: '20px', lineHeight: 1.3 }}>
                    {selectedModule.title}
                  </h2>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {Array.isArray(selectedModule.content) ? (
                      selectedModule.content.map((pText, pIdx) => (
                        <div key={pIdx} style={{ background: '#f8fafc', borderLeft: '4px solid #2563eb', padding: '16px 20px', borderRadius: '0 8px 8px 0', fontSize: '15px', color: '#334155', lineHeight: 1.7, border: '1px solid #e2e8f0', borderLeftColor: '#2563eb' }}>
                          <p>{pText}</p>
                        </div>
                      ))
                    ) : (
                      <div style={{ background: '#f8fafc', borderLeft: '4px solid #2563eb', padding: '16px 20px', borderRadius: '0 8px 8px 0', fontSize: '15px', color: '#334155', lineHeight: 1.7 }}>
                        <p>{selectedModule.content}</p>
                      </div>
                    )}
                  </div>
                </div>

                {selectedModule.quiz && selectedModule.quiz.length > 0 && (
                  <div className="glass-panel" style={{ padding: '32px', background: '#ffffff' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                      <HelpCircle size={20} color="#2563eb" /> Practice Questions Based On This Reading
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      {selectedModule.quiz.map((q, qIdx) => {
                        const selectedOpt = moduleAnswers[qIdx];
                        const isAnswered = selectedOpt !== undefined;
                        const isCorrect = selectedOpt === q.correctIndex;

                        return (
                          <div key={qIdx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
                            <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', marginBottom: '14px' }}>
                              Question {qIdx + 1}: {q.question}
                            </h4>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
                              {q.options.map((optText, optIdx) => (
                                <button
                                  key={optIdx}
                                  onClick={() => handleModuleQuizSelect(qIdx, optIdx)}
                                  style={{
                                    textAlign: 'left', padding: '12px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600',
                                    border: '1px solid',
                                    borderColor: selectedOpt === optIdx ? '#2563eb' : '#cbd5e1',
                                    background: selectedOpt === optIdx ? '#dbeafe' : '#ffffff',
                                    color: selectedOpt === optIdx ? '#1e40af' : '#334155',
                                    transition: 'all 0.2s ease'
                                  }}
                                >
                                  {String.fromCharCode(65 + optIdx)}. {optText}
                                </button>
                              ))}
                            </div>

                            {isAnswered && (
                              <div style={{
                                padding: '12px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600',
                                background: isCorrect ? '#ecfdf5' : '#fef2f2',
                                color: isCorrect ? '#047857' : '#b91c1c',
                                border: '1px solid',
                                borderColor: isCorrect ? '#a7f3d0' : '#fecaca'
                              }}>
                                💡 <strong>{isCorrect ? 'Correct!' : 'Incorrect.'}</strong> {q.explanation}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: '#64748b', background: '#ffffff' }}>
                Select a module from the left to read lessons.
              </div>
            )}
          </div>
        </div>
      ) : (
        /* 10-Question Master Test Suite */
        <div className="glass-panel" style={{ padding: '32px', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HelpCircle size={22} color="#7c3aed" /> {activeTab} Master Practice Exam (10 Questions)
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b' }}>Test your comprehensive understanding across all {activeTab.toLowerCase()} reading materials.</p>
            </div>

            {!quizFinished && (
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#7c3aed', background: '#f3e8ff', padding: '6px 14px', borderRadius: '20px' }}>
                Question {quizIndex + 1} of 10
              </span>
            )}
          </div>

          {!quizFinished ? (
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '18px', lineHeight: 1.4 }}>
                Q{quizIndex + 1}. {currentQuestion.question}
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                {currentQuestion.options.map((optionText, optIdx) => {
                  const isSelected = userAnswers[quizIndex] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleOptionSelect(optIdx)}
                      style={{
                        textAlign: 'left', padding: '14px 18px', borderRadius: '10px', fontSize: '14px', fontWeight: '600',
                        border: '1px solid',
                        borderColor: isSelected ? '#7c3aed' : '#cbd5e1',
                        background: isSelected ? '#f3e8ff' : '#ffffff',
                        color: isSelected ? '#6b21a8' : '#334155',
                        boxShadow: isSelected ? '0 2px 8px rgba(124, 58, 237, 0.15)' : 'none',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span style={{ marginRight: '10px', fontWeight: '800', color: isSelected ? '#7c3aed' : '#94a3b8' }}>
                        {String.fromCharCode(65 + optIdx)}.
                      </span>
                      {optionText}
                    </button>
                  );
                })}
              </div>

              {userAnswers[quizIndex] !== undefined && (
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '8px', fontSize: '13px', color: '#475569', marginBottom: '24px' }}>
                  💡 <strong>Explanation:</strong> {currentQuestion.explanation}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button onClick={handlePrevQuestion} disabled={quizIndex === 0} className="btn-secondary" style={{ opacity: quizIndex === 0 ? 0.5 : 1, cursor: quizIndex === 0 ? 'not-allowed' : 'pointer' }}>
                  <ChevronLeft size={16} /> Previous
                </button>

                <button
                  onClick={handleNextQuestion}
                  disabled={userAnswers[quizIndex] === undefined}
                  className="btn-primary"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', opacity: userAnswers[quizIndex] === undefined ? 0.6 : 1, cursor: userAnswers[quizIndex] === undefined ? 'not-allowed' : 'pointer' }}
                >
                  {quizIndex === 9 ? 'Finish Exam & See Score' : 'Next Question'} <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Award size={32} color="#059669" />
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                {activeTab} Master Practice Exam Completed!
              </h3>
              <p style={{ fontSize: '18px', fontWeight: '700', color: '#7c3aed', marginBottom: '24px' }}>
                Your Final Score: {calculateTotalScore()} / 10 ({calculateTotalScore() * 10}%)
              </p>

              <div style={{ textAlign: 'left', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', marginBottom: '28px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', marginBottom: '14px' }}>Question Results Summary:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {currentMasterQuizList.map((q, idx) => {
                    const isCorrect = userAnswers[idx] === q.correctIndex;
                    return (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#ffffff', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}>
                        <span style={{ fontWeight: '600', color: '#334155' }}>
                          Q{idx + 1}: {q.question.substring(0, 60)}...
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '700', color: isCorrect ? '#059669' : '#dc2626' }}>
                          {isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                          {isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button onClick={handleResetQuiz} className="btn-primary" style={{ padding: '12px 28px', background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}>
                <RefreshCw size={16} /> Retake {activeTab} Master Exam
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
