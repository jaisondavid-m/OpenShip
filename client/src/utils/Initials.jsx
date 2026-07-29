import React from "react"

function Initials(name = "") {
    return (
        name
            .trim()
            .split(/\s+/)
            .slice(0,2)
            .map((part) => part[0]?.toUpperCase())
            .join("") || "?"
    )
}

export default Initials