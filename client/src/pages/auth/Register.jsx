import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import api from "../../api/axios.js"
import DeployConsole from "../../components/auth/DeployConsole.jsx"

const inputClasses =
    "mt-2 block w-full rounded-md border border-os-border bg-os-panel px-3 py-2.5 \
    font-sans text-sm text-os-text placeholder:text-os-faint focus:border-os-accent \
    focus:outline-none focus:ring-4 focus:ring-os-accent/15"


function Register() {

    const navigate = useNavigate()
    const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const hasLength = form.password.length >= 6
    const hasMatch = form.password.length > 0 && form.password == form.confirm

    function handleChange(e) {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    }

    async function handleSubmit(e) {

        e.preventDefault()
        setError("")

        if (!hasLength || !hasMatch) {
            setError("Check the requirements below before shipping this form.")
            return
        }

        setLoading(true)
        try {
            await api.post("/auth/register", {
                name: form.name,
                email: form.email,
                password: form.password,
            })
            navigate("/login")
        } catch (err) {
            setError(err.response?.data?.error || "Something went wrong. Try again.")
        } finally {
            setLoading(false)
        }

    }

    return (
        <div className="grid min-h-screen bg-os-bg font-sans text-os-text lg:grid-cols-[minmax(360px,460px)_1fr]" >
            <div className="flex items-center gap-2 border-b border-os-border-soft px-6 py-2.5 font-mono
            text-[11.5px] text-os-faint lg:hidden" >
                <span className="h-1.5 w-1.5 rounded-full bg-os-warn motion-safe:animate-os-pulse" />
                deploy pipeline active
            </div>
            <section className="flex items-center justify-center border-r border-os-border-soft px-6 py-12 sm:px-10" >
                <div className="w-full max-w-[360px]" >
                    <Link
                        to="/"
                        className="mb-10 inline-flex items-baseline font-display text-xl font-semibold tracking-tight text-os-text"
                    >
                        OpenShip<span className="text-os-accent" >.</span>
                    </Link>
                    <h1 className="mb-2.5 font-display text-[28px] font-semibold leading-tight tracking-tight" >
                        Set up your dock
                    </h1>
                    <p className="mb-7 text-sm leading-relaxed text-os-muted" >
                        Ship your first static site in under a minute.
                    </p>
                    {error && (
                        <div
                            role="alert"
                            className="mb-5 rounded-md border border-os-danger/35 bg-os-danger/10 px-3 py-2.5 text-sm text-red-300"
                        >
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} noValidate >
                        <label className="mb-[18px] block text-xs font-medium uppercase tracking-wider text-os-muted" >
                            Name
                            <input
                                type="text"
                                name="name"
                                placeholder="Jaison David"
                                value={form.name}
                                onChange={handleChange}
                                autoComplete="name"
                                required
                                className={inputClasses}
                            />
                        </label>
                        <label className="mb-[18px] block text-xs font-medium uppercase tracking-wider text-os-muted" >
                            Email
                            <input
                                type="email"
                                name="email"
                                placeholder="json@hackclub.app"
                                value={form.email}
                                onChange={handleChange}
                                autoComplete="email"
                                required
                                className={inputClasses}
                            />
                        </label>
                        <label className="mb-[18px] block text-xs font-medium uppercase tracking-wider text-os-muted" >
                            Password 
                            <input
                                type="password"
                                name="password"
                                placeholder="your-password"
                                value={form.password}
                                onChange={handleChange}
                                autoComplete="new-password"
                                required
                                className={inputClasses}
                            />
                        </label>
                        <label className="mb-[18px] block text-xs font-medium uppercase tracking-wider text-os-muted">
                            Confirm password
                            <input
                                type="password"
                                name="confirm"
                                placeholder="your-password"
                                value={form.confirm}
                                onChange={handleChange}
                                autoComplete="new-password"
                                required
                                className={inputClasses}
                            />
                        </label>

                        <ul className="-mt-1.5 mb-[22px] flex flex-col gap-1.5" >
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
                                At least 6 characters
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

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-1.5 w-full rounded-md bg-os-accent py-3 text-sm font-semibold text-[#04211c]
                            transition-colors hover:enabled:bg-os-accent-bright focus-visible:outline focus-visible:outline-2
                            focus-visible:outline-offset-2 focus-visible:outline-os-text disabled:cursor-not-allowed
                            disabled:bg-os-accent-dim disabled:opacity-70"
                        >
                            {
                                loading
                                    ? "Creating account..."
                                    : "Create account"
                            }
                        </button>

                    </form>

                    <p className="mt-6 text-center text-sm text-os-muted" >
                        Already shipping with us?{" "}
                        <Link to="/login" className="font-medium text-os-accent hover:underline" >
                            Sigin in
                        </Link>
                    </p>

                </div>
            </section>

            <DeployConsole
                variant="register"
            />

        </div>
    )

}

export default Register