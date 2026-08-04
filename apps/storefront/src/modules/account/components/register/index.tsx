"use client"

import { useActionState } from "react"
import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)

  return (
    <div
      className="flex w-full max-w-[520px] flex-col items-center rounded-[28px] border border-white/10 bg-[#111923] px-6 py-8 text-white shadow-[0_24px_80px_rgba(0,0,0,0.35)] small:px-9 small:py-10"
      data-testid="register-page"
    >
      <h1 className="mb-4 text-center text-3xl font-black tracking-[-0.03em] text-white">
        Become a Medusa Store Member
      </h1>
      <p className="mb-6 max-w-md text-center text-sm leading-7 text-slate-400">
        Create your Medusa Store Member profile, and get access to an enhanced
        shopping experience.
      </p>
      {message?.state === "verification_required" && (
        <div
          className="mb-5 w-full rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-center text-sm leading-7 text-emerald-300"
          data-testid="register-verification-message"
        >
          We sent a verification link to <strong>{message.email}</strong>.
          Please check your inbox to verify your email, then sign in.
        </div>
      )}
      <form className="flex w-full flex-col" action={formAction}>
        <div className="flex w-full flex-col gap-y-3">
          <Input
            label="First name"
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
          />
          <Input
            label="Last name"
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
          />
          <Input
            label="Email"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label="Phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <Input
            label="Password"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>
        <ErrorMessage
          error={message?.state === "error" ? message.error : null}
          data-testid="register-error"
        />
        <span className="mt-6 text-center text-sm leading-7 text-slate-400">
          By creating an account, you agree to Medusa Store&apos;s{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="font-bold text-[#ff7a1a] underline underline-offset-4 transition hover:text-[#ff5a00]"
          >
            Privacy Policy
          </LocalizedClientLink>{" "}
          and{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="font-bold text-[#ff7a1a] underline underline-offset-4 transition hover:text-[#ff5a00]"
          >
            Terms of Use
          </LocalizedClientLink>
          .
        </span>
        <SubmitButton
          className="mt-6 h-12 w-full rounded-full !border-0 !bg-[#ff5a00] font-bold !text-white transition hover:!bg-[#ff7a1a]"
          data-testid="register-button"
        >
          Join
        </SubmitButton>
      </form>
      <span className="mt-6 text-center text-sm leading-7 text-slate-400">
        Already a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="font-bold text-[#ff7a1a] underline underline-offset-4 transition hover:text-[#ff5a00]"
        >
          Sign in
        </button>
        .
      </span>
    </div>
  )
}

export default Register
