import React from "react"

function FeatureSection() {

    return (
        <section className="px-6 pb-20 sm:px-10" >
            <div className="mx-auto max-w-5xl overflow-hidden rounded-lg border border-os-border-soft" >
                <div className="grid grid-cols-1 lg:grid-cols-2" >

                    <div className="flex flex-col border-b border-os-border-soft lg:border-b-0 lg:border-b-0 lg:border-r" >
                        <div className="flex items-center gap-2 border-b border-os-border-soft bg-os-panel px-4 py-2.5" >
                            <span className="h-2 w-2 rounded-full bg-os-warn" />
                            <span className="font-mono text-xs text-os-muted" >index.html</span>
                        </div>
                        <div className="flex-1 space-y-1.5 bg-os-console px-5 py-5 font-mono text-[13px] leading-relaxed" >
                            <p>
                                <span className="text-os-faint" >&lt;</span>
                                <span className="text-os-accent" >h1</span>
                                <span className="text-os-faint" >&gt;</span> 
                                Hello, harbor.
                                <span className="text-os-faint" >&lt;</span>
                                <span className="text-os-accent" >h1</span>
                                <span className="text-os-faint" >&gt;</span>
                            </p>
                            <p>
                                <span className="text-os-faint" >&lt;</span>
                                <span className="text-os-accent" >p</span>
                                <span className="text-os-faint" >&gt;</span>
                                Shipped straight from the sandbox.
                                <span className="text-os-faint" >&lt;</span>
                                <span className="text-os-accent" >p</span>
                                <span className="text-os-faint" >&gt;</span>
                            </p>
                            <p className="text-os-faint" >|</p>
                        </div>
                    </div>

                    <div className="flex flex-col" >
                        <div className="flex items-center gap-2 border-b border-os-border-soft bg-os-panel px-4 py-2.5" >
                            <div className="flex items-center gap-1.5" >
                                <span className="h-2 w-2 rounded-full bg-os-danger/20" />
                                <span className="h-2 w-2 rounded-full bg-os-warn/70" />
                                <span className="h-2 w-2 rounded-full bg-os-accent/70" />
                            </div>
                            <span
                                className="ml-2 flex-1 truncate rounded-md border border-os-border-soft bg-os-bg
                                px-2 py-0.5 font-moon text-[11px] text-os-faint"
                            >
                                openship.bitsathy.in/harbor-lights
                            </span>
                        </div>
                        <div className="flex-1 bg-white px-6 py-6 text-black" >
                            <h2 className="text-xl font-semibold" >Hello, harbor</h2>
                            <p className="mt-1 text-sm text-neutral-600" >Shipped straight from the sandbox.</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )

}

export default FeatureSection