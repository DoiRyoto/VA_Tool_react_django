import CSVReader from "./data_reader/csvReader"
import React, { useContext, useState} from "react"
import JSONReader from "./data_reader/jsonReader";


function ApplyDataToVis() {
    const [data, setData] = useState([]);

    return (
        <div>
            <CSVReader setData={setData} />
        </div>
    )
}

export default ApplyDataToVis