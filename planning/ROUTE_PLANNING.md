## Landing

- [ ] None
- [ ] Authenticate (check for cookie - then save cookie in state to persist log in)
- [ ] AND everything on #jobgigsearch

## Login (/login)

- [X]  getDevByEmail

## Signup (/signup) - Stretch

- [X]  getDevByEmail
- [X] addDev (POST /new)

## Portfolio (Dev)

- [X] getDevById WHERE id (all information)
- [X] getProjectsByDevId
- Stretch
  - interviews (stretch)

## Project Page (project/:id) DONE

- [X] getProjectById WHERE projects.id = :id

## Employer Profile

- [X] getEmployerById WHERE id (from cookie)
- [X] getJobPostingsByEmployerId
- [X] getGigPostingsByEmployerId
- **Stretch**
  - [ ] interviews

## Job/Gig Search DONE

- [X] getJobsAndGigsByQuery (title = x || description = x)
- [X] getJobByCity
- [X] getJobByType
- **Stretch**
  - [ ] getJobBySalary
  - [ ] getJobByRemote
  - [ ] getJobByEmployer (maybe)
  - [ ] getJobByTag (stretch)

## Job page

- [X] getDevById (for cookie)
- [X] getJobById (JOIN employers)

## Gig page

- [X] getDevById (for cookie)
- [X] getGigById (JOIN employers)

## New Job Posting Page DONE

- [X] addJobPosting WHERE employer_id = :id (POST /new)

## New Gig Posting Page DONE

- [X] addGigPosting WHERE employer_id = :id (POST /new)

## New Project Page DONE

- [X] addProject WHERE junior_dev_id = :id (POST /new)

## Applications

- [ ] getApplicationByPostingId
- [ ] getApplicationById
