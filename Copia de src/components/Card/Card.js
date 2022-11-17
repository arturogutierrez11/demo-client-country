import React from "react";
import { Link } from "react-router-dom";
 import s from "../Card/Card.module.css"



const Card= ({ id, name, flags, continents, population, currencies})=> {
    return(
        <div className={s.card}>
        
            <div>
            <h2 className={s.name}> {name}</h2>
            <img src={flags} alt="not found" width='250px' height='125px' className={s.countryImage}></img>
            <h3 className={s.continents}>  {continents}</h3>
            <h4 className={s.poblacion}> Poblacion: {population} hab.</h4>
            <h3> Moneda: {currencies}</h3>
            <Link to={`/home/${id}`}>
            <button className={s.vermas}>Ver mas</button></Link>
            
            </div>
            
       
        </div>
    )
}



export default  Card