"use client"

import { ReactNode } from "react"

import { useI18n } from "@i18n/components/i18n-provider"

export const ProductRating = ({ children }: { children: ReactNode }) => {
  const { dictionary } = useI18n()

  return (
    <div
      dir="ltr"
      className="mt-1 flex items-center gap-2 small:mt-0 small:gap-3"
      aria-label={dictionary.store.productCard.ratingLabel}
    >
      {children}
    </div>
  )
}

export const ProductContactPrice = () => {
  const { dictionary } = useI18n()

  return (
    <span className="text-base font-bold text-[#ff5a00] small:text-xl">
      {dictionary.store.productCard.contact}
    </span>
  )
}
