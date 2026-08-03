import React from "react"

function ProcessSection() {

    return (
        <section className="px-6 pb-20 sm:px-10 mt-5" >
            <div className="mx-auto max-w-5xl" >
                <p className="mb-8 font-mono text-[11px] uppercase tracking-wide text-os-faint" >
                    How it ships
                </p>
                <div className="grid gap-6 sm:grid-cols-3" >
                    {[
                        { n: "01", t: "Write", d: "Drop in HTML, CSS and JS. The preview updates as you type, no build step." },
                        { n: "02", t: "Save", d: "Give it a namem or let one be picked for you. It's stored to your account." },
                        { n: "03", t: "Ship", d: "Share the address. Anyone who opens it sees the live page, no login needed." }
                    ].map((step) => (
                        <div
                            key={step.n}
                            className="rounded-lg border border-os-border-soft bg-os-panel/40 p-5 transition-colors
                            motion-safe:transition-transform hover:border-os-accent/40 motion-safe:hover:-translate-y-0.5"
                        >
                            <p className="font-mono text-[11px] text-os-faint" >{step.n}</p>
                            <p className="mt-2 font-display text-base font-semibold" >{step.t}</p>
                            <p className="mt-1.5 text-sm leading-relaxed text-os-muted" >{step.d}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )

}

export default ProcessSection