import React, {useRef} from "react"
import * as d3 from "d3"
import { appendFile } from "fs"

interface RowData {
    key: number
    value: number
}

const rowData1: RowData[] = [
]

const rowData2: RowData[] = [
    {key: 0, value: 1},
    {key: 1, value: 5},
    {key: 2, value: 2},
    {key: 3, value: 6},
    {key: 4, value: 7},
]

const rowData3: RowData[] = [
    {key: 0, value: 1},
    {key: 1, value: 5},
    {key: 2, value: 2},
    {key: 3, value: 6},
    {key: 4, value: 7},
    {key: 5, value: 2},
    {key: 6, value: 8},
    {key: 7, value: 4},
    {key: 8, value: 9},
    {key: 9, value: 2}
]

interface Data {
    key: number
    value: number
}

// Todo: array→RowDataに変換するコードに変更
const parseData = (rdata: any) => {
    const data = rdata.data
    if (typeof data === "undefined"){
        return rowData1;
    } else if(data.length < 7){
        return rowData2;
    } else {
        return rowData3;
    }
}

const margin = {top: 10, right: 30, bottom: 30, left: 60}
const width = 460 - margin.left - margin.right
const height = 400 - margin.top - margin.bottom
const svgSize = {width: width + margin.left + margin.right, height: height + margin.top + margin.bottom}

function LinePlot(props: any) {
    const ref = useRef(null);
    const renderFlgRef = useRef(false)
    const rdata = parseData(props.data)

    const data: Data[] = rdata.map((e: any) => ({
        key: e.key,
        value: e.value
    }))

    React.useEffect(() => {
        if(!renderFlgRef.current){
            const svg = d3.select("#data")
                .attr("width", svgSize.width)
                .attr("height", svgSize.height)
            .append("g")
                .attr("id", "frame")
                .attr("transform", `translate(${margin.left}, ${margin.top})`)
                
            const x_range = d3.extent(data, (d: any) => d.key) as [number, number]
            const x = d3.scaleLinear()
                .domain(x_range)
                .range([0, width])
            svg.append("g")
                .attr("id", "x_axis")
                .attr("transform", `translate(0, ${height})`)
                .call(d3.axisBottom(x))
            
            const y_range = d3.extent(data, (d: any) => d.value) as [number, number]
            const y = d3.scaleLinear()
                .domain(y_range)
                .range([height, 0])
            svg.append("g")
                .attr("id", "y_axis")
                .call(d3.axisLeft(y))

            const keyValueLine = d3
                .line()
                .x((d: any) => x(d.key))
                .y((d: any) => y(d.value))

            svg.append("path")
                .datum(data)
                .attr("id", "graph_path")
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr("d", keyValueLine as any)

            renderFlgRef.current = true
        } else {
            const svg = d3.select("#data")
                .attr("width", svgSize.width)
                .attr("height", svgSize.height)
            .select("#frame")
                .attr("transform", `translate(${margin.left}, ${margin.top})`)
                
            const x_range = d3.extent(data, (d: any) => d.key) as [number, number]
            const x = d3.scaleLinear()
                .domain(x_range)
                .range([0, width])
            svg.select("#x_axis").remove()
            svg.append("g")
                .attr("id", "x_axis")
                .attr("transform", `translate(0, ${height})`)
                .call(d3.axisBottom(x))
            
            const y_range = d3.extent(data, (d: any) => d.value) as [number, number]
            const y = d3.scaleLinear()
                .domain(y_range)
                .range([height, 0])
            svg.select("#y_axis").remove()
                svg.append("g")
                    .attr("id", "y_axis")
                    .call(d3.axisLeft(y))

            const keyValueLine = d3
                .line()
                .x((d: any) => x(d.key))
                .y((d: any) => y(d.value))

            svg.select("#graph_path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr("d", keyValueLine as any)
        }
    }, [data])

    return (
        <>
            <svg id="data">
                <g ref={ref} />
            </svg>
        </>
    )
}

export default LinePlot