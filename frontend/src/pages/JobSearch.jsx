import { useEffect, useState } from 'react';
import './styles/JobSearch.scss';
import axios from 'axios';

import JobSearchCard from '../components/JobSearchCard';
import SearchBar from '../components/SearchBar';

export default function JobSearch(props) {
	const [query, setQeury] = useState('');

	useEffect(() => {
		axios
			.get('/api/search/query', {
				params: {
					queryString: 'JavaScript',
				},
			})
			.then(res => {
				console.log(res.data);
			})
			.catch(err => console.log(err));
	});

	useEffect(() => {
		axios
			.get('/api/search/city', {
				params: {
					city: 'Toronto',
				},
			})
			.then(res => {
				console.log(res.data);
			})
			.catch(err => console.log(err));
	});

	useEffect(() => {
		axios
			.get('/api/search/type', {
				params: {
					type: 'Part-time',
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
		</div>
	);
}
