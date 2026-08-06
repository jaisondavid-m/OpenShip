import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import api from "../../api/axios.js"

import CodeModal from "../../components/sandbox/CodeModal.jsx"
import DeleteConfirmModal from "../../components/utils/DeleteConfirmModal.jsx"

function SnippetsList() {

    const [snippets, setSnippets] = useState([])
    const [loading, setLoading] = useState(true)
    const [statusError, setStatusError] = useState("")

    const [viewing, setViewing] = useState(null)
    const [viewCode, setViewCode] = useState(true)
    const [viewLoading, setViewLoading] = useState(false)

    const [deletingId, setDeletingId] = useState(null)
    const [confirmTarget, setConfirmTarget] = useState(null)

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
            setViewCode(res.data.snippet.code)
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

    function requestDelete(snippet) {
        setConfirmTarget(snippet)
    }

    function cancelDelete() {
        if (deletingId) return 
        setConfirmTarget(null)
    }

    async function confirmDelete() {

        // if (!window.confirm("Delete this snippet? This can't be undone.")) return 

        const id = confirmTarget?.id
        if (!id) return 

        setDeletingId(id)
        setStatusError("")

        try {
            await api.delete(`/sandbox/${id}`)
            setSnippets((prev) => prev.filter((s) => s.id !== id))
            setConfirmTarget(null)
        } catch (err) {
            setStatusError(err.response?.data?.error || "Couldn't delete that snippet.")
        } finally {
            setDeletingId(null)
        }

    }

    return (
        <div className="min-h-screen mx-auto max-w-4xl px-6 py-10 font-sans text-os-text" >
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
                <div className="flex flex-col divid-y divide-os-border-soft rounded-md border
                border-os-soft"
                >
                    {snippets.map((s) => (
                        <div
                            key={s.id}
                            className="flex items-center justify-between gap-4 px-4 py-3"
                        >   
                            <div className="flex flex-col" >
                                <span className="font-mono text-[13px] text-os-text" >
                                    {s.slug ? s.slug : `#${s.id}`}
                                </span>
                                <span className="font-mono text-[11px] text-os-faint" >
                                    updated {new Date(s.updated_at).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex items-center gap-4" >
                                <button
                                    type="button"
                                    onClick={() => handleView(s.id)}
                                    className="font-mono text-[11px] uppercase tracking-wider text-os-accent hover:underline"
                                >
                                    View
                                </button>
                                <Link
                                    to={`/sandbox/${s.id}`}
                                    className="font-mono text-[11px] uppercase tracking-wider text-os-accent hover:underline"
                                >
                                    Edit
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => requestDelete(s.id)}
                                    disabled={deletingId === s.id}
                                    className="font-mono text-[11px] uppercase tracking-wider text-os-danger hover:underline disabled:opacity-50"
                                >
                                    {deletingId === s.id ? "Deleting" : "Delete"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {viewing && (
                <CodeModal
                    viewing={viewing}
                    closeView={closeView}
                    viewLoading={viewLoading}
                    viewCode={viewCode}
                />
            )}

            {confirmTarget && (
                <DeleteConfirmModal
                    target={confirmTarget}
                    onCancel={cancelDelete}
                    onConfirm={confirmDelete}
                    deleting={deletingId === confirmTarget.id}
                />
            )}

        </div>
    )

}

export default SnippetsList