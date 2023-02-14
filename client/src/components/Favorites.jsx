import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite } from "../actions/actions";
import './Favorites.css'




const Favorites = () => {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch()
  
  const handleRemove = (e) => {
     dispatch(removeFavorite(e))
  }

  return (
    <div className="fav-container">
      <nav className="nav-nav">
        {favorites.map((el) => {
          return (
            <div className="nav-box" key={el.id}>
               <p className="nav-name">{el.name}</p>
              <img className="nav-img" src={el.image} alt="dogImg" />
              <button className="remove-btn" onClick={() => handleRemove(el.id)}>remove</button>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Favorites;
