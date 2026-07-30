import React from "react"
  
function formatJoined(dateString) {
    if (!dateString) return "-"
    const d = new Date(dateString)
    if (Number.isNaN(d.getTime())) return "-"
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

export default formatJoined