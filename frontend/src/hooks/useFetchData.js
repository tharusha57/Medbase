import axios from "axios";
import { useEffect, useState } from "react";


const useFetchData = (url) => {
    const [data, setData] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            try {
                const response = await axios.get(url)
                setData(response.data)
            } catch (error) {
                setError(error)
            }
            setLoading(false)
        }

        fetchData()
    }, [url])


    const refetchData = async () => {
        setLoading(true)

        try {
            const response = await axios.get(url)
            setData(response.data)
        } catch (error) {
            setError(error)
        }
        setLoading(false)
    }


    return {data , error , loading, refetchData}

}

export default useFetchData