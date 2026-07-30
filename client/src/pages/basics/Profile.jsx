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

    useEffect(() => {

        let ignore = false

        async function loadProfile() {

            try {
                const res = await api.get("/profile/mine")
                if (!ignore) setUser(res.data.user)
            } catch (err) {
                if (!ignore) setError(err.response?.data?.error || "Couldn't load your profile.")
            } finally {
                if (!ignore) setLoading(false)
            }

        }

        loadProfile()

        return () => { ignore = true }

    },[])

    function handlePickAvatar() {
        fileInputRef.current?.click()
    }

    async function handleAvatarChange(e) {

        const file = e.target.files?.[0]
        if (!file) return 

        setError("")
        setUploading(true)
        setAvatarBroken(false)

        const formData = new FormData()
        formData.append("avatar", file)

        try {
            const res = await api.post("/profile/avatar", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            setUser((u) => ({ ...u, avatar: res.data.avatar }))
        } catch (err) {
            setError(err.response?.data?.error || "Avatar upload failed. Try again")
        } finally {
            setUploading(false)
            e.target.value = ""
        }

    }

    const avatarScr = user?.avatar && !avatarBroken ? `{ASSET_BASE}${user.avatar}` : null

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
                        <ProfileMainSection
                            user={user}
                            Initials={Initials}
                            avatarSrc={avatarScr}
                            setAvatarBroken={setAvatarBroken}
                            handlePickAvatar={handlePickAvatar}
                            uploading={uploading}
                            fileInputRef={fileInputRef}
                            handleAvatarChange={handleAvatarChange}
                        />
                    )}

                </div>
            </main>

        </div>
    )

}

export default Profile