DROP TABLE IF EXISTS gig_posting_images CASCADE;

CREATE TABLE gig_posting_images (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "gig_posting_id" INTEGER REFERENCES gig_postings(id) ON DELETE CASCADE,
  "photo_url" VARCHAR(225)
);
