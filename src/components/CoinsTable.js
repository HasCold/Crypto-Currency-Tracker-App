import { createTheme, LinearProgress, Table, ThemeProvider } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { Crypto } from '../CryptoContext';
import {Container, Typography} from '@mui/material';
import './App.css';
import TextField from '@mui/material/TextField';
import {TableContainer, TableHead, TableRow, TableCell, TableBody} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import ReactToastify from '../ReactToastify'


export function numberWithCommas(x) {  // You will get this code by the google
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {
  // const [coins, setCoins] = useState([]);
  // const [loading, setLoading] = useState(false);
  const AppCrypto = useContext(Crypto);
  const [search, setSearch] = useState();
  const Navigate = useNavigate();
  const [page, setPage] = useState(1);

  // async function fetchCoins(){
  //   // Whatever we receive from an API we have something in the data so we are destructuring the data from inside of an API; 
  //   setLoading(true);
  //   const {data} = await axios.get(CoinList(AppCrypto.currency));
  //   console.log(data);
  //   setCoins(data);
  //   setLoading(false);
  // }
  console.log(AppCrypto.coins);
  useEffect(() => {
    // eslint-disable-next-line 
    AppCrypto.fetchCoins();
    // eslint-disable-next-line 
  }, [AppCrypto.currency]);

  const darkTheme = createTheme({
    palette:{
      mode:'dark',   
     }
  });

  const HandleSearch = () => {
    let filteredCoins = AppCrypto.coins;
    if (search) {
      filteredCoins = AppCrypto.coins.filter((coin) => 
        coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLowerCase()),
        );
      }
      // return filteredCoins.sort(() => Math.random() - 0.5);
    return filteredCoins;
  }
  return (
    <>
    <div style={{backgroundColor:"rgb(20,22,26)", marginTop: 0, height: "100%"}}>
      <ThemeProvider theme={darkTheme}>
    <Container style={{textAlign: "center"}}>
    <Typography
    variant="h4"
    style={{fontFamily : "Montserrat", paddingTop: 20, paddingBottom:20}}
    >
      Cryptocurrency Prices By Market Cap
    </Typography>
    <TextField
          label="Search For a Crypto Currency..."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%", color:"white" }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
        {/* LinearProgress are the loading components */}
          {
           AppCrypto.loading?(
                <LinearProgress style={{backgroundColor : "gold"}} />
            ):(
              <>
              <Table>
                <TableHead style={{backgroundColor : "#EEBC1D"}}>
                  <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                        marginBottom: 40,
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                  </TableRow>
                </TableHead>
                
                <TableBody>
                  {/* {CoinsData()} */}
                    {HandleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                      const profit = row.price_change_percentage_24h > 0;

                      return(
                        <TableRow
                        onClick={() => Navigate(`/coins/${row.id}`)}
                        className='row'
                        key={row.name}
                        >
                        <TableCell
                        component="th"
                        scope='row'
                        style={{display : "flex", gap : 15}}
                        >
                        <img src={row?.image} alt={row.name} height="50" style={{marginBottom: 10}}/>
                         <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell
                        align='right'>
                        {AppCrypto.symbol}{" "}
                        {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>

                        <TableCell
                        align='right'
                        style={{
                          color : profit > 0 ? "rgb(14,203,129)" : "red",
                          fontWeight : 500
                        }}
                        >                 
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%         
                        </TableCell>

                        <TableCell align='right'>
                        {AppCrypto.symbol}{" "}
                        {numberWithCommas(
                          row.market_cap.toString().slice(0, -6)
                        )}
                        M
                        </TableCell>
                        </TableRow>
                      )
                  })}
                </TableBody>
              </Table>
    <ReactToastify showToast={true}/>
              </>
            )
          }
        </TableContainer>

        <Pagination 
        style={{
          padding: 20,
          width : "100%",
          display : "flex",
          justifyContent : "center",
        }}
        color= "warning"
        className= "pagination"
          count={(HandleSearch()?.length/10).toFixed(0)}
          onChange={(_, value) => {
             setPage(value);
             window.scroll(0, 450); 
          }}
            //  The next thing it does is it calls the window.scroll method, this method is used to scroll the window to a specific position. It takes two arguments; the first is the number of pixels from the left of the document the current view should horizontally scroll to, and the second is the number of pixels from the top of the document the current view should vertically scroll to. In this case, it's scrolling the view 450 pixels from the top of the document.
        />

        </Container>
      </ThemeProvider>
    </div>
    </>
  )
}

export default CoinsTable