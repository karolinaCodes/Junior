DROP TABLE IF EXISTS job_postings CASCADE;

CREATE TABLE "job_postings" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "employer_id" INTEGER REFERENCES employers(id) ON DELETE CASCADE,
  "job_title" VARCHAR(50) NOT NULL,
  "description" VARCHAR NOT NULL,
  "city" VARCHAR(50),
  "salary_min" INTEGER NOT NULL,
  "salary_max" INTEGER NOT NULL,
  "job_type" VARCHAR(50) NOT NULL,
  "is_remote" BOOLEAN NOT NULL,
  "date_posted" TIMESTAMP NOT NULL DEFAULT NOW(),
  "is_open" BOOLEAN DEFAULT TRUE
);