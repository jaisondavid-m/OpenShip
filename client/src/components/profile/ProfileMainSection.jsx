import React from "react"

function ProfileMainSection({ avatarSrc, setAvatarBroken, user, Initials, handlePickAvatar, uploading, fileInputRef, handleAvatarChange }) {

    return (
        <div
            className="rounded-lg border border-os-border bg-os-panel px-7 py-8"
        >
            <div className="flex items-center gap-5" >
                <div className="relative shrink-0" >
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
                        className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rouned-full
                        border border-os-border-soft bg-os-accent text-[#04211c] transition-colors hover:enabled:bg-os-accent-bright
                        disabled:cursor-not-allowed disabled:opacity-70"
                        aria-label="Change avatar"
                    >
                        <span className="text-xs" >↑</span>
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handleAvatarChange}
                        className="hidden"
                    />
                </div>
            </div>
        </div>
    )

}

export default ProfileMainSection