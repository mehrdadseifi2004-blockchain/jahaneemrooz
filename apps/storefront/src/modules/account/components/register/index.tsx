"use client"

import { useActionState } from "react"

import { useI18n } from "@i18n/components/i18n-provider"
import { signup } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const { dictionary } = useI18n()
  const content = dictionary.account.register

  const [message, formAction] = useActionState(signup, null)

  return (
    <div
      className="flex w-full max-w-[520px] flex-col items-center rounded-[28px] border border-[var(--theme-border)] bg-[var(--theme-surface)] px-6 py-8 text-[var(--theme-text)] shadow-[0_24px_80px_rgba(0,0,0,0.35)] small:px-9 small:py-10"
      data-testid="register-page"
    >
      <h1 className="mb-4 text-center text-3xl font-black tracking-[-0.03em] text-[var(--theme-text)]">
        {content.title}
      </h1>

      <p className="mb-6 max-w-md text-center text-sm leading-7 text-[var(--theme-text-muted)]">
        {content.description}
      </p>

      {message?.state === "verification_required" && (
        <div
          className="mb-5 w-full rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-center text-sm leading-7 text-emerald-300"
          data-testid="register-verification-message"
        >
          {content.verificationPrefix}{" "}
          <strong dir="ltr">{message.email}</strong>.{" "}
          {content.verificationSuffix}
        </div>
      )}

      <form className="flex w-full flex-col" action={formAction}>
        <div className="flex w-full flex-col gap-y-3">
          <Input
            label={content.firstName}
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
          />

          <Input
            label={content.lastName}
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
          />

          <Input
            label={content.email}
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />

          <Input
            label={content.phone}
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />

          <Input
            label={content.password}
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

        <span className="mt-6 text-center text-sm leading-7 text-[var(--theme-text-muted)]">
          {content.agreementPrefix}{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="font-bold text-[#ff7a1a] underline underline-offset-4 transition hover:text-[#ff5a00]"
          >
            {content.privacyPolicy}
          </LocalizedClientLink>{" "}
          {content.and}{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="font-bold text-[#ff7a1a] underline underline-offset-4 transition hover:text-[#ff5a00]"
          >
            {content.termsOfUse}
          </LocalizedClientLink>{" "}
          {content.agreementSuffix}
        </span>

        <SubmitButton
          className="mt-6 h-12 w-full rounded-full !border-0 !bg-[#ff5a00] font-bold !text-[var(--theme-text)] transition hover:!bg-[#ff7a1a]"
          data-testid="register-button"
        >
          {content.submit}
        </SubmitButton>
      </form>

      <span className="mt-6 text-center text-sm leading-7 text-[var(--theme-text-muted)]">
        {content.alreadyMember}{" "}
        <button
          type="button"
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="font-bold text-[#ff7a1a] underline underline-offset-4 transition hover:text-[#ff5a00]"
        >
          {content.signIn}
        </button>
      </span>
    </div>
  )
}

export default Register
