import React from "react"
import { Link } from "react-router-dom"

function QuickLinks() {

    return (
        <section className="px-6 pb-24 sm:px-10" >
            <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2" >
                
                <Link
                    to="/sandbox"
                    className="rounded-lg border border-os-border-soft bg-os-panel px-6 py-5 
                    transition-colors hover:border-os-accent/40 focus-visible:outline-none 
                    focus-visible:ring-2 focus-visible:ring-os-accent/60"
                >
                    <div className="flex items-center gap-2" >
                        <span className="h-1.5 w-1.5 rounded-full bg-os-accent motion-safe:animate-os-pulse" />
                        <span className="font-mono text-[11px] uppercase tracking-wider text-os-faint" >Sandbox</span>
                    </div>
                    <p className="mt-2 font-display text-lg font-semibold" >Start Writing</p>
                    <p className="mt-1 text-sm text-os-muted" >Open a blank sandbox and start shipping.</p>
                </Link>

                <Link
                    to="/profile"
                    className="rounded-lg border border-os-border-soft bg-os-panel px-6 py-5 
                    transition-colors hover:border-os-accent/40 focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-os-accent/60"
                >
                    <div className="flex items-center gap-2" >
                        <span className="h-1.5 w-1.5 rounded-full bg-os-faint" />
                        <span className="font-mono text-[11px] uppercase tracking-wider text-os-faint" >Profile</span>
                    </div>
                    <p className="mt-2 font-display text-lg font-semibold" >Your crew record</p>
                    <p className="mt-1 text-sm text-os-muted" >Update your avatar and account details.</p>
                </Link>

            </div>
        </section>
    )

}

export default QuickLinks