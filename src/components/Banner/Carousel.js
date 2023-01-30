import axios from 'axios';
import React from 'react';
import { TrendingCoins } from '../../config/api';
import './Carousel.css';
import { useState, useEffect} from 'react';
import { useContext } from 'react';
import { Crypto } from '../../CryptoContext';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

export function numberWithCommas(x) {  // You will get this code by the google
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
    const AppCrypto = useContext(Crypto);
    const [trending, setTrending] = useState([]);
    console.log(trending);

useEffect(() => {
    async function FetchTrendingCoins() {
      // Whatever we receive from an API we have something in the data so we are destructuring the data from inside of an API; 
    const {data} = await axios.get(TrendingCoins(AppCrypto.currency));
    setTrending(data);
    }
    FetchTrendingCoins();
    }, [AppCrypto.currency]);

    const items = trending.map((coin) => {
      let profit = coin.price_change_percentage_24h >= 0;

      return (
        <div className="carouselItems">
        {/* Link will help us to navigate one page to another */}
        <Link  to={`/coins/${coin.id}`}>  
        <img src={coin.image} alt={coin.name} style={{height: "90px"}} />
        <span>
        <br />
        {coin.symbol}  
        &nbsp;
        <span style={{
          color: profit > 0 ? "rgb(151,227,214)" : "red"
        }}>
        {/* Explanation For the Below Code :- 
        In the code you provided, it is used to access the properties of an object 'coin' which may or may not exist. For example, the ?. after coin in coin?.price_change_percentage_24h means that if the coin object is null or undefined, the whole expression will evaluate to undefined instead of throwing an error.

        And, the ?. after price_change_percentage_24h is to make sure if the property exists or not and if it doesn't exist it will return undefined instead of throwing an error. */}
          {profit && "+"}{coin?.price_change_percentage_24h?.toFixed(2)}%
        </span><br />
        </span>
        <span style={{fontSize : 22, fontWeight : 500, display : "flex", justifyContent:"space-between", color: "white" }}>
          {AppCrypto.symbol}{numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
        </Link>
        </div>
      );
    });

    const responsive = {
      0: {
        items: 2,
      },
      800: {
        items: 4,
      },
    };

    return (
    <div className='carousel'>
    {/* From react alice carousel */}
    <AliceCarousel   
      mouseTracking
      infinite
      autoPlayInterval={1000}
      animationDuration={1500}
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay  
      />
    </div>
  )
}

export default Carousel