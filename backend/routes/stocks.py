from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import UserProfile
from ml.forecaster import generate_historical_prices, predict_stock_trend, PREDEFINED_BENCHMARKS

stocks_bp = Blueprint('stocks', __name__)

@stocks_bp.route('/recommendations', methods=['GET'])
@jwt_required()
def recommendations():
    current_user_id = get_jwt_identity()
    profile = UserProfile.query.filter_by(user_id=int(current_user_id)).first()
    
    risk_level = profile.risk_profile if profile else 'Medium'
    
    all_assets = [
        {'ticker': 'VOO', 'name': 'Vanguard S&P 500 ETF', 'type': 'ETF', 'risk': 'Low', 'expected_return': '8-10%', 'volatility': '16.81%', 'accuracy': '88.89%'},
        {'ticker': 'BND', 'name': 'Vanguard Total Bond Market ETF', 'type': 'Bond ETF', 'risk': 'Low', 'expected_return': '4-5%', 'volatility': '6.02%', 'accuracy': '97.97%'},
        {'ticker': 'AAPL', 'name': 'Apple Inc.', 'type': 'Stock', 'risk': 'Medium', 'expected_return': '12-15%', 'volatility': '27.43%', 'accuracy': '91.60%'},
        {'ticker': 'MSFT', 'name': 'Microsoft Corp.', 'type': 'Stock', 'risk': 'Medium', 'expected_return': '14-18%', 'volatility': '26.36%', 'accuracy': '92.91%'},
        {'ticker': 'NVDA', 'name': 'NVIDIA Corp.', 'type': 'Stock', 'risk': 'High', 'expected_return': '20-30%', 'volatility': '51.65%', 'accuracy': '76.17%'},
        {'ticker': 'TSLA', 'name': 'Tesla Inc.', 'type': 'Stock', 'risk': 'High', 'expected_return': '25-35%', 'volatility': '58.89%', 'accuracy': '94.79%'}
    ]
    
    if risk_level == 'Low':
        recs = [a for a in all_assets if a['risk'] in ['Low', 'Medium']][:4]
    elif risk_level == 'High':
        recs = [a for a in all_assets if a['risk'] in ['Medium', 'High']][:4]
    else:
        recs = [a for a in all_assets if a['risk'] in ['Low', 'Medium', 'High']][:4]
        
    return jsonify(recs), 200

@stocks_bp.route('/<ticker>/history', methods=['GET'])
def stock_history(ticker):
    history = generate_historical_prices(ticker, days=180)
    return jsonify({
        'ticker': ticker.upper(),
        'history': history
    }), 200

@stocks_bp.route('/<ticker>/predict', methods=['GET'])
def stock_predict(ticker):
    result = predict_stock_trend(ticker)
    return jsonify(result), 200
