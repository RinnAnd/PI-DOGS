import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterCreated,
  getDogs,
  orderAlphabetically,
  orderWeight,
  filterTempers,
  dogsTemper,
} from "../actions/actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import "./Home.css";
import Paging from "./Paging";
import SearchBar from "./SearchBar";
import Loader from "./Loader";
import Btn from "./Btn";

const Home = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const allTempers = useSelector((state) => state.tempers);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, ] = useState(8);
  const indexLastDog = currentPage * dogsPerPage;
  const indexFirstDog = indexLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexFirstDog, indexLastDog);
  const [order, setOrder] = useState("");

  const paging = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(dogsTemper());
  }, [dispatch])

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs(e));
  }

  function handleCreatedFilter(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`);
  }

  function handleABC(e) {
    dispatch(orderAlphabetically(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`);
  }

  function handleWeighter(e) {
    dispatch(orderWeight(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`);
  }

  function handleSelector(e) {
    e.preventDefault();
    setCurrentPage(1)
    dispatch(filterTempers(e.target.value))
    setOrder(`Ordered ${e.target.value}`)
  }

  return (
    <div>
      <div className="header">
      <h1>Dogstagram</h1>
      <div className="navig">
        <div className="clicks">
        <Link to='/createdog' className="link">
        <Btn text={'Create a Dog'}/>
      </Link>
      <Btn text={'Reload dogs'} onClick={e => handleClick(e)}/>
      </div>
      <div className="srch">
      <SearchBar paging={paging} />
      </div>
      </div>
      </div>
      <nav className="dropdowns">
        <select className="select-box" onChange={(e) => handleABC(e)}>
          <option value="A">A to Z</option>
          <option value="Z">Z to A</option>
        </select>
        <select className="select-box" onChange={(e) => handleWeighter(e)}>
          <option value="light">Lightest to heaviest</option>
          <option value="heavy">Heaviest to lightest</option>
        </select>
        <select className="select-box" onChange={(e) => handleSelector(e)}>
          <option value='All'>All tempers</option>
          {allTempers.map(tem => {
              return (
                <option value={tem.name} key={tem.id}>{tem.name}</option>
                )
              })}
        </select>
        <select className="select-box" onChange={(e) => handleCreatedFilter(e)}>
          <option value="all">All dogs</option>
          <option value="api">Non-Created</option>
          <option value="created">Created</option>
        </select>
      </nav>
      <div className="big-container">
        {currentDogs.length > 0 ? (
          currentDogs.map((el) => {
            return (
              <>
                <Card
                  id={el.id}
                  name={el.name}
                  image={el.image}
                  temper={el.temper}
                  minWeight={el.minWeight}
                  maxWeight={el.maxWeight}
                  lifeSpan={el.lifeSpan}
                />
              </>
            );
          })
        ) : (
          <Loader />
        )}
      </div>
      <Paging
        currentPage={currentPage}
        dogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        paging={paging}
      />
    </div>
  );
};

export default Home;
