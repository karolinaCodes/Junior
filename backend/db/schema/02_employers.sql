DROP TABLE IF EXISTS employers CASCADE;

CREATE TABLE "employers" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "email" VARCHAR(50) NOT NULL,
  "password" VARCHAR(50) NOT NULL,
  "company_name" VARCHAR(50) NOT NULL,
  "bio" VARCHAR(225),
  "photo_url" VARCHAR(255) DEFAULT 'https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1-300x300.jpg'
);

