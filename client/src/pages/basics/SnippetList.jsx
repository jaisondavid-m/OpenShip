import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import api from "../../api/axios.js"

function SnippetsList() {

    const [snippets, setSnippets] = useState([])
    const [loading, setLoading] = useState(true)
    const [statusError, setStatusError] = useState("")

    const [viewing, setViewing] = useState(null)
    const [viewCode, setViewCode] = useState(true)
    const [viewLoading, setViewLoading] = useState(false)

    const [deletingId, setDeletingId] = useState(null)

    useEffect(() => {
        loadSnippets()
    },[])

    async function loadSnippets() {

        setLoading(true)
        setStatusError("")

        try {
            const res = await api.get("/sandbox")
            setSnippets(res.data.snippets || [])
        } catch (err) {
            setStatusError(err.response?.data?.error || "Couldn't load your snippets")
        } finally {
            setLoading(false)
        }

    }

    async function handleView(id) {

        setViewing(id)
        setViewLoading(true)
        setViewCode("")

        try {
            const res = await api.get(`/sandbox/${id}`)
            setViewCode(res.data.snippets.code)
        } catch (err) {
            setViewCode("// Couldn't load this snippet")
        } finally {
            setViewLoading(false)
        }

    }

    function closeView() {
        setViewing(null)
        setViewCode("")
    }

    async function handleDelete(id) {

        if (!window.confirm("Delete this snippet? This can't be undone.")) return 

        setDeletingId(id)
        setStatusError("")

        try {
            await api.delete(`/sandbox/${id}`)
            setSnippets((prev) => prev.filter((s) => s.id !== id))
        } catch (err) {
            setStatusError(err.response?.data?.error || "Couldn't delete that snippet.")
        } finally {
            setDeletingId(null)
        }

    }

    return (
        <div className="mx-auto max-w-4xl px-6 py-10 font-sans text-os-text" >
            <div className="mb-6 flex items-center justify-between" >
                <h1 className="font-mono text-sm uppercase tracking-wider text-os-faint" >
                    My Snippets
                </h1>
                <Link
                    to="/sandbox"
                    className="font-mono text-[11px] uppercase tracking-wider text-os-accent hover:underline"
                >
                    + New Sandbox
                </Link>
            </div>

            {statusError && (
                <p className="mb-4 font-mono text-[11px] text-os-danger" >
                    {statusError}
                </p>
            )}

            {loading ? (
                <p className="font-mono text-[11px] text-os-faint" >
                    Loading...
                </p>
            ) : snippets.length === 0 ? (
                <p className="font-mono text-[11px] text-os-faint" >
                    You haven't saved any snippets yet.
                </p>
            ) : (
                <div></div>
            )}

        </div>
    )

}

export default SnippetsList