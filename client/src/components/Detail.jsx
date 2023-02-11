import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Detail.css'
import Btn from "./Btn";
import { Link, useParams } from 'react-router-dom';
import { dogID, clearDetail, addFavorite } from '../actions/actions';




const Detail = () => {
    const dispatch = useDispatch()
    const dogsID = useSelector((state) => state.detail)
    const { id } = useParams()
    useEffect(() => {
        dispatch(dogID(id));
    },[dispatch,id])
    
    const goBack = () => {
        dispatch(clearDetail())
    }

    const handleAdd = (e) => {
        dispatch(addFavorite(e))
    }

  return (
    <div className="conteiner">
        <div className="button">
        <Link to='/home' className='link'>
        <Btn text={'Go back'} onClick={goBack} />
        </Link>
        <button className='btn' onClick={() => handleAdd(dogsID)}>❤️</button>
        </div>
        {dogsID && dogsID.map(d => {
            return (
                <div key={d.id}>
                <h1>{d.name}</h1>
                <img src={d.image} alt='not found' className='pic'/>
                {Array.isArray(d.temper) ? <h2>{d.temper.join(', ')}</h2> : <h2>{d.temper}</h2>}
                <h3>This breed of dog can have a height of {d.minHeight}cm to {d.maxHeight} cm</h3>
                <h3>and can weigh from {d.minWeight}kg to {d.maxWeight} kg</h3>
                <h3>Its lifespan goes from {d.lifeSpan}</h3>
                </div>
            )
        })}
    </div>
  )
}

export default Detail;