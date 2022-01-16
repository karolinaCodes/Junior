import './styles/JobSearch.scss';
import axios from 'axios';
import JobSearchCard from '../components/JobSearchCard';

export default function JobSearch(props) {
	axios
		.get('/api/job_gig_search/query', 'act')
		.then(res => {
			console.log(res.data);
		})
		.catch(err => console.log(err));

	return (
		<div className='jobsearch-content'>
			<h1>Job Search Page</h1>
			<JobSearchCard />
		</div>
	);
}
