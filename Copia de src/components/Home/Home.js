import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    getAllCountries,
    filterByContinent,
    filterByActivity,
    getAllActivities,
    sortByName,
    sortByPopulation,
    

} from "../../redux/actions";
import { Link } from "react-router-dom";
import  Card  from "../Card/Card"
import Paginated from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar.js";

import style from "../Home/Home.module.css"


export default function Home(){
const activities = useSelector((state) => state.activity);
const dispatch = useDispatch()
const [order, setOrder]= useState("")

const country =  useSelector((state) => (state.countries));


  
//-------------- Paginado -----------------------------------------------
const [currentPage, setCurrentPage] = useState(1)
const [countryPerPage, setcounrtyPerPage] = useState(9)
const indexOfLastcountry = currentPage * countryPerPage
const indexOfFirstCountry = indexOfLastcountry - countryPerPage
const currentCountry = country.slice(indexOfFirstCountry, indexOfLastcountry)

const paginated = (pageNumber) => {
    setCurrentPage(pageNumber)
}
//---------------------------------------------------------------------------



useEffect(() => {
    dispatch(getAllCountries())
   dispatch(getAllActivities())
}, [dispatch])


 
function handlerClick(e){
    e.preventDefault()
    dispatch(getAllCountries())
}
function handleFilterContinents(e) {
    e.preventDefault(); //para que no se rompa
    setCurrentPage(1); //resetear la página a 1
    dispatch(filterByContinent(e.target.value)); //se va a ejecutar y va a tomar como payload (accion), el valor de cada una de las opciones dependiendo de a cual le hace click el usuario
}
function handlefilterCountriesByActivities(e) {
    e.preventDefault();
    setCurrentPage(1);
   //resetear la página a 1
    dispatch(filterByActivity(e.target.value)); //se va a ejecutar y va a tomar como payload (accion), el valor de cada una de las opciones del select dependiendo de a cual le hace click el usuario
}
function handlerSort(e) {
    e.preventDefault()
    dispatch(sortByName(e.target.value))
    setCurrentPage(1)
    setOrder(`ordenado ${e.target.value}`)
    
}
function handlerSortedByPopulation(e){
    e.preventDefault()
   
    dispatch(sortByPopulation(e.target.value))
     setCurrentPage(1)
     setOrder(`ordenado ${e.target.value}`)
}




return(
    country.length ?
    <div className={style.contenedor}>
    <div className={style.up}>    
     <div className={style.total}>
        <div className={style.arriba}>
        <div className={style.buscador}>
        <SearchBar setOrder={setOrder} setCurrentPage={setCurrentPage} />
        </div>
       

        <div>
            <button className={style.refrescar} onClick={(e) =>{ handlerClick(e)} }>recargar</button>
            <Link to="/">
            <button className={style.arraque}>
                Inicio
            </button>
           </Link>
        </div>
        </div>
      </div> 
    <div className={style.filtros}> 
    <div className={style.filtrado}><h1>Filter by:</h1></div>


        <div >
             <select className={style.continents} onChange={(e) => handleFilterContinents(e)}>
            
              
              <option value="All">continente</option>
              <option value="Africa">África</option>
              <option value="North America">América del Norte</option>
              <option value="South America">América del Sur</option>
              <option value="Antarctica">Antártida</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europa</option>
              <option value="Oceania">Oceanía</option>
             </select>
        </div>
        <div>
             <Link to="/activities">
            <button className={style.actividad}>
                crear actividad
            </button>
            </Link>
        </div>
       
        
       
        <div >
        <select className={style.activities} name='activity' onChange={e => handlefilterCountriesByActivities(e)}>
      <option value="All"> Actividades </option>
       {activities.map((c) => 
        <option key={c.id} value={c.name}> {c.name} </option>)}
      </select>
        </div>
    </div>    
    <div className={style.orden}>
    <div className={style.order}><h1>Order by:</h1></div>
        <div>
        <select className={style.name} id='Sortname' onChange={ (e) => handlerSort(e)}>
                <option value='default'>Alphabetic</option>
                <option value="asc">A-Z</option>
                <option value="des">Z-A</option>
        </select>
        </div>

        <div>
        <select className={style.population} id='Sortpopulation' onChange={(e) => handlerSortedByPopulation(e)}>
        <option value="None"> Population</option>
        <option value="asc"> Min-Max </option>
        <option value='desc'> Max-Min </option>
      </select>
        </div>
     </div>
    </div> 
       
        <div className={style.barra}>

        </div>
        
        <div className={style.cartas}>
            {
                currentCountry.length ? currentCountry.map((el) =>{
                    return(
                        <Card  key={el.id} id={el.id} name={el.name} flags={el.flags} continents={el.continents} population={el.population} currencies={el.currencies} />
                    )
                })
                : <div className={style.loading2}>LOADING</div>
            }
        </div>
        <div className={style.paginado0} >
                    <Paginated countryPerPage={countryPerPage} country={country.length} paginated={paginated} />
                    
        </div>
    </div>
     : <div className={style.loading}>Loading...</div>
)






}