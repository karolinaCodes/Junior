import './styles/JobSearch.scss';
import JobSearchCard from '../components/JobSearchCard';

export default function JobSearch(props) {
	return (
		<div className='jobsearch-content'>
			<h1>Job Search Page</h1>
			<JobSearchCard />
		</div>
	);
}
