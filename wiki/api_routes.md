## Authentication
* Determine if a user is authenticated
    * GET `/api/auth/`
* Logs a user in
    * POST `/api/auth/login`
* Logs a user out
    * GET `/api/auth/logout`
* Signs a user up
    * POST `/api/auth/signup`
* Returns unauthorized JSON when flask-login authentication fails
    * GET `/api/auth/unauthorized`

## Users
* Retrieve all users
    * GET `/api/users/`
* Retrieve an individual user
    * GET `/api/users/<int:userId>`

## Games
* Retrieve and update a user's game scores
    * GET `/api/users/<int:userId>/games/<game_name>`
    * PATCH `/api/users/<int:userId>/games/<game_name>`
    * DELETE `/api/users/<int:userId>/games/<game_name>`

## Leaderboards
* Retrieve the top 10 scores for all games
    * GET `/api/leaderboards`
* Retrieve all scores for a game
    * GET `/api/leaderboards/<game_name>`
