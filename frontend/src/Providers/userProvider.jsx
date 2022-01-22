import axios from 'axios';
import {useNavigate} from 'react-router-dom';
const {useState, createContext, useEffect, useMemo} = require('react');

const UserContext = createContext();

const UserProvider = function (props) {
  const [currentUser, setCurrentUser] = useState({});

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

  const value = useMemo(() => ({
    currentUser,
    setCurrentUser,
  }));

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

export {UserProvider, UserContext};
