import { Box, Button, TextField } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { useContext } from 'react';
import { Crypto } from '../../../CryptoContext';
import { auth } from '../../../firebaseApp';

const Login = ({handleClose}) => {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const CryptoState = useContext(Crypto);

const handleSubmit = async () => {
  if(!email || !password){
    // Here we use simple snack bars
    CryptoState.setAlert({
    open: true,
    message: "Please fill all the fields",
    type: "error",
    })
    return;
}
try {
  const result = await signInWithEmailAndPassword(auth, email, password);
  CryptoState.setAlert({
    open: true,
    message: `Login Successful. Welcome ${result.user.email}`,
    type: "success",
})    
handleClose()

} catch (error) {
  CryptoState.setAlert({
    open: true,
    message: error.message,
    type: "error",
}) 
}
}

  return (
        // We are going to use material UI which acts as a div but it has a few extra functionality provide some style
    <Box p={3} style={{display : "flex", flexDirection: "column", gap: "20px"}}
    >
    <TextField
    variant='outlined'
    type="email"
    label="Enter Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    FullWidth
    />
    <TextField
    variant='outlined'
    type="password"
    label="Enter Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    FullWidth
    />
    <Button
    variant="contained"
    size="large"
    style={{backgroundColor: "#EEBC1D"}}
    onClick={handleSubmit}
    > Login
    </Button>
    </Box>

  )
}

export default Login