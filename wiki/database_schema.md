## Add DB schema image

## One table for users:

### `users`

| column name    | data type     | details                   |
|----------------|---------------|---------------------------|
| id             | integer       | not null, primary key     |
| username       | string(4,30)  | not null, unique          |
| email          | string(3, 256)| not null, unique          |
| hashedPassword | string        | not null                  |
| created_at     | datetime      | not null                  |
| updated_at     | datetime      | not null                  |

¬

## Mapping table for each game:

### `users_{game_name}`

| column name    | data type | details               |
|----------------|-----------|-----------------------|
| id             | integer   | not null, primary key |
| user_id        | integer   | not null, foreign key |
| {game_name}_id | integer   | not null, foreign key |

* `{game_name}` is the name of each game
* `userId` references `users` table
* `{game_name}_id` references `{game_name}` table

¬

## Table for each game:

### `{game_name}`

| column name   | data type | details               |
|---------------|-----------|-----------------------|
| id            | integer   | not null, primary key |
| score         | integer   | not null              |
| created_at    | datetime  | not null              |
| updated_at    | datetime  | not null              |
