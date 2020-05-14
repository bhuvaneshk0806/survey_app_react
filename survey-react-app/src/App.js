import React from 'react';
//import logo from './logo.svg';
import SurveysContainerComponent from './Containers/SurveysContainerComponent.jsx'
import NewSurveyContainerComponent from './Containers/NewSurveyContainerComponent'
import './App.css';
import './bootstrap.css';
function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <SurveysContainerComponent/>
      {/* <NewSurveyContainerComponent/> */}
     
    </div>
  )
}


export default App;
