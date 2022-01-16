import { useEffect } from 'react';
import './styles/JobSearch.scss';
import axios from 'axios';

import JobSearchCard from '../components/JobSearchCard';
import SearchBar from '../components/SearchBar';

export default function JobSearch(props) {
	useEffect(() => {
		axios
			.get('/api/search/city', {
				params: {
					city: 'Saskatoon',
				},
			})
			.then(res => {
				console.log(res.data);
			})
			.catch(err => console.log(err));
	});

	return (
		<div className='jobsearch-content'>
			<h1>Job Search Page</h1>
			<SearchBar />
			<JobSearchCard />
		</div>
	);
}
