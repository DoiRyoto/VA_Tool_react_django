import React from 'react';
import logo from './logo.svg';
import './App.css';
import Content from './components/api';
import { BrowserRouter as Switch, Router, Route} from "react-router-dom";
import ApplyDataToVis from './components/applyDataToVis';
import Example, { BarStackHorizontalProps } from './components/chart/barchat';

function App() {
  const props: BarStackHorizontalProps = {width: 1000, height: 500}
  return (
    <div className="App">
      <Example width={props.width} height={props.height}/>
    </div>
  );
}

export default App
