import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GraduationCap, BookOpen, CheckCircle, Clock, ChevronRight, HelpCircle, Award } from 'lucide-react';

export const Education = () => {
  const [modules, setModules] = useState({ Beginner: [], Intermediate: [], Advanced: [] });
  const [activeTab, setActiveTab] = useState('Beginner');
  const [selectedModule, setSelectedModule] = useState(null);
  const [quizScore, setQuizScore] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState('');
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
    setQuizScore(null);
    setQuizAnswer('');
    if (modules[tab] && modules[tab].length > 0) {
      setSelectedModule(modules[tab][0]);
    }
  };

  const sampleQuizzes = {
    Beginner: {
      question: "What does buying a share of a stock represent?",
      options: [
        "A guaranteed loan to a company",
        "Fractional equity ownership in a corporation",
        "A government bond certificate"
      ],
      correctIndex: 1
    },
    Intermediate: {
      question: "What does a Golden Cross technical indicator signal?",
      options: [
        "A short-term moving average crossing above a long-term moving average (Bullish)",
        "A company declaring bankruptcy",
        "Stock price dropping below zero"
      ],
      correctIndex: 0
    },
    Advanced: {
      question: "In FinGuide AI's XGBoost forecaster, how is Model Accuracy calculated?",
      options: [
        "Random guessing",
        "(1 - MAPE) * 100 on unseen out-of-sample test data",
        "Checking past 1-day change only"
      ],
      correctIndex: 1
    }
  };

  const currentQuiz = sampleQuizzes[activeTab];

  const handleQuizSubmit = (optIdx) => {
    setQuizAnswer(optIdx);
    if (optIdx === currentQuiz.correctIndex) {
      setQuizScore(true);
    } else {
      setQuizScore(false);
    }
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
        <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px', color: '#0f172a' }}>Financial Education Hub</h1>
        <p style={{ color: '#475569', fontSize: '15px', maxWidth: '600px', margin: '0 auto' }}>
          Master financial literacy, quantitative modeling, and market fundamentals step-by-step.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '36px' }}>
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

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) minmax(400px, 1.8fr)', gap: '28px' }}>
        {/* Left Column: Module List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={18} color="#2563eb" /> {activeTab} Learning Modules
          </h3>

          {modules[activeTab]?.map((item) => {
            const isSelected = selectedModule?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => { setSelectedModule(item); setQuizScore(null); setQuizAnswer(''); }}
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

        {/* Right Column: Detailed Reader & Knowledge Quiz */}
        <div>
          {selectedModule ? (
            <div className="glass-panel" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2563eb', fontWeight: '700', fontSize: '13px', marginBottom: '12px' }}>
                <Award size={16} /> {activeTab} Level Courseware
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginBottom: '16px', lineHeight: 1.3 }}>
                {selectedModule.title}
              </h2>
              <div style={{ background: '#f8fafc', borderLeft: '4px solid #2563eb', padding: '16px 20px', borderRadius: '0 8px 8px 0', fontSize: '15px', color: '#334155', lineHeight: 1.7, marginBottom: '28px' }}>
                {selectedModule.content}
              </div>

              {/* Interactive Knowledge Quiz */}
              <div style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '24px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <HelpCircle size={18} color="#2563eb" /> {activeTab} Knowledge Check
                </h4>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '14px' }}>
                  {currentQuiz.question}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {currentQuiz.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuizSubmit(idx)}
                      style={{
                        textAlign: 'left',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        fontSize: '13px',
                        fontWeight: '600',
                        border: '1px solid',
                        borderColor: quizAnswer === idx ? '#2563eb' : '#cbd5e1',
                        background: quizAnswer === idx ? '#dbeafe' : '#ffffff',
                        color: quizAnswer === idx ? '#1e40af' : '#334155',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {idx + 1}. {opt}
                    </button>
                  ))}
                </div>

                {quizScore !== null && (
                  <div style={{
                    marginTop: '16px', padding: '12px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '700',
                    background: quizScore ? '#ecfdf5' : '#fef2f2',
                    color: quizScore ? '#047857' : '#b91c1c',
                    border: '1px solid',
                    borderColor: quizScore ? '#a7f3d0' : '#fecaca',
                    display: 'flex', alignItems: 'center', gap: '8px'
                  }}>
                    <CheckCircle size={16} /> {quizScore ? "Correct! Excellent understanding." : "Not quite. Review the module text above and try again!"}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
              Select a module from the list to begin learning.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
