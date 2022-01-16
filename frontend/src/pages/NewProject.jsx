import './styles/NewProject.scss';
import {useEffect} from 'react';
import axios from 'axios';

export default function NewProject(props) {
  // FOR TESTING ENDPOINTS
  // useEffect(() => {
  //   axios
  //     .post('/api/projects/new', {
  //       junior_dev_id: 1,
  //       title: 'Final Project',
  //       description: 'My final project at LHL.',
  //       thumbnail_photo_url:
  //         'https://i.ytimg.com/vi/BiTuzeyDx6Y/maxresdefault.jpg',
  //       github_link: 'https://github.com/Alex-Reyne/junior',
  //       live_link: 'https://github.com/Alex-Reyne/junior',
  //     })
  //     .then(res => {
  //       console.log(res.data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }, []);
  return (
    <div className="new-project-content">
      <div></div>
    </div>
  );
}
