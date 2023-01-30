import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { AppBar, Tab, Tabs } from '@mui/material';
import './Authentication.css';
import Login from './login';
import SignUp from './signup';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useContext } from 'react';
import { Crypto} from '../../../CryptoContext';
import { auth } from '../../../firebaseApp';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  borderRadius: 2,
  bgcolor: "rgb(66,66,66)",
  color : 'white',
  border: '2px solid #000',
  boxShadow: 20,
  p: 0,
};

export default function AuthModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(0);
  const CryptoState = useContext(Crypto);

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then((res) => {
      console.log(res);
      CryptoState.setAlert({
        open: true,
        message: `Login Successful. Welcome ${res.user.email}`,
        type: "success",
      });
      handleClose();
    }).catch((error) => {
      CryptoState.setAlert({
        open: true,
        message: error.message,
        type: "error"
      });
      return;
    })
  }

const handleChange = (event, newValue) => {
  setValue(newValue);
};
console.log(value);

  return (
    <div>
    <Button
    variant='contained'
    style={{
        width: 85,
        height: 37,
        marginLeft: 17,
        backgroundColor: "rgb(238,188,29)",
    }}
    onClick={handleOpen}
    >Login
    </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        className='modal'
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
          <div >
        <AppBar
        position="static"
        className='paper'
        >
            <Tabs 
            value={value} onChange={handleChange} variant="fullWidth" style={{borderRadius: 10}}>
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>
        </AppBar>

        {value === 0 && <Login handleClose={handleClose}/>}
        {value === 1 && <SignUp handleClose={handleClose}/>}
          </div>            
          <div className='google'> 
          <span>
          OR
          </span>
          <GoogleButton
          style={{width : "100%", outline: "none" }}
          onClick={signInWithGoogle}
           />
          </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

