from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, UserProfile, User

user_bp = Blueprint('user', __name__)

@user_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    current_user_id = get_jwt_identity()
    profile = UserProfile.query.filter_by(user_id=int(current_user_id)).first()
    user = User.query.get(int(current_user_id))
    
    if not profile:
        profile = UserProfile(user_id=int(current_user_id), name=user.username if user else 'User')
        db.session.add(profile)
        db.session.commit()
        
    return jsonify({
        'user_id': profile.user_id,
        'username': user.username if user else '',
        'name': profile.name,
        'age': profile.age,
        'investing_experience': profile.investing_experience,
        'investment_goals': profile.investment_goals,
        'investment_horizon': profile.investment_horizon,
        'risk_score': profile.risk_score,
        'risk_profile': profile.risk_profile
    }), 200

@user_bp.route('/update', methods=['POST'])
@jwt_required()
def update_profile():
    current_user_id = get_jwt_identity()
    data = request.get_json() or {}
    
    profile = UserProfile.query.filter_by(user_id=int(current_user_id)).first()
    if not profile:
        profile = UserProfile(user_id=int(current_user_id))
        db.session.add(profile)
        
    if 'name' in data:
        profile.name = data['name']
    if 'age' in data:
        profile.age = int(data['age'])
    if 'investing_experience' in data:
        profile.investing_experience = data['investing_experience']
    if 'investment_goals' in data:
        profile.investment_goals = data['investment_goals']
    if 'investment_horizon' in data:
        profile.investment_horizon = data['investment_horizon']
    if 'risk_profile' in data:
        profile.risk_profile = data['risk_profile']
        
    db.session.commit()
    return jsonify({'message': 'Profile updated successfully', 'risk_profile': profile.risk_profile}), 200

@user_bp.route('/risk-assessment', methods=['POST'])
@jwt_required()
def risk_assessment():
    current_user_id = get_jwt_identity()
    data = request.get_json() or {}
    
    score = data.get('score', 10)
    
    if score <= 8:
        risk_profile = 'Low'
    elif score <= 14:
        risk_profile = 'Medium'
    else:
        risk_profile = 'High'
        
    profile = UserProfile.query.filter_by(user_id=int(current_user_id)).first()
    if profile:
        profile.risk_score = score
        profile.risk_profile = risk_profile
        db.session.commit()
        
    return jsonify({
        'risk_score': score,
        'risk_profile': risk_profile,
        'recommendation_summary': f'Based on your score of {score}, your risk profile is evaluated as {risk_profile}.'
    }), 200
