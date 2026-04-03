import { useState, useEffect } from "react";
import axios from 'axios'

const useDailyContent = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        axios.get(`${process.env.EXPO_PUBLIC_LIVE_BACKEND_URL}/daily-readings`)
        .then(res => setData(res.data.data))
        .catch(err => setError(err.message))
        .finally(() => setLoading(false))
    }, [])

    return {data, loading, error}

}

export default useDailyContent
