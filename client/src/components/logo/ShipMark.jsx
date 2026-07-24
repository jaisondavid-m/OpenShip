import React from "react"

function ShipMark() {
    return (
        <svg
            viewBox="0 0 240 120"
            className="mx-auto h-28 w-auto text-os-border"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M10 100 Q 30 94 50 100 T 90 100 T 130 100 T 170 100 T 210 100"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-os-border-soft"
            />
            <path
                d="M20 108 Q 40 103 60 108 T 100 108 T 140 108 T 180 108 T 220 108"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-os-border-soft"
            />
            <path
                d="M28 88 L 212 88 L 196 100 L 44 100 Z"
                fill="currentColor"
                className="text-os-panel"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <line x1="34" y1="88" x2="206" y2="88" stroke="currentColor" strokeWidth="1.5" />
            <rect x="46" y="66" width="22" height="22" className="text-os-border" stroke="currentColor" strokeWidth="1.5" />
            <rect x="70" y="66" width="22" height="22" className="text-os-accent" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.5" />
            <rect x="94" y="66" width=" 22" height="22" className="text-os-border" stroke="currentColor" strokeWidth="1.5" />
            <rect x="118" y="66" width="22" height="22" className="text-os-border" stroke="currentColor" strokeWidth="1.5" />
            <rect x="142" y="66" width="22" height="22" className="text-os-border" stroke="currentColor" strokeWidth="1.5" />
            <rect x="58" y="46" width="22" height="20" className="text-os-border" stroke="currentColor" strokeWidth="1.5" />
            <rect x="82" y="46" width="22" height="20" className="text-os-border" stroke="currentColor" strokeWidth="1.5" />
            <rect x="106" y="46" width="22" height="20" className="text-os-border" stroke="currentColor" strokeWidth="1.5" />
            <rect x="168" y="58" width="20" height="30" className="text-os-border" stroke="currentColor" strokeWidth="1.5" />
            <line x1="178" y1="58" x2="178" y2="42" stroke="currentColor" strokeWidth="1.5" className="text-os-border" />
            <circle cx="178" cy="38" r="3" className="fill-os-warn motion-safe:animate-os-pulse" />
        </svg>
    )
}

export default ShipMark