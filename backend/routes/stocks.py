from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import UserProfile
from ml.forecaster import generate_historical_prices, predict_stock_trend, PREDEFINED_BENCHMARKS

stocks_bp = Blueprint('stocks', __name__)

@stocks_bp.route('/recommendations', methods=['GET'])
@jwt_required(optional=True)
def recommendations():
    current_user_id = get_jwt_identity()
    requested_risk = request.args.get('risk')
    
    risk_level = 'Medium'
    if requested_risk and requested_risk in ['Low', 'Medium', 'High']:
        risk_level = requested_risk
    elif current_user_id:
        try:
            profile = UserProfile.query.filter_by(user_id=int(current_user_id)).first()
            if profile and profile.risk_profile:
                risk_level = profile.risk_profile
        except Exception:
            pass
            
    all_assets = [
        {'ticker': 'VOO', 'name': 'Vanguard S&P 500 ETF', 'type': 'ETF', 'risk': 'Low', 'expected_return': '8-10%', 'volatility': '16.81%', 'accuracy': '88.89%'},
        {'ticker': 'BND', 'name': 'Vanguard Total Bond Market ETF', 'type': 'Bond ETF', 'risk': 'Low', 'expected_return': '4-5%', 'volatility': '6.02%', 'accuracy': '97.97%'},
        {'ticker': 'AAPL', 'name': 'Apple Inc.', 'type': 'Stock', 'risk': 'Medium', 'expected_return': '12-15%', 'volatility': '27.43%', 'accuracy': '91.60%'},
        {'ticker': 'MSFT', 'name': 'Microsoft Corp.', 'type': 'Stock', 'risk': 'Medium', 'expected_return': '14-18%', 'volatility': '26.36%', 'accuracy': '92.91%'},
        {'ticker': 'NVDA', 'name': 'NVIDIA Corp.', 'type': 'Stock', 'risk': 'High', 'expected_return': '20-30%', 'volatility': '51.65%', 'accuracy': '76.17%'},
        {'ticker': 'TSLA', 'name': 'Tesla Inc.', 'type': 'Stock', 'risk': 'High', 'expected_return': '25-35%', 'volatility': '58.89%', 'accuracy': '94.79%'}
    ]
    
    if risk_level == 'Low':
        recs = [a for a in all_assets if a['risk'] in ['Low', 'Medium']]
    elif risk_level == 'High':
        recs = [a for a in all_assets if a['risk'] in ['Medium', 'High']]
    else:
        recs = all_assets
        
    return jsonify(recs), 200

@stocks_bp.route('/<ticker>/history', methods=['GET'])
@stocks_bp.route('/history/<ticker>', methods=['GET'])
def stock_history(ticker):
    tf = request.args.get('timeframe', '1M')
    history = generate_historical_prices(ticker, timeframe=tf)
    return jsonify({
        'ticker': ticker.upper(),
        'timeframe': tf,
        'history': history
    }), 200

@stocks_bp.route('/<ticker>/predict', methods=['GET'])
@stocks_bp.route('/prediction/<ticker>', methods=['GET'])
def stock_predict(ticker):
    tf = request.args.get('timeframe', '1M')
    result = predict_stock_trend(ticker, timeframe=tf)
    
    # Flatten keys for frontend compatibility
    insight = result.get('insight', {})
    response_data = {
        'ticker': result.get('ticker'),
        'name': result.get('name'),
        'timeframe': result.get('timeframe'),
        'current_price': result.get('current_price'),
        'model_accuracy': insight.get('model_accuracy'),
        'volatility': insight.get('annualized_volatility'),
        'predicted_trend': insight.get('trend'),
        'predicted_slope': insight.get('predicted_slope'),
        'risk_level': insight.get('risk_level'),
        'insight': insight,
        'forecast': result.get('forecast'),
        'history_sample': result.get('history_sample')
    }
    return jsonify(response_data), 200
