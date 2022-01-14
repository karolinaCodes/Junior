DROP TABLE IF EXISTS project_images CASCADE;

CREATE TABLE "project_images" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "project_id" INTEGER REFERENCES projects(id) ON DELETE CASCADE
  "photo_url" VARCHAR(50),
);
