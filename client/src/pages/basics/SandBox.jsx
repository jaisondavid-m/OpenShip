import React, { useState, useRef, useEffect } from "react"

import EditorSection from "../../components/sandbox/EditorSection.jsx"
import PreviewSection from "../../components/sandbox/PreviewSection.jsx"

import { DEFAULT_CODE } from "../../utils/DefaultCode.js"

function SandBox() {

    const [code, setCode] = useState(DEFAULT_CODE)
    const [previewDoc, setPreviewDoc] = useState(DEFAULT_CODE)
    const textareadRef = useRef(null)

    useEffect(() => {
        const id = setTimeout(() => setPreviewDoc(code), 150)
        return () => clearTimeout(id)
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
    }

    const lineCount = code.split("\n").length

    return (
        <div className="flex h-screen flex-col bg-os-bg font-sans text-os-text" >
            <header className="flex items-center justify-between border-b border-os-border-soft px-6 py-3" >
                <div className="flex items-center gap-2.5" >
                    <span className="h-1.5 w-1.5 rounded-full bg-os-accent motion-safe:animate-os-pulse" />
                    <p className="font-mono text-[11.5px] uppercase tracking-wider text-os-faint" >
                        Local sandbox &middot; not deployed
                    </p>
                </div>
                <button
                    type="button"
                    onClick={handleReset}
                    className="font-mono text-[11px] uppercase tracking-wider text-os-accent hover:underline"
                >
                    Reset Sample
                </button>
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