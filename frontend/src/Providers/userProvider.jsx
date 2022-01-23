import axios from 'axios';
const { useState, createContext, useEffect, useMemo } = require('react');

const UserContext = createContext();

const UserProvider = function (props) {
	const [currentUser, setCurrentUser] = useState({});
	const [savedJobsGigs, setSavedJobsGigs] = useState({});

	useEffect(() => {
		axios
			.post('/api/auth/check')
			.then(res => {
				console.log(
					res.data,
					'successfully retrieved cookie FROM USER PROVIDER'
				);
				setCurrentUser(prev => res.data);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	const value = {
		currentUser,
		setCurrentUser,
		savedJobsGigs,
		setSavedJobsGigs,
	};

	return (
		<UserContext.Provider value={value}>{props.children}</UserContext.Provider>
	);
};

export { UserProvider, UserContext };
