import  s from './App.css';
import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing/Landing"
import Home from "./components/Home/Home"
import Details from './components/Detail/Detail';
import AddActivity from '../src/components/Create/CreateX'


function App() {
  return (
    <BrowserRouter>
    <div className={s.contenedor} >
      <Switch>
        {/* <Route exact path='/' component={Landing} /> */}
        <Route path={'/activities'} component = {AddActivity}/>
      <Route exact path='/home' component={Home} />
      <Route path={'/home/:id'} component = {Details}/>
      <Route exact path='/' component={Landing} />

      </Switch>
      
    
    </div>
  </BrowserRouter>
  );
}

export default App;
