import React from 'react';

export const Footer = () => {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '24px 0',
      marginTop: '60px',
      textAlign: 'center',
      fontSize: '13px',
      color: '#6b7280'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p>© 2026 FinGuide AI. Powered by XGBoost Forecasting Engine & Google Gemini AI.</p>
      </div>
    </footer>
  );
};
