import React from "react"

import formatJoined from "../../utils/FormatJoined.jsx"

import { Camera, Loader2 } from "lucide-react"

function ProfileMainSection({ avatarSrc, setAvatarBroken, user, Initials, handlePickAvatar, uploading, fileInputRef, handleAvatarChange }) {

    return (
        <div
            className="rounded-lg border border-os-border bg-os-panel px-7 py-8"
        >
            <div className="flex flex-col shrink-0 items-center gap-5 text-center sm:flex-row sm:text-left" >
                <div className="relative" >
                    <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full
                    border border-os-border-soft bg-os-bg font-display text-xl font-semibold text-os-accent"
                    >
                        {
                            avatarSrc ? (
                                <img
                                    src={avatarSrc}
                                    alt={user.name}
                                    className="h-full w-full object-cover"
                                    onError={() => setAvatarBroken(true)}
                                />
                            ) : (
                                Initials(user.name)
                            )
                        }
                    </div>
                    <button
                        type="button"
                        onClick={handlePickAvatar}
                        disabled={uploading}
                        aria-label="Change avatar"
                        title="Change avatar"
                        className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rouned-full
                        border-2 border-os-panel bg-os-accent text-[#04211c] shadow-sm transition-all hover:enabled:bg-os-accent-bright
                        hover:enabled:scale-105 
                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-os-text
                        disabled:cursor-not-allowed disabled:opacity-70"

                    >
                        {
                            uploading ? (
                                <Loader2
                                    className="h-3.5 w-3.5 animate-spin"
                                />
                            ) : (
                                <Camera
                                    className="h-3.5 w-3.5"
                                />
                            )
                        }
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handleAvatarChange}
                        className="hidden"
                    />
                    {/* <div className="min-w-0 flex flex-col items-center justify-center gap-y-3" > */}
                        <p className="mt-4 truncate font-display text-lg font-semibold text-os-text" >
                            {user.name}
                        </p>
                        <p className="truncate text-sm text-os-muted" >
                            {user.email}
                        </p>
                        <button
                            type="button"
                            onClick={handlePickAvatar}
                            disabled={uploading}
                            className="mt-3 font-mono text-[11px] uppercase tracking-wider text-os-accent
                            hover:enabled:underline disabled:cursor-not-allowed disabled:text-os-faint"
                        >
                            {uploading ? "Uploading..." : "Change Photo"}
                        </button>
                        {/* <p className="mt-1.5 font-mono text-[11px] uppercase tracking-wider text-os-faint" >
                            {
                                uploading
                                    ? "Uploading avatar..."
                                    : "Tap the arrow to update your photo"
                            }
                        </p> */}
                    {/* </div> */}
                </div>
                <dl className="mt-8 grid grid-cols-2 gap-5 border-t border-os-border-soft pt-6" >
                    <div>
                        <dt className="font-mono text-[11px] uppercase tracking-wider text-os-faint" >
                            Role
                        </dt>
                        <dd className="mt-1.5 flex items-center gap-2 text-sm text-os-text" >
                            <span className="h-1.5 w-1.5 rounded-full bg-os-accent" />
                            {user.role}
                        </dd>
                    </div>
                    <div>
                        <dt className="font-mono text-[11px] uppercase tracking-wider text-os-faint" >
                            Member since
                        </dt>
                        <dd className="mt-1.5 text-sm text-os-text" >
                            {formatJoined(user.created_at)}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    )

}

export default ProfileMainSection