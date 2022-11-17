 import axios from "axios"

export function  getAllCountries(){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/countries');
        const data = json.data
        
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: data
            
        })
    }
}
export function getNameCountries(name){
    return async function (dispatch) {
      try {
        var json = await axios.get(
          "http://localhost:3001/countries?name=" + name
        );
        //pegale esta ruta, que es la ruta por query, y después del = quiero
        // que le pases lo que me llega por payload(lo que el usuario escriba en la barra de búsqueda)
        //ejecuta esa ruta llamando lo que está después del =
        return dispatch({
          type: "GET_NAME_COUNTRIES",
          payload: json.data, //me devuelve la acción, lo que devuelve la ruta
        });
      } catch (error) {
        
        return dispatch({
          type: "ERROR_GET_NAME_COUNTRIES",
          payload: error,  
        });
       
      }
    };
};
export function postActivities (activity){
    return async function (dispatch) {
      let newActivity = await axios.post('http://localhost:3001/activity', activity)
    return newActivity;
    
}};
export function getAllActivities(){
  return async function(dispatch) {
    let allActivities = await axios.get('http://localhost:3001/activity')
  
  return dispatch({
    type : "GET_ACTIVITIES",
    payload : allActivities.data
  })
}};
export function getIdCountries(id){
  return async function (dispatch) {
    try {
      var json = await axios.get(
        "http://localhost:3001/countries/"+id
      );
      return dispatch({
        type: "GET_ID_COUNTRIES",
        payload: json.data, //me devuelve la acción, lo que devuelve la ruta
      });
    }catch(err){
      console.log(err)
    }
      

}
};

//---------- filtos y ordenamientos -----------------
export function filterByContinent(payload){
return{
  type: "FILTER_BY_CAPITAL",
  payload
}
};
export function filterByActivity(payload){
  return{
     type: "FILTER_BY_ACTIVITY",
  payload
  }
 
};
export function sortByName(payload){
  return{
    type:"SORT_BY_NAME",
    payload
  }
};
export function sortByPopulation(payload){
  return{
    type:"SORT_BY_POPULATION",
    payload
  }
};

//---------------------------------------------------

