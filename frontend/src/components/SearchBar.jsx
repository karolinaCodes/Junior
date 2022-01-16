import './styles/SearchBar.scss';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

export default function SearchBar(props) {
	const { state, onSubmit, onChange } = props;

	const keyCheck = e => {
		if (e.keyCode === 13) {
			onSubmit();
		}
	};

	return (
		<form className='search' onSubmit={e => e.preventDefault()}>
			<TextField
				id='search-bar'
				label='Find Work'
				variant='outlined'
				onChange={onChange}
				value={state}
				onKeyDown={e => keyCheck(e)}
			/>
			<Button variant='contained' size='large' onClick={onSubmit}>
				SEARCH
			</Button>
		</form>
	);
}
