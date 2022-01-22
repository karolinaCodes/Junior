DROP TABLE IF EXISTS saved_jobs CASCADE;

CREATE TABLE saved_jobs (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "junior_dev_id" INTEGER REFERENCES junior_devs(id) ON DELETE CASCADE,
  "job_id" INTEGER
);
