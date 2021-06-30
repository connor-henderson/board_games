from flask import Blueprint, jsonify, session, request
from app.models import User, db


leaderboard_routes = Blueprint('leaderboards', __name__)

# ADD LOGIN REQUIRED TO ALL ROUTES

@leaderboard_routes.route('/')
def all_games():
    sudoku_scores = User.query.order_by(User.sudoku_score.desc()).with_entities(User.username, User.sudoku_score).limit(10).all()
    return jsonify([{ "name": "Sudoku", "scores": sudoku_scores }])

@leaderboard_routes.route('/<game_name>')
def one_game(game_name):
    if game_name == "sudoku":
        scores = User.query.order_by(User.sudoku_score.desc()).with_entities(User.username, User.sudoku_score).all()
        return { "name": "Sudoku", "scores": scores }
