import React from "react"

function EmailSection({ handleSendOtp, email, setEmail, inputClasses, loading }) {

    return (
        <form
            onSubmit={handleSendOtp}
            noValidate
        >
            <label className="mb-[18px] block text-xs font-medium uppercase tracking-wider text-os-muted" >
                Email
                <input
                    type="email"
                    name="email"
                    placeholder="json@hackclub.app"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
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
                {loading ? "Sending code..." : "Send reset code"}
            </button>
        </form>
    )

}

export default EmailSection