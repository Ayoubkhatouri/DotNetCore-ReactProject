import React from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import {Button} from 'react-bootstrap'



const Footer = ({isEn}) => {
  return (
    <footer>
    <div className="footer">
    <span  className='logoFOT'>CAR RENTAL</span>
    <p style={{color:"black" ,fontWeight:"bold"}}>made by JAHH</p>
    <span style={{color:"black" ,fontWeight:"bold"}}>{isEn ? "Follow Us":"Suivez nous"}</span>
    <div className="socials-icones">
        <i className="fab fa-facebook-square"></i>
        <i className="fab fa-twitter-square"></i>
        <i className="fab fa-instagram-square"></i>
        <i className="fab fa-youtube-square"></i>
    </div>
    <p style={{color:"black" ,fontWeight:"bold"}} className="copy-right">&copy; 2022 <span>CAR RENTAL</span> All Right Reserved</p>
</div>

</footer>
  )
}

export default Footer
