import { Suspense } from "react"

import { AppLocale } from "@i18n/config"
import { Dictionary } from "@i18n/get-dictionary"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import AppLanguageSwitcher from "@modules/layout/components/app-language-switcher"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

type NavProps = {
  locale: AppLocale
  dictionary: Dictionary
  regions?: any[]
  locales?: any[]
  currentLocale?: string
}

export default function Nav({
  locale,
  dictionary,
  regions = [],
  locales = [],
  currentLocale,
}: NavProps) {
  return (
    <>
      <div className="border-b border-white/10 bg-[#05080c] text-white">
        <div className="content-container flex min-h-9 items-center justify-center px-4 text-center text-xs">
          <span>
            {dictionary.navigation.announcement}

            <LocalizedClientLink
              href="/store"
              className="ms-1 font-semibold text-[#ff5a00] underline decoration-[#ff5a00]/70 underline-offset-4 transition hover:text-[#ff7a1a]"
            >
              {dictionary.navigation.viewProducts}
            </LocalizedClientLink>
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080d12] text-white shadow-[0_10px_35px_rgba(0,0,0,0.28)]">
        <div className="content-container">
          <div className="flex h-[78px] items-center justify-between gap-4">
            <div className="flex shrink-0 items-center gap-3">
              <div className="medium:hidden">
                <SideMenu
                  regions={regions}
                  locales={locales}
                  currentLocale={currentLocale ?? null}
                  locale={locale}
                  dictionary={dictionary}
                />
              </div>

              <LocalizedClientLink
                href="/"
                className="text-2xl font-black tracking-[-0.04em] text-white transition hover:text-[#ff5a00] small:text-3xl"
              >
                {dictionary.common.brand}
              </LocalizedClientLink>
            </div>

            <nav className="hidden items-center gap-6 text-sm font-medium text-slate-200 medium:flex">
              <LocalizedClientLink
                href="/store"
                className="transition hover:text-[#ff5a00]"
              >
                {dictionary.common.store}
              </LocalizedClientLink>

              <LocalizedClientLink
                href="/store"
                className="transition hover:text-[#ff5a00]"
              >
                {dictionary.navigation.specialOffers}
              </LocalizedClientLink>

              <LocalizedClientLink
                href="/store"
                className="transition hover:text-[#ff5a00]"
              >
                {dictionary.navigation.newArrivals}
              </LocalizedClientLink>

              <LocalizedClientLink
                href="/#categories"
                className="transition hover:text-[#ff5a00]"
              >
                {dictionary.navigation.categories}
              </LocalizedClientLink>
            </nav>

            <div className="hidden max-w-[460px] flex-1 medium:block">
              <form action="./store" className="relative">
                <button
                  type="submit"
                  aria-label={dictionary.common.search}
                  className="absolute start-5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#ff5a00]"
                >
                  <SearchIcon />
                </button>

                <input
                  type="search"
                  name="q"
                  placeholder={dictionary.navigation.searchPlaceholder}
                  className="h-12 w-full rounded-full border border-white/10 bg-[#111923] ps-12 pe-5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#ff5a00]/60 focus:ring-2 focus:ring-[#ff5a00]/20"
                />
              </form>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <AppLanguageSwitcher />

              <LocalizedClientLink
                href="/store"
                aria-label={dictionary.common.search}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/10 hover:text-[#ff5a00] medium:hidden"
              >
                <SearchIcon />
              </LocalizedClientLink>

              <Suspense
                fallback={
                  <LocalizedClientLink
                    href="/cart"
                    aria-label={dictionary.common.cart}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/10 hover:text-[#ff5a00]"
                  >
                    <CartIcon />
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>

              <LocalizedClientLink
                href="/account"
                aria-label={dictionary.common.account}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/10 hover:text-[#ff5a00]"
              >
                <AccountIcon />
              </LocalizedClientLink>
            </div>
          </div>

          <div className="pb-4 medium:hidden">
            <form action="./store" className="relative">
              <button
                type="submit"
                aria-label={dictionary.common.search}
                className="absolute start-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#ff5a00]"
              >
                <SearchIcon size={20} />
              </button>

              <input
                type="search"
                name="q"
                placeholder={dictionary.navigation.searchPlaceholder}
                className="h-11 w-full rounded-full border border-white/10 bg-[#111923] ps-11 pe-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[#ff5a00]/60 focus:ring-2 focus:ring-[#ff5a00]/20"
              />
            </form>
          </div>
        </div>
      </header>
    </>
  )
}

const SearchIcon = ({ size = 21 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const CartIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M3 3H5L7.4 14.2C7.6 15.2 8.5 16 9.6 16H17.5C18.5 16 19.4 15.3 19.7 14.3L21 8H6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="10" cy="20" r="1" fill="currentColor" />
    <circle cx="18" cy="20" r="1" fill="currentColor" />
  </svg>
)

const AccountIcon = () => (
  <svg
    width="23"
    height="23"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
  </svg>
)
