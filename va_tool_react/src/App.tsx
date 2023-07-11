import React from 'react';
import logo from './logo.svg';
import './App.css';
import Content from './components/api';
import { BrowserRouter as Switch, Router, Route} from "react-router-dom";
import ApplyDataToVis from './components/applyDataToVis';

function App() {
  return (
    <div className="App">
      <ApplyDataToVis />
    </div>
  );
}

export default App;
