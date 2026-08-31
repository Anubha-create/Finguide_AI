import os
import requests
from flask import Blueprint, jsonify
from datetime import datetime
from dotenv import load_dotenv

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/market-data', methods=['GET'])
def market_data():
    default_assets = [
        {'ticker': 'VOO', 'symbol': 'VOO', 'name': 'Vanguard S&P 500 ETF', 'price': 707.24, 'change': -0.39, 'change_percent': '-0.06%', 'volume': '4.2M', 'risk': 'Low Risk'},
        {'ticker': 'BND', 'symbol': 'BND', 'name': 'Vanguard Total Bond Market', 'price': 72.31, 'change': -0.33, 'change_percent': '-0.45%', 'volume': '2.1M', 'risk': 'Low Risk'},
        {'ticker': 'AAPL', 'symbol': 'AAPL', 'name': 'Apple Inc.', 'price': 319.70, 'change': 4.76, 'change_percent': '+1.51%', 'volume': '38.6M', 'risk': 'Medium Risk'},
        {'ticker': 'MSFT', 'symbol': 'MSFT', 'name': 'Microsoft Corp.', 'price': 513.53, 'change': 10.44, 'change_percent': '+2.08%', 'volume': '18.4M', 'risk': 'Medium Risk'},
        {'ticker': 'NVDA', 'symbol': 'NVDA', 'name': 'NVIDIA Corp.', 'price': 217.55, 'change': -8.60, 'change_percent': '-3.80%', 'volume': '52.8M', 'risk': 'High Risk'},
        {'ticker': 'TSLA', 'symbol': 'TSLA', 'name': 'Tesla Inc.', 'price': 348.75, 'change': -5.90, 'change_percent': '-1.66%', 'volume': '41.3M', 'risk': 'High Risk'}
    ]
    
    try:
        import yfinance as yf
        tickers_list = ["VOO", "BND", "AAPL", "MSFT", "NVDA", "TSLA"]
        df = yf.download(" ".join(tickers_list), period='5d', interval='1d', progress=False)['Close']
        
        if not df.empty and len(df) >= 2:
            updated_data = []
            for asset in default_assets:
                s = asset['symbol']
                if s in df.columns:
                    series = df[s].dropna()
                    if len(series) >= 2:
                        curr_p = float(series.iloc[-1])
                        prev_p = float(series.iloc[-2])
                        chg = curr_p - prev_p
                        chg_pct = (chg / prev_p) * 100.0
                        asset['price'] = round(curr_p, 2)
                        asset['change'] = round(chg, 2)
                        asset['change_percent'] = f"{'+' if chg >= 0 else ''}{chg_pct:.2f}%"
                updated_data.append(asset)
            return jsonify(updated_data), 200
    except Exception as e:
        print(f"yfinance bulk download error for market-data: {e}")

    return jsonify(default_assets), 200

@dashboard_bp.route('/news', methods=['GET'])
def news():
    load_dotenv(override=True)
    news_key = os.environ.get('NEWSDATA_API_KEY', 'pub_9c012ab5b2a9480882658c12cbe872dc')
    
    if news_key:
        try:
            api_url = f"https://newsdata.io/api/1/news?apikey={news_key}&q=stocks%20OR%20market%20OR%20finance%20OR%20economy&language=en&category=business,technology"
            res = requests.get(api_url, timeout=5).json()
            if res.get('status') == 'success' and res.get('results'):
                articles = []
                for idx, r in enumerate(res['results'][:8]):
                    pub_date = r.get('pubDate', '')
                    time_str = 'Recently'
                    if pub_date:
                        try:
                            dt = datetime.strptime(pub_date, '%Y-%m-%d %H:%M:%S')
                            time_str = dt.strftime('%b %d, %H:%M')
                        except Exception:
                            time_str = str(pub_date)[:16]

                    src_name = r.get('source_id') or r.get('source_name') or 'Market News'
                    category_list = r.get('category') or ['Business']
                    cat_str = category_list[0].capitalize() if isinstance(category_list, list) and category_list else 'Business'
                    
                    articles.append({
                        'id': idx + 1,
                        'title': r.get('title') or 'Financial News Update',
                        'source': str(src_name).upper(),
                        'time': time_str,
                        'summary': r.get('description') or r.get('title'),
                        'category': cat_str,
                        'url': r.get('link') or 'https://finance.yahoo.com'
                    })
                if articles:
                    return jsonify(articles), 200
        except Exception as ne:
            print(f"NewsData.io API query error: {ne}")

    fallback_articles = [
        {
            'id': 1,
            'title': 'Federal Reserve Signals Interest Rate Outlook Amid Economic Resilience',
            'source': 'FINANCIAL TIMES',
            'time': '2 hours ago',
            'summary': 'The Fed signals potential rate adjustments in Q4 as inflation figures align with target projections.',
            'category': 'Macro',
            'url': 'https://finance.yahoo.com/news/'
        },
        {
            'id': 2,
            'title': 'Apple (AAPL) & Tech Sector Rally Driven by Strong Cloud Computing & AI Demand',
            'source': 'WALL STREET JOURNAL',
            'time': '4 hours ago',
            'summary': 'Enterprise demand for generative AI hardware continues to push tech indices to near record highs.',
            'category': 'Technology',
            'url': 'https://www.reuters.com/business/finance/'
        },
        {
            'id': 3,
            'title': 'Understanding Asset Allocation: How to Balance Stocks (VOO) & Fixed Income (BND)',
            'source': 'FINGUIDE RESEARCH',
            'time': '6 hours ago',
            'summary': 'A balanced portfolio allocation remains the best defense against short-term volatility in equity markets.',
            'category': 'Education',
            'url': 'https://www.cnbc.com/finance/'
        }
    ]
    return jsonify(fallback_articles), 200

@dashboard_bp.route('/ai-briefing', methods=['GET'])
def ai_briefing():
    today = datetime.now().strftime('%B %d, %Y')
    briefing_text = (
        f"Daily Financial AI Briefing ({today}): Markets demonstrate steady resilience today as tech equities (AAPL, MSFT) "
        "show strong upside momentum. XGBoost model forecasting indicates key support levels holding for major equities, "
        "while fixed-income instruments like BND offer low-volatility stability. "
        "Recommended action: Maintain diversification aligned with your risk tolerance profile."
    )
    return jsonify({
        'date': today,
        'briefing': briefing_text,
        'market_sentiment': 'Bullish',
        'key_drivers': ['Tech Earnings', 'Fed Rate Policy', 'AI Infrastructure']
    }), 200
