import React, {useState, useEffect} from 'react'
import axios from 'axios'

function Content() {
    const [post, setPosts] = useState([])

    const getData = () => {
        axios.get("http://127.0.0.1:8000/api/posts/")
        .then(res => 
        setPosts(res.data)
        )}

    const showData = () => {
        console.log(post)
    }

    return (
        <div>
            <button onClick={getData}>
                GET
            </button>
            <button onClick={showData}>
                SHOW
            </button>
        </div>
    )
}

export default Content