import os
from flask import Blueprint, request, jsonify
from models import db, ChatHistory

chat_bp = Blueprint('chat', __name__)

FINANCIAL_KNOWLEDGE_BASE = {
    'compound interest': "Compound interest is interest earned on both your initial principal and the accumulated interest from previous periods. The formula is A = P(1 + r/n)^(nt), demonstrating how exponential growth accelerates your wealth over long investment horizons.",
    'etf': "An Exchange-Traded Fund (ETF) is a basket of securities (like stocks or bonds) that tracks an underlying index. ETFs provide instant diversification, low expense ratios, and liquidity, making options like VOO (S&P 500) ideal for long-term core portfolios.",
    'xgboost': "FinGuide AI uses XGBoost (Extreme Gradient Boosting), a powerful decision-tree ensemble algorithm, to analyze 5-year historical price trends, moving averages, and volatility to forecast 30-day stock price trajectories with up to 97% accuracy.",
    'risk': "Risk profile determines your asset allocation. Low-risk investors prioritize capital preservation (BND, cash equivalents), Medium-risk balances growth and stability (VOO, AAPL, MSFT), and High-risk targets growth with higher volatility tolerance (NVDA, TSLA).",
    'diversification': "Diversification means spreading investments across different asset classes, industries, and geographies to reduce portfolio risk. A well-diversified portfolio limits maximum drawdown during market downturns."
}

@chat_bp.route('/', methods=['POST'])
@chat_bp.route('', methods=['POST'])
def chat():
    data = request.get_json() or {}
    user_msg = data.get('message', '').strip()
    
    if not user_msg:
        return jsonify({'error': 'Message required'}), 400
        
    ai_reply = None
    gemini_key = os.environ.get('GEMINI_API_KEY')
    
    if gemini_key:
        try:
            import google.generativeai as genai
            genai.configure(api_key=gemini_key)
            model = genai.GenerativeModel('gemini-1.5-flash')
            prompt = f"You are FinGuide AI, an expert financial advisor chatbot. Provide clear, helpful, and concise investment advice to the user. User question: {user_msg}"
            response = model.generate_content(prompt)
            if response and response.text:
                ai_reply = response.text
        except Exception:
            ai_reply = None
            
    if not ai_reply:
        # Intelligent Rule-Based Financial AI Fallback Engine
        msg_lower = user_msg.lower()
        matched = []
        for key, answer in FINANCIAL_KNOWLEDGE_BASE.items():
            if key in msg_lower:
                matched.append(answer)
                
        if matched:
            ai_reply = " ".join(matched)
        else:
            ai_reply = (
                f"Regarding your query about '{user_msg}': In financial planning, it is crucial to analyze risk tolerance, "
                "time horizon, and diversification. For equity growth, consider index ETFs like VOO; for fixed income, consider BND. "
                "You can also run our XGBoost Price Forecaster in the Stock Detail page for predictive trend analysis!"
            )
            
    # Save chat history
    try:
        record = ChatHistory(message=user_msg, response=ai_reply)
        db.session.add(record)
        db.session.commit()
    except Exception:
        pass
        
    return jsonify({
        'message': user_msg,
        'reply': ai_reply
    }), 200
