import React, { useEffect, useState } from "react"
import api from "../api/axios.js"

function Test() {

    const [loading, setLoading] = useState(true)
    const [health, setHealth] = useState(null)
    const [error, setError] = useState("")

    const checkHealth = async () => {

        setLoading(true)
        setError("")

        try {
            const res = await api.get("/health")
            setHealth(res.data)
        } catch (err) {
            setError(err.response?.data?.message || err.message)
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        checkHealth()
    },[])

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100" >
            <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg" >
                <h1 className="text-2xl font-bold mb-6" >
                    Backend Health Check
                </h1>
                {loading && (
                    <p className="text-blue-600 font-medium" >
                        Checking server...
                    </p>
                )}
                {error && (
                    <div className="rounded-md bg-red-100 text-red-700 p-3 mb-4" >
                        {error}
                    </div>
                )}
                {health && (
                    <pre className="bg-slate-900 text-green-400 p-4 rounded overflow-auto" >
                        {JSON.stringify(health, null, 2)}
                    </pre>
                )}
                <button
                    onClick={checkHealth}
                    className="mt-5 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    Check Again
                </button>
            </div>
        </div>
    )

}

export default Test