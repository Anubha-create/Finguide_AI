from flask import Blueprint, jsonify

education_bp = Blueprint('education', __name__)

EDUCATION_MODULES = {
    'Beginner': [
        {
            'id': 'b1',
            'title': 'Stock Market Basics & Fundamentals',
            'category': 'Basics',
            'duration': '10 mins',
            'summary': 'Learn how public companies issue shares, how stock exchanges work, and how market supply & demand determines share prices.',
            'content': 'A stock (also known as equity) represents fractional ownership in a corporation. When you buy a share of stock, you own a tiny slice of that company. Stocks are traded on stock exchanges like NASDAQ or NYSE. Investors earn returns through price appreciation (capital gains) and quarterly dividend payouts.'
        },
        {
            'id': 'b2',
            'title': 'Understanding ETFs & Index Funds (VOO, BND)',
            'category': 'ETFs',
            'duration': '12 mins',
            'summary': 'Discover why broad-market index ETFs like VOO (S&P 500) and BND (Total Bond Market) are essential core holdings for long-term investors.',
            'content': 'An Exchange-Traded Fund (ETF) is a basket of assets that trades on an exchange just like a single stock. Instead of picking individual stocks, buying an ETF like VOO gives you instant exposure to 500 top US companies, dramatically lowering single-stock risk at an extremely low expense ratio.'
        },
        {
            'id': 'b3',
            'title': 'The Magic of Compound Interest & Time Horizon',
            'category': 'Wealth Building',
            'duration': '8 mins',
            'summary': 'Explore how compounding interest accelerates wealth accumulation exponentially over 10, 20, and 30-year investment horizons.',
            'content': 'Compound interest is interest calculated on the initial principal as well as all accumulated interest from previous periods. Albert Einstein famously called compound interest the eighth wonder of the world. Starting early, even with modest monthly contributions, leads to dramatic long-term wealth creation.'
        }
    ],
    'Intermediate': [
        {
            'id': 'i1',
            'title': 'Risk vs Return & Portfolio Diversification',
            'category': 'Portfolio Management',
            'duration': '15 mins',
            'summary': 'Master Modern Portfolio Theory (MPT) to balance risk and expected return using stock/bond asset allocation.',
            'content': 'Diversification is the strategy of spreading your investments across asset classes (equities, fixed income, commodities) so that a drop in one asset does not crash your entire portfolio. A low-risk investor might hold 70% BND / 30% VOO, while a medium-risk investor holds 80% VOO / 20% Tech Equities.'
        },
        {
            'id': 'i2',
            'title': 'Evaluating Stocks: P/E Ratio, Market Cap & Financials',
            'category': 'Fundamental Analysis',
            'duration': '18 mins',
            'summary': 'Learn key financial metrics used by Wall Street analysts to determine whether a stock is undervalued or overvalued.',
            'content': 'Price-to-Earnings (P/E) ratio compares a stock price to its earnings per share (EPS). A lower P/E may indicate value, while high P/E (like tech stocks) reflects high future growth expectations. Combining P/E with revenue growth and debt ratios gives a clear picture of company health.'
        },
        {
            'id': 'i3',
            'title': 'Technical Analysis: Simple & Exponential Moving Averages',
            'category': 'Technical Analysis',
            'duration': '14 mins',
            'summary': 'Use SMA_20 and SMA_50 moving averages to identify support levels, resistance barriers, and trend reversals.',
            'content': 'A Moving Average smooths out price fluctuations to show clear trend direction. A Simple Moving Average (SMA_20) calculates the average price over 20 periods. When a short-term SMA crosses above a long-term SMA (Golden Cross), it signals strong bullish momentum.'
        }
    ],
    'Advanced': [
        {
            'id': 'a1',
            'title': 'XGBoost Machine Learning Price Forecasting Algorithms',
            'category': 'Quantitative AI',
            'duration': '22 mins',
            'summary': 'Understand decision-tree gradient boosting, feature engineering, and out-of-sample MAPE evaluation metrics in FinGuide AI.',
            'content': 'FinGuide AI utilizes XGBoost Regressor models trained on 5-year historical price sequences, moving average spreads, and volatility indicators. By evaluating models on unseen out-of-sample data using Mean Absolute Percentage Error (MAPE = (1 - MAPE) * 100), our engine generates 30-day predicted trajectories with up to 97.97% accuracy.'
        },
        {
            'id': 'a2',
            'title': 'Annualized Volatility, Sharpe Ratio & Risk Management',
            'category': 'Quantitative Analytics',
            'duration': '20 mins',
            'summary': 'Calculate annualized standard deviation, Sharpe ratios, and Maximum Drawdown to protect portfolio capital during black swan market events.',
            'content': 'Annualized volatility measures the dispersion of daily returns over 252 trading days. Low-volatility assets like BND (6.02%) offer stability, whereas high-volatility assets like NVDA (51.65%) or TSLA (58.89%) experience wide price swings. The Sharpe Ratio evaluates risk-adjusted return relative to risk-free treasury yields.'
        },
        {
            'id': 'a3',
            'title': 'Macroeconomic Indicators & Fed Interest Rate Policy',
            'category': 'Macroeconomics',
            'duration': '25 mins',
            'summary': 'Analyze how Federal Reserve FOMC rate decisions, CPI inflation reports, and yield curves impact equity and bond market valuations.',
            'content': 'Interest rates set by central banks dictate borrowing costs and discount rates for corporate cash flows. When interest rates rise, bond prices fall and equity valuations compress, particularly growth stocks. Understanding FOMC monetary policy shifts is vital for institutional macro positioning.'
        }
    ]
}

@education_bp.route('/modules', methods=['GET'])
def get_modules():
    return jsonify(EDUCATION_MODULES), 200
