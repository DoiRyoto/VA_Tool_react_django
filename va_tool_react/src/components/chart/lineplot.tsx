import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleLinear } from "@visx/scale";

const background = "#f3f3f3";

export interface LineplotData {
    x: string;
    y: string;
}

// accessor
const x_data = (d: LineplotData) => Number(d.x);
const y_data = (d: LineplotData) => Number(d.y);

const defaultMargin = { top: 40, right: 30, bottom: 50, left: 40 };

export type LineplotProps = {
    width: number;
    height: number;
    margin?: { top: number, right: number, bottom: number, left: number };
}

export default function Lineplot ({ width, height, margin = defaultMargin }: LineplotProps, data: LineplotData[]) {
    if (width < 10) return null;

    // scales
    const x_scale = scaleLinear<number>({
        domain: [Math.min(...data.map(x_data)), Math.max(...data.map(x_data))]
    });
    const y_scale = scaleLinear<number>({
        domain: [Math.min(...data.map(y_data)), Math.max(...data.map(y_data))]
    });

    // bounds
    const yMax = width - margin.left - margin.right;
    const xMax = width - margin.top - margin.bottom;

    x_scale.range([0, xMax]);
    y_scale.range([yMax, 0]);

    return (
        <div>
            <svg width={width} height={height} >
                <rect width={width} height={height} fill={background} rx={14} />
            </svg>
        </div>
    )
}