import React from 'react'
import './SelectBtn.css';

const SelectBtn = ({children, selected, onClick}) => {
    // This is gonna take children so that anything that is written inside of it is gonna be written inside of over here
  return (
    <div >
    <span
    onClick={onClick} 
    className='select'
    >{children}</span>
    </div>
)
}

export default SelectBtn