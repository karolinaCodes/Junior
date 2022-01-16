import './styles/SearchBar.scss';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

export default function SearchBar(props) {
	return (
		<form className='search' onSubmit={e => e.preventDefault()}>
			<TextField id='search-bar' label='Find Work' variant='outlined' />
			<Button variant='contained' size='large' type='submit'>
				SEARCH
			</Button>
		</form>
	);
}
