import React from "react"

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
  return (
    <div
      className="flex-1 bg-[#070b10] text-white small:py-12"
      data-testid="account-page"
    >
      <div className="content-container mx-auto flex h-full max-w-6xl flex-1 flex-col bg-[#070b10]">
        <div className="grid grid-cols-1 gap-8 py-12 small:grid-cols-[240px_minmax(0,1fr)]">
          <div>{customer && <AccountNav customer={customer} />}</div>
          <div className="flex-1">{children}</div>
        </div>
        <div className="flex flex-col items-end justify-between gap-8 border-t border-white/10 py-12 small:flex-row">
          <div>
            <h3 className="mb-4 !text-xl !font-bold !text-white">
              Got questions?
            </h3>
            <span className="!text-sm !leading-7 !text-slate-400">
              You can find frequently asked questions and answers on our
              customer service page.
            </span>
          </div>
          <div>
            <UnderlineLink href="/customer-service">
              Customer Service
            </UnderlineLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
