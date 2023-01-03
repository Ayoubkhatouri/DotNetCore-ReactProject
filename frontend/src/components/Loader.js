import React, { useContext } from 'react'
import { Spinner } from 'react-bootstrap'
import context1 from '../context1'

 const Loader = () => {
  const {isEn}=useContext(context1)
  return (
    <Spinner animation='border' role='status' 
    style={{width:'100px' , height:'100px' , margin:'auto' ,display:'block'}}>
            <span className='sr-only'>
            {isEn ? "En Cours...":"Loading...."}
            </span>
    </Spinner>
  )
}

export default Loader
