CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25)
    REFERENCES users ON DELETE CASCADE,
  title VARCHAR(50) NOT NULL,
  habit_description TEXT,
  is_checked BOOLEAN NOT NULL DEFAULT FALSE,
  last_checked DATE
);

