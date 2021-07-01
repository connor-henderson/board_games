from werkzeug.security import generate_password_hash
from app.models import db, User
import random


# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(username='Demo', email='demo@aa.io',
                password='password')
    ex1 = User(username='Axolotl', email='1@aa.io',
                password='password', sudoku_score=random.randrange(0,600,30),
                chess_score=random.randrange(0, 500, 50), game_of_life_score=random.randrange(0,100,1),
                go_score=random.randrange(0,700,70))
    ex2 = User(username='Alan Walker', email='2@aa.io',
                password='password', sudoku_score=random.randrange(0,600,30),
                chess_score=random.randrange(0, 500, 50), game_of_life_score=random.randrange(0,100,1),
                go_score=random.randrange(0,700,70))
    ex3 = User(username='Severus Snape', email='3@aa.io',
                password='password', sudoku_score=random.randrange(0,600,30),
                chess_score=random.randrange(0, 500, 50), game_of_life_score=random.randrange(0,100,1),
                go_score=random.randrange(0,700,70))
    ex4 = User(username='(Captain) Jack Sparrow', email='4@aa.io',
                password='password', sudoku_score=random.randrange(0,600,30),
                chess_score=random.randrange(0, 500, 50), game_of_life_score=random.randrange(0,100,1),
                go_score=random.randrange(0,700,70))
    ex5 = User(username='user32094', email='5@aa.io',
                password='password', sudoku_score=random.randrange(0,600,30),
                chess_score=random.randrange(0, 500, 50), game_of_life_score=random.randrange(0,100,1),
                go_score=random.randrange(0,700,70))
    ex6 = User(username='trail_runner', email='6@aa.io',
                password='password', sudoku_score=random.randrange(0,600,30),
                chess_score=random.randrange(0, 500, 50), game_of_life_score=random.randrange(0,100,1),
                go_score=random.randrange(0,700,70))
    ex7 = User(username='SudokuPlayer2', email='7@aa.io',
                password='password', sudoku_score=random.randrange(0,600,30),
                chess_score=random.randrange(0, 500, 50), game_of_life_score=random.randrange(0,100,1),
                go_score=random.randrange(0,700,70))
    ex8 = User(username='Kurtz', email='8@aa.io',
                password='password', sudoku_score=random.randrange(0,600,30),
                chess_score=random.randrange(0, 500, 50), game_of_life_score=random.randrange(0,100,1),
                go_score=random.randrange(0,700,70))
    ex9 = User(username='zaphod-beeblebrox', email='9@aa.io',
                password='password', sudoku_score=random.randrange(0,600,30),
                chess_score=random.randrange(0, 500, 50), game_of_life_score=random.randrange(0,100,1),
                go_score=random.randrange(0,700,70))
    ex10 = User(username='PangolinFan', email='10@aa.io',
                password='password', sudoku_score=random.randrange(0,600,30),
                chess_score=random.randrange(0, 500, 50), game_of_life_score=random.randrange(0,100,1),
                go_score=random.randrange(0,700,70))

    db.session.add(demo)
    db.session.add(ex1)
    db.session.add(ex2)
    db.session.add(ex3)
    db.session.add(ex4)
    db.session.add(ex5)
    db.session.add(ex6)
    db.session.add(ex7)
    db.session.add(ex8)
    db.session.add(ex9)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
