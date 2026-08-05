"use client"

import { usePathname } from "next/navigation"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

type NavItemProps = {
  href: string
  label: string
  activePath?: string
}

const NavItem = ({ href, label, activePath }: NavItemProps) => {
  const pathname = usePathname()

  const normalizedPath = pathname.replace(/^\/(fa|en)\/[^/]+/, "") || "/"

  const isActive = activePath
    ? normalizedPath === activePath ||
      normalizedPath.startsWith(`${activePath}/`)
    : normalizedPath === href

  return (
    <LocalizedClientLink
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`group relative inline-flex h-12 items-center whitespace-nowrap px-1 text-sm font-medium transition duration-300 ${
        isActive ? "text-[#ff7a1a]" : "text-slate-200 hover:text-white"
      }`}
    >
      {label}

      <span
        aria-hidden="true"
        className={`absolute inset-x-0 bottom-0 mx-auto h-0.5 rounded-full bg-[#ff5a00] shadow-[0_0_12px_rgba(255,90,0,0.7)] transition-all duration-300 ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </LocalizedClientLink>
  )
}

export default NavItem
