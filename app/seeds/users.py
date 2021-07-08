from werkzeug.security import generate_password_hash
from app.models import db, User
import random


# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(username='DemoUsername', email='demo@aa.io',
                password='password', sudoku_score=random.randrange(0, 600, 30),
                chess_score=random.randrange(0, 280, 70), game_of_life_score=random.randrange(0, 100, 1),
                go_score=random.randrange(0, 500, 100))
    ex1 = User(username='Axolotl', email='1@aa.io',
               password='password', sudoku_score=0,
               chess_score=random.randrange(0, 280, 70), game_of_life_score=random.randrange(0, 100, 1),
               go_score=random.randrange(0, 500, 100))
    ex2 = User(username='Alan Walker', email='2@aa.io',
               password='password', sudoku_score=random.randrange(0, 600, 30),
               chess_score=random.randrange(0, 280, 70), game_of_life_score=0,
               go_score=random.randrange(0, 500, 100))
    ex3 = User(username='haberdasher', email='3@aa.io',
               password='password', sudoku_score=random.randrange(0, 600, 30),
               chess_score=random.randrange(0, 280, 70), game_of_life_score=random.randrange(0, 100, 1),
               go_score=random.randrange(0, 500, 100))
    ex4 = User(username='(cpt.) Jack', email='4@aa.io',
               password='password', sudoku_score=random.randrange(0, 600, 30),
               chess_score=random.randrange(0, 280, 70), game_of_life_score=random.randrange(0, 100, 1),
               go_score=random.randrange(0, 500, 100))
    ex5 = User(username='user32094', email='5@aa.io',
               password='password', sudoku_score=random.randrange(0, 600, 30),
               chess_score=0, game_of_life_score=random.randrange(0, 100, 1),
               go_score=random.randrange(0, 500, 100))
    ex6 = User(username='trail_runner', email='6@aa.io',
               password='password', sudoku_score=random.randrange(0, 600, 30),
               chess_score=random.randrange(0, 280, 70), game_of_life_score=random.randrange(0, 100, 1),
               go_score=random.randrange(0, 500, 100))
    ex7 = User(username='SudokuPlayer2', email='7@aa.io',
               password='password', sudoku_score=random.randrange(0, 600, 30),
               chess_score=random.randrange(0, 280, 70), game_of_life_score=random.randrange(0, 100, 1),
               go_score=random.randrange(0, 500, 100))
    ex8 = User(username='Kurtz', email='8@aa.io',
               password='password', sudoku_score=random.randrange(0, 600, 30),
               chess_score=random.randrange(0, 280, 70), game_of_life_score=random.randrange(0, 100, 1),
               go_score=random.randrange(0, 500, 100))
    ex9 = User(username='zaphod-beeblebrox', email='9@aa.io',
               password='password', sudoku_score=random.randrange(0, 600, 30),
               chess_score=0, game_of_life_score=random.randrange(0, 100, 1),
               go_score=random.randrange(0, 500, 100))
    ex10 = User(username='RangersFan', email='10@aa.io',
                password='password', sudoku_score=random.randrange(0, 600, 30),
                chess_score=random.randrange(0, 280, 70), game_of_life_score=0,
                go_score=random.randrange(0, 500, 100))
    ex11 = User(username='MindyKaling', email='11@aa.io',
                password='password', sudoku_score=random.randrange(0, 600, 30),
                chess_score=random.randrange(0, 280, 70), game_of_life_score=random.randrange(0, 100, 1),
                go_score=random.randrange(0, 500, 100))
    ex12 = User(username='jean-baptiste', email='12@aa.io',
                password='password', sudoku_score=random.randrange(0, 600, 30),
                chess_score=random.randrange(0, 280, 70), game_of_life_score=random.randrange(0, 100, 1),
                go_score=random.randrange(0, 500, 100))
    ex13 = User(username='martineau', email='13@aa.io',
                password='password', sudoku_score=random.randrange(0, 600, 30),
                chess_score=random.randrange(0, 280, 70), game_of_life_score=random.randrange(0, 100, 1),
                go_score=0)
    ex14 = User(username='Hatshepsut', email='14@aa.io',
                password='password', sudoku_score=random.randrange(0, 600, 30),
                chess_score=random.randrange(0, 280, 70), game_of_life_score=random.randrange(0, 100, 1),
                go_score=random.randrange(0, 500, 100))
    ex15 = User(username='ars132', email='15@aa.io',
                password='password', sudoku_score=random.randrange(0, 600, 30),
                chess_score=random.randrange(0, 280, 70), game_of_life_score=random.randrange(0, 100, 1),
                go_score=random.randrange(0, 500, 100))
    ex16 = User(username='b.burr1', email='16@aa.io', password='password', sudoku_score=0,
                chess_score=0, game_of_life_score=0, go_score=0)
    ex17 = User(username='bill shakespeare', email='17@aa.io',
                password='password', sudoku_score=random.randrange(0, 600, 30),
                chess_score=random.randrange(0, 280, 70), game_of_life_score=random.randrange(0, 100, 1),
                go_score=random.randrange(0, 500, 100))
    ex18 = User(username='ETC9', email='18@aa.io', password='password', sudoku_score=0,
                chess_score=0, game_of_life_score=0, go_score=0)

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
    db.session.add(ex10)
    db.session.add(ex11)
    db.session.add(ex12)
    db.session.add(ex13)
    db.session.add(ex14)
    db.session.add(ex15)
    db.session.add(ex16)
    db.session.add(ex17)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
