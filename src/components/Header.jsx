import React from "react"
import "./App.css";
import { AppBar } from "@mui/material"
import {Container, Toolbar, Select, MenuItem} from "@mui/material"
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import  Cryptostate  from "../CryptoContext";
import { useContext } from "react";
import { Crypto } from "../CryptoContext";
import AuthModal from "../Pages/components/Authentication/AuthModal";
import UserSidebar from "../Pages/components/Authentication/UserSidebar";


const Header = () => {
const navigate = useNavigate();
const darkTheme = createTheme({
    palette:{
     mode:'dark',   
    }
})

// const {currency, setCurrency} = Cryptostate()
const AppCrypto = useContext(Crypto);
console.log(AppCrypto.currency);

  return (
    <ThemeProvider theme={darkTheme}>
    <div>
  <AppBar color="transparent" position= "static" style={{backgroundColor : "rgb(20,22,26)"}}>
  {/* Container helps us to make our app responsive */}
  <Container>  
    <Toolbar>
    {/* When ever we want to add text or something */}
      <div className="title" onClick={() => navigate("/")}>Crypto Hunter</div>
      <Select variant="outlined" style={{width:"100px", height:"40px", marginLeft:"15px"}} value={AppCrypto.currency} onChange={(e) => AppCrypto.setCurrency(e.target.value)}>
      <MenuItem value={"USD"}>USD</MenuItem>
      <MenuItem value={"EUR"}>EUR</MenuItem>
      <MenuItem value={"PKR"}>PKR</MenuItem>
      <MenuItem value={"INR"}>INR</MenuItem>
      </Select>

      {AppCrypto.user ? <UserSidebar /> : <AuthModal />}
    </Toolbar>
  </Container>

  </AppBar>
    </div>
    </ThemeProvider>
  )
}

export default Header