DROP TABLE lists;
DROP TABLE todos;

CREATE TABLE lists(
  name VARCHAR(30) UNIQUE NOT NULL,
  id serial PRIMARY KEY
);

CREATE TABLE todos(
  name VARCHAR(30) UNIQUE NOT NULL,
  id serial PRIMARY KEY,
  completed BOOLEAN NOT NULL DEFAULT false,
  list_id INT REFERENCES lists(id)
);


INSERT INTO lists (name) VALUES ('baby'), ('maybe');
