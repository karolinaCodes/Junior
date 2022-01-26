import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import './styles/BuiltWith.scss';
import { display } from '@mui/system';

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

export default function BuiltWith(props) {
	return (
		<Box className='builtw-grid-container'>
			<h1 id='builtw-title'>BUILT WITH</h1>
			<Grid container xs={10} spacing={4}>
				<Grid
					item
					className='builtw-grid'
					xs={3}
					sx={{ height: '20rem' }}
					className='builtw-item'
				>
					<img className='builtw-img' src='/images/1.png' />
				</Grid>
				<Grid item className='builtw-grid' xs={3} sx={{ height: '20rem' }}>
					<img className='builtw-img' src='/images/2.png' />
				</Grid>
				<Grid item xs={3} sx={{ height: '20rem' }}>
					<img className='builtw-img' src='/images/3.png' />
				</Grid>
				<Grid item className='builtw-grid' xs={3} sx={{ height: '20rem' }}>
					<img className='builtw-img' src='/images/4.png' />
				</Grid>
				<Grid item className='builtw-grid' xs={1.5}></Grid>
				<Grid item className='builtw-grid' xs={3} sx={{ height: '20rem' }}>
					<img className='builtw-img' src='/images/5.png' />
				</Grid>
				<Grid item className='builtw-grid' xs={3} sx={{ height: '20rem' }}>
					<img className='builtw-img' src='/images/6.png' />
				</Grid>
				<Grid item className='builtw-grid' xs={3} sx={{ height: '20rem' }}>
					<img className='builtw-img' src='/images/7.png' />
				</Grid>
				<Grid item className='builtw-grid' xs={1.5}></Grid>
			</Grid>
		</Box>
	);
}
