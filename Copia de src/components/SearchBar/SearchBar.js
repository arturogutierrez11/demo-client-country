import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNameCountries } from "../../redux/actions";


import s from "../SearchBar/SearchBar.module.css"




export default function SearchBar({setCurrentPage, setOrder}){
    const [name, setName] = useState("")
    const dispatch = useDispatch()
    const Allcountries = useSelector((state) => state.countries)
    const [error,setError] = useState({name:''}) 

    const validate = (value) => {

        let errors = {}
    
        const findCountry = Allcountries.find((el) =>
          el.name.toLowerCase().includes(value.toLowerCase())
        )
        
        
    
        if (!value) {
          errors.name = 'Required field'
        } else if (findCountry === undefined) {
          errors.name = 'Country not found'
        }
        return errors
      }




    function handleChange(e){
        e.preventDefault()
        setName(e.target.value)//seteo el name en el valor del input(con e.target.value)
        console.log(name); //consologueamos el estado para ver como se va modificando
        
    }




    
    function handleSubmit(e){
        e.preventDefault()
        setError(validate(name))
       
        if (Object.keys(validate(name)).length === 0) {
          dispatch(getNameCountries(name))
          setCurrentPage(1)
          setOrder(e.target.value)
          
        
          setName('')
        }
        setName('')
            
         
    }



    return(
       
        <div >
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='search Country'
          value={name}
          onChange={handleChange}
          className={s.SearchBar}
          name='name'
        />
        <button className={s.buscar}>search</button>
        {error && <p className={s.error}>{error.name}</p>}
      </form>
    </div>
    )





}