import React from "react";
import "./Paging.css";

const Paging = ({ currentPage, dogsPerPage, allDogs, paging }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="nav">
      <ul className="paging">
        <a className="prev" onClick={currentPage > 1 ? () => paging(currentPage - 1): ''}>
          Prev
        </a>
        {pageNumbers &&
          pageNumbers.map((num) => (
            <li className="nums" key={num}>
              <a              
                onClick={() => paging(num)}
                className={currentPage === num ? "active" : "number"}
              >
                {num}
              </a>
            </li>
          ))}
        <a className="next" onClick={ currentPage < allDogs /dogsPerPage && (() => paging(currentPage + 1))}>
          Next
        </a>
      </ul>
    </nav>
  );
};

export default Paging;
