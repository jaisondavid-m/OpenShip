import React from "react"

function EditorSection({ textareaRef, lineCount, code, setCode, handleKeyDown }) {

    return (
        <section className="flex flex-col border-r border-os-border-soft" >
            <div className="flex items-center gap-2 border-b border-os-border-soft bg-os-panel px-4 py-2.5" >
                <span className="h-2 w-2 rounded-full bg-os-warn" />
                <span className="font-mono text-xs text-os-muted" >index.html</span>
                <span className="ml-auto font-mono text-[11px] tet-os-faint" >
                    {lineCount} lines
                </span>
            </div>
            <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                className="flex-1 resize-none bg-os-console px-5 py-4 font-mono text-[13px] leading-relaxed
                text-os-text placeholder:text-os-faint focus:outline-none"
                placeholder="Start typing HTML, CSS and JS..."
            />
        </section>
    )

}

export default EditorSection