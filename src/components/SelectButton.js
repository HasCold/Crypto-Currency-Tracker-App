import { styled } from '@mui/system';
import React from 'react'
import './SelectBtn.css';

const SelectButton = ({children, selected, onClick}) => {
    // This is gonna take children so that anything that is written inside of it is gonna be written inside of over here

  return (
    <span
    id='select'
    style={{
      border: "1px solid gold",
        borderRadius: "5px",
        padding: "10px",
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor: selected ? "gold" : "",
        color: selected ? "black" : "",
        fontWeight: selected ? 700 : 500,
        width: "18%",
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
        textAlign: 'center'
    }}
    onClick={onClick} 
    // className={classes.selectbutton}
    >{children}</span>
)
}

export default SelectButton