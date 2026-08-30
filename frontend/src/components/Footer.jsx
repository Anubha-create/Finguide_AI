import React from 'react';

export const Footer = () => {
  return (
    <footer style={{
      background: '#ffffff',
      borderTop: '1px solid #e2e8f0',
      padding: '24px 0',
      marginTop: '60px',
      textAlign: 'center',
      fontSize: '13px',
      color: '#64748b'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p>© 2026 FinGuide AI. Powered by XGBoost Forecasting Engine & Google Gemini AI.</p>
      </div>
    </footer>
  );
};
