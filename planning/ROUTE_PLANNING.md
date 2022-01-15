## Landing

- None
- Authenticate (check for cookie - then save cookie in state to persist log in)
- AND everything on #jobgigsearch

## Login (/login)

- getDevByEmail

## Signup (/signup) - Stretch

- getDevByEmail
- addDev (POST /new)

## Portfolio (Dev)

- getDevById WHERE id (all information)
- getProjectsByDevId
- Stretch
  - interviews (stretch)

## Project Page (project/:id)

- getProjectById WHERE projects.id = :id

## Employer Profile

- getEmployerById WHERE id (from cookie)
- getJobPostingsByEmployerId
- getGigPostingsByEmployerId
- Stretch
  - interviews

## Job/Gig Search

- getJobByTitleAndDescription (title = x || description = x)
- getJobByCity
- getJobByType
- Stretch
  - getJobBySalary
  - getJobByRemote
  - getJobByEmployer (maybe)
  - getJobByTag (stretch)

## Job page

- getDevById (for cookie)
- getJobById (JOIN employers)

## Gig page

- getDevById (for cookie)
- getGigById (JOIN employers)

## New Job

- addJob WHERE employer_id = :id (POST /new)

## New Gig page

- addGig WHERE employer_id = :id (POST /new)

## New Project page

- addProject WHERE junior_dev_id = :id (POST /new)
