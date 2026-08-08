"use client"

import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"

import { useI18n } from "@i18n/components/i18n-provider"
import { confirmEmailVerification } from "@lib/data/customer"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button } from "@modules/common/components/ui"

type VerificationState = "verifying" | "success" | "error"

const VerifyAccount = () => {
  const { dictionary } = useI18n()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [state, setState] = useState<VerificationState>("verifying")

  const confirmed = useRef(false)

  useEffect(() => {
    if (confirmed.current) {
      return
    }

    confirmed.current = true

    if (!token) {
      setState("error")
      return
    }

    confirmEmailVerification(token).then(({ success }) => {
      setState(success ? "success" : "error")
    })
  }, [token])

  return (
    <div
      className="mx-auto my-16 flex w-full max-w-[470px] flex-col items-center gap-y-5 rounded-[28px] border border-[var(--theme-border)] bg-[var(--theme-surface)] px-7 py-10 text-center text-[var(--theme-text)] shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
      data-testid="verify-account-page"
    >
      <h1 className="text-3xl font-black tracking-[-0.03em] text-[var(--theme-text)]">
        {dictionary.verifyAccount.title}
      </h1>

      {state === "verifying" && (
        <p className="text-sm leading-7 text-[var(--theme-text-muted)]">
          {dictionary.verifyAccount.verifying}
        </p>
      )}

      {state === "success" && (
        <>
          <p className="text-sm leading-7 text-[var(--theme-text-muted)]">
            {dictionary.verifyAccount.success}
          </p>

          <LocalizedClientLink href="/account">
            <Button className="rounded-full !border-0 !bg-[#ff5a00] px-7 font-bold !text-[var(--theme-text)] hover:!bg-[#ff7a1a]">
              {dictionary.verifyAccount.goToSignIn}
            </Button>
          </LocalizedClientLink>
        </>
      )}

      {state === "error" && (
        <>
          <p className="text-sm leading-7 text-[var(--theme-text-muted)]">
            {dictionary.verifyAccount.error}
          </p>

          <LocalizedClientLink href="/account">
            <Button className="rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface-muted)] px-7 font-bold text-[var(--theme-text-muted)] hover:border-[#ff5a00]/50 hover:text-[#ff7a1a]">
              {dictionary.verifyAccount.goToSignIn}
            </Button>
          </LocalizedClientLink>
        </>
      )}
    </div>
  )
}

export default VerifyAccount
