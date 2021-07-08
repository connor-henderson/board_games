from flask import Blueprint, jsonify, session, request
from app.models import User, db


leaderboard_routes = Blueprint('leaderboards', __name__)

# ADD LOGIN REQUIRED TO ALL ROUTES


@leaderboard_routes.route('/')
def all_games():
    sudoku_scores = User.query.order_by(User.sudoku_score.desc()).with_entities(
        User.username, User.sudoku_score).limit(10).all()
    chess_scores = User.query.order_by(User.chess_score.desc()).with_entities(
        User.username, User.chess_score).limit(10).all()
    game_of_life_scores = User.query.order_by(User.game_of_life_score.desc(
    )).with_entities(User.username, User.game_of_life_score).limit(10).all()
    go_scores = User.query.order_by(User.go_score.desc()).with_entities(
        User.username, User.go_score).limit(10).all()
    all_overall_scores = getOverall()
    overall_scores = all_overall_scores[0:10]

    all_scores = [{"name": "Overall", "scores": overall_scores},
                  {"name": "Sudoku", "scores": sudoku_scores},
                  {"name": "Chess", "scores": chess_scores},
                  {"name": "Game of Life", "scores": game_of_life_scores},
                  {"name": "Go", "scores": go_scores},
                  ]

    return jsonify(all_scores)


@leaderboard_routes.route('/<game_name>')
def one_game(game_name):
    if game_name == "sudoku":
        scores = User.query.order_by(User.sudoku_score.desc()).with_entities(
            User.username, User.sudoku_score).all()
        return {"name": "Sudoku", "scores": scores}
    elif game_name == "chess":
        scores = User.query.order_by(User.chess_score.desc()).with_entities(
            User.username, User.chess_score).all()
        return {"name": "Chess", "scores": scores}
    elif game_name == "game_of_life":
        scores = User.query.order_by(User.game_of_life_score.desc()).with_entities(
            User.username, User.game_of_life_score).all()
        return {"name": "Game of Life", "scores": scores}
    elif game_name == "go":
        scores = User.query.order_by(User.go_score.desc()).with_entities(
            User.username, User.go_score).all()
        return {"name": "Go", "scores": scores}
    elif game_name == "overall":
        scores = getOverall()
        return {"name": "Overall", "scores": scores}


def getOverall():
    users = User.query.all()
    scores = []
    for user in users:
        overall_score = user.go_score + user.sudoku_score + \
            user.game_of_life_score + user.chess_score
        scores.append([user.username, overall_score])
    scores.sort(reverse=True, key=lambda x: x[1])

    return scores
