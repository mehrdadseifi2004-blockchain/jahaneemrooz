import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import { useActionState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)

  return (
    <div
      className="flex w-full max-w-[470px] flex-col items-center rounded-[28px] border border-white/10 bg-[#111923] px-6 py-8 text-white shadow-[0_24px_80px_rgba(0,0,0,0.35)] small:px-9 small:py-10"
      data-testid="login-page"
    >
      <h1 className="mb-4 text-center text-3xl font-black tracking-[-0.03em] text-white">
        Welcome back
      </h1>
      <p className="mb-8 max-w-sm text-center text-sm leading-7 text-slate-400">
        Sign in to access an enhanced shopping experience.
      </p>
      {message?.state === "verification_required" && (
        <div
          className="mb-6 w-full rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-center text-sm leading-7 text-emerald-300"
          data-testid="login-verification-message"
        >
          We sent a verification link to <strong>{message.email}</strong>.
          Please verify your email, then sign in.
        </div>
      )}
      <form className="w-full" action={formAction}>
        <div className="flex w-full flex-col gap-y-3">
          <Input
            label="Email"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
            data-testid="email-input"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>
        <ErrorMessage
          error={message?.state === "error" ? message.error : null}
          data-testid="login-error-message"
        />
        <SubmitButton
          data-testid="sign-in-button"
          className="mt-6 h-12 w-full rounded-full !border-0 !bg-[#ff5a00] font-bold !text-white transition hover:!bg-[#ff7a1a]"
        >
          Sign in
        </SubmitButton>
      </form>
      <span className="mt-6 text-center text-sm text-slate-400">
        Not a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="font-bold text-[#ff7a1a] underline underline-offset-4 transition hover:text-[#ff5a00]"
          data-testid="register-button"
        >
          Join us
        </button>
        .
      </span>
    </div>
  )
}

export default Login
