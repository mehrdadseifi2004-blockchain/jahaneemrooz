import { HttpTypes } from "@medusajs/types"

import { AppLocale } from "@i18n/config"
import { Dictionary } from "@i18n/get-dictionary"
import EmptyCartMessage from "@modules/cart/components/empty-cart-message"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import ItemsTemplate from "./items"
import Summary from "./summary"

type CartTemplateProps = {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
  dictionary: Dictionary
  locale: AppLocale
}

const CartTemplate = ({
  cart,
  customer,
  dictionary,
  locale,
}: CartTemplateProps) => {
  const itemCount =
    cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0

  const numberLocale = locale === "fa" ? "fa-IR" : "en-US"

  const itemCountText = dictionary.cart.itemCount.replace(
    "{count}",
    itemCount.toLocaleString(numberLocale),
  )

  return (
    <main className="min-h-screen bg-[#070b10] pb-20 text-white">
      <div className="content-container" data-testid="cart-container">
        <div className="border-t border-white/10 pt-5 small:pt-6">
          <nav
            aria-label={dictionary.cart.breadcrumb.ariaLabel}
            className="mb-5 flex items-center gap-2 text-sm text-slate-500 small:mb-6"
          >
            <LocalizedClientLink
              href="/"
              className="transition hover:text-[#ff7a1a]"
            >
              {dictionary.cart.breadcrumb.home}
            </LocalizedClientLink>

            <span aria-hidden="true">
              <span className="rtl:hidden">→</span>
              <span className="hidden rtl:inline">←</span>
            </span>

            <span className="text-white">
              {dictionary.cart.breadcrumb.cart}
            </span>
          </nav>

          {cart?.items?.length ? (
            <>
              <h1 className="mb-5 text-[32px] font-black leading-tight tracking-[-0.03em] text-white small:mb-6 small:text-[40px]">
                {dictionary.cart.title}
              </h1>

              {!customer && (
                <div className="mb-5 flex flex-col gap-4 rounded-[24px] border border-white/10 bg-[#111923] p-5 small:flex-row small:items-center small:justify-between">
                  <div>
                    <p className="font-bold text-white">
                      {dictionary.cart.account.title}
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {dictionary.cart.account.description}
                    </p>
                  </div>

                  <LocalizedClientLink
                    href="/account"
                    className="inline-flex h-11 shrink-0 items-center justify-center rounded-full border border-[#ff5a00]/50 bg-[#ff5a00]/10 px-6 text-sm font-bold text-[#ff7a1a] transition hover:bg-[#ff5a00] hover:text-white"
                  >
                    {dictionary.cart.account.login}
                  </LocalizedClientLink>
                </div>
              )}

              <div className="grid items-start gap-5 large:grid-cols-[minmax(0,1fr)_minmax(360px,505px)]">
                <section className="min-w-0">
                  <ItemsTemplate cart={cart} />
                </section>

                <aside className="large:sticky large:top-28">
                  {cart.region && <Summary cart={cart} />}
                </aside>
              </div>

              <p className="mt-5 text-sm text-slate-500">{itemCountText}</p>
            </>
          ) : (
            <EmptyCartMessage />
          )}
        </div>
      </div>
    </main>
  )
}

export default CartTemplate
