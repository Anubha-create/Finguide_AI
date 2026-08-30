from flask import Blueprint, jsonify
from datetime import datetime

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/market-data', methods=['GET'])
def market_data():
    data = [
        {'ticker': 'VOO', 'name': 'Vanguard S&P 500 ETF', 'price': 482.45, 'change': +1.25, 'change_percent': '+0.26%', 'volume': '4.2M', 'risk': 'Low'},
        {'ticker': 'BND', 'name': 'Vanguard Total Bond Market', 'price': 72.80, 'change': -0.12, 'change_percent': '-0.16%', 'volume': '2.1M', 'risk': 'Low'},
        {'ticker': 'AAPL', 'name': 'Apple Inc.', 'price': 224.30, 'change': +3.40, 'change_percent': '+1.54%', 'volume': '35.1M', 'risk': 'Medium'},
        {'ticker': 'MSFT', 'name': 'Microsoft Corp.', 'price': 446.75, 'change': +5.10, 'change_percent': '+1.15%', 'volume': '18.4M', 'risk': 'Medium'},
        {'ticker': 'NVDA', 'name': 'NVIDIA Corp.', 'price': 126.50, 'change': -2.15, 'change_percent': '-1.67%', 'volume': '52.8M', 'risk': 'High'},
        {'ticker': 'TSLA', 'name': 'Tesla Inc.', 'price': 212.10, 'change': +4.80, 'change_percent': '+2.32%', 'volume': '41.3M', 'risk': 'High'}
    ]
    return jsonify(data), 200

@dashboard_bp.route('/news', methods=['GET'])
def news():
    articles = [
        {
            'id': 1,
            'title': 'Federal Reserve Keeps Interest Rates Steady Amid Economic Resilience',
            'source': 'Financial Times',
            'time': '2 hours ago',
            'summary': 'The Fed signals potential rate adjustments in Q4 as inflation figures align with target projections.',
            'category': 'Macro Economy'
        },
        {
            'id': 2,
            'title': 'Tech Sector Rallies Driven by Strong Cloud Computing & AI Infrastructure Spending',
            'source': 'Wall Street Journal',
            'time': '4 hours ago',
            'summary': 'Enterprise demand for generative AI hardware continues to push tech indices to near record highs.',
            'category': 'Technology'
        },
        {
            'id': 3,
            'title': 'Understanding Asset Allocation: How to Balance Stocks & Fixed Income in 2026',
            'source': 'FinGuide Research',
            'time': '6 hours ago',
            'summary': 'A balanced portfolio allocation remains the best defense against short-term volatility in equity markets.',
            'category': 'Educational'
        }
    ]
    return jsonify(articles), 200

@dashboard_bp.route('/ai-briefing', methods=['GET'])
def ai_briefing():
    today = datetime.now().strftime('%B %d, %Y')
    briefing_text = (
        f"Daily Financial AI Briefing ({today}): Markets demonstrate steady resilience today as tech and index ETFs (VOO, MSFT) "
        "show strong upside momentum. XGBoost model forecasting indicates key support levels holding for major equities, "
        "while fixed-income instruments like BND offer low-volatility stability (6.02% annualized volatility). "
        "Recommended action: Maintain diversification aligned with your risk tolerance profile."
    )
    return jsonify({
        'date': today,
        'briefing': briefing_text,
        'market_sentiment': 'Bullish',
        'key_drivers': ['Tech Earnings', 'Fed Rate Policy', 'AI Infrastructure']
    }), 200
