import axios from 'axios';
const { useState, createContext, useEffect, useMemo } = require('react');

const UserContext = createContext();

const UserProvider = function (props) {
	const [currentUser, setCurrentUser] = useState({});
	const [savedJobsGigs, setSavedJobsGigs] = useState({});
	const [profileView, setProfileView] = useState('projects');
	const [projectForm, setProjectForm] = useState({
		junior_dev_id: currentUser.id,
		title: 'New Project',
		description: '',
		thumbnail_photo_url: '',
		github_link: '',
		live_link: '',
		original_request: '',
	});

	useEffect(() => {
		axios
			.post('/api/auth/check')
			.then(res => {
				// console.log(
				// 	res.data,
				// 	'successfully retrieved cookie FROM USER PROVIDER'
				// );
				setCurrentUser(prev => res.data);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		if (currentUser) {
			axios
				.get(`/api/save/${currentUser.id}`)
				.then(res => {
					setSavedJobsGigs(res.data);
				})
				.catch(err => {
					console.log(err);
				});
		}

		setProjectForm({
			junior_dev_id: currentUser.id,
			title: 'New Project',
			description: '',
			thumbnail_photo_url: '',
			github_link: '',
			live_link: '',
			original_request: '',
		});
	}, [currentUser, setSavedJobsGigs]);

	const value = useMemo(() => ({
		currentUser,
		setCurrentUser,
		savedJobsGigs,
		setSavedJobsGigs,
		profileView,
		setProfileView,
		projectForm,
		setProjectForm,
	}));

	return (
		<UserContext.Provider value={value}>{props.children}</UserContext.Provider>
	);
};

export { UserProvider, UserContext };
