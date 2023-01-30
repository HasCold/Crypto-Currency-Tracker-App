import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import axios from 'axios';
import { CoinList } from './config/api';
import { auth, db } from './firebaseApp';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';

const Crypto = createContext()
const CryptoContext = ({children}) => {
const [currency, setCurrency] = useState("USD");
const [symbol, setSymbol] = useState("$");
const [coins, setCoins] = useState([]);
const [loading, setLoading] = useState(false);
const [user, setUser] = useState(null);
const [alert, setAlert] = useState({
  open : false,
  message: "",
  type: "success",
});
const [watchList, setWatchList] = useState([]);

useEffect(() => {
  if(user){
    const coinRef = doc(db, "watchlist", user.uid);
    var unsubscribe =  onSnapshot(coinRef, coin=> {
      if(coin.exists()){
        setWatchList(coin.data().coins)
        console.log(coin.data().coins)
      }else{
        console.log("No items in the Watchlist");
      }
    })
    return () => {
      unsubscribe();
    }
  }
}, [user])


useEffect(() => {
  // It gonna monitor the state of our authentication of our Firebase app so it takes the auth which was provided
  onAuthStateChanged(auth, user => {
    if(user)setUser(user);
    else setUser(null)
    console.log(user);
  })
}, [])


async function fetchCoins(){
  // Whatever we receive from an API we have something in the data so we are destructuring the data from inside of an API; 
  setLoading(true);
  const {data} = await axios.get(CoinList(currency));
  console.log(data);
  setCoins(data);
  setLoading(false);
}

useEffect(() => {
    if(currency === "PKR")setSymbol("₨");
    else if(currency === "USD") setSymbol('$');
    else if(currency === "EUR") setSymbol('€');
    else if(currency === "INR") setSymbol('₹');
}, [currency]);  // when the currency changes it will run everytime

   return (
    <>
    <Crypto.Provider value={{currency, symbol, setCurrency, coins, loading, fetchCoins, alert, setAlert, user, watchList}}>
    {children}
    </Crypto.Provider>
    </>
  )
}

export default CryptoContext
export {Crypto};
// export const Cryptostate = () => {
//  return  useContext(Crypto);
// }
