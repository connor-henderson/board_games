# Board Games

_By Connor Henderson_ - [visit Board Games](https://board-games1.herokuapp.com/games)

**Table of Contents**

- [Overview](#overview)
- [Games](#games)
- [Conclusion](#conclusion)

## Overview

Board Games is a full-stack application that allows users to play Chess, Go, Sudoku, and a [Game of Life](http://rappamappa.herokuapp.com/) visualizer. Players earn points and compete for higher positions on the leaderboards by beating my CPU in Chess or Go, successfully completing a Sudoku board, or running Game of Life simulations.

#### Technologies

- Backend
  - Postgresql, Flask, SQLAlchemy, Alembic, WTForms
- Frontend
  - React / Redux

## Games

Each game is represented as a 2D array stored as a state variable ("board") in React and continually updated. The displayed boards are produced by mapping over this variable to produce a table with the corresponding values / images / styling depending on the game.

While the modularity of a board games website lends itself well to the component structure of React, several unique considerations and implementations were required for the functionality of each game.

- In Chess and Go, a variety of helper functions are employed from the "assets" folder to validate and perform both user and CPU.
- Game of Life is unique among the games featured in that it is the only "zero-player" game; no input is required once the initial state has been determined and set in motion. However, a number of helper functions were still required to determine the status of each cell in each successive generation.
- Creating Sudoku solutions can be computationally expensive, so I opted to implement the following [paper's](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-s095-programming-for-the-puzzled-january-iap-2018/puzzle-8-you-wont-want-to-play-sudoku-again/MIT6_S095IAP18_Puzzle_8.pdf) optimized Python solution in Javascript.

#### Chess

"Compete against a computer in international chess"

![chess](https://user-images.githubusercontent.com/78612354/127689155-e01c833c-2dfb-4983-aecf-f65f446b2c46.gif)

#### Go

"Strategically surround the computer player's pieces in this Ancient classic"

![go](https://user-images.githubusercontent.com/78612354/127688633-0944bac4-1c4f-4ecd-be39-172b6df0244c.gif)

#### Sudoku

"Determine the missing numbers in this logic-based combinatorial number-placement puzzle game"

![sudoku](https://user-images.githubusercontent.com/78612354/127688994-86f5b4db-d4d9-4d9d-bbf6-9d7bbbe1d93b.gif)

#### Game of Life

"Visualize the cellular automaton devised by the late British mathematician John Horton Conway"

![gameOfLife](https://user-images.githubusercontent.com/78612354/127689204-0e7011e2-ad8e-410c-82fc-49158dd1f39f.gif)

## Conclusion

I really enjoy piecing apart large, complex problems into more comprehensible steps of logic, and figured that building an application for playing board games was a natural way to practice this skill given that these games are essentially an amalgamation of stringent, explicit rules. Writing the site was a lot of fun, and I hope you enjoy playing the games.

One area that I became increasingly interested in but was not able to explore due to time constraints was writing robust CPUs for Chess and Go. Both CPUs currently play aggressively to make the experience more interesting for the user. However, they have a naive understanding of the game. It would be interesting to try to incorporate more strategy and performant code into their move selections.
