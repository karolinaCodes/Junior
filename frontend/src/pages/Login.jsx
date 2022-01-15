import './styles/Login.scss';
import {TextField, Button} from '@mui/material';
import axios from 'axios';

export default function Login(props) {
  // // FOR EXAMPLE LOGIN FUNCTIONALITY
  // const {currentUser, setCurrentUser} = useState();

  // // EXAMPLE
  // useEffect(() => {
  //   axios.get("/api/candidates").then(res => {
  //     setCandidates(res.data);
  //   });
  // }, []);

  // // EXAMPLE LOGIN FUNCTIONALITY
  const login = e => {
    e.preventDefault();
    axios
      .post('/api/login')
      .then(res => {
        // setCurrentUser(res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // // TO CHECK FOR COOKIE (IF USER SIGNED IN) ON FIRST LOAD
  // useEffect(() => {
  //   axios.post("/api/authenticate").then(res => {
  //     setCurrentUser(res.data);
  //   });
  // }, []);

  return (
    <div className="login-content">
      <form className="login" onSubmit={login}>
        <TextField id="email" label="email" variant="outlined" />
        <TextField id="password" label="password" variant="outlined" />
        <Button variant="contained" size="large" type="submit">
          LOG IN
        </Button>
      </form>
    </div>
  );
}
