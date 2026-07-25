import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className="relative min-h-screen w-full bg-slate-50"
      dir="rtl"
    >
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <nav className="content-container flex h-20 items-center justify-between gap-4">
          <LocalizedClientLink
            href="/"
            className="flex items-center gap-3"
            data-testid="store-link"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 font-bold text-white shadow-sm">
              JO
            </div>

            <div>
              <p className="font-bold text-slate-950">
                جهان امروز
              </p>

              <p className="mt-1 text-xs text-slate-500">
                پرداخت امن و تکمیل سفارش
              </p>
            </div>
          </LocalizedClientLink>

          <div className="hidden items-center gap-2 text-sm text-slate-500 small:flex">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50">
              🔒
            </span>

            <span>
              فرایند پرداخت امن
            </span>
          </div>

          <LocalizedClientLink
            href="/cart"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            data-testid="back-to-cart-link"
          >
            <span>بازگشت به سبد خرید</span>
            <span>←</span>
          </LocalizedClientLink>
        </nav>
      </header>

      <div
        className="relative"
        data-testid="checkout-container"
      >
        {children}
      </div>

      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="content-container flex flex-col gap-3 text-sm text-slate-500 small:flex-row small:items-center small:justify-between">
          <p>
            © {new Date().getFullYear()} جهان امروز. تمامی حقوق محفوظ است.
          </p>

          <div className="flex items-center gap-5">
            <span>پرداخت امن</span>
            <span>پشتیبانی خرید</span>
          </div>
        </div>
      </footer>
    </div>
  )
}