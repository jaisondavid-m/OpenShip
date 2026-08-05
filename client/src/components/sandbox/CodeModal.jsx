import React from "react"

function CodeModal({ closeView, viewing, viewLoading, viewCode }) {

    return (
        <div
            className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 px-6"
            onClick={closeView}
        >
            <div
                className="max-h-[80vh] w-full max-w-2xl overflow-auto rounded-md border border-os-border-soft
                bg-os-console p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-3 flex items-center justify-between" >
                    <span className="font-mono text-[11px] uppercase tracking-wider text-os-faint" >
                        Snippet #{viewing}
                    </span>
                    <button
                        type="button"
                        onClick={closeView}
                        className="font-mono text-[11px] uppercase tracking-wider text-os-accent hover:underline"
                    >
                        Close
                    </button>
                </div>
                {viewLoading ? (
                    <p className="font-mono text-[11px] text-os-faint" >Loading...</p>
                ) : (
                    <pre
                        className="whitespace-pre-wrap break-words font-mono text-[12px] text-os-text"
                    >
                        {viewCode}
                    </pre>
                )}
            </div>
        </div>
    )

}

export default CodeModal