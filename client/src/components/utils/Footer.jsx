import React from "react"

function Footer() {

    return (
        <footer className="border-t border-os-border-soft px-6 py-6 sm:px-12" >
            <div className="flex flex-col items-center justify-between gap-2 text-center
            sm:flex-row sm:text-left" >
                <p className="font-mono text-[11px] uppercase tracking-wider text-os-faint" >
                    &copy; {new Date().getFullYear()} OpenShip
                </p>
                <div
                    className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-os-faint"
                >
                    <span
                        className="h-1.5 w-1.5 rounded-full bg-os-accent motion-safe:animate-os-pulse"
                    />
                    System Status: Online
                </div>      
            </div>
        </footer>
    )

}

export default Footer