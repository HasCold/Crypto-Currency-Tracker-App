import { Snackbar} from '@mui/material';
import React from 'react'
import { useContext } from 'react'
import { Crypto } from '../../CryptoContext'
import MuiAlert from '@mui/lab/Alert'

const Alert = () => {
  
  const CryptoState = useContext(Crypto);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    CryptoState.setAlert({open: false})
  };

    return (
   
    <Snackbar
     open={CryptoState.alert.open}
     center
    autoHideDuration={4000} 
    onClose={handleClose}
    anchorOrigin={{
      vertical: "top",
      horizontal: "center"
   }}
    >
    <MuiAlert
    onClose={handleClose}
    elevation={10}
    variant="filled"
    severity={CryptoState.alert.type}
    >
        {CryptoState.alert.message}
    </MuiAlert>
    </Snackbar>
  )
}

export default Alert