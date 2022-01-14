# Data Structures

## Junior_dev

```ts
interface Junior_dev {
  id: Int;
  first_name: String;
  last_name: String;
  email: String;
  password: Hash;
  bio: String;
  photo_url: String;
  github_url:String;
  linkedIn_url:String;
  resume_url:String;
  location:String
```

## Employer

```ts
interface Employer {
  id: Int;
  email: String;
  password: Hash;
  company_name: String;
  bio: String;
  photo_url: String;
}
```

## Project

```ts
interface Project {
  id: Int;
  junior_dev_id: Int;
  title: String;
  description: String;
  thumbnail_photo_url: String;
  github_link: String;
  live_link: String;
}
```

## Job_posting

```ts
interface Job_posting {
  id: Int;
  employer_id: Int;
  job_title: String;
  description: String;
  city: String;
  salary_min: Int;
  salary_max: Int;
  type: String;
  is_remote: Boolean;
  date_posted: Timestamp;
  is_open: Boolean;
}
```

## Job_application

```ts
interface Job_application {
  id: Int;
  job_posting_id: Int;
  junior_dev_id: Int;
  is_accepted: Boolean;
}
```

## Gig_posting

```ts
interface Gig_posting {
  id: Int;
  employer_id: Int;
  gig_name: String;
  description: String;
  pay: Int;
  date_posted: Timestamp;
  deadline: Date;
  photo_url: String;
}
```

## Gig_application

```ts
interface Gig_application {
  id: Int;
  gig_posting_id: Int;
  junior_dev_id: Int;
  is_accepted: Boolean;
}
```

## Project_image

```ts
interface Project_image {
  id: Int;
  project_id: Int;
  photo_url: String;
}
```
