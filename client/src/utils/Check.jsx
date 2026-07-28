import React from "react"

function Check({ hasLength, hasMatch }) {

    return (
        <ul className="mt-1.5 mb-[22px] flex flex-col gap-1.5" >
            <li
                className={`flex items-center gap-2 text-xs transition-colors ${
                    hasLength ? "text-os-accent" : "text-os-faint"
                }`}
            >
                <span
                    className={`h-1.5 w-1.5 rounded-full ${
                        hasLength ? "bg-os-accent" : "bg-os-faint"
                    }`}
                />
                At least 6 charcters
            </li>
            <li
                className={`flex items-center gap-2 text-xs transition-colors ${
                    hasMatch ? "text-os-accent" : "text-os-faint"
                }`}
            >
                <span
                    className={`h-1.5 w-1.5 rounded-full ${
                        hasMatch ? "bg-os-accent" : "bg-os-faint"
                    }`}
                />
                Passwords match
            </li>
        </ul>
    )

}

export default Check