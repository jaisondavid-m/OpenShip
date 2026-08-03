import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

import api from "../../api/axios.js"

function PublicSnippetView() {

    const { slug } = useParams()

    const [snippet, setSnippet] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {

        let ignore = false

        async function loadSnippet() {

            setLoading(true)
            setError("")

            try {
                const res = await api.get(`/public/${slug}`)
                if (!ignore) setSnippet(res.data.snippet)
            } catch (err) {
                if (!ignore) setError(err.response?.data?.error || "This page doesn't exist.")
            } finally {
                if (!ignore) setLoading(false)
            }

        }

        loadSnippet()

        return () => { ignore = true }

    },[slug])

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-os-bg font-mono text-sm text-os-faint" >
                Loading /{slug} ...
            </div>
        )
    }

    if (error || !snippet) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-3
            bg-os-bg font-mono text-sm text-os-faint"
            >
                <p>{error || "Not found"}</p>
                <Link
                    to="/"
                    className="text-os-accent hover:underline"
                >
                    Go Home
                </Link>
            </div>
        )
    }

    return (
        <iframe
            title={slug}
            srcDoc={snippet.code}
            sandbox="allow-scripts"
            className="h-screen w-full border-0 bg-white"
        />
    )

}

export default PublicSnippetView