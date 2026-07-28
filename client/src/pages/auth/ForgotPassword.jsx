import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { fetchMe } from "../../store/authSlice.js"

import { STEP_COPY } from "../../data/steps.js"

import DeployConsole from "../../components/auth/DeployConsole.jsx"
import api from "../../api/axios.js"

import EmailSection from "../../components/forgot/EmailSection.jsx"
import OtpSection from "../../components/forgot/OtpSection.jsx"
import ResetSection from "../../components/forgot/ResetSection.jsx"

const inputClasses = 
    "mt-2 block w-full rounded-md border border-os-border bg-os-panel px-3 py-2.5 font-sans \
    text-sm text-os-text placeholder:text-os-faint focus:border-os-aceent focus:outline-none \
    focus:ring-4 focus:ring-os-accent/15"

function ForgotPassword() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [step, setStep] = useState("email")
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [resetToken, setResetToken] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirm, setConfirm] = useState("")

    const [error, setError] = useState("")
    const [notice, setNotice] = useState("")
    const [loading, setLoading] = useState(false)

    const hasLength = newPassword.length >= 6
    const hasMatch = newPassword.length > 0 && newPassword === confirm

    async function handleSendOTP(e) {

        e.preventDefault()
        setError("")
        setLoading(true)
        try {
            const res = await api.post("/auth/forgot-password",{ email })
            // setResetToken(res.data.reset_token)
            setNotice("If that email is registered, a code is on its way.")
            setStep("otp")
        } catch (err) {
            setError(err.response?.data?.error || "Something went wrong. Try again.")
        } finally {
            setLoading(false)
        }

    }

    async function handleVerifyOtp(e) {

        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const res = await api.post("/auth/verify-otp", { email, otp })
            setResetToken(res.data.reset_token)
            setNotice("")
            setStep("reset")
        } catch (err) {
            setError(err.response?.data?.error || "Invalid or expired code.")
        } finally {
            setLoading(false)
        }

    }

    async function handleResendOtp() {

        setError("")
        setNotice("")
        setLoading(true)

        try {
            await api.post("/auth/forgot-password", { email })
            setNotice("Sent a new code your way.")
        } catch (err) {
            setError(err.response?.data?.error || "Couldn't resend the code. Try again")
        } finally {
            setLoading(false)
        }

    }

    async function handleResetPassword(e) {

        e.preventDefault()
        setError("")

        if (!hasLength || !hasMatch) {
            setError("Check the requirements below before shipping this form.")
            return 
        }

        setLoading(true)

        try {
            await api.post("/auth/reset-password", {
                reset_token: resetToken,
                new_password: newPassword
            })
            await dispatch(fetchMe()).unwrap()
            navigate("/home")
        } catch (err){
            setError(err.response?.data?.error || "Something went wrong. Try again.")
        } finally {
            setLoading(false)
        }

    }

    const { title, subtitle } = STEP_COPY[step]

    return (
        <div className="grid min-h-screen bg-os-bg font-sans text-os-text lg:grid-cols-[minmax(350px,460px)_1fr]" >
            {/* <div className="flex items-center gap-2 border-b border-os-border-soft px-6 py-2.5 font-mono text-[11.5px]" >
                <span className="h-1.5 w-1.5 rounded-full bg-os-warn motion-safe:animate-os-pulse" />
                deploy pipeline active
            </div> */}
            <section className="flex items-center justify-center border-r broder-os-border-soft px-6 py-12 sm:px-10" >
                <div className="w-full max-w-[360px]" >
                    <Link
                        to="/"
                        className="mb-10 inline-flex items-baseline font-display text-xl font-semibold tracking-tight text-os-text"
                    >
                        OpenShip<span className="text-os-accent" >.</span>
                    </Link>
                    <h1 className="mb-2.5 font-display text-[28px[ font-semibold leading-right tracking-tight" >
                        {title}
                    </h1>
                    <p className="mb-7 text-sm leading-relaxed text-os-muted" >
                        {
                            step === "otp"
                                ? <>Enter the 6-digit code we sent to <span>{email}</span></>
                                : subtitle
                        }
                    </p>

                    {error && (
                        <div
                            role="alert"
                            className="mb-5 rounded-md border border-os-danger/35 bg-os-danger/10 px-3 py-2.5 text-sm text-os-danger"
                        >
                            {error}
                        </div>
                    )}

                    {!error && notice && (
                        <div
                            role="status"
                            className="mb-5 rounded-md border border-os-accent/30 bg-os-accent/10 px-3 py-2.5 text-sm text-os-accent"
                        >
                            {notice}
                        </div>
                    )}

                    {step === "email" && (
                        <EmailSection
                            email={email}
                            setEmail={setEmail}
                            loading={loading}
                            handleSendOtp={handleSendOTP}
                            inputClasses={inputClasses}
                        />
                    )}

                    {step === "otp" && (
                        <OtpSection
                            otp={otp}
                            setOtp={setOtp}
                            loading={loading}
                            handleVerifyOtp={handleVerifyOtp}
                            handleResendOtp={handleResendOtp}
                            setStep={setStep}
                            setEmail={setEmail}
                            setError={setError}
                            setNotice={setNotice}
                            inputClasses={inputClasses}
                        />
                    )}

                    {step === "reset" && (
                        <ResetSection
                            newpassword={newPassword}
                            setNewPassword={setNewPassword}
                            confirm={confirm}
                            setConfirm={setConfirm}
                            handleResetPassword={handleResetPassword}
                            inputClasses={inputClasses}
                            hasMatch={hasMatch}
                            hasLength={hasLength}
                            loading={loading}
                        />
                    )}

                    <p className="mt-6 text-center text-sm text-os-muted" >
                        Remembered it after all?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-os-accent hover:underline"
                        > 
                            Back to Sign in 
                        </Link>
                    </p>

                </div>
            </section>

            <DeployConsole
                varient="login"
            />

        </div>
    )

}

export default ForgotPassword