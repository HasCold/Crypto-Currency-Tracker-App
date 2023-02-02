import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api'
import { Crypto } from '../CryptoContext'
import './CoinPg.css'; 
import CoinInfo from './components/CoinInfo'
import { Button, LinearProgress, Typography } from '@mui/material'
import parse, { Element } from 'html-react-parser';
import { doc, setDoc } from 'firebase/firestore'
import { db } from "../firebaseApp";

export function numberWithCommas(x) {  // You will get this code by the google
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const parser = input =>
  parse(input, {
    replace: domNode => {
      if (domNode instanceof Element && domNode.attribs.class === 'remove') {
        return <></>;
      }
    }
  });


const CoinPage = () => {  

  const {id} = useParams()
  const [coin, setCoin] = useState()
  const AppCrypto = useContext(Crypto)
  
  const inWatchList = AppCrypto.watchList.includes(coin?.id);
  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", AppCrypto.user.uid);
  
    try {
      // We are creating a document
      await setDoc(coinRef, {
        coins: AppCrypto.watchList ? [...AppCrypto.watchList,coin?.id] : [coin?.id],
      });
      AppCrypto.setAlert({
        open: true,
        message: `${coin.name} Added to the Watchlist !`,
        type: "success"
    })

    } catch (error) {
      AppCrypto.setAlert({
        open : true,
        message: error.message,
        type: "error",
      })      
    }
  }

  const removeFromWatchlist = async () => {
    const coinRef = doc(db, "watchlist", AppCrypto.user.uid);
  
    try {
      // We are creating a document
      await setDoc(coinRef, {
        // Filter out to the particular coin and add it to the dataBase
        coins: AppCrypto.watchList.filter((watch) => watch !== coin?.id),
      },
      {merge: "true"} // merge the coin that is already in the document      
      );
      AppCrypto.setAlert({
        open: true,
        message: `${coin.name} Remove from the Watchlist !`,
        type: "success"
    })

    } catch (error) {
      AppCrypto.setAlert({
        open : true,
        message: error.message,
        type: "error",
      })      
    }
  }

  const fetchCoin = async () => {
      const {data} = await axios.get(SingleCoin(id));
      setCoin(data);
  }
  console.log(coin);
useEffect(() => {
  fetchCoin()
}, []);

  if (!coin) return <LinearProgress style={{backgroundColor: "gold"}} />

  return (
    <div className='container'>
      <div className='sidebar'> 
        {/* SideBar */}
        <img 
        src={coin?.image.large}
         alt={coin?.name} 
          height="200"
          style={{marginBottom : 20}}
         />
         <Typography variant="h3" className="heading" style={{fontWeight: "bold",
         marginBottom: "20px",
         fontFamily: 'Montserrat',
         }}>
          {coin?.name}
         </Typography>
         <Typography variant="subtitle1" className='description' style={{width : "100%", fontFamily:"Montserrat", padding:25, paddingTop: 0, textAlign : "justify"}}> 
          {parser(`
            ${coin?.description.en.split(". ")[0]}
          `)}
          {/* en means english */}
         </Typography>
         <div className='marketData'>
         <span style={{display : "flex", marginBottom: 20}}>
         <div className='heading'>
         <Typography variant='h5' style={{fontFamily: "Montserrat", fontWeight: "bold"}}>
         Rank:
         </Typography>
         </div>
         &nbsp; &nbsp;
          <Typography variant='h5' style={{fontFamily: "Montserrat"}}>
             {coin.market_cap_rank}
          </Typography>
         </span>
         <span style={{display : "flex", marginBottom: 20}}>
         <div className='heading'>
         <Typography variant='h5' style={{fontFamily: "Montserrat", fontWeight: "bold"}}>
         Current Price:
         </Typography>
         </div>
         &nbsp; &nbsp;
          <Typography variant='h5' style={{fontFamily: "Montserrat"}}>
          {AppCrypto.symbol}{" "}
             {numberWithCommas(coin?.market_data.current_price[AppCrypto.currency.toLowerCase()])}
          </Typography>
         </span>
         <span style={{display : "flex", marginBottom: 20}}>
         <div className='heading'>
         <Typography variant='h5' style={{fontFamily: "Montserrat", fontWeight: "bold"}}>
         Market Cap:
         </Typography>
         </div>
         &nbsp; &nbsp;
          <Typography variant='h5' style={{fontFamily: "Montserrat"}}>
          {AppCrypto.symbol}{" "}
             {numberWithCommas(coin.market_data.market_cap[AppCrypto.currency.toLowerCase()].toString().slice(0, 6))}
          M
          </Typography>
         </span>
         {AppCrypto.user && (
          <Button
          variant="outlined"
          style={{
            width: "100%",
            height: 40,
            backgroundColor: inWatchList ? "#ff0000" : "#EEBC1D",
            color : "black",
            border: "none"
          }}
          onClick={inWatchList ? removeFromWatchlist : addToWatchlist}
          >
          {inWatchList? "Remove from Watchlist" : "Add to Watchlist"}
          </Button>
         )}
         </div>         
      </div>
      {/* chart */}
      {/* <div style={{display:"flex", flexDirection:"row"}} className="cryptoinfo"> */}
      <CoinInfo coin={coin}/>
      {/* </div> */}
    </div>
  )
}

export default CoinPage