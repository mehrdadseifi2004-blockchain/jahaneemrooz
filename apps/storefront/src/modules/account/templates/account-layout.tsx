"use client"

import React from "react"

import { useI18n } from "@i18n/components/i18n-provider"

import UnderlineLink from "@modules/common/components/interactive-link"

import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  const { dictionary } = useI18n()
  const content = dictionary.account.help

  return (
    <div
      className="flex-1 bg-[var(--theme-background)] text-[var(--theme-text)] small:py-12"
      data-testid="account-page"
    >
      <div className="content-container mx-auto flex h-full max-w-6xl flex-1 flex-col bg-[var(--theme-background)]">
        <div className="grid grid-cols-1 gap-8 py-12 small:grid-cols-[240px_minmax(0,1fr)]">
          <div>{customer && <AccountNav customer={customer} />}</div>
          <div className="flex-1">{children}</div>
        </div>
        <div className="flex flex-col items-end justify-between gap-8 border-t border-[var(--theme-border)] py-12 small:flex-row">
          <div>
            <h3 className="mb-4 !text-xl !font-bold !text-[var(--theme-text)]">
              {content.title}
            </h3>
            <span className="!text-sm !leading-7 !text-[var(--theme-text-muted)]">
              {content.description}
            </span>
          </div>
          <div>
            <UnderlineLink href="/customer-service">
              {content.cta}
            </UnderlineLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
