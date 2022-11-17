const initialState = {
    countries: [],
    allCountries: [],
    activity: [],
    detail: []
    
  }
  
 
  
  function rootReducer (state = initialState, action) {
    switch(action.type){
        case "GET_COUNTRIES":
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }
        case 'GET_NAME_COUNTRIES':
          return {
            ...state,
            countries: action.payload
          }
        case "GET_ID_COUNTRIES":
          return{
            ...state,
           detail: action.payload
          }
        case "GET_ACTIVITIES":
          return{
            ...state,
            activity: action.payload
          }
        case "POST_ACTIVITIES":
          return {
              ...state,  
          };
        case "FILTER_BY_CAPITAL":
          const allCountries = state.allCountries;
      const continentsFiltered =
        action.payload === "All"  
          ? allCountries   
          : allCountries.filter((el) => el.continents === action.payload); 
      return {
        ...state,
       
        countries: continentsFiltered, 
      }





        case "FILTER_BY_ACTIVITY":
          const allActivities = state.countries
          const activitiesFiltered = allActivities.filter((c) => { return c.activities.find((c) => { return c.name === action.payload; }); });
    
          if (action.payload === 'All') {
              return { ...state, countries: allActivities }
          } else {
              return {
                  ...state,
                  countries: activitiesFiltered
              }
          } 
        case "SORT_BY_NAME":
          let arr = state.countries
          let sorted = action.payload === "asc"
          ? arr.sort(function(a,b){
            if(a.name > b.name){
              return 1;
            }
            if(b.name > a.name){
              return -1;
            } return 0
          })
          : arr.sort(function(a, b){
            if (a.name > b.name){
              return -1;
            }
            if(b.name > a.name){
              return 1
            }
            return 0
          })
          return{
            ...state,
            countries: sorted

          }   



        case "SORT_BY_POPULATION":
          let sortedPopulation = action.payload === "asc"?
      state.allCountries.sort(function(a,b){
        if(a.population > b.population){
          return 1
        }
        if (a.population < b.population) {
          return -1
        }
        return 0
      }) :
     state.allCountries.sort(function (a, b) {
      if (a.population > b.population) {
        return -1
      }
      if (a.population < b.population) {
        return 1
      }
      return 0
     })
     return {
      ...state,
      allCountries : sortedPopulation
     }
     


        

    
      


          




          
        default:
      return { ...state }
    }
    

  }



  export default rootReducer