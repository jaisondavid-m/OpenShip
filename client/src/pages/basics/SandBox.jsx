import React, { useState, useRef, useEffect } from "react"

import EditorSection from "../../components/sandbox/EditorSection.jsx"
import PreviewSection from "../../components/sandbox/PreviewSection.jsx"

import { DEFAULT_CODE } from "../../utils/DefaultCode.js"
import api from "../../api/axios.js"
import { useParams, useNavigate } from "react-router-dom"

function SandBox() {

    const { id } = useParams()
    const navigate = useNavigate()

    const [code, setCode] = useState(DEFAULT_CODE)
    const [previewDoc, setPreviewDoc] = useState(DEFAULT_CODE)
    const textareadRef = useRef(null)

    const [loadingSnippet, setLoadingSnippet] = useState(false)
    const [saving, setSaving] = useState(false)
    const [saveId, setSaveId] = useState(null)
    const [statusError, setStatusError] = useState("")
    const [copied, setCopied] = useState(false)

    const [slugInput, setSlugInput] = useState("")
    const [publicSlug, setPublicSlug] = useState(null)
    const [copiedPublic, setCopiedPublic] = useState(false)

    useEffect(() => {

        let ignore = false

        if (!id) {
            setCode(DEFAULT_CODE)
            setPreviewDoc(DEFAULT_CODE)
            setSaveId(null)
            setPublicSlug(null)
            setSlugInput("")
            setStatusError("")
            return
        }

        async function loadSnippet() {

            setLoadingSnippet(true)
            setStatusError("")

            try {
                const res = await api.get(`/sandbox/${id}`)
                if (!ignore) {
                    setCode(res.data.snippet.code)
                    setPreviewDoc(res.data.snippet.code)
                    setSaveId(res.data.snippet.id)
                    setPublicSlug(res.data.snippet.slug || null)
                    setSlugInput(res.data.snippet.slug || "")
                }
            } catch (err) {
                if (!ignore) setStatusError(err.response?.data?.error || "Couldn't load that snippet.")
            } finally {
                if (!ignore) setLoadingSnippet(false)
            }

        }

        loadSnippet()

        return () => { ignore = true }

    }, [id])

    useEffect(() => {
        const timeoutId = setTimeout(() => setPreviewDoc(code), 150)
        return () => clearTimeout(timeoutId)
    }, [code])

    function handleKeyDown(e) {

        if (e.key !== "Tab") return
        e.preventDefault()

        const { selectionStart, selectionEnd, value } = e.target
        const next = value.slice(0, selectionStart) + " " + value.slice(selectionEnd)

        setCode(next)

        requestAnimationFrame(() => {
            e.target.selectionStart = e.target.selectionEnd = selectionStart + 2
        })

    }

    function handleReset() {
        setCode("")
        setSaveId(null)
        setPublicSlug(null)
        setSlugInput("")
        setStatusError("")
        navigate("/sandbox", { replace: true })
    }

    async function handleSave() {

        setSaving(true)
        setStatusError("")
        setCopied(false)
        setCopiedPublic(false)

        try {
            if (saveId) {
                await api.put(`/sandbox/${saveId}`, {
                    code,
                    slug: slugInput.trim() || undefined,
                })
                // setSaveId(res.data.id)
                // setPublicSlug(res.data.slug || null)
                // setSlugInput(res.data.slug || "")
            } else {

                const res = await api.post("/sandbox", {
                    code,
                    slug: slugInput.trim() || undefined,
                })

                setSaveId(res.data.id)
                setPublicSlug(res.data.slug || null)
                setSlugInput(res.data.slug || "")

                navigate(`/sandbox/${res.data.id}`, { replace: id })
            }
            
        } catch (err) {
            setStatusError(err.response?.data?.error || "Failed to save snippet")
        } finally {
            setSaving(false)
        }

    }

    async function handleCopyLink() {

        if (!saveId) return

        const url = `${window.location.origin}/sandbox/${saveId}`

        try {
            await navigator.clipboard.writeText(url)
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
        } catch {
            setStatusError("Couldn't copy link.")
        }

    }

    async function handleCopyPublicLink() {

        if (!publicSlug) return

        const url = `${window.location.origin}/${publicSlug}`

        try {
            await navigator.clipboard.writeText(url)
            setCopiedPublic(true)
            setTimeout(() => setCopiedPublic(false), 1500)
        } catch {
            setStatusError("Couldn't copy link.")
        }

    }

    const lineCount = code.split("\n").length

    return (
        <div className="flex h-screen flex-col bg-os-bg font-sans text-os-text" >
            <header className="flex flex-col border-b border-os-border-soft px-6 py-3" >
                <div className="flex items-center justify-between" >
                    <div className="flex items-center justify-between gap-2.5" >
                        <span className="h-1.5 w-1.5 rounded-full bg-os-accent motion-safe:animate-os-pulse" />
                        <p className="font-mono text-[11.5px] uppercase tracking-wider text-os-faint" >
                            {
                                loadingSnippet
                                    ? "Loading shippet..."
                                    : saveId
                                        ? `Saved · #${saveId}`
                                        : "Local sandbox &middot; not deployed"
                            }
                        </p>
                        {statusError && (
                            <span className="font-mono text-[11px] text-os-danger" >
                                {statusError}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-4" >
                        {saveId && (
                            <button
                                type="button"
                                onClick={handleCopyLink}
                                className="font-mono text-[11px] uppercase tracking-wider text-os-accent hover:underline"
                            >
                                {copied ? "Copied !" : "Copy link"}
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={saving}
                            className="font-mono text-[11px] uppercase tracking-wider text-os-accent hover:underline disabled:opacity-50"
                        >
                            {saving ? "Saving" : "Save"}
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="font-mono text-[11px] uppercase tracking-wider text-os-accent hover:underline"
                        >
                            Reset Sample
                        </button>
                    </div>
                </div>
                <div className="flex items-center gap-2" >
                    <span className="font-mono text-[11px] text-os-faint" >
                        {window.location.origin}
                    </span>
                    <input
                        type="text"
                        value={slugInput}
                        onChange={(e) => setSlugInput(e.target.value)}
                        placeholder="my-project"
                        className="w-40 rounded-md border border-os-border-soft bg-os-console px-2 py-1
                        font-mono text-[11px] text-os-text placeholder:text-os-faint focus:outline-none"
                    />
                    {publicSlug && (
                        <button
                            type="button"
                            onClick={handleCopyPublicLink}
                            className="font-mono text-[11px] uppercase tracking-wider text-os-accent hover:underline"
                        >
                            {
                                copiedPublic
                                    ? "Copied!"
                                    : "Copy public link"
                            }
                        </button>
                    )}
                </div>

            </header>
            <div className="grid flex-1 grid grid-cols-1 overflow-hidden lg:grid-cols-2" >
                <EditorSection
                    code={code}
                    setCode={setCode}
                    lineCount={lineCount}
                    textareaRef={textareadRef}
                    handleKeyDown={handleKeyDown}
                />
                <PreviewSection
                    previewDoc={previewDoc}
                />
            </div>

        </div>
    )

}


export default SandBox