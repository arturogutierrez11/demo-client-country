import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {postActivities, getAllCountries, getAllActivities} from "../../redux/actions";
import s from "../Create/Create.module.css"

//import validate from "../Create/Validators";


function validate (input) {
	let errors = {};
	if (!input.name) {
		errors.name = "Nombre de Actvidad Requerido";
	} else if (input.season.length === 0) {
		errors.season = "Temporada de la actividad requerida";
	} else if (!input.difficulty) {
		errors.difficulty = "Nivel de dificultad requerido";
	
	} else if (!input.duration) {
		errors.duration = "Duración de la actividad requerida";
	  
	} else if (input.countries.length < 1) {
		errors.countries = "País/paises requeridos";
	}
	return errors;
}

function AddActivity() {
	const dispatch = useDispatch();
	const history = useHistory();
	
    const countries = useSelector((state) => state.countries).sort((a, b) => {
		if (a.name < b.name) {
			return -1;
		}
		if (a.name > b.name) {
			return 1;
		}
		return 0;
	});
		
	

	//Formulario controlado
	
	const [errors, setErrors] = useState({});
	const [input, setInput] = useState({
		name: "",
		season: [],
		difficulty: "",
		duration: "",
		countries: [],
        id:""
        
       
	});

	useEffect(() => {
		dispatch(getAllCountries());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getAllActivities());
	}, [dispatch]);



//---------------------Name ------------------------------
	function handleChange(e) {
		setInput({
			...input,
			[e.target.name]: e.target.value
		});
		setErrors(
				validate({
					...input,
					[e.target.name]: e.target.value
				})
			);
		
	}
//------------------------------------------------------


//----------------- Seasons -------------------------------------------------
   function handleCheck(e) {
     let checked = input.season.some((season) => season === e.target.value);
    const newInput = {   
            ...input,
       season: checked
        ? input.season.filter((season) => season !== e.target.value)
        : [...input.season, e.target.value],
    };
    setInput(newInput)
	setErrors(newInput);
    }

//---------------------------------------------------------------------------------

//------------difficulty ---------------------------------------
	function handleSelctDifficulty(e) {
		setInput({
			...input,
			difficulty: e.target.value
		});
		setErrors(validate({
			...input,
			difficulty: [e.target.value]
		}))
	}
//-----------------------------------------------------------------

//-------- Duration -----------------
  function handleChanged(e) {
    setInput({
        		...input,
         		duration: e.target.value
         	});
	setErrors(validate({
		...input,
		duration: [e.target.value]
	}))
        
	}		

//--------------------------------------------




	function handleSelect(id) {
		setInput({
			...input,
			countries: [...input.countries, id.target.value]
            
		});
		setErrors( validate({
			...input,
			countries: [...input.countries, id.target.value]
		}))
	;
	}





	




	

	function handleDelete(e) {
		setInput({
			...input,
			countries: input.countries.filter((c) => c !== e)
		});
		
	}


	function handleCheckErrors(e) {
		e.preventDefault();
		setErrors(
			validate({
				...input,
				
				countries: [...input.countries, e.target.value]
			})
		);
		handleSubmit(e);
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (
			input.name &&
			input.season &&
			input.difficulty &&
			input.duration &&
			input.countries.length >= 1 
            
            
		) {
			dispatch(postActivities(input));
			alert("Actividad creada exitosamente");
			setInput({
				name: "",
				season: [],
				difficulty: "",
				duration: "",
				countries: [],
                id:""
                
                
			});
			history.push("/home");
		}

		
		
	}

	
	const difficulty = [1,2,3,4,5];
	
	

	return (
		<>
			
			<div className={s.contenedor} >
				<div >
					<div>
                       
                        <div className={s.titulo}>
                             <div  >
                             <Link to="/home">
                                <button className={s.homebutton} >Home</button>
                            </Link>
                        </div>
                           <div>
                            <h2 >Agregar Actividad</h2>
                           </div>
                            
                           
                        </div>
						
						<div>
							<div></div>
							<form onSubmit={handleSubmit}>
								<div className={s.name} >
									{" "}
									<label className={s.nameTitle}>Actividad: </label>
									<input
										type="text"
										value={input.name}
										name="name"
										
										placeholder="Ingrese la Actividad..."
										onChange={ (e) => handleChange (e)}
										required
										
									/>
								</div>
								{errors.name && (<p>{errors.name}</p>)}


                                <div className={s.temporada} >
             <label className={s.nameTempo}>Temporada / s:</label>
             <fieldset>
             
               <label>
                 <input
                   
                   type="checkbox"
                   name="seasonv"
                   value="Verano"
                   onChange={(e) => handleCheck(e)}
                   required
                 />
                 Verano
               </label>
               <label>
                 <input
                 
                   type="checkbox"
                   name="seasonOtoño"
                   value="Otoño"
                   onChange={(e) => handleCheck(e)}
                    required
                 />
                 Otoño
               </label>
               <label>
                 <input
                
                   type="checkbox"
                   name="seasonInvierno"
                   value="Invierno"
                   onChange={(e) => handleCheck(e)}
                    required
                 />
                 Invierno
               </label>
               <label>
                 <input
                

                   type="checkbox"
                   name="seasonPrimavera"
                   value="Primavera"
                   onChange={(e) => handleCheck(e)}
                   required
                 />
                 Primavera
               </label>

             
             </fieldset>
								</div>
								{errors.season && (<p>{errors.season}</p>)}


								<div className={s.dificultad} >
									<label className={s.nameDif}>Difficultad: </label>
									<select onChange={handleSelctDifficulty} required>
										<option value="" hidden>
											{" "}
											Elegir una Opcion
										</option>
										{difficulty.map((e) => (
											<option value={e} name="difficulty" key={e.id}>
												{e}{" "}
											</option>
										))}
									</select>
								</div>
								{errors.difficulty && (<p>{errors.difficulty}</p>)}
                                <div className={s.duracion}>
            <label className={s.nameDur} >Duración:</label>
             <br></br>
             <input
             
               type="time"
               name="duration"
               value={input.duration}
               onChange={(e) => handleChanged(e)}
               placeholder="--Duración en horas--"
              
               required
             />
             </div>
								{errors.duration && (<p>{errors.duration}</p>)}
								<div className={s.pais}>
                                <label className={s.namePais}>País: </label>
									<select onChange={ (e) =>handleSelect(e)} required>
										<option value={""} hidden>
											{" "}
											Seleccionar uno o mas países
										</option>
										{countries.map((e) => (
											<option  value={e.id} name="countries" key={e.id}>
												{e.name}
                                                
											</option>
										))}
									</select>
								</div>
								{errors.season && ( <p>{errors.season}</p>)}
								<div>
									<ul>
										<li >
											{input.countries.map((i) => (
												<div className={s.paises}>
													{i}
                                                   
													<button className={s.button} onClick={() => handleDelete(i)} type="button">
														X
													</button>
												</div>
											))}
										</li>
									</ul>
								</div>
								<div>
									{errors.name ||
									errors.input ||
									errors.duration ||
									errors.season ||
									errors.countries ? (
										<button  disabled>Agregar Actividad</button>
									) : (
										<button type="submit" className={s.crear} onClick={(e) => handleCheckErrors(e)}>
											Agregar Actividad
										</button>
									)}
								</div>

								
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default AddActivity;