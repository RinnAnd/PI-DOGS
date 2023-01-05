import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'
import din from '../images/linkedin.png'
import hub from '../images/github.png'


const LandingPage = () => {
  return (
    
    <div className='box'>
    <div className='landingpage'>Welcome to my Dogs website
    <Link to ='/home'>
    <button className='btn'>🐶</button>
            </Link></div>
            <div className='mylinks'>
              <a href='https://www.linkedin.com/in/andrés-casas-004500a8/' target='_blank'><img className='ruts' src={din}/></a>
              <a href='https://github.com/RinnAnd' target='_blank'><img className='ruts' src={hub} /></a>
            </div>
            </div>
    
  )
}

export default LandingPage