DROP TABLE IF EXISTS job_postings CASCADE;

CREATE TABLE "job_postings" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "employer_id" INTEGER REFERENCES employers(id) ON DELETE CASCADE,
  "job_title" VARCHAR(50) NOT NULL,
  "company_desc" VARCHAR(1000),
  "description" VARCHAR(1000),
  "responsibilities" VARCHAR(1000),
  "qualifications" VARCHAR(1000),
  "benefits" VARCHAR(500),
  "city" VARCHAR(50),
  "salary" INTEGER NOT NULL,
  "job_type" VARCHAR(50) NOT NULL,
  "is_remote" BOOLEAN NOT NULL,
  "date_posted" TIMESTAMP NOT NULL DEFAULT NOW(),
  "is_open" BOOLEAN DEFAULT TRUE
);