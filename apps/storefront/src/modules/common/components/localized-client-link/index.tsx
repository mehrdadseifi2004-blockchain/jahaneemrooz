"use client"

import Link, { LinkProps } from "next/link"
import { useParams } from "next/navigation"
import React from "react"

type LocalizedClientLinkProps = Omit<LinkProps, "href"> & {
  children?: React.ReactNode
  href: string
  className?: string
  onClick?: () => void
  passHref?: true
  [key: string]: unknown
}

const LocalizedClientLink = ({
  children,
  href,
  ...props
}: LocalizedClientLinkProps) => {
  const params = useParams<{
    locale?: string
    countryCode?: string
  }>()

  const locale = params.locale || "fa"
  const countryCode = params.countryCode || "ir"

  const localizedHref =
    href === "/"
      ? `/${locale}/${countryCode}`
      : `/${locale}/${countryCode}${href.startsWith("/") ? href : `/${href}`}`

  return (
    <Link href={localizedHref} {...props}>
      {children}
    </Link>
  )
}

export default LocalizedClientLink
