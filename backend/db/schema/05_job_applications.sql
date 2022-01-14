DROP TABLE IF EXISTS job_applications CASCADE;

CREATE TABLE "job_applications" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "job_posting_id" INTEGER REFERENCES job_postings(id) ON DELETE CASCADE,
  "junior_dev_id" INTEGER REFERENCES junior_devs(id) ON DELETE CASCADE,
  "is_accepted" BOOLEAN NOT NULL DEFAULT FALSE
);