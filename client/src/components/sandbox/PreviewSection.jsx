import React from "react"

function PreviewSection({ previewDoc }) {

    return (
        <section className="flex flex-col" >
            <div className="flex items-center gap-2 border-b border-os-border-soft bg-os-panel px-4 py-2.5" >
                <div className="flex items-center gap-1.5" >
                    <span className="h-2 w-2 rounded-full bg-os-danger/20" />
                    <span className="h-2 w-2 rounded-full bg-os-warn/70" />
                    <span className="h-2 w-2 rounded-full bg-os-accent/70" />
                </div>
                <span className="ml-2 flex-1 truncate rounded-md border 
                border border-os-border-soft bg-os-bg font-mono text-[11px] text-os-faint" >
                    preview.bitsathy.in
                </span>
            </div>
            <iframe
                title="Live preview"
                srcDoc={previewDoc}
                sandbox="allow-scripts"
                className="flex-1 border-0 bg-white"
            />
        </section>
    )

}

export default PreviewSection