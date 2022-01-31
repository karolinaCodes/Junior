import {useState} from 'react';

// mui //
import {Button} from '@mui/material';

// react-router //
import {useNavigate} from 'react-router-dom';

export default function ConfirmModal(props) {
  const {
    job_title,
    description,
    salary,
    formatted_salary,
    date_posted,
    formatted_date,
    date_applied,
    formatted_date_applied,
    job_type,
    is_remote,
    employer_email,
    company_name,
    employer_bio,
    employer_photo_url,
    deadline,
    photo_url,
    city,
    pay,
    formatted_pay,
    formatted_deadline,
    posting_location,
    job_posting_id,
    gig_posting_id,
    is_accepted,
    is_completed,
  } = props;

  const [askConfirm, setAskConfirm] = useState(false);
  // const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  // const handleView = () => {
  // 	openModal === true ? setOpenModal(false) : setOpenModal(true);
  // };

  const [view, setView] = useState('ask');
  const handleView = () => {
    if (view === 'ask') {
      setView('confirm');
    } else if (view === 'confirm') {
      setView('ask');
    }
  };

  const submitApplication = () => {
    // axios
    // 	.post('/api/job_applications/new', {
    // 		job_posting_id: jobApplying.id,
    // 		junior_dev_id: currentUser.id,
    // 	})
    // 	.then(res => {
    // 		console.log(res.data);
    // 		setApplicationSubmitted(true);
    // 		return res.data;
    // 	})
    // 	.then(data => {
    // 		sendEmail(
    // 			'creativereyne@gmail.com',
    // 			currentUser,
    // 			jobApplying.job_title
    // 		);
    // 	})
    // 	.catch(err => {
    // 		console.log(err);
    // 	});
  };

  return (
    <div className="apply-modal">
      {view === 'confirm' && (
        <section>
          <p id="submitted-msg">Your application has been deleted.</p>
          <Button variant="contained">Close</Button>
        </section>
      )}
      {view === 'ask' && (
        <section>
          <h1>
            Are you sure you want to delete your application for {job_title}?
          </h1>
          <Button variant="contained" onClick={() => console.log('delete')}>
            Delete
          </Button>
          <Button variant="contained" onClick={() => console.log('Cancel')}>
            Cancel
          </Button>
        </section>
      )}
    </div>
  );
}
