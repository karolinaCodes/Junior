import {useState} from 'react';

// mui //
import {Button, Dialog} from '@mui/material';

export default function Modal(props) {
  const {content, btn1Text, btn2Text, btn1Type, btn2Type, onClick1, onClick2} =
    props;

  const [openModal, setOpenModal] = useState(false);

  const handleView = () => {
    openModal === true ? setOpenModal(false) : setOpenModal(true);
  };

  return (
    <Dialog
      open={openModal}
      onClose={handleView}
      fullWidth={true}
      maxWidth={'md'}
    >
      <Button variant="contained" type={btn1Type}>
        {btn1Text} onClick={onClick1}
      </Button>
      <Button variant="outlined" type={btn2Type} onClick={onClick2}>
        {btn2Text}
      </Button>
    </Dialog>
  );
}
