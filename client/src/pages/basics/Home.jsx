import React from "react"
import { Links } from "react-router-dom"
import { useSelector } from "react-redux"

import HeroSection from "../../components/home/HeroSection.jsx"
import FeatureSection from "../../components/home/FeatureSection.jsx"
import ProcessSection from "../../components/home/ProcessSection.jsx"
import QuickLinks from "../../components/home/QuickLinks.jsx"

function Home() {

    const user = useSelector((s) => s.auth.user)
    const firstName = user?.name?.split(" ")[0]

    return (
        <div className="min-h-screen bg-os-bg font-sans text-os-text" >
            <HeroSection 
                firstName={firstName}
            />
            <FeatureSection />
            <ProcessSection />
            <QuickLinks />
        </div>
    )
}

export default Home