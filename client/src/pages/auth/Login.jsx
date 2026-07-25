import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { fetchMe, setCredentials } from "../../store/authSlice.js"

import DeployConsole from "../../components/auth/DeployConsole.jsx"

import api from "../../api/axios.js"

const inputClasses =
    "mt-2 block w-full rounded-md border border-os-border bg-os-panel px-3 py-2.5 font-sans \
    text-sm text-os-text placeholder:text-os-faint focus:border-os-accent focus:outline-none \
    focus:ring-4 focus:ring-os-accent/15"

function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [form,setForm] = useState({ email: "", password: "" })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    function handleChange(e) {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    }

    async function handleSubmit(e) {

        e.preventDefault()

        setError("")
        setLoading(true)

        try {
            const res = await api.post("/auth/login",form)

            // dispatch(setCredentials({
            //     user: res.data.user,
            //     role: res.data.role,
            // }))
            await dispatch(fetchMe()).unwrap()

            navigate("/home")
        } catch (err) {
            setError(err.response?.data?.error || "Invalid email or password")
        } finally {
            setLoading(false)
        }

    }

    return (
        <div className="grid min-h-screen bg-os-bg font-sans text-os-text lg:grid-cols-[minmax(360px,460px)_1fr]" >

            <div className="flex items-center gap-2 border-b border-os-border-soft px-6 py-2.5 font-mono text-[11.5px] text-os-faint lg:hidden" >
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
                        Sign in to your dock
                    </h1>
                    <p className="mb-7 text-sm leading-relaxed text-os-muted" >
                        Deploy static sites in seconds. No servers to manage.
                    </p>
                    {error && (
                        <div
                            role="alert"
                            className="mb-5 rounded-md border border-os-danger/35 bg-os-danger/10 px-3 py-2.5 text-sm text-red-500"
                        >
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <label className="mb-[18px] block text-xs font-medium uppercase tracking-wider text-os-muted" >
                            Email 
                            <input
                                type="email"
                                name="email"
                                placeholder="you@gmail.com"
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
                                placeholder="•••••••••"
                                value={form.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                                required
                                className={inputClasses}
                            />
                        </label>
                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-1.5 w-full rounded-md bg-os-accent py-3 text-sm font-semibold text-[#04211c] transition-colors
                            hover:enabled:bg-os-accent-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-os-text
                            disabled:cursor-not-allowed disabled:bg-os-accent-dim disabled:opacity-70"
                        >
                            {
                                loading
                                    ? "Sigining in"
                                    : "Sign in"
                            }
                        </button>
                        <p className="mt-6 text-center text-sm text-os-muted" >
                            New to OpenShip?{" "}
                            <Link
                                to="/register"
                                className="font-medium text-os-accent hover:underline"
                            >
                                Create an account
                            </Link>
                        </p>
                        <div className="mt-8 flex flex-col gap-3 border-t border-os-border-soft pt-8" >
                            <div className="flex items-center gap-2.5 text-sm text-os-muted" >
                                <span className="h-1 w-1 rounded-full bg-os-accent" />
                                Deploy from Git or drag-and-drop in seconds
                            </div>
                            <div className="flex items-center gap-2.5 text-sm text-os-muted" >
                                <span className="h-1 w-1 rounded-full bg-os-accent" />
                                Free subdomain, HTTPS and global CDN included
                            </div>
                            <div className="flex items-center gap-2.5 text-sm text-os-muted" >
                                <span className="h-1 w-1 rounded-full bg-os-accent" />
                                Bring your own custom domain anytime
                            </div>
                        </div>
                    </form>
                </div>
            </section>
            <DeployConsole
                varient="login"
            />
        </div>
    )

}

export default Login