import React from 'react'
import { ThreeDots } from  'react-loader-spinner'


const Spinner = () => {
  return (
   <div className='centerMe'>
    <ThreeDots 
height="120" 
width="120" 
radius="9"
color="#2c3e50" 
ariaLabel="three-dots-loading"
wrapperStyle={{}}
wrapperClassName=""
visible={true}
 />
 </div>
  )
}

export default Spinner
