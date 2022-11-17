import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIdCountries, } from "../../redux/actions";
import { useEffect } from "react";
import s from "../Detail/Detail.module.css";


export default function Details(){
    let {id} = useParams();
 
    const dispatch = useDispatch()

    const detalleCountry = useSelector((state) => state.detail)
   

    useEffect(() =>{
        dispatch(getIdCountries(id));
    }, [dispatch]);

    const activities = detalleCountry.activities?.map((e) => {
      return {
        name: e.name,
        difficulty: e.difficulty,
        duration: e.duration,
        season: e.season,
      };
    });
    
        
    return(
        <div>

        <div className={s.bodyDetail}>
         
  
          {detalleCountry ? (
            <div>
                 <div>
                   <Link to="/home">
                   <button className={s.notVol}>Volver</button>
                   </Link>
            </div>
               <div className={s.contenedor}> 
              <div className={s.pais}>
                <h1 className={s.h1name}>{detalleCountry.name}</h1>
                <div className={s.flagsStyle}>
                  <img
                    src={detalleCountry.flags}
                    alt="flag"
                    width="200px"
                    height="127px"
                    margin="0px"
                    text-shadow=" rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px"
                  />
                </div>
                <div className={s.datapais}>
                <h4>Capital: {detalleCountry.capital}</h4>
                <h3>Continente: {detalleCountry.continents}</h3>
                
                <h4>Subregión: {detalleCountry.subregion}</h4>
                <h4>Área: {detalleCountry.area} km²</h4>
                <h4>Población: {detalleCountry.population} hab.</h4>
                <h2 className={s.codigo}>Código: {detalleCountry.id}</h2>
                </div>
              </div>
              <div className={s.cards2}>
                <h1 className={s.titlee}>Actividades turísticas</h1>
                <div className={s.actcontent}>
                
                  {activities?.length >0
                   ? (
                   
                    activities.map((a) => {

                      return (
                        <div className={s.cardAct}>
                          
                          <div>
                            
                            <h3 className={s.nameact}>{a.name}</h3>
                            <p>Difficultad: {a.difficulty}</p>
                            <p>Duración: {a.duration} hs</p>
                            <p>Temporada: {a.season}</p>
                            
                            <div>
                               
                            </div>
                            
                          </div>
                          
                            
                          
                         
                         
                         
                        </div>
                        
                      );
                      
                  
                    })
                    
                
                   ): (
                   <div>
                    <p> no tiene, cree una</p>

                    <Link to="/activities">
                          <button className={s.btnact}>
                            Crear actividad turística
                          </button>
                        </Link>
                     
                     
                   </div>
                   
                        
                   
                  )
                  
                  }
                </div>
              </div>
              </div>
            </div>
          ) : (
            <div>
             
              <p>PAÍS INEXISTENTE!!!!!</p>
              <div>
                   <Link to="/home">
                   <button className={s.notVol}>Volver</button>
                   </Link>
            </div>
            
            </div>
            
          )}
        </div>
        
      </div>
    )

}