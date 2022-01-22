DROP TABLE IF EXISTS saved_jobs_gigs CASCADE;

CREATE TABLE saved_jobs_gigs (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "junior_dev_id" INTEGER REFERENCES junior_devs(id) ON DELETE CASCADE,
  "job_gig_id" INTEGER,
  "job_type" VARCHAR(25)
);
