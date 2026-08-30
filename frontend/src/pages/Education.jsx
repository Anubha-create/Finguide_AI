import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GraduationCap, BookOpen, CheckCircle, Clock, Award, HelpCircle, ChevronRight, ChevronLeft, RefreshCw, CheckCircle2, XCircle, FileText, Check } from 'lucide-react';

const MASTER_QUIZZES = {
  Beginner: [
    {
      id: 1,
      question: "What does buying a share of a stock represent?",
      options: [
        "A loan to a company",
        "Fractional equity ownership in a corporation",
        "A government bond certificate",
        "A fixed-rate saving deposit"
      ],
      correctIndex: 1,
      explanation: "A share of stock represents true fractional ownership in the equity of a corporation."
    },
    {
      id: 2,
      question: "Which ETF tracks the 500 largest publicly traded companies in the U.S.?",
      options: ["BND", "VOO", "GLD", "VNQ"],
      correctIndex: 1,
      explanation: "Vanguard S&P 500 ETF (VOO) tracks the 500 largest publicly traded American corporations."
    },
    {
      id: 3,
      question: "What is compound interest?",
      options: [
        "Interest calculated only on original principal",
        "Interest earned on both principal and accumulated interest",
        "A penalty fee paid to banks",
        "A fixed monthly expense"
      ],
      correctIndex: 1,
      explanation: "Compound interest is interest earned on initial principal plus all previously accumulated interest."
    },
    {
      id: 4,
      question: "Which asset class is generally considered to have lower volatility than growth stocks?",
      options: ["Cryptocurrency", "Penny stocks", "High-yield tech stocks", "Total Bond Market ETFs (BND)"],
      correctIndex: 3,
      explanation: "Fixed-income bond ETFs like BND provide capital preservation and much lower price volatility than equities."
    },
    {
      id: 5,
      question: "What is a dividend?",
      options: [
        "A share of company profits paid to shareholders",
        "A loan fee charged by banks",
        "A government tax penalty",
        "The total price of a stock"
      ],
      correctIndex: 0,
      explanation: "Dividends are payments made by a corporation to its shareholders out of quarterly profits."
    },
    {
      id: 6,
      question: "What is the primary purpose of an emergency fund?",
      options: [
        "Buying speculative cryptocurrency",
        "Covering 3-6 months of essential living expenses during unexpected events",
        "Day trading options contracts",
        "Paying annual corporate taxes"
      ],
      correctIndex: 1,
      explanation: "An emergency fund protects financial stability by covering 3-6 months of living expenses during unforeseen events."
    },
    {
      id: 7,
      question: "What does 'liquidity' mean in investing?",
      options: [
        "How easily an asset can be converted into cash without significant loss of value",
        "The total debt of a corporation",
        "The annual inflation rate",
        "The stock exchange trading volume"
      ],
      correctIndex: 0,
      explanation: "Liquidity describes how quickly and easily an asset can be bought or sold for cash."
    },
    {
      id: 8,
      question: "What is an Exchange-Traded Fund (ETF)?",
      options: [
        "A single stock issued by a tech company",
        "A basket of securities that trades on a stock exchange",
        "A non-tradable savings bond",
        "A private bank loan"
      ],
      correctIndex: 1,
      explanation: "An ETF pools investor money into a diversified basket of stocks or bonds trading under one ticker."
    },
    {
      id: 9,
      question: "What is market capitalization (Market Cap)?",
      options: [
        "The total dollar value of a company's outstanding shares of stock",
        "The total number of employees in a company",
        "The price of one share of stock",
        "The quarterly dividend yield"
      ],
      correctIndex: 0,
      explanation: "Market Cap = (Total Outstanding Shares) × (Current Share Price)."
    },
    {
      id: 10,
      question: "Which strategy helps reduce the impact of short-term market volatility when investing regularly?",
      options: [
        "Market timing",
        "Dollar-Cost Averaging (DCA)",
        "Buying only at market peaks",
        "Panic selling during downturns"
      ],
      correctIndex: 1,
      explanation: "Dollar-Cost Averaging involves investing equal dollar amounts at regular intervals regardless of share price."
    }
  ],
  Intermediate: [
    {
      id: 1,
      question: "What does a Golden Cross technical indicator signal?",
      options: [
        "A short-term moving average crossing above a long-term moving average (Bullish)",
        "A company declaring bankruptcy",
        "Stock price dropping below zero",
        "A short-term moving average crossing below a long-term moving average (Bearish)"
      ],
      correctIndex: 0,
      explanation: "A Golden Cross (e.g. SMA_20 crossing above SMA_50) signals strong upward bullish price momentum."
    },
    {
      id: 2,
      question: "What does a Price-to-Earnings (P/E) ratio measure?",
      options: [
        "A company's dividend payout frequency",
        "The ratio of a stock price to its earnings per share (EPS)",
        "The total revenue minus expenses",
        "The annual volatility percentage"
      ],
      correctIndex: 1,
      explanation: "P/E ratio compares market price per share to annual earnings per share."
    },
    {
      id: 3,
      question: "What is asset allocation?",
      options: [
        "Investing 100% of capital into a single stock",
        "Dividing an investment portfolio among different asset categories (Stocks, Bonds, Cash)",
        "Borrowing money to buy options",
        "Selling assets to pay taxes"
      ],
      correctIndex: 1,
      explanation: "Asset allocation balances portfolio risk and return by spreading capital across diverse asset classes."
    },
    {
      id: 4,
      question: "If interest rates rise, what typically happens to bond prices?",
      options: ["Bond prices rise", "Bond prices fall", "Bond prices remain unaffected", "Bond yields drop to zero"],
      correctIndex: 1,
      explanation: "Bond prices and interest rates have an inverse relationship; when interest rates rise, bond prices fall."
    },
    {
      id: 5,
      question: "What is a Simple Moving Average (SMA_20)?",
      options: [
        "The average closing price of a stock over the past 20 trading days",
        "The maximum price of a stock in 20 years",
        "The dividend yield divided by 20",
        "The total volume traded in 20 hours"
      ],
      correctIndex: 0,
      explanation: "SMA_20 calculates the unweighted mean of closing prices over the prior 20 trading periods."
    },
    {
      id: 6,
      question: "What is Modern Portfolio Theory (MPT)?",
      options: [
        "A theory stating investors should pick individual penny stocks",
        "A framework for constructing a portfolio to maximize expected return for a given level of risk",
        "A strategy of holding cash only",
        "A rule to buy stocks only on Mondays"
      ],
      correctIndex: 1,
      explanation: "Developed by Harry Markowitz, MPT optimizes portfolios along an Efficient Frontier based on mean-variance analysis."
    },
    {
      id: 7,
      question: "What does a beta greater than 1.0 indicate for a stock?",
      options: [
        "The stock is less volatile than the overall market",
        "The stock is more volatile than the overall market",
        "The stock pays zero dividends",
        "The stock has negative earnings"
      ],
      correctIndex: 1,
      explanation: "Beta > 1.0 means the stock experiences wider price swings than the benchmark market index."
    },
    {
      id: 8,
      question: "What is the difference between growth stocks and value stocks?",
      options: [
        "Growth stocks trade at higher valuations expecting fast revenue growth; Value stocks trade below intrinsic value",
        "Growth stocks pay higher dividends than value stocks",
        "Value stocks are always tech companies",
        "Growth stocks have no stock price"
      ],
      correctIndex: 0,
      explanation: "Growth stocks reinvest earnings for expansion, while Value stocks trade at discount multiples relative to fundamentals."
    },
    {
      id: 9,
      question: "What is rebalancing a portfolio?",
      options: [
        "Realigning the weightings of a portfolio's assets by periodically buying or selling assets to maintain target risk allocation",
        "Closing all bank accounts",
        "Buying only cryptocurrency",
        "Switching brokers every month"
      ],
      correctIndex: 0,
      explanation: "Rebalancing restores portfolio allocations to your target risk profile when market moves shift weightings."
    },
    {
      id: 10,
      question: "What does an inverted yield curve historically signal?",
      options: [
        "Strong economic acceleration",
        "Potential impending economic recession",
        "Record low stock market volatility",
        "Immediate inflation drop to zero"
      ],
      correctIndex: 1,
      explanation: "An inverted yield curve (short-term yields exceeding long-term yields) has preceded nearly every U.S. recession."
    }
  ],
  Advanced: [
    {
      id: 1,
      question: "In FinGuide AI's XGBoost forecaster, how is Model Accuracy calculated?",
      options: [
        "Random guessing",
        "(1 - MAPE) * 100 on unseen out-of-sample test data",
        "Checking past 1-day change only",
        "Highest historical price point"
      ],
      correctIndex: 1,
      explanation: "Model Accuracy = (1 - Mean Absolute Percentage Error) * 100 evaluated on unseen 20% test data."
    },
    {
      id: 2,
      question: "What does the Sharpe Ratio evaluate?",
      options: [
        "Total annual revenue growth",
        "Risk-adjusted return relative to risk-free treasury rate per unit of volatility",
        "Maximum leverage ratio of a hedge fund",
        "Dividend yield percentage minus taxes"
      ],
      correctIndex: 1,
      explanation: "Sharpe Ratio = (Portfolio Return - Risk-Free Rate) / Annualized Volatility."
    },
    {
      id: 3,
      question: "How is 5-year annualized volatility calculated for daily stock data?",
      options: [
        "Standard deviation of daily log returns multiplied by the square root of 252 trading days",
        "Simple average of stock prices divided by 5",
        "Maximum daily price minus minimum daily price",
        "Total trading volume over 5 years"
      ],
      correctIndex: 0,
      explanation: "Annualized Volatility = StdDev(Daily Returns) × √252."
    },
    {
      id: 4,
      question: "In gradient boosting algorithms like XGBoost, what role do decision trees play?",
      options: [
        "They act as weak learners combined sequentially to minimize gradient loss functions",
        "They store user passwords",
        "They calculate real-time bank interest",
        "They randomly delete features"
      ],
      correctIndex: 0,
      explanation: "XGBoost builds ensembles of shallow decision trees sequentially to minimize regularized objective loss."
    },
    {
      id: 5,
      question: "What is Maximum Drawdown (MDD)?",
      options: [
        "The maximum observed loss from a peak to a trough of a portfolio before a new peak is attained",
        "The maximum dividend paid in a year",
        "The highest price ever reached by a stock",
        "The total cash deposited into a broker"
      ],
      correctIndex: 0,
      explanation: "MDD measures peak-to-trough decline during a specific record period, assessing downside risk."
    },
    {
      id: 6,
      question: "What is the key advantage of using lag features (Close_{t-1}, SMA_20) in time-series forecasting models?",
      options: [
        "They capture temporal momentum and autocorrelation patterns",
        "They guarantee 100% future price predictions",
        "They remove the need for GPUs",
        "They convert stocks into bonds"
      ],
      correctIndex: 0,
      explanation: "Lagged historical price inputs allow decision trees to capture momentum, mean-reversion, and autocorrelation."
    },
    {
      id: 7,
      question: "What is Delta in options trading?",
      options: [
        "The rate of change of an option's price per $1 move in the underlying asset",
        "The time remaining until expiration",
        "The volatility of the option",
        "The risk-free interest rate"
      ],
      correctIndex: 0,
      explanation: "Delta measures price sensitivity of an option relative to a $1 change in the underlying stock."
    },
    {
      id: 8,
      question: "What is the Value at Risk (VaR) metric?",
      options: [
        "The statistical estimate of maximum expected loss over a specific time horizon at a given confidence level (e.g. 95%)",
        "The total market cap of S&P 500",
        "The minimum profit guaranteed by a broker",
        "The average dividend yield of tech stocks"
      ],
      correctIndex: 0,
      explanation: "VaR quantifies financial risk exposure by calculating maximum expected loss under normal market conditions."
    },
    {
      id: 9,
      question: "What is the main objective of a Delta-Neutral hedging strategy?",
      options: [
        "To create a portfolio immune to small price movements in the underlying asset by balancing positive and negative deltas",
        "To maximize directional long exposure",
        "To double the portfolio volatility",
        "To eliminate all corporate taxes"
      ],
      correctIndex: 0,
      explanation: "Delta-neutral portfolios balance long and short delta exposures so total portfolio delta sums to zero."
    },
    {
      id: 10,
      question: "How does Federal Reserve Quantitative Tightening (QT) affect market liquidity?",
      options: [
        "It contracts the central bank balance sheet, removing liquidity from financial markets",
        "It increases cash supply in commercial bank vaults",
        "It lowers federal funds rates to zero percent",
        "It guarantees stock indices will reach record highs"
      ],
      correctIndex: 1,
      explanation: "QT reduces central bank bond holdings, pulling money reserves out of financial institutions and contracting market liquidity."
    }
  ]
};

export const Education = () => {
  const [modules, setModules] = useState({ Beginner: [], Intermediate: [], Advanced: [] });
  const [activeTab, setActiveTab] = useState('Beginner');
  const [selectedModule, setSelectedModule] = useState(null);
  
  // Module-specific quiz answers state
  const [moduleAnswers, setModuleAnswers] = useState({});
  const [moduleScores, setModuleScores] = useState({});

  // View Mode: 'read' (Module Lessons + Lesson Quiz) vs 'test' (Master 10-Question Exam)
  const [viewMode, setViewMode] = useState('read');

  // Master Test State (10 Questions per level)
  const [quizIndex, setQuizIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/education/modules');
      setModules(res.data);
      if (res.data.Beginner && res.data.Beginner.length > 0) {
        setSelectedModule(res.data.Beginner[0]);
      }
    } catch (err) {
      console.error('Failed to load education modules:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setModuleAnswers({});
    setModuleScores({});
    setQuizIndex(0);
    setUserAnswers({});
    setQuizFinished(false);
    if (modules[tab] && modules[tab].length > 0) {
      setSelectedModule(modules[tab][0]);
    }
  };

  const handleModuleQuizSelect = (qIdx, optIdx) => {
    setModuleAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const currentMasterQuizList = MASTER_QUIZZES[activeTab] || [];
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
      if (userAnswers[idx] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

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

      {/* Mode Switcher: Reading Modules vs 10-Question Master Test */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '36px' }}>
        <button
          onClick={() => setViewMode('read')}
          style={{
            padding: '10px 22px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: '700',
            border: '1px solid',
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
            padding: '10px 22px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: '700',
            border: '1px solid',
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
        /* Reading & Lesson Quiz View */
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) minmax(400px, 1.8fr)', gap: '28px', marginBottom: '40px' }}>
          {/* Left Column: Lesson Modules List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={18} color="#2563eb" /> {activeTab} Reading Curriculum
            </h3>

            {modules[activeTab]?.map((item) => {
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
                {/* Reading Card */}
                <div className="glass-panel" style={{ padding: '32px', background: '#ffffff' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2563eb', fontWeight: '700', fontSize: '13px', marginBottom: '12px' }}>
                    <Award size={16} /> {activeTab} Level Lesson
                  </div>
                  <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginBottom: '20px', lineHeight: 1.3 }}>
                    {selectedModule.title}
                  </h2>

                  {/* Multi-Paragraph Lesson Content */}
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

                {/* Lesson-Based Practice Questions */}
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
                                    textAlign: 'left',
                                    padding: '12px 16px',
                                    borderRadius: '8px',
                                    fontSize: '13px',
                                    fontWeight: '600',
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
                        textAlign: 'left',
                        padding: '14px 18px',
                        borderRadius: '10px',
                        fontSize: '14px',
                        fontWeight: '600',
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
                <button
                  onClick={handlePrevQuestion}
                  disabled={quizIndex === 0}
                  className="btn-secondary"
                  style={{ opacity: quizIndex === 0 ? 0.5 : 1, cursor: quizIndex === 0 ? 'not-allowed' : 'pointer' }}
                >
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

              {/* Answer Breakdown Table */}
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
