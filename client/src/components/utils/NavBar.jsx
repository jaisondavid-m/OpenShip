import React, { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Menu, X } from "lucide-react"

import api from "../../api/axios.js"

const NAV_ITEMS = [
    { label: "Home", to: "/home" },
    { label: "Sandbox", to: "/sandbox" },
    { label: "My Snippets", to: "/sandbox/list" },
    { label: "Profile", to: "/profile" }
]

function NavBar() {

    const location = useLocation()
    const navigate = useNavigate()
    const [mobileOpen, setMobileOpen] = useState(false)

    function isActive(to) {
        return location.pathname === to
    }

    function closeMobile() {
        setMobileOpen(false)
    }

    async function handleLogout() {

        try {
            await api.post("/auth/logout")
        } catch (err) {
            // ignoring it
        } finally {
            navigate("login")
        }

    }

    return (

        <header className="sticky top-0 z-20 border-b border-os-border-soft bg-os-bg/95 backdrop-blur" >
            <div className="flex h-16 items-center justify-between px-6 sm:px-10" >

                <Link
                    to="/home"
                    className="inline-flex items-baseline font-disaplay text-lg font-semibold tracking-tight text-os-text"
                >
                    OpenShip<span className="text-os-accent" >.</span>
                </Link>

                <nav className="hidden items-center gap-8 lg:flex" >
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-wider transition-colors ${
                                isActive(item.to) ? "text-os-accent" : "text-os-muted hover:text-os-text"
                            }`}
                        >
                            <span
                                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                                    isActive(item.to) ? "bg-os-accent" : "bg-os-faint"
                                }`}
                            />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <button
                    type="button"
                    onClick={handleLogout}
                    className="hidden font-mono text-[11px] uppercase tracking-wider text-os-faint transition-colors
                    hover:text-os-danger lg:inline=flex"
                >
                    Sign Out
                </button>

                <button
                    type="button"
                    onClick={() => setMobileOpen((v) => !v)}
                    aria-label={mobileOpen ? "Close menu" : "Open meny"}
                    aria-expanded={mobileOpen}
                    className="flex h-9 w-9 items-center justify-center rounded-md 
                    border border-os-border text-os-text lg:hidden"
                >
                    {
                        mobileOpen
                            ? <X className="h-4 w-4" />
                            : <Menu className="h-4 w-4" />
                    }
                </button>

            </div>

            {mobileOpen && (
                <nav className="flex flex-col gap-1 border-t border-os-border-soft bg-os-panel px-6 py-4 lg:hidden" >
                    {
                        NAV_ITEMS.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                onClick={closeMobile}
                                className={`flex items-center gap-2.5 rounded-md px-3 py-2.5 font-mono text-xs uppercase
                                    tracking-wide transition-colors
                                        ${
                                            isActive(item.to)
                                                ? "bg-os-bg text-os-accent"
                                                : "text-os-muted hover:bg-os-bg hover:text-os-text"
                                        }
                                    `}
                            >
                                <span
                                    className={`h-1.5 w-1.5 rounded-full ${
                                        isActive(item.to) ? "bg-os-accent" : "bg-os-faint"
                                    }`}
                                />
                                {item.label}
                            </Link>
                        ))
                    }
                    <button
                        type="button"
                        onClick={() => {
                            closeMobile();
                            handleLogout();
                        }}
                        className="mt-2 rounded-md border-t border-os-border-soft px-3 py-2.5 text-left font-mono text-xs uppercase
                        tracking-wider text-os-faint hover:text-os-danger"
                    >
                        Sign out
                    </button>
                </nav>
            )}

        </header>

    )

}

export default NavBar