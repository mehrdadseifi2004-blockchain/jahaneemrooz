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
      className="flex w-full max-w-sm flex-col items-center gap-y-4 text-center"
      data-testid="verify-account-page"
    >
      <h1 className="text-large-semi uppercase">
        {dictionary.verifyAccount.title}
      </h1>

      {state === "verifying" && (
        <p className="text-base-regular text-ui-fg-base">
          {dictionary.verifyAccount.verifying}
        </p>
      )}

      {state === "success" && (
        <>
          <p className="text-base-regular text-ui-fg-base">
            {dictionary.verifyAccount.success}
          </p>

          <LocalizedClientLink href="/account">
            <Button variant="primary">
              {dictionary.verifyAccount.goToSignIn}
            </Button>
          </LocalizedClientLink>
        </>
      )}

      {state === "error" && (
        <>
          <p className="text-base-regular text-ui-fg-base">
            {dictionary.verifyAccount.error}
          </p>

          <LocalizedClientLink href="/account">
            <Button variant="secondary">
              {dictionary.verifyAccount.goToSignIn}
            </Button>
          </LocalizedClientLink>
        </>
      )}
    </div>
  )
}

export default VerifyAccount
