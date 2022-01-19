import './styles/PortfolioCard.scss';

export default function Profile(props) {
  const {
    job_title,
    description,
    city,
    salary,
    job_type,
    is_remote,
    date_posted,
    is_open,
  } = props;
  const datePostedFormatted = new Date(date_posted).toLocaleDateString();

  return (
    <>
      <h1>{job_title}</h1>
      <p>{city}</p>
      <p>${salary}</p>
      <p>
        {job_type}, Remote: {is_remote ? 'Yes' : 'No'}
      </p>
      <p>Date Posted: {datePostedFormatted}</p>
      <p>Accepting Applicants: {is_open ? 'Yes' : 'No'}</p>
      <p>{description}</p>
    </>
  );
}
