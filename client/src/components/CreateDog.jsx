import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dogsTemper, postDog } from "../actions/actions";
import "./CreateDog.css";



const CreateDog = () => {
  function validate(doginfo) {
    let errors = {};
    var validIMG = /^(ftp|http|https):\/\/[^ "]+$/.test(doginfo.image);

    //console.log(validIMG)
  
    if (!doginfo.name) {
      errors.name = "You must name your dog breed";
    }
    else if (!doginfo.minHeight) {
      errors.minHeight = "Add a minimum height please";
    }
    else if (!doginfo.maxHeight) {
      errors.maxHeight = "Add a max height please";
    }
    else if (isNaN(parseInt(doginfo.minHeight))) {
      errors.minHeight = "Height must be a number";
    }
    else if (isNaN(parseInt(doginfo.maxHeight))) {
      errors.maxHeight = "Height must be a number";
    }
    else if (parseInt(doginfo.minHeight) > parseInt(doginfo.maxHeight)) {
      errors.minHeight = "Min height should be lower than max hight";
    }
    else if (!doginfo.minWeight) {
      errors.minWeight = "Add a minimum weight please";
    }
    else if (!doginfo.maxWeight) {
      errors.maxWeight = "Add a max weight please";
    }
    else if (isNaN(parseInt(doginfo.minWeight))) {
      errors.minWeight = "Weight must be a number";
    }
    else if (isNaN(parseInt(doginfo.maxWeight))) {
      errors.maxWeight = "Weight must be a number";
    }
    else if (parseInt(doginfo.minWeight) > parseInt(doginfo.maxWeight)) {
      errors.minWeight = "Min weight should be lower than max weight";
    }
    else if (!doginfo.lifeSpan) {
      errors.lifeSpan = "Please add a lifespan";
    }
    else if (isNaN(parseInt(doginfo.lifeSpan))) {
      errors.lifeSpan = "Lifespan should be a number";
    }
    else if (doginfo.lifeSpan <= 0) {
      errors.lifeSpan = "A dog cannot have negative life";
    }
    else if (!validIMG) {
      errors.image = 'Image must have a valid link'
    }
    else if (!doginfo.temper) {
      errors.temper = 'Please choose 1 temper'
    }
    return errors;
  }

  const dispatch = useDispatch();
  const allTempers = useSelector((state) => state.tempers);
  const [errors, setErrors] = useState({
    name: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    lifeSpan: "",
    image: "",
  });

  
  //console.log(errors)

  const [doginfo, setDoginfo] = useState({
    name: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    lifeSpan: "",
    image: "",
    temper: [],
  });

  

  //console.log(doginfo)

  useEffect(() => {
    dispatch(dogsTemper());
  }, [dispatch]);

  const handleChange = (e) => {
    const prop = e.target.name;
    const value = e.target.value;
    setDoginfo({
      ...doginfo,
      [prop]: value,
    });
    setErrors(
      validate({
        ...doginfo,
        [prop]: value,
      })
    );
  };

  const handleSelector = (e) => {
    if (!e.target.value) {
      return;
    }
    if (doginfo.temper.length === 6) {
      alert("You can only choose a maximum of 6 tempers");
      return;
    }
    if (doginfo.temper.includes(e.target.value)) {
      alert("You can't choose the same temper twice");
      return;
    }
    setDoginfo({
      ...doginfo,
      temper: [...doginfo.temper, e.target.value],
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !Object.getOwnPropertyNames(errors).length &&
      doginfo.name &&
      doginfo.minHeight &&
      doginfo.maxHeight &&
      doginfo.minWeight &&
      doginfo.maxWeight &&
      doginfo.lifeSpan &&
      doginfo.temper.length
    ) {
      dispatch(postDog(doginfo));
      alert("Your dog has been created");
      setDoginfo({
        name: "",
        minHeight: "",
        maxHeight: "",
        minWeight: "",
        maxWeight: "",
        lifeSpan: "",
        image: "",
        temper: [],
      });
    } else {
      alert("Dog could not be created");
    }
  };

  const handleDeleteTemp = (e) => {
    setDoginfo({
      ...doginfo,
      temper: doginfo.temper.filter((tem) => tem !== e),
    });
  };

  return (
    <div className="bigcontainer">
      <div className="buttondiv">
      <Link to="/home">
        <button className="back">⬅️ Go back</button>
      </Link>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
      <div className="form-div">
        <div className="sub">
          <label><strong className="det">Name: </strong></label>
          <input
            className={errors.name && 'error-box'}
            name="name"
            type="text"
            placeholder="Add a name"
            value={doginfo.name}
            onChange={(e) => handleChange(e)}
          />
          {errors.name && (<p className="error">{errors.name}</p>)}
        </div>
        <div className="sub">
          <label ><strong className="det">Min height: </strong></label>
          <input
            className={errors.minHeight && 'error-box'}
            name="minHeight"
            type="text"
            placeholder="Add a min height"
            value={doginfo.minHeight}
            onChange={(e) => handleChange(e)}
          />
          {errors.minHeight && (<p className="error">{errors.minHeight}</p>)}
        </div>
        <div className="sub">
          <label><strong className="det">Max height: </strong></label>
          <input
            className={errors.maxHeight && 'error-box'}
            name="maxHeight"
            type="text"
            placeholder="Add a max height"
            value={doginfo.maxHeight}
            onChange={(e) => handleChange(e)}
          />
          {errors.maxHeight && (<p className="error">{errors.maxHeight}</p>)}
        </div>
        <div className="sub">
          <label><strong className="det">Min weight: </strong></label>
          <input
            className={errors.minWeight && 'error-box'}
            name="minWeight"
            type="text"
            placeholder="Add a min weight"
            value={doginfo.minWeight}
            onChange={(e) => handleChange(e)}
          />
          {errors.minWeight && (<p className="error">{errors.minWeight}</p>)}
        </div>
        <div className="sub">
          <label><strong className="det">Max weight: </strong></label>
          <input
            className={errors.maxWeight && 'error-box'}
            name="maxWeight"
            type="text"
            placeholder="Add a max weight"
            value={doginfo.maxWeight}
            onChange={(e) => handleChange(e)}
          />
          {errors.maxWeight && (<p className="error">{errors.maxWeight}</p>)}
        </div>
        <div className="sub">
          <label><strong className="det">Lifespan: </strong></label>
          <input
            className={errors.lifeSpan && 'error-box'}
            name="lifeSpan"
            type="text"
            placeholder="Add a lifespan"
            value={doginfo.lifeSpan}
            onChange={(e) => handleChange(e)}
          />
          {errors.lifeSpan && (<p className="error">{errors.lifeSpan}</p>
          )}
        </div>
        <div className="sub">
          <label><strong className="det">Image: </strong></label>
          <input
            className={errors.image && 'error-box'}
            name="image"
            type="text"
            placeholder="Add an image URL"
            value={doginfo.image}
            onChange={(e) => handleChange(e)}
          />
          {errors.image && (<p className="error">{errors.image}</p>)}
        </div>
        </div>
          <div className="selector">
          <select onChange={e => handleSelector(e)}>
            <option value='selected' hidden >Tempers</option>
            {allTempers?.sort((a, b) => {
              if (a.name < b.name) return -1;
              if (a.name > b.name) return 1;
              return 0;
            }).map(tem => {
              return (
                <option value={tem.name} key={tem.id}>{tem.name}</option>
                )
              })}
          </select>  Choose up to 6 temperaments
          </div>
              {errors.temper && (<p className="error">{errors.temper}</p>)}
          <div className="wrapper">
          {doginfo.temper.map(el => {
            return (
              <ul key={el}>
                <li className="list">
                  <p className="temps">{el} <button className="close" onClick={() => handleDeleteTemp(el)}>✖️</button></p>
                </li>
              </ul>
            )
          })}
        </div>
        <div className="subm-parent">
        <button type="submit" className="subm">Create Dog ☑️</button>
        </div>
      </form>
    </div>
  );
};

export default CreateDog;
