from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('<int:user_id>/games/<game_name>', methods=['PATCH'])
def game_score(user_id, game_name):
    user = User.query.get(user_id)

    if game_name == "sudoku":
        user.sudoku_score = user.sudoku_score + 50
        db.session.commit()

    return user.to_dict()
