from flask import Blueprint, jsonify

education_bp = Blueprint('education', __name__)

EDUCATION_MODULES = {
    'Beginner': [
        {
            'id': 'b1',
            'title': 'Stock Market Foundations & Equity Ownership',
            'category': 'Basics',
            'duration': '15 mins',
            'summary': 'Comprehensive guide on shares, stock exchanges, market vs limit orders, dividends, and equity ownership.',
            'content': [
                "A stock (also known as equity) represents fractional ownership in a corporation. When you purchase a share of stock in a public company like Apple or Microsoft, you become a shareholder, giving you a legal claim to a proportion of the company's assets and future earnings.",
                "Stock Exchanges & Orders: Stocks trade on centralized stock exchanges such as the New York Stock Exchange (NYSE) or NASDAQ. When buying or selling, investors use two primary order types: a Market Order (executes immediately at the current market price) and a Limit Order (executes only at a specified target price or better).",
                "How Investors Earn Returns: Shareholders generate wealth through two main mechanisms: 1) Capital Gains (selling a stock at a higher price than what you paid), and 2) Dividend Payouts (quarterly cash distributions paid by profitable corporations to reward shareholders)."
            ],
            'quiz': [
                {
                    'question': "What does owning a share of stock in a corporation grant you?",
                    'options': ["Fractional equity ownership and claim on earnings", "A guaranteed loan repayment from the bank", "Total legal control over company managers", "Immunity from market price drops"],
                    'correctIndex': 0,
                    'explanation': "A stock share represents fractional ownership of the company's equity and future earnings."
                },
                {
                    'question': "What is the difference between a Market Order and a Limit Order?",
                    'options': [
                        "Market Orders execute immediately at current price; Limit Orders execute at a target price or better",
                        "Limit Orders execute instantly; Market Orders take 3 days to process",
                        "Market Orders are only for buying bonds; Limit Orders are for buying cryptocurrency",
                        "There is no difference between them"
                    ],
                    'correctIndex': 0,
                    'explanation': "Market Orders execute right away at market prices, whereas Limit Orders specify an exact execution price constraint."
                },
                {
                    'question': "What are the two primary ways investors make money from stocks?",
                    'options': [
                        "Capital Gains and Dividend Payouts",
                        "Interest on savings and tax refunds",
                        "Bank fees and insurance claims",
                        "Lottery tickets and stock options only"
                    ],
                    'correctIndex': 0,
                    'explanation': "Investors earn returns when stock prices appreciate (Capital Gains) and when companies distribute cash profits (Dividends)."
                }
            ]
        },
        {
            'id': 'b2',
            'title': 'Index Funds, ETFs & Passive Wealth Building (VOO, BND)',
            'category': 'ETFs',
            'duration': '18 mins',
            'summary': 'Deep dive into Exchange-Traded Funds, broad-market index tracking, expense ratios, and asset diversification.',
            'content': [
                "What is an ETF? An Exchange-Traded Fund (ETF) is an investment fund traded on stock exchanges, much like individual stocks. An ETF holds a diversified basket of assets—such as stocks, bonds, or commodities—and tracks an underlying benchmark index.",
                "S&P 500 Index Funds (VOO): Vanguard S&P 500 ETF (VOO) holds shares in 500 of the largest, most established U.S. corporations across tech, healthcare, finance, and consumer sectors. Investing in VOO provides instant diversification, eliminating single-stock risk.",
                "Fixed Income & Bond ETFs (BND): Vanguard Total Bond Market ETF (BND) holds thousands of U.S. government and investment-grade corporate bonds. Fixed income ETFs pay regular interest yields and exhibit significantly lower price volatility (6.02% annualized) than stock funds, preserving capital."
            ],
            'quiz': [
                {
                    'question': "Why is buying an ETF like VOO generally safer than buying a single company stock?",
                    'options': [
                        "It spreads risk across 500 top companies instead of relying on one firm's performance",
                        "The government guarantees VOO will never lose value",
                        "VOO pays 50% dividend yields every month",
                        "ETFs do not trade on stock exchanges"
                    ],
                    'correctIndex': 0,
                    'explanation': "Broad-market ETFs provide instant diversification across hundreds of companies, drastically reducing single-company default risk."
                },
                {
                    'question': "What role does a Total Bond Market ETF (like BND) play in a portfolio?",
                    'options': [
                        "Provides high growth with extreme price swings",
                        "Offers capital preservation, fixed income yields, and low volatility",
                        "Replaces the need for a bank checking account",
                        "Eliminates federal taxes completely"
                    ],
                    'correctIndex': 1,
                    'explanation': "Bond ETFs like BND act as a stabilizing asset class, delivering regular interest payments with low annualized volatility."
                }
            ]
        },
        {
            'id': 'b3',
            'title': 'The Power of Exponential Compounding & Dollar-Cost Averaging',
            'category': 'Wealth Building',
            'duration': '14 mins',
            'summary': 'Master the mathematical principles of compound interest, long-term time horizons, and Dollar-Cost Averaging (DCA).',
            'content': [
                "The Compound Interest Mechanics: Compound interest is interest earned not only on your initial investment principal but also on all accumulated interest from previous periods. Over long periods (20 to 30 years), exponential growth causes investment earnings to outweigh annual contributions.",
                "Dollar-Cost Averaging (DCA): DCA is an investment strategy where an investor divides up the total amount to be invested into periodic purchases of a target asset (e.g. $500 every month) regardless of asset price. DCA removes emotion, automatically buying more shares when prices drop and fewer shares when prices rise.",
                "Emergency Reserve Foundation: Before investing aggressively in equities, financial advisors recommend keeping 3 to 6 months of essential living expenses in a high-yield liquid savings account to prevent selling investments during market downturns."
            ],
            'quiz': [
                {
                    'question': "How does Dollar-Cost Averaging (DCA) protect investors during market downturns?",
                    'options': [
                        "By automatically purchasing more shares at lower prices when the market drops",
                        "By guaranteeing a fixed 10% annual return from the government",
                        "By selling all stocks as soon as prices drop 5%",
                        "By converting all cash into gold bars"
                    ],
                    'correctIndex': 0,
                    'explanation': "DCA invests fixed dollar amounts regularly, ensuring you buy more shares when prices are cheap and fewer when expensive."
                },
                {
                    'question': "Why should investors establish an emergency fund before investing in stocks?",
                    'options': [
                        "To avoid forced liquidation of stock investments during unexpected personal financial needs",
                        "Because stock markets close every winter",
                        "To pay for trading commissions",
                        "Because emergency funds earn higher returns than stocks"
                    ],
                    'correctIndex': 0,
                    'explanation': "An emergency fund handles short-term cash needs so you never have to sell long-term stock positions at a loss."
                }
            ]
        }
    ],
    'Intermediate': [
        {
            'id': 'i1',
            'title': 'Modern Portfolio Theory, Risk Profiles & Rebalancing',
            'category': 'Portfolio Management',
            'duration': '20 mins',
            'summary': 'Learn asset allocation strategies, target risk tolerance profiles (Low, Medium, High), and systematic portfolio rebalancing.',
            'content': [
                "Modern Portfolio Theory (MPT): Pioneered by Nobel laureate Harry Markowitz, MPT demonstrates that an asset's risk and return should not be assessed alone, but by how it contributes to an overall portfolio's risk and return profile.",
                "Risk Profiles & Asset Allocation: Portfolios are tailored to investor risk tolerance: 1) Low Risk (e.g., 70% BND / 30% VOO) emphasizes capital preservation, 2) Medium Risk (e.g., 60% VOO / 20% AAPL / 20% BND) balances growth and income, and 3) High Risk (e.g., 80% Growth Tech / 20% Emerging AI) seeks maximum capital appreciation.",
                "Systematic Rebalancing: Over time, outperforming assets grow to represent a larger percentage of your portfolio than intended. Rebalancing involves periodically selling a portion of overperforming assets and buying underperforming assets to restore original target risk weightings."
            ],
            'quiz': [
                {
                    'question': "What is the primary objective of systematic portfolio rebalancing?",
                    'options': [
                        "To restore the portfolio back to its target risk and asset allocation weightings",
                        "To double the number of stock trades every day",
                        "To avoid paying capital gains taxes permanently",
                        "To convert all equity holdings into corporate bonds"
                    ],
                    'correctIndex': 0,
                    'explanation': "Rebalancing prevents your portfolio from becoming overly risky when certain equities outgrow their target allocation percentage."
                },
                {
                    'question': "Which asset allocation best fits a Low-Risk investor prioritizing capital preservation?",
                    'options': [
                        "70% Total Bond Market ETF (BND) / 30% S&P 500 ETF (VOO)",
                        "100% High-volatility cryptocurrency",
                        "90% NVIDIA / 10% Tesla",
                        "0% Cash / 100% Options"
                    ],
                    'correctIndex': 0,
                    'explanation': "A heavy allocation to fixed-income bond funds combined with core index ETFs maintains capital preservation while capturing modest inflation-hedged growth."
                }
            ]
        },
        {
            'id': 'i2',
            'title': 'Fundamental Analysis & Valuation Metrics (P/E, Market Cap, EPS)',
            'category': 'Fundamental Analysis',
            'duration': '22 mins',
            'summary': 'Master fundamental financial analysis metrics used by Wall Street to evaluate stock intrinsic value.',
            'content': [
                "Price-to-Earnings (P/E) Ratio: P/E compares a company's share price to its net earnings per share (EPS). A high P/E ratio indicates that investors expect higher earnings growth in the future compared to companies with a lower P/E ratio.",
                "Earnings Per Share (EPS): EPS represents a company's net profit divided by the total number of outstanding common shares. Rising EPS over multiple consecutive quarters signals improving business profitability.",
                "Growth vs Value Valuations: Value stocks (e.g., banks, utilities) trade at lower P/E ratios relative to book value and often pay stable dividends. Growth stocks (e.g., software, AI hardware) trade at elevated P/E multiples because their revenue is growing rapidly."
            ],
            'quiz': [
                {
                    'question': "How is the Price-to-Earnings (P/E) ratio calculated?",
                    'options': [
                        "Current Share Price divided by Earnings Per Share (EPS)",
                        "Total Revenue divided by Total Liabilities",
                        "Annual Dividend divided by Stock Price",
                        "Market Cap multiplied by Volume"
                    ],
                    'correctIndex': 0,
                    'explanation': "P/E Ratio = Share Price / Earnings Per Share (EPS)."
                },
                {
                    'question': "Why do fast-growing technology companies often trade at high P/E multiples?",
                    'options': [
                        "Investors are willing to pay a premium expecting substantial future revenue and profit growth",
                        "High P/E ratios mean the company is about to go bankrupt",
                        "Tech companies are required by law to have P/E ratios over 50",
                        "High P/E ratios mean the stock pays massive cash dividends"
                    ],
                    'correctIndex': 0,
                    'explanation': "High P/E ratios reflect investor optimism and willingness to pay higher prices today for anticipated rapid future earnings expansion."
                }
            ]
        },
        {
            'id': 'i3',
            'title': 'Technical Analysis: Moving Averages (SMA_20, SMA_50) & Trend Signals',
            'category': 'Technical Analysis',
            'duration': '18 mins',
            'summary': 'Analyze stock charts, Simple Moving Averages, Golden Cross signals, and support/resistance levels.',
            'content': [
                "Simple Moving Average (SMA): An SMA smooths out short-term price noise by calculating the average closing price over a specific number of periods (e.g. 20 days or 50 days). A rising SMA confirms an established upward price trend.",
                "Golden Cross vs Death Cross: A Golden Cross occurs when a short-term moving average (e.g., 20-day SMA) crosses above a longer-term moving average (e.g., 50-day SMA), signaling bullish momentum. Conversely, a Death Cross occurs when the short-term SMA crosses below the long-term SMA, signaling potential bearish decline.",
                "Support and Resistance: Support is a price level where a downtrend can be expected to pause due to a concentration of demand. Resistance is a price level where an uptrend can be expected to pause temporarily due to selling pressure."
            ],
            'quiz': [
                {
                    'question': "What technical chart signal occurs when a 20-day SMA crosses above a 50-day SMA?",
                    'options': [
                        "Golden Cross (Bullish Signal)",
                        "Death Cross (Bearish Signal)",
                        "Double Bottom Reversal",
                        "Short Squeeze"
                    ],
                    'correctIndex': 0,
                    'explanation': "A Golden Cross occurs when short-term moving average crosses above long-term moving average, indicating bullish upward momentum."
                }
            ]
        }
    ],
    'Advanced': [
        {
            'id': 'a1',
            'title': 'Quantitative AI & XGBoost Regressor Price Forecasting',
            'category': 'Quantitative AI',
            'duration': '25 mins',
            'summary': 'Deep dive into decision-tree gradient boosting, temporal lag features, and out-of-sample MAPE evaluation.',
            'content': [
                "XGBoost Architecture: Extreme Gradient Boosting (XGBoost) is an optimized distributed gradient boosting library designed for high efficiency and accuracy. It builds an ensemble of shallow decision trees sequentially, where each new tree corrects errors made by previous trees.",
                "Feature Engineering in Financial Time Series: FinGuide AI feeds technical indicators into XGBoost, including 20-day Simple Moving Average (SMA_20), annualized volatility, price slopes, and lag features ($Close_{t-1}, Close_{t-2}$). Lag features allow decision trees to capture temporal autocorrelation and price momentum.",
                "Model Accuracy Evaluation: Models are trained on the first 80% (4 years) of historical daily market sequences and evaluated on the remaining 20% (1 year) of unseen out-of-sample test data using Mean Absolute Percentage Error (MAPE). Model Accuracy is defined as: Accuracy = (1 - MAPE) * 100."
            ],
            'quiz': [
                {
                    'question': "In FinGuide AI's XGBoost forecaster, how is out-of-sample Model Accuracy calculated?",
                    'options': [
                        "(1 - MAPE) * 100 evaluated on unseen 20% test data",
                        "Checking past 1-day change only",
                        "Random guessing against the S&P 500",
                        "Highest historical stock price point"
                    ],
                    'correctIndex': 0,
                    'explanation': "Model Accuracy = (1 - Mean Absolute Percentage Error) * 100 evaluated strictly on unseen out-of-sample testing data."
                },
                {
                    'question': "Why are lag features (e.g., Close_{t-1}) critical in quantitative price forecasting?",
                    'options': [
                        "They allow decision trees to capture sequential momentum and temporal autocorrelation in price trends",
                        "They eliminate the need for computer memory",
                        "They guarantee 100% profit on every trade",
                        "They convert equity data into corporate debt"
                    ],
                    'correctIndex': 0,
                    'explanation': "Lag features provide sequential memory of recent price points, enabling decision trees to model momentum and trend direction."
                }
            ]
        },
        {
            'id': 'a2',
            'title': 'Annualized Volatility, Sharpe Ratio & Risk Management',
            'category': 'Quantitative Analytics',
            'duration': '22 mins',
            'summary': 'Formulas for annualized standard deviation, Sharpe ratios, Maximum Drawdown (MDD), and Value at Risk (VaR).',
            'content': [
                "Annualized Volatility Calculation: Volatility measures the dispersion of returns for a given security. For daily closing price returns $r_t$, annualized volatility is calculated as the standard deviation of daily log returns multiplied by the square root of 252 trading days: Volatility = StdDev(r_t) * sqrt(252).",
                "The Sharpe Ratio Metric: The Sharpe Ratio quantifies risk-adjusted return relative to the risk-free rate per unit of volatility: Sharpe = (R_p - R_f) / Volatility. A Sharpe ratio > 1.0 indicates good risk-adjusted returns, while > 2.0 indicates exceptional performance.",
                "Maximum Drawdown (MDD) & VaR: Maximum Drawdown measures the maximum peak-to-trough decline of an asset before a new peak is attained. Value at Risk (VaR 95%) calculates the maximum loss expected over a given timeframe at a 95% statistical confidence level."
            ],
            'quiz': [
                {
                    'question': "What is the formula for calculating annualized volatility from daily return standard deviation?",
                    'options': [
                        "StdDev(Daily Returns) × √252",
                        "Average price divided by 365",
                        "Total stock volume divided by Market Cap",
                        "Maximum price minus Minimum price"
                    ],
                    'correctIndex': 0,
                    'explanation': "Annualized Volatility = Daily Standard Deviation × √252 (the number of trading days in a U.S. market year)."
                },
                {
                    'question': "What does a Sharpe Ratio greater than 1.0 indicate?",
                    'options': [
                        "The portfolio generates attractive excess returns relative to the risk taken",
                        "The portfolio has lost money over the past year",
                        "The risk-free rate is negative",
                        "The stock has zero volatility"
                    ],
                    'correctIndex': 0,
                    'explanation': "A Sharpe Ratio > 1.0 indicates that the portfolio offers solid excess return above the risk-free benchmark for every unit of volatility risk."
                }
            ]
        },
        {
            'id': 'a3',
            'title': 'Macroeconomics, FOMC Rate Decisions & Quantitative Tightening (QT)',
            'category': 'Macroeconomics',
            'duration': '24 mins',
            'summary': 'Analyze Federal Reserve FOMC monetary policy shifts, CPI inflation data, rate decisions, and central bank balance sheet contraction.',
            'content': [
                "Federal Open Market Committee (FOMC): The FOMC sets U.S. monetary policy, including the target federal funds rate. When the Fed raises rates to combat inflation, borrowing costs increase for consumers and businesses, raising discount rates used in discounted cash flow (DCF) equity valuation models.",
                "Impact of Rate Hikes on Equities vs Bonds: High interest rates compress equity valuations—particularly high-growth tech stocks whose cash flows lie in the distant future. Bond yields rise as rate hikes occur, causing existing bond prices to decline.",
                "Quantitative Easing (QE) vs Quantitative Tightening (QT): Under QT, central banks contract their balance sheets by letting bonds mature without reinvestment, absorbing liquidity from financial markets. Under QE, central banks purchase treasuries and mortgage bonds, injecting liquidity to stimulate economic activity."
            ],
            'quiz': [
                {
                    'question': "How does Federal Reserve Quantitative Tightening (QT) affect market liquidity?",
                    'options': [
                        "It contracts the central bank balance sheet, removing liquidity from financial markets",
                        "It increases cash supply in commercial bank vaults",
                        "It lowers federal funds rates to zero percent",
                        "It guarantees stock indices will reach record highs"
                    ],
                    'correctIndex': 0,
                    'explanation': "QT reduces central bank bond holdings, pulling money reserves out of financial institutions and contracting market liquidity."
                }
            ]
        }
    ]
}

@education_bp.route('/modules', methods=['GET'])
def get_modules():
    return jsonify(EDUCATION_MODULES), 200
