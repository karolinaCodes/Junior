import './styles/JobSearch.scss';
import axios from 'axios';
import JobSearchCard from '../components/JobSearchCard';

export default function JobSearch(props) {
	const getJobs = e => {
		e.preventDefault();
		const query = 'act';
		console.log('FRONTEND', query);

		axios
			.get('/api/job_postings')
			.then(res => {
				console.log(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<div className='jobsearch-content'>
			<h1>Job Search Page</h1>
			<JobSearchCard />
			<button onClick={getJobs}>SEARCH</button>
			{/* {getJobs} */}
		</div>
	);
}
