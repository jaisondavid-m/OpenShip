import React from "react"
import Check from "../../utils/Check.jsx"

function ResetSection({ newpassword,setNewPassword, confirm, setConfirm, handleResetPassword, inputClasses, hasMatch, hasLength, loading }) {

    return (
        <form
            onSubmit={handleResetPassword}
            noValidate
        >
            <label className="mb-[18px] block text-xs font-medium uppercase tracking-wider text-os-muted" >
                New password
                <input
                    type="password"
                    name="newPassword"
                    placeholder="your-new-password"
                    value={newpassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                    className={inputClasses}
                />
            </label>
            <label className="mb-[18px] block text-xs font-medium uppercase tracking-wider text-os-muted" >
                Confirm new password
                <input
                    type="password"
                    name="confirm"
                    placeholder="your-new-password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    autoComplete="new-password"
                    required
                    className={inputClasses}
                />
            </label>
            <Check
                hasMatch={hasMatch}
                hasLength={hasLength}
            />
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
                        ? "Resetting..."
                        : "Reset password"
                }
            </button>
        </form>
    )

}

export default ResetSection