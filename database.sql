CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT,
  "path" TEXT not null
);

CREATE TABLE "recipe_files" (
  "id" SERIAL PRIMARY KEY,
  "recipe_id" INTEGER UNIQUE,
  "file_id" INTEGER UNIQUE
);

ALTER TABLE "recipe_files" ADD FOREIGN KEY ("file_id") REFERENCES "files" ("id");

-- CREATE TABLE recipes (
--   chef_id integer,
--   image text not null,
--   title text not null,
--   ingredients text[] not null,
--   preparation text[] not null,
--   information text not null,
--   created_at timestamp not null
--   );