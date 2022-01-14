DROP TABLE IF EXISTS junior_devs CASCADE;
CREATE TABLE "junior_devs" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "first_name" VARCHAR(50) NOT NULL,
  "last_name" VARCHAR(50) NOT NULL,
  "email" VARCHAR(50) NOT NULL,
  "password" VARCHAR(50) NOT NULL,
  "bio" VARCHAR(225),
  "photo_url" VARCHAR(50) DEFAULT 'https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1-300x300.jpg',
  "github_url" VARCHAR(50),
  "linkedIn_url" VARCHAR(50),
  "resume_url" VARCHAR(50),
  "location" VARCHAR(25)
);

DROP TABLE IF EXISTS employers CASCADE;
CREATE TABLE "employers" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "email" VARCHAR(50) NOT NULL,
  "password" VARCHAR(50) NOT NULL,
  "company_name" VARCHAR(50) NOT NULL,
  "bio" VARCHAR(225),
  "photo_url" VARCHAR(50) DEFAULT 'https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1-300x300.jpg'
);

DROP TABLE IF EXISTS projects CASCADE;
CREATE TABLE "projects" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "junior_dev_id" INTEGER REFERENCES junior_devs(id) ON DELETE CASCADE,
  "title" VARCHAR(50) NOT NULL,
  "description" VARCHAR(225) NOT NULL,
  "thumbnail_photo_url" VARCHAR(225) NOT NULL DEFAULT 'https://www.elegantthemes.com/blog/wp-content/uploads/2020/02/000-Online-Code-Editors.png',
  "github_link" VARCHAR(225)
  "live_link" VARCHAR(225)
);

DROP TABLE IF EXISTS job_postings CASCADE;
CREATE TABLE "job_postings" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "employer_id" INTEGER REFERENCES employers(id) ON DELETE CASCADE,
  "job_title" VARCHAR(50) NOT NULL,
  "description" VARCHAR(500) NOT NULL,
  "city" VARCHAR(50),
  "salary_min" INTEGER NOT NULL,
  "salary_max" INTEGER NOT NULL,
  "type" VARCHAR(50) NOT NULL,
  "is_remote" BOOLEAN NOT NULL,
  "date_posted" TIMESTAMP NOT NULL,
  "is_open" BOOLEAN DEFAULT TRUE
);

DROP TABLE IF EXISTS job_applications CASCADE;
CREATE TABLE "job_applications" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "job_posting_id" INTEGER REFERENCES job_postings(id) ON DELETE CASCADE,
  "junior_dev_id" INTEGER REFERENCES junior_devs(id) ON DELETE CASCADE,
  "is_accepted" BOOLEAN NOT NULL DEFAULT FALSE
);

DROP TABLE IF EXISTS gig_postings CASCADE;
CREATE TABLE "gig_postings" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "employer_id" INTEGER REFERENCES employers(id) ON DELETE CASCADE,
  "gig_name" VARCHAR(50) NOT NULL,
  "description" VARCHAR(225),
  "pay" INTEGER NOT NULL,
  "date_posted" TIMESTAMP NOT NULL,
  "deadline" DATE,
  "photo_url" VARCHAR(50) DEFAULT 'https://www.elegantthemes.com/blog/wp-content/uploads/2020/02/000-Online-Code-Editors.png'
);

DROP TABLE IF EXISTS gig_applications CASCADE;
CREATE TABLE "gig_applications" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "gig_posting_id" INTEGER REFERENCES gig_postings(id) ON DELETE CASCADE,
  "junior_dev_id" INTEGER REFERENCES junior_devs(id) ON DELETE CASCADE,
  "is_accepted" BOOLEAN NOT NULL DEFAULT FALSE
);

DROP TABLE IF EXISTS project_images CASCADE;
CREATE TABLE "project_images" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "photo_url" VARCHAR(50),
  "project_id" INTEGER REFERENCES projects(id) ON DELETE CASCADE
);
