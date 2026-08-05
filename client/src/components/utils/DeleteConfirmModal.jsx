import React from "react"

function DeleteConfirmModal({ target, onCancel, onConfirm, deleting }) {

    return (
        <div
            className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 px-6"
            onClick={onCancel}
        >   
            <div
                className="w-full max-w-sm rounded-md border border-os-border-soft bg-os-console p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-3 flex items-center justify-between" >
                    <span className="font-mono text-[11px] uppercase tracking-wider text-os-faint" >
                        Confirm Delete
                    </span>
                </div>

                <p className="mb-5 font-mono text-[12px] text-os-text" >
                    Delete snippet {target?.slug ? `"${target.slug}"` : `#${target?.id}`}? This can't be undone.
                </p>

                <div className="flex items-center justify-end gap-4" >
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={deleting}
                        className="font-mono text-[11px] uppercase tracking-wider text-os-faint hover:underline disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={deleting}
                        className="font-mono text-[11px] uppercase tracking-wider text-os-danger hover:underline disabled:opacity-50"
                    >
                        {deleting ? "Deleting" : "Delete"}
                    </button>
                </div>

            </div>
        </div>
    )

}

export default DeleteConfirmModal