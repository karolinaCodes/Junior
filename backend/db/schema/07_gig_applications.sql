DROP TABLE IF EXISTS gig_applications CASCADE;

CREATE TABLE "gig_applications" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "gig_posting_id" INTEGER REFERENCES gig_postings(id) ON DELETE CASCADE,
  "junior_dev_id" INTEGER REFERENCES junior_devs(id) ON DELETE CASCADE,
  "is_accepted" BOOLEAN NOT NULL DEFAULT FALSE
);