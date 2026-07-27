import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { fetchMe } from "../../store/authSlice.js"

import { STEP_COPY } from "../../data/steps.js"

import DeployConsole from "../../components/auth/DeployConsole.jsx"
import api from "../../api/axios.js"

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
            const res = await api.post("/auth/verify-otp",{ email, otp })
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
            
        </div>
    )

}

export default ForgotPassword