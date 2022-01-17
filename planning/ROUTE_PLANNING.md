## Landing

- [x] Authenticate (check for cookie - then save cookie in state to persist log in)
- [x] AND everything on #jobgigsearch

## Login (/login)

- [x] getUserByEmail

## Signup (/signup) - Stretch

- [x] getUserByEmail
- [x] addDev (POST /new)

## Portfolio (Dev)

- [x] getDevById WHERE id (all information)
- [x] getProjectsByDevId
- Stretch
  - interviews (stretch)

## Project Page (project/:id)

- [x] getProjectById WHERE projects.id = :id

## Employer Profile

- [x] getEmployerById WHERE id (from cookie)
- [x] getJobPostingsByEmployerId
- [x] getGigPostingsByEmployerId
- **Stretch**
  - [ ] interviews

## Job/Gig Search

- [x] getJobsAndGigsByQuery (title = x || description = x)
- [x] getJobByCity
- [x] getJobByType
- **Stretch**
  - [ ] getJobBySalary
  - [ ] getJobByRemote
  - [ ] getJobByEmployer (maybe)
  - [ ] getJobByTag (stretch)

## Job page

- [x] getDevById (for cookie)
- [x] getJobById (JOIN employers)

## Gig page

- [x] getDevById (for cookie)
- [x] getGigById (JOIN employers)

## New Job Posting Page

- [x] addJobPosting WHERE employer_id = :id (POST /new)

## New Gig Posting Page

- [x] addGigPosting WHERE employer_id = :id (POST /new)

## New Project Page

- [x] addProject WHERE junior_dev_id = :id (POST /new)

## Applications

- [x] getApplicationByPostingId
- [x] getApplicationById
