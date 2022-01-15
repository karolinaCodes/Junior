## Landing

- None
- Authenticate (check for cookie)
- AND everything on #jobgigsearch

## Login (/login)

- Authenticate (check for cookie)
- getDevByEmail

## Signup (/signup)

- Authenticate (check for cookie)
- getDevByEmail
- addDev (POST /new)

## Portfolio (Dev)

- Authenticate (check for cookie)
- getDevs WHERE id (all information)
- getProjectsByDevId
- Stretch
  - interviews (stretch)

## Project page (project/:id)

- getProjectsByDevId WHERE projects.id = :id

## Profile (Employer)

- Authenticate (check for cookie)
- getEmployerById WHERE id (from cookie)
- getJobPostingsByEmployerId
- getGigPostingsByEmployerId
- Stretch
  - interviews

## Job/Gig Search

- Authenticate (check for cookie)
- getJobByTitleAndDescription (title = x || description = x)
- getJobByCity
- getJobByType
- Stretch
  - getJobBySalary
  - getJobByRemote
  - getJobByEmployer (maybe)
  - getJobByTag (stretch)

## Job page

- Authenticate (check for cookie)
- getDevById (for cookie)
- getJobById (JOIN employers)

## Gig page

- Authenticate (check for cookie)
- getDevById (for cookie)
- getGigById (JOIN employers)

## New Job

- Authenticate (check for cookie)
- addJob WHERE employer_id = :id (POST /new)

## New Gig page

- Authenticate (check for cookie)
- addGig WHERE employer_id = :id (POST /new)

## New Project page

- Authenticate (check for cookie)
- addProject WHERE junior_dev_id = :id (POST /new)