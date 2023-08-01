import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Lineplot, { LineplotData } from './components/chart/lineplot'
import getLinkComponent, { PlotType } from './components/getPlotComponent'


const plotTypes = ["lineplot", "barchart"]

const data: LineplotData[][] = [[{x: "0", y: "0"}, {x: "1", y: "3"}, {x: "2", y: "4"}, {x: "3", y: "1"}, {x: "4", y: "5"}], [{x: "0", y: "2"}, {x: "1", y: "1"}, {x: "2", y: "7"}, {x: "3", y: "5"}, {x: "4", y: "7"}]]

function App() {
  const [plotType, setPlotType] = useState<PlotType>('lineplot')

  const PlotComponent = getLinkComponent(plotType)

  return (
    <div className="App">
        <div className="plot-control">
            <>
                <label>
                    Plot type &nbsp;
                    <select onChange={(e) => setPlotType(e.target.value as PlotType)} value={plotType}>
                        {plotTypes.map((plot) => (
                            <option key={plot} value={plot}>
                                {plot}
                            </option>
                        ))}
                    </select>
                </label>
            </>
        </div>
        <PlotComponent width={1000} height={500} data={data}/>
    </div>
  );
}

export default App
