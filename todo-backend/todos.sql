\echo 'Delete and recreate todos db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE todos;
CREATE DATABASE todos;
\connect todos

-- Execute psql commands from files
\i todos-schema.sql
\i todos-seed.sql

\echo 'Delete and recreate todos_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE todos_test;
CREATE DATABASE todos_test;
\connect todos_test

\i todos-schema.sql