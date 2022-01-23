DROP TABLE IF EXISTS saved_gigs CASCADE;

CREATE TABLE saved_gigs (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "junior_dev_id" INTEGER REFERENCES junior_devs(id) ON DELETE CASCADE,
  "gig_posting_id" INTEGER REFERENCES gig_postings(id) ON DELETE CASCADE
);
