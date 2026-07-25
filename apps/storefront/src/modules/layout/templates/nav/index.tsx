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
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="content-container">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Right side */}
          <div className="flex items-center gap-4">
            <SideMenu
              regions={regions}
              locales={locales}
              currentLocale={currentLocale}
            />

            <LocalizedClientLink href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 font-bold text-white shadow-sm">
                JO
              </div>

              <div className="hidden xsmall:block">
                <p className="font-bold leading-5 text-slate-950">
                  جهان امروز
                </p>
                <p className="text-xs text-slate-500">
                  فروشگاه آنلاین محصولات دیجیتال
                </p>
              </div>
            </LocalizedClientLink>
          </div>

          {/* Search */}
          <div className="hidden max-w-xl flex-1 medium:block">
            <form action="/store" className="relative">
              <input
                type="search"
                name="q"
                placeholder="جستجوی محصول، برند یا دسته‌بندی..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-5 pr-11 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />

              <button
                type="submit"
                aria-label="Search"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-blue-600"
              >
                ⌕
              </button>
            </form>
          </div>

          {/* Left side */}
          <div className="flex items-center gap-2 small:gap-4">
            <button
              type="button"
              className="inline-flex h-9 items-center rounded-lg border border-slate-200 bg-slate-50 p-1 text-xs font-semibold"
              aria-label="Change language"
            >
              <span className="rounded-md bg-white px-2.5 py-1.5 text-blue-600 shadow-sm">
                FA
              </span>

              <span className="px-2.5 py-1.5 text-slate-500">
                EN
              </span>
            </button>

            <LocalizedClientLink
              href="/account"
              className="hidden text-sm font-medium text-slate-700 transition hover:text-blue-600 small:block"
            >
              حساب کاربری
            </LocalizedClientLink>

            <Suspense
              fallback={
                <LocalizedClientLink
                  href="/cart"
                  className="text-sm font-medium text-slate-700"
                >
                  سبد خرید (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </div>

        {/* Mobile search */}
        <div className="pb-4 medium:hidden">
          <form action="/store">
            <input
              type="search"
              name="q"
              placeholder="جستجوی محصول..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-blue-500"
            />
          </form>
        </div>
      </div>
    </header>
  )
}