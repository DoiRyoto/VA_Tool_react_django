import { ComponentType } from 'react';
import Lineplot from './chart/lineplot';

export type PlotType = string

export default function getLinkComponent(plotType: PlotType): ComponentType<any>{
    let PlotComponent: ComponentType<any>;

    if(plotType == "lineplot"){
        PlotComponent = Lineplot
    } else {
        PlotComponent = Lineplot
    }

    return PlotComponent
}