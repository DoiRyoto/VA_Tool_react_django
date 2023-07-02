import React, {useRef} from "react"
import * as d3 from "d3"
import { appendFile } from "fs"

interface RowData {
    key: number
    value: number
}

const rowData: RowData[] = [
    {key: 0, value: 1},
    {key: 1, value: 5},
    {key: 2, value: 9},
    {key: 3, value: 2},
    {key: 4, value: 8},
    {key: 5, value: 2},
    {key: 6, value: 4},
    {key: 7, value: 4},
    {key: 8, value: 5},
    {key: 9, value: 8}
]

interface Data {
    key: number
    value: number
}

const data: Data[] = rowData.map((e) => ({
    key: e.key,
    value: e.value
}))

const margin = {top: 10, right: 30, bottom: 30, left: 60}
const width = 460 - margin.left - margin.right
const height = 400 - margin.top - margin.bottom
const svgSize = {width: width + margin.left + margin.right, height: height + margin.top + margin.bottom}

function LinePlot() {
    const ref = useRef(null);

    React.useEffect(() => {
        const svg = d3.select(ref.current)
        .append("svg")
            .attr("width", svgSize.width)
            .attr("height", svgSize.height)
        .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)

        const x_range = d3.extent(data, (d: any) => d.key) as [number, number]
        const x = d3.scaleLinear()
            .domain(x_range)
            .range([0, width])
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x))
        
        const y_range = d3.extent(data, (d: any) => d.key) as [number, number]
        const y = d3.scaleLinear()
            .domain(y_range)
            .range([height, 0])
        svg.append("g")
            .call(d3.axisLeft(y))

        const keyValueLine = d3
            .line()
            .x((d: any) => x(d.key))
            .y((d: any) => y(d.value))

        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", keyValueLine as any)
    }, [])

    return (
        <>
            <svg {...svgSize}>
                <g ref={ref} />
            </svg>
        </>
    )
}

export default LinePlot