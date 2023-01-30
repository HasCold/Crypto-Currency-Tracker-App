import { ThemeProvider, createTheme, CircularProgress } from '@mui/material';
import axios from 'axios';
import React from 'react'
import "./CoinInfo.css";
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import { HistoricalChart } from '../../config/api';
import { Crypto } from '../../CryptoContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { chartDays } from '../../config/dataChart';
import SelectBtn from '../../components/SelectBtn';


const CoinInfo = ({coin}) => {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
    const [historicalData, setHistoricData] = useState([]);
    const [days, setDays] = useState(1);
    const [hours, setHours] = useState(24);
    const AppCrypto = useContext(Crypto);
    const [flag,setflag] = useState(false);

    const fetchHistoricalData = async () => {
      // Whatever we receive from an API we have something in the data so we are destructuring the data from inside of an API; 
      const {data} = await axios.get(HistoricalChart(coin.id, days, AppCrypto.currency))
      setflag(true);
      setHistoricData(data.prices);
    }
    console.log("Data",historicalData);

    useEffect(() => {
  fetchHistoricalData()
}, [AppCrypto.currency, days])

    const data = {
      labels: historicalData.map((coin) => {
        let date = new Date(coin[0]);
        let time =
        date.getHours() > 12
        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
        : `${date.getHours()}:${date.getMinutes()} AM`;
  return days === 1 ? time : date.toLocaleDateString();
      }),

      datasets: [
        {
           label : days > 24 || days === 1
           ? `Price ( Past ${days} Days ) in ${AppCrypto.currency}`
           : `Price ( Past ${days} Hours ) in ${AppCrypto.currency}`,
          data: historicalData.map((coin) => coin[1]),
          borderColor: "#EEBC1D",
        }
      ]}

  const darkTheme = createTheme({
    palette:{
      mode:'dark',   
     }
  });

  return (
    <ThemeProvider theme={darkTheme}>
    <div className='container2' 
    style={{display: "flex", justifyContent: "center", flexDirection:"column", paddingLeft: "20px", marginTop: "30px", width: "68vw"}}
    >
    {/* chart */}
{!historicalData | flag===false ?( 
  <CircularProgress 
    style={{color: "gold", margin: "auto"}}
    size={250}
  thickness={2}
  />
  ):(
    <>
    {/* <Line */}

    <div 
    // style={{ width: 1100 ,padding: "45px", paddingTop: "65px"}}
    className="line-chart">
    <Line  data={data}  options={{
      elements: {
        point: {
          radius: 2,
        },
      },
    responsive: true,
    maintainAspectRatio: true,
    }} 
    />
    </div>
    {/* button */}
    <div style={{display : "flex",paddingBottom: 10, paddingTop: 30,justifyContent: "space-around", width: "100"}} className="chart-Btn">
      {chartDays.map((day) => {
        return (
          <SelectBtn
          key={day.value}
          onClick={() => {setDays(day.value)
            setflag(false);
          }}
          selected={ days ? day.value===days : day.value === hours
          }
          >
            {day.label}
          </SelectBtn>
        )
      })}
    </div>
    </>
  )
}
    </div>

    </ThemeProvider>
  )
}

export default CoinInfo