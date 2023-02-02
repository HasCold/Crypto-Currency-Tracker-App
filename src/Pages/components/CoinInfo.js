import { ThemeProvider, createTheme, CircularProgress } from '@mui/material';
import axios from 'axios';
import React from 'react'
// import "./CoinInfo.css";
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
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Row, Col } from 'react-bootstrap'
import { styled } from '@mui/system';
import SelectButton from '../../components/SelectButton';

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

  const useStyles = styled((theme) => ({
    container2: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,      
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },

}));

  const classes = useStyles();

  return (

    <ThemeProvider theme={darkTheme}>

    <div className={classes.container2}
    style={{display: "flex", justifyContent: "center", flexDirection:"column", paddingLeft: "20px",paddingRight: "20px", marginTop: "30px", width: "100vw"}}
    >
    {/* chart */}
{!historicalData | flag===false ?( 
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
  <CircularProgress 
    style={{color: "gold"}}
    size={250}
    thickness={2}
  />
</div>  ):(
    <>
    {/* <Line */}
    <div 
    // style={{ width: 1100 ,padding: "45px", paddingTop: "65px"}}
    >
    <Line  data={data}  options={{
      elements: {
        point: {
          radius: 1,
        },
      },
    responsive: true,
    maintainAspectRatio: true,
    }}
    className={classes.linechart} 
    />
    </div>
    {/* button */}
    <div 
    style={{display : "flex", paddingTop: 20,justifyContent: "space-around", width:"100%"}}
    >
      {chartDays.map((day) => {
        return (
          <SelectButton
          key={day.value}
          // className={classes.chartBtn}
          onClick={() => {setDays(day.value)
            setflag(false);
          }}
          selected={ days ? day.value===days : day.value === hours
          }
          >
            {day.label}
          </SelectButton>
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