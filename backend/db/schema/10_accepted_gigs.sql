DROP TABLE IF EXISTS accepted_gigs CASCADE;

CREATE TABLE "accepted_gigs" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "gig_posting_id" INTEGER REFERENCES gig_postings(id) ON DELETE CASCADE,
  "junior_dev_id" INTEGER REFERENCES junior_devs(id) ON DELETE CASCADE,
  "employer_id" TIMESTAMP NOT NULL DEFAULT NOW(),
  "is_complete" BOOLEAN NOT NULL DEFAULT FALSE
);