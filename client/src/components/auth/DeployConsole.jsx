import React, { useEffect, useMemo, useRef, useState } from "react"
import { SCRIPTS } from "../../data/scripts.js"

import ShipMark from "../../components/logo/ShipMark.jsx"

const FOOT_TEXT = {
    login: "Static HTML, CSS & JS - live in the time it takes to read this.",
    register: "Free to start. No credit card, no servers to babysit."
}

const RECENT_DEPLOYS = [
    { id: "9F2K-11", target: "bitcentral.bitsathy.in", time: "18m ago" },
    { id: "7C3m-02", target: "qrplus.bitsathy.in", time: "1h ago" },
    { id: "A1X9-04", target: "json.hackclub.app", time: "4h ago" },
]

const REGISTER_HIGHLIGHTS = [
    "Free subdomain + HTTPS on every deploy",
    "Global CDN, zero configuration",
    "Roll back to any previous shipment instantly",
]

function randomManifestId() {
    const hex = Math.random().toString(16).slice(2, 6).toUpperCase()
    const seq = String(Math.floor(Math.random() * 90) + 10)
    return `MANIFEST #${hex}-${seq}`
}

function DeployConsole({ varient = "login" }) {

    const script = useMemo(() => SCRIPTS[varient] || SCRIPTS.login, [varient])

    const reduceMotion = useMemo(
        () =>
            typeof window !== "undefined" && 
            window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        []
    )

    const [manifestId, setManifestId] = useState(randomManifestId)
    const [lineIdx, setLineIdx] = useState(0)
    const [charIdx, setCharIdx] = useState(0)
    const timeoutRef = useRef(null)

    useEffect(() => {

        if (reduceMotion) return undefined

        const current = script[lineIdx]

        if (!current) {
            timeoutRef.current = setTimeout(() => {
                setManifestId(randomManifestId())
                setLineIdx(0)
                setCharIdx(0)
            },2600)
            return () => clearTimeout(timeoutRef.current)
        }

        if (charIdx < current.text.length) {
            timeoutRef.current = setTimeout(() => {
                setCharIdx((c) => c + 1)
            },22)
        } else {
            timeoutRef.current = setTimeout(() => {
                setLineIdx((l)=>l+1)
                setCharIdx(0) 
            },420)
        }

        return () => clearTimeout(timeoutRef.current)

    },[charIdx, lineIdx, script, reduceMotion])

    const renderLines = reduceMotion
        ? script
        : script.slice(0, lineIdx).concat(
            script[lineIdx]
                ? [{ ...script[lineIdx], text: script[lineIdx].text.slice(0, charIdx) }]
                : []
        )

    const isTyping = !reduceMotion && lineIdx < script.length

    return (
        <aside
            aria-hidden="true"
            className="relative hidden flex-col overflow-hidden bg-os-console px-11 py-10 lg:flex"
        >

            <div
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(30,44,70,0.35)_1px,transparent_1px)] bg-[length:100%_28px]"
            />

            <div className="relative mb-6 flex items-center justify-between border-b border-os-border-soft 
            pb-4 font-mono text-xs text-os-faint" >
                <span className="tracking-wide" >
                    {manifestId}
                </span>
                <span className="flex items-center gap-2" >
                    <span className="h-1.5 w-1.5 rounded-full bg-os-warn motion-safe:animate-os-pulse" />
                    deploy pipeline
                </span>
            </div>

            <div className="relative flex-1 whitespace-pre-wrap font-mono text-[13px] leading-8 text-os-muted" >
                {
                    renderLines.map((line,i) => (
                        <div
                            key={i}
                            className={
                                line.kind === "cmd"
                                    ? "text-os-text"
                                    : line.kind === "ok"
                                    ? "text-os-accent"
                                    : ""   
                            }
                        >
                            {line.text}
                            {isTyping && i === renderLines.length - 1 ? (
                                <span className="ml-0.5 inline-block h-3.5 w-1.5 aligh-text-bottom bg-os-accent 
                                motion-safe:animate-os-blink" />
                            ) : null}
                        </div>
                    ))
                }
            </div>

            <div className="relative my-8 flex-1 flex items-center justify-center" >
                <ShipMark />
            </div>
            
            <div className="relative mt-10" >
                <p className="mb-4 font-mono text-[11px] uppercase tracking-wider text-os-faint" >
                    {varient === "register" ? "What you get" : "Recent shipments"}
                </p>
                {varient === "register" ? (
                    <ul className="flex flex-col gap-3" >
                        {REGISTER_HIGHLIGHTS.map((line) => (
                            <li key={line} className="flex items-start gap-2.5 font-mono text-[12.5px] text-os-muted" >
                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-os-accent" />
                                {line}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <ul className="flex flex-col gap-3" >
                        {RECENT_DEPLOYS.map((deploy) => (
                            <li
                                key={deploy.id}
                                className="flex items-center justify-between gap-4 border-b border-os-border-soft pb-3 font-mono text-[12.5px] last:border-b-0"
                            >
                                <span className="flex items-center gap-2.5 text-os-muted" >
                                    <span className="h-1 w-1 shrink-0 rounded-full bg-os-accent" />
                                    {deploy.target}
                                </span>
                                <span className="text-os-faint" >
                                    {deploy.time}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="relative mt-5 border-t border-os-border-soft pt-5 font-mono text-[11.5px] text-os-faint" >
                {FOOT_TEXT[varient]}
            </div>

        </aside>
    )

}

export default DeployConsole