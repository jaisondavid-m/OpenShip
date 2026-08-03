import React from "react"
import { Link } from "react-router-dom"

function HeroSection({ firstName }) {

    return (
        <section className="px-6 pb-16 pt-14 sm:px-10 sm:pt-20" >
            <div className="mx-auto max-w-5xl" >

                <p className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-os-faint" >
                    <span className="h-1.5 w-1.5 rounded-full bg-os-accent motion-safe:animate-os-pulse" />
                    OpenShip · Home port
                </p>

                <h1 className="max-w-3xl font-display text-[34px] font-semibold leading-[1.1] tracking-tight sm:text-[48px]" > 
                    Welcome aboard, { firstName || "Captian" }.
                    <span className="mt-1 block text-os-faint" >
                        Write it. Preview it. Ship a link.
                    </span>
                </h1>

                <p className="mt-5 max-w-xl text-sm leading-relaxed text-os-muted" >
                    Drop HTML, CSS and JS into the sandbox and watch it render as you type.
                    Save it, give it a name and anyone with the link can open it - no 
                    account requrired on their end.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-5" >
                    <Link
                        to="/sandbox"
                        className="rounded-md bg-os-accent px-5 py-2.5 font-mono text-[11px] uppercase
                        tracking-wider text-os-bg transition-colors hover:bg-os-accent/90 focus-visible:outline-none
                        focus-visible:ring-2 focus-visible:ring-os-accent/60 focus-visible:ring-offset-2
                        focus-visible:ring-offset-os-bg"
                    >
                        Open sandbox
                    </Link>
                    <Link
                        to="/profile"
                        className="rounded-md px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-os-faint
                        transition-colors hover:text-os-text focus-visible:outline-none focus-visible:ring-2
                        focus-visible:ring-os-accent/60 focus-visible:ring-offset-2 fcous-visible:ring-offset-os-bg"
                    >
                        View crew profile →
                    </Link>
                </div>

            </div>
        </section>
    )

}

export default HeroSection