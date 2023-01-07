import React from 'react'
import './Card.css'
import { Link } from "react-router-dom"

const Card = ({ id, name, image, minWeight, maxWeight, temper, lifeSpan }) => {
  
  return (
    <div className='card-container'>
        <div className="card-inner">
          <div className="card-front">
            <img src={image} alt='not found' className='card-img'/>
            <h3>{name}</h3>
          </div>
          <div className="card-back">
              {Array.isArray(temper) ? <h5>Tempers: {temper.join(', ')}</h5> : <h5>Tempers: {temper}</h5>}
            <h5>Life Span: {lifeSpan}</h5>
            <p>Min Weight: {minWeight}kg, Max Weight: {maxWeight}kg</p>
            <Link to={`/detail/${id}`}>
            <button className='det-btn'>Details</button>
            </Link>
          </div>
        </div>
        </div>
  )
}

export default Card