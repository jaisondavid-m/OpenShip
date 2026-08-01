import React from "react"
import { Outlet } from "react-router-dom"

import NavBar from "../utils/NavBar.jsx"
import Footer from "../utils/Footer.jsx"

function AppLayout() {

    return (
        <div className="min-h-screen bg-os-bg font-sans text-os-text" >
            <NavBar />
            <main className="flex-1" >
                <Outlet />
            </main>
            <Footer />
        </div>
    )

}

export default AppLayout