import React , { useState } from "react"
import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleLinear } from "@visx/scale";
import { Group } from '@visx/group';
import { extent, max } from '@visx/vendor/d3-array'
import { LinePath } from '@visx/shape';
import { curveNatural, curveLinear } from "@visx/curve"

const curves = {"curveNatural": curveNatural, "curveLinear": curveLinear}
type CurveType = keyof typeof curves

const curveTypes = Object.keys(curves)

const background = "#f3f3f3";
const purple1 = '#6c5efb';
const purple2 = '#c998ff';
const purple3 = '#a44afe';

export interface LineplotData {
    x: string;
    y: string;
}

// accessor
const getX = (d: LineplotData) => Number(d.x);
const getY = (d: LineplotData) => Number(d.y);

const defaultMargin = { top: 40, right: 30, bottom: 50, left: 40 };

export type LineplotProps = {
    width: number;
    height: number;
    data: LineplotData[][]
    margin?: { top: number, right: number, bottom: number, left: number };
}

export default function Lineplot ({ width, height, data, margin = defaultMargin}: LineplotProps) {
    const [curveType, setCurveType] = useState<CurveType>('curveNatural');
    const [showPoints, setShowPoints] = useState<boolean>(true);
    if (width < 10) return null;

    const allData = data.reduce((rec, d) => rec.concat(d), [])

    // scales
    const xScale = scaleLinear<number>({
        domain: extent(allData, getX) as [number, number]
    });
    const yScale = scaleLinear<number>({
        domain: extent(allData, getY) as [number, number]
    });

    // margin
    const yMargin = margin.left + margin.right
    const xMargin = margin.top + margin.bottom

    // bounds
    const yMax = height - yMargin;
    const xMax = width - xMargin;

    xScale.range([0, xMax]);
    yScale.range([yMax, 0]);

    return (
        <div className="lineplot">
            <div className="curve-control">
                <>
                    <label>
                        Curve type &nbsp;
                        <select onChange={(e) => setCurveType(e.target.value as CurveType)} value={curveType}>
                            {curveTypes.map((curve) => (
                                <option key={curve} value={curve}>
                                    {curve}
                                </option>
                            ))}
                        </select>
                    </label>
                    &nbsp;
                    <label>
                        Show points&nbsp;
                        <input
                        type="checkbox"
                        checked={showPoints}
                        onChange={() => setShowPoints(!showPoints)}
                        />
                    </label>
                    <br />
                </>
            </div>
            <div className="chart">
                <svg width={width} height={height}>
                    <rect width={width} height={height} fill={background} rx={14} />
                    {width > 8 &&
                        data.map((lineData, i) => {
                            console.log(lineData)
                            return (
                                <Group key={`lines-${i}`} left={margin.left} top={margin.top}>
                                    {showPoints &&
                                        lineData.map((d, j) => (
                                            <circle 
                                                key={i + j}
                                                r={3}
                                                cx={xScale(getX(d))}
                                                cy={yScale(getY(d))}
                                                stroke="rgba(33,33,33,0.5)"
                                                fill="transparent"
                                            />
                                        ))
                                    }
                                    <LinePath<LineplotData> 
                                        curve={curves[curveType]}
                                        data={lineData}
                                        x={(d) => xScale(getX(d)) ?? 0}
                                        y={(d) => yScale(getY(d)) ?? 0}
                                        stroke="#333"
                                    />
                                </Group>
                            )
                        })
                    }
                    <Group top={margin.top} left={margin.left}>
                    <AxisLeft
                        scale={yScale}
                        stroke={purple3}
                        tickStroke={purple3}
                        tickLabelProps={{
                            fill: purple3,
                            fontSize: 11,
                            textAnchor: 'end',
                            dy: '0.33em',
                        }}
                        />
                        <AxisBottom
                        top={yMax}
                        scale={xScale}
                        stroke={purple3}
                        tickStroke={purple3}
                        tickLabelProps={{
                            fill: purple3,
                            fontSize: 11,
                            textAnchor: 'middle',
                        }}
                        />
                    </Group>
                </svg>
            </div>
        </div>
    )
}