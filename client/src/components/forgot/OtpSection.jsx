import React from "react"

function OtpSection({ otp, setOtp, handleVerifyOtp, handleResendOtp, loading, inputClasses,setStep, setEmail, setError, setNotice }) {

    return (
        <form
            onSubmit={handleVerifyOtp}
            noValidate
        >
            <label className="mb-[18px] block text-xs font-medium uppercase tracking-wider text-os-muted" >
                One-Time Code
                <input
                    type="text"
                    name="otp"
                    inputMode="numeric"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    autoComplete="one-time-code"
                    required
                    className={inputClasses}
                />
            </label>
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
                        ? "Verifying..."
                        : "Verify code"
                }
            </button>
            <div className="mt-5 flex items-center justify-between text-sm text-os-muted" >
                <button
                    type="button"
                    onClick={() => {
                        setStep("email")
                        setOtp("")
                        setError("")
                        setNotice("")
                    }}
                    className="font-medium text-os-accent hover:underline"
                >
                    Use a different email
                </button>
                <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={loading}
                    className="font-medium text-os-accent hover:underline disabled:opacity-60"
                >
                    Resend code
                </button>
            </div>
        </form>
    )

}

export default OtpSection