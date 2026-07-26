import { Suspense } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

type NavProps = {
  regions: any[]
  locales?: any[]
  currentLocale?: string
}

export default function Nav({
  regions,
  locales = [],
  currentLocale,
}: NavProps) {
  return (
    <>
      {/* Announcement bar */}
      <div className="bg-black text-white">
        <div className="content-container flex min-h-9 items-center justify-center px-4 text-center text-xs">
          <span>
            برای اولین خرید خود از تخفیف ویژه استفاده کنید.
            <LocalizedClientLink
              href="/store"
              className="mr-1 font-semibold underline underline-offset-2"
            >
              مشاهده محصولات
            </LocalizedClientLink>
          </span>
        </div>
      </div>

      {/* Main navbar */}
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white">
        <div className="content-container">
          <div className="flex h-[78px] items-center justify-between gap-4">
            {/* Logo and mobile menu */}
            <div className="flex shrink-0 items-center gap-3">
              <div className="medium:hidden">
                <SideMenu
                  regions={regions}
                  locales={locales}
                  currentLocale={currentLocale}
                />
              </div>

              <LocalizedClientLink
                href="/"
                className="text-2xl font-black tracking-[-0.04em] text-black small:text-3xl"
              >
                JAHAN.EMROOZ
              </LocalizedClientLink>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden items-center gap-6 text-sm font-medium text-black medium:flex">
              <LocalizedClientLink
                href="/store"
                className="transition hover:text-black/60"
              >
                فروشگاه
              </LocalizedClientLink>

              <LocalizedClientLink
                href="/store"
                className="transition hover:text-black/60"
              >
                پیشنهاد ویژه
              </LocalizedClientLink>

              <LocalizedClientLink
                href="/store"
                className="transition hover:text-black/60"
              >
                جدیدترین‌ها
              </LocalizedClientLink>

              <a href="#categories" className="transition hover:text-black/60">
                دسته‌بندی‌ها
              </a>
            </nav>

            {/* Search */}
            <div className="hidden max-w-[460px] flex-1 medium:block">
              <form action="/store" className="relative">
                <button
                  type="submit"
                  aria-label="جستجو"
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-black/45"
                >
                  <svg
                    width="21"
                    height="21"
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
                </button>

                <input
                  type="search"
                  name="q"
                  placeholder="جستجو بین محصولات..."
                  className="h-12 w-full rounded-full border-0 bg-[#f0f0f0] px-12 text-sm text-black outline-none placeholder:text-black/40 focus:ring-2 focus:ring-black/10"
                />
              </form>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-2">
              <LocalizedClientLink
                href="/store"
                aria-label="جستجو"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-black transition hover:bg-black/5 medium:hidden"
              >
                <svg
                  width="23"
                  height="23"
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
              </LocalizedClientLink>

              <Suspense
                fallback={
                  <LocalizedClientLink
                    href="/cart"
                    aria-label="سبد خرید"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-black transition hover:bg-black/5"
                  >
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
                      <path
                        d="M10 21C10.5523 21 11 20.5523 11 20C11 19.4477 10.5523 19 10 19C9.44772 19 9 19.4477 9 20C9 20.5523 9.44772 21 10 21Z"
                        fill="currentColor"
                      />
                      <path
                        d="M18 21C18.5523 21 19 20.5523 19 20C19 19.4477 18.5523 19 18 19C17.4477 19 17 19.4477 17 20C17 20.5523 17.4477 21 18 21Z"
                        fill="currentColor"
                      />
                    </svg>
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>

              <LocalizedClientLink
                href="/account"
                aria-label="حساب کاربری"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-black transition hover:bg-black/5"
              >
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
                  <circle
                    cx="12"
                    cy="7"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                </svg>
              </LocalizedClientLink>
            </div>
          </div>

          {/* Mobile search */}
          <div className="pb-4 medium:hidden">
            <form action="/store" className="relative">
              <button
                type="submit"
                aria-label="جستجو"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-black/45"
              >
                <svg
                  width="20"
                  height="20"
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
              </button>

              <input
                type="search"
                name="q"
                placeholder="جستجو بین محصولات..."
                className="h-11 w-full rounded-full border-0 bg-[#f0f0f0] px-11 text-sm text-black outline-none placeholder:text-black/40"
              />
            </form>
          </div>
        </div>
      </header>
    </>
  )
}
