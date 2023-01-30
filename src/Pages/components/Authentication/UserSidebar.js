import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { useContext } from 'react';
import { Crypto } from '../../../CryptoContext';
import { Avatar, Button } from '@mui/material';
import './Authentication.css';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../../firebaseApp';
import { numberWithCommas } from '../../CoinPage';
import {AiFillDelete} from 'react-icons/ai';
import { doc, setDoc } from 'firebase/firestore';

// we have used the drawer Component from material UI

export default function UserSidebar() {
  const [state, setState] = React.useState({
    right: false,
  });

  const CryptoState = useContext(Crypto);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", CryptoState.user.uid);
  
    try {
      // We are creating a document
      await setDoc(coinRef, {
        // Filter out to the particular coin and add it to the dataBase
        coins: CryptoState.watchList.filter((watch) => watch !== coin?.id),
      },
      {merge: "true"} // merge the coin that is already in the document      
      );
      CryptoState.setAlert({
        open: true,
        message: `${coin.name} Remove from the Watchlist !`,
        type: "success"
    })

    } catch (error) {
      CryptoState.setAlert({
        open : true,
        message: error.message,
        type: "error",
      })      
    }
  }

  const logout = () => {
    signOut(auth);

    CryptoState.setAlert({
        open: true,
        type: "success",
        message: "Logout Successfull !",
    })

    toggleDrawer();
  }

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar onClick={toggleDrawer(anchor, true)}
          style={{
            height: 40,
            width: 40,
            marginLeft: 15,
            marginRight: 5,
            cursor: "pointer",
            backgroundColor : "#EEBC1D",
          }}
          src={CryptoState.user.photoURL}
          alt={CryptoState.user.displayName || CryptoState.user.email}
           />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
          <div className='container' style={{width: 350,
            padding: 25,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            fontFamily: "monospace",
            backgroundColor: "#424242",
            }}>
          <div className='profile' style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            height: "92%",
          }}>
            <Avatar 
        className='picture'
        style={{
            width: 200,
            height: 200,
            cursor: "pointer",
            backgroundColor: "#EEBC1D",
            objectFit: "contain",
        }}
        src={CryptoState.user.photoURL}
          alt={CryptoState.user.displayName || CryptoState.user.email}      
          />          
          <span 
          style={{
            width: "100%",
            fontSize: 25,
            textAlign: "center",
            fontWeight: "bolder",
            wordWrap: "break-word",
          }}
          >
          {CryptoState.user.displayName || CryptoState.user.email}
          </span>
          <div className='watchlist'>
          <span style={{
            fontSize: 15,
            textShadow: "0 0 5px black"
          }}>
            Watchlist
          </span>
          {
            // eslint-disable-next-line
            CryptoState.coins.map((coin) => {
              if(CryptoState.watchList.includes(coin.id))
              return(
                <div className='coin' style={{backgroundColor: "#EEBC1D"}}>
                <span>{coin.name}</span>
                <span style={{display: "flex", gap: 8}}>
                  {CryptoState.symbol}
                  {numberWithCommas(coin.current_price.toFixed(2))}
                  <AiFillDelete
                  style={{cursor: "pointer"}}
                  fontSize="16"
                  onClick={() => removeFromWatchlist(coin)}
                   /> 
                </span>
                </div>
              )
            })
          }
          </div>
          </div>
          <Button 
          variant="contained"
          style={{
            height: "8%",
            wdith: "100%",
            backgroundColor: "#EEBC1D",
            marginTop: 20,
          }}
          onClick={logout}
          >
            Logout
          </Button>
          </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
