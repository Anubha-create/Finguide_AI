import os
from flask import Blueprint, request, jsonify
from dotenv import load_dotenv
from models import db, ChatHistory

chat_bp = Blueprint('chat', __name__)

FINANCIAL_KNOWLEDGE_BASE = [
    {
        'keywords': ['who are you', 'what is your name', 'who created you', 'what do you do', 'identity', 'about you', 'hello', 'hi'],
        'response': "I am FinGuide AI, an intelligent financial advisory assistant powered by Google Gemini AI & XGBoost machine learning analytics. I can assist you with real-time stock price forecasting, risk profile assessment, portfolio asset allocation, and personalized investment strategies!"
    },
    {
        'keywords': ['short term', 'short-term', 'near term', '1 year', '2 year', '3 year', '2 year plan', 'short term plan', 'short term investment'],
        'response': "For short-term investment horizons (1-3 years), capital preservation and liquidity are essential. The best options include High-Yield Savings Accounts (HYSA), Short-Term Treasury Bills, Certificates of Deposit (CDs), and Low-Volatility Bond ETFs like BND. Avoid high-risk individual equities (e.g. NVDA, TSLA) for short-term goals because market volatility can lead to short-term principal loss."
    },
    {
        'keywords': ['long term', 'long-term', 'retirement', '5 year', '10 year', 'wealth creation'],
        'response': "For long-term investment horizons (5+ years), time allows you to compound returns and recover from short-term market downturns. Broad market index ETFs like VOO (S&P 500) combined with growth equities (AAPL, MSFT) provide strong capital appreciation. Systematic Dollar-Cost Averaging (DCA) is the most effective strategy for long-term growth."
    },
    {
        'keywords': ['etf', 'index fund', 'exchange traded fund', 'voo', 'bnd'],
        'response': "An Exchange-Traded Fund (ETF) is a basket of securities (stocks or bonds) that trades on exchange like a single stock. ETFs offer instant diversification, low expense ratios, and tax efficiency. Core examples in FinGuide AI include VOO (Vanguard S&P 500 ETF for broad market equity) and BND (Vanguard Total Bond Market for fixed income)."
    },
    {
        'keywords': ['xgboost', 'predict', 'forecast', 'model', 'machine learning', 'accuracy', 'algorithm'],
        'response': "FinGuide AI utilizes an XGBoost (Extreme Gradient Boosting) Regressor model trained on historical price data, 20-day Simple Moving Averages (SMA_20), daily return volatility, and volume features. It evaluates out-of-sample MAPE accuracy to output multi-step future price forecasts for supported assets."
    },
    {
        'keywords': ['risk', 'risk level', 'risk profile', 'conservative', 'aggressive', 'moderate'],
        'response': "Your risk profile determines optimal asset allocation. Low-Risk investors prioritize capital preservation using fixed income (BND, cash). Medium-Risk investors balance growth and stability (VOO, AAPL, MSFT). High-Risk investors target maximum capital appreciation with higher volatility tolerance (NVDA, TSLA)."
    },
    {
        'keywords': ['emergency fund', 'liquid money', 'savings', 'hysa', 'cash'],
        'response': "An emergency fund should consist of 3 to 6 months of essential living expenses kept in liquid, zero-risk accounts such as High-Yield Savings Accounts (HYSA) or Short-Term T-Bills. This ensures you never have to liquidate equity investments during a market downturn."
    },
    {
        'keywords': ['dca', 'dollar cost averaging', 'sip', 'systematic', 'regular investment'],
        'response': "Dollar-Cost Averaging (DCA) means investing a fixed dollar amount at regular intervals (e.g. monthly) regardless of share price. This reduces emotional bias, lowers average cost per share during market drops, and maximizes compound interest over time."
    },
    {
        'keywords': ['dividend', 'passive income', 'yield'],
        'response': "Dividend-paying stocks and ETFs distribute a portion of corporate earnings back to shareholders. Reinvesting dividends via DRIP (Dividend Reinvestment Plan) significantly boosts long-term portfolio growth."
    },
    {
        'keywords': ['stock', 'equity', 'shares', 'aapl', 'msft', 'nvda', 'tsla'],
        'response': "Stocks represent fractional ownership in a corporation. Large-cap tech equities like AAPL and MSFT offer balanced growth with steady earnings, while high-beta stocks like NVDA and TSLA deliver rapid potential upside paired with higher volatility."
    },
    {
        'keywords': ['diversification', 'diversify', 'portfolio balance', 'asset allocation'],
        'response': "Diversification involves spreading investments across multiple asset classes (equities, bonds), market sectors (technology, healthcare, energy), and geographies. Proper diversification minimizes overall portfolio drawdowns during market contractions."
    },
    {
        'keywords': ['inflation', 'purchasing power'],
        'response': "Inflation erodes cash purchasing power over time. Investing in inflation-beating assets like equity index ETFs (VOO), real estate, and Treasury Inflation-Protected Securities (TIPS) preserves long-term real wealth."
    }
]

def find_best_knowledge_match(user_msg):
    msg_lower = user_msg.lower().strip()
    best_match = None
    max_score = 0
    
    for entry in FINANCIAL_KNOWLEDGE_BASE:
        score = 0
        for kw in entry['keywords']:
            if kw in msg_lower:
                score += len(kw) * 3
        if score > max_score:
            max_score = score
            best_match = entry['response']
            
    return best_match

def generate_gemini_response(user_msg, gemini_key):
    prompt = (
        "You are FinGuide AI, an expert financial advisor chatbot powered by Google Gemini AI. "
        "Provide clear, direct, professional, and helpful financial investment advice to the user. "
        f"User Question: {user_msg}"
    )
    
    # 1. Try modern google.genai SDK
    try:
        from google import genai
        client = genai.Client(api_key=gemini_key)
        for model_name in ['gemini-2.5-flash', 'gemini-flash-latest', 'gemini-3.6-flash']:
            try:
                response = client.models.generate_content(
                    model=model_name,
                    contents=prompt
                )
                if response and response.text:
                    return response.text.strip()
            except Exception as me:
                print(f"google.genai model {model_name} error: {me}")
    except Exception as e1:
        print(f"google.genai SDK import/init error: {e1}")

    # 2. Try legacy google.generativeai SDK
    try:
        import google.generativeai as genai_legacy
        genai_legacy.configure(api_key=gemini_key)
        for legacy_model in ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro']:
            try:
                g_model = genai_legacy.GenerativeModel(legacy_model)
                response = g_model.generate_content(prompt)
                if response and response.text:
                    return response.text.strip()
            except Exception as me2:
                print(f"google.generativeai model {legacy_model} error: {me2}")
    except Exception as e2:
        print(f"google.generativeai SDK import/init error: {e2}")

    return None

@chat_bp.route('/', methods=['POST'])
@chat_bp.route('', methods=['POST'])
@chat_bp.route('/query', methods=['POST'])
def chat():
    data = request.get_json() or {}
    user_msg = (data.get('message') or data.get('question') or '').strip()
    
    if not user_msg:
        return jsonify({'error': 'Message or question required'}), 400
        
    load_dotenv(override=True)
    ai_reply = None
    gemini_key = os.environ.get('GEMINI_API_KEY')
    
    # Attempt Gemini generation if key is provided
    if gemini_key and gemini_key.strip() and gemini_key != 'YOUR_GEMINI_API_KEY_HERE':
        ai_reply = generate_gemini_response(user_msg, gemini_key)

    # Fallback to enhanced match engine if Gemini failed or key missing
    if not ai_reply:
        match = find_best_knowledge_match(user_msg)
        if match:
            ai_reply = match
        else:
            ai_reply = (
                f"Regarding '{user_msg}': Effective financial planning involves matching your investment strategy "
                "with your time horizon and risk tolerance. For short-term goals (1-3 years), focus on capital preservation "
                "with High-Yield Savings or Bond ETFs (BND). For long-term growth (5+ years), consider broad index ETFs (VOO) "
                "and growth equities. Check out our XGBoost Price Forecaster in the Stock Detail tab for predictive market trend analysis!"
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
        'reply': ai_reply,
        'answer': ai_reply
    }), 200
