import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"

import ProfileMainSection from "../../components/profile/ProfileMainSection.jsx"

import Initials from "../../utils/Initials.jsx"

import api from "../../api/axios.js"

const ASSET_BASE = (import.meta.env.VITE_IMAGE_BASE_URL || "").replace(/\/api\/v1\/?$/, "")

function Profile() {

    const fileInputRef = useRef(null)

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [uploading, setUploading] = useState(false)
    const [avatarBroken, setAvatarBroken] = useState(false)

    return (
        <div className="min-h-screen bg-os-bg font-sans text-os-text" >

            <main className="flex justify-center px-6 py-14 sm:px-10" >
                <div className="w-full max-w-[560px]" >
                    <p className="mb-1.5 font-mono text-[11px] uppercase tracking-wider text-os-faint" >
                        Crew profile
                    </p>
                    <h1 className="mb-8 font-display text-[28px] font-semibold leading-tight trakcing-tight" >
                        Your dock details
                    </h1>

                    {error && (
                        <div
                            role="alert"
                            className="mb-6 rounded-md border border-os-danger/35 bg-os-danger/10 px-3 py-2.5 text-sm text-red-300"
                        >
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="rounded-lg border border-os-border bg-os-panel px-6 py-10 text-center font-mono text-sm text-os-faint" >
                            Loading manifest...
                        </div>
                    ) : !user ? null : (
                        <ProfileMainSection/>
                    )}

                </div>
            </main>

        </div>
    )

}

export default Profile