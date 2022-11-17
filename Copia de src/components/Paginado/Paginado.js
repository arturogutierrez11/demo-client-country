import React from "react";
import s from "../Paginado/Paginado.module.css"

export default function Paginated({ countryPerPage, country, paginated }) {
  const pageNumbers = [];
  for (let i = 0; i <= Math.floor(country / countryPerPage); i++) {
    pageNumbers.push(i + 1);
  }
  return (
    <div className={s.paginado}>
      <ul className={s.numero}>
        {pageNumbers?.map((num) => {
          return (
            <button
            className={s.boton}
              key={num}
              onClick={() => paginated(num)}
             
            >
              {num}
            </button>
          );
        })}
      </ul>
    </div>
  );
}
