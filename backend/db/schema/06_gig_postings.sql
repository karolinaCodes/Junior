DROP TABLE IF EXISTS gig_postings CASCADE;

CREATE TABLE "gig_postings" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "employer_id" INTEGER REFERENCES employers(id) ON DELETE CASCADE,
  "job_title" VARCHAR(50) NOT NULL,
  "description" VARCHAR(225),
  "pay" INTEGER NOT NULL,
  "date_posted" TIMESTAMP NOT NULL DEFAULT NOW(),
  "deadline" DATE,
  "photo_url" VARCHAR(255) DEFAULT 'https://www.elegantthemes.com/blog/wp-content/uploads/2020/02/000-Online-Code-Editors.png'
);