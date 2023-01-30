import React from 'react'
import './Banner.css'
import { Container } from '@mui/material'
import {Typography} from '@mui/material'
import Carousel from './Carousel'

// In Material UI, typography is used to create a consistent visual hierarchy and improve the overall design and readability of the user interface.

const Banner = () => {
  return (
    <div className='banner'>
        <Container className='bannerContent'> 
          <div className='tagline'>
        <Typography variant='h2' style={{fontWeight:"bold", marginBottom:"15px", fontFamily:"Montserrat"}}>
          Crypto Hunter
        </Typography>
        <Typography variant="subtitile2" style={{color:"darkgrey", textTransform:"capitalize", fontFamily:"Montserrat", marginTop:"10px"}}>
          Get all the information regarding your favourite crypto currency
        </Typography>
          </div>
          <Carousel />
        </Container>
    </div>
  )
}

export default Banner