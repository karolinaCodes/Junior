import { useState, useContext } from 'react';
import {
	profileView,
	setProfileView,
	UserContext,
} from '../Providers/userProvider';

export default function useVisualMode(initMode) {
	const { profileView, setProfileView } = useContext(UserContext);
	const [history, setHistory] = useState([initMode]);

	// saves the mode history and sets the new mode
	// this allows the back function to recal the last
	// mode the user was in for exit and cancel buttons.
	const transition = (newMode, replace = false) => {
		if (replace) {
			setHistory(prev => [...prev.slice(0, -1), newMode]);
		} else {
			setHistory(prev => [...prev, newMode]);
		}

		setProfileView(newMode);
	};

	// goes back to the last mode user was in.
	// prevents user from deleting the initial history.
	const back = () => {
		setHistory(prev => {
			if (prev.length === 1) {
				return [...prev];
			}

			const lastMode = [...prev.slice(0, -1)];
			setProfileView(lastMode[lastMode.length - 1]);

			return lastMode;
		});
	};

	return { profileView, transition, back };
}
