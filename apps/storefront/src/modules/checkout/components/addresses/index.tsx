"use client"

import { useI18n } from "@i18n/components/i18n-provider"
import { setAddresses } from "@lib/data/cart"
import useToggleState from "@lib/hooks/use-toggle-state"
import compareAddresses from "@lib/util/compare-addresses"
import { CheckCircleSolid } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import Spinner from "@modules/common/icons/spinner"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useActionState } from "react"

import BillingAddress from "../billing_address"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"
import { SubmitButton } from "../submit-button"

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const { locale, dictionary } = useI18n()
  const numberLocale = locale === "fa" ? "fa-IR" : "en-US"

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart.shipping_address, cart.billing_address)
      : true,
  )

  const handleEdit = () => {
    router.push(`${pathname}?step=address`)
  }

  const [message, formAction] = useActionState(setAddresses, null)

  return (
    <section>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                isOpen
                  ? "bg-[#ff5a00] text-white"
                  : "bg-emerald-500/15 text-emerald-400"
              }`}
            >
              {isOpen ? (1).toLocaleString(numberLocale) : <CheckCircleSolid />}
            </span>

            <h2 className="text-xl font-bold text-white small:text-2xl">
              {dictionary.checkout.address.title}
            </h2>
          </div>

          <p className="ms-12 mt-2 text-sm leading-7 text-slate-500">
            {dictionary.checkout.address.description}
          </p>
        </div>

        {!isOpen && cart?.shipping_address && (
          <button
            type="button"
            onClick={handleEdit}
            className="shrink-0 text-sm font-bold text-[#ff7a1a] transition hover:text-[#ff5a00]"
            data-testid="edit-address-button"
          >
            {dictionary.checkout.address.edit}
          </button>
        )}
      </div>

      {isOpen ? (
        <form action={formAction}>
          <ShippingAddress
            customer={customer}
            checked={sameAsBilling}
            onChange={toggleSameAsBilling}
            cart={cart}
          />

          {!sameAsBilling && (
            <div className="mt-8 border-t border-white/10 pt-8">
              <h3 className="mb-6 text-lg font-bold text-white">
                {dictionary.checkout.address.billingTitle}
              </h3>

              <BillingAddress cart={cart} />
            </div>
          )}

          <div className="mt-8 flex flex-col items-start gap-4 border-t border-white/10 pt-6">
            <SubmitButton
              className="h-12 w-full rounded-full !border-0 !bg-[#ff5a00] px-7 text-base font-bold !text-white transition hover:!bg-[#ff7a1a] small:w-auto"
              data-testid="submit-address-button"
            >
              {dictionary.checkout.address.submit}
            </SubmitButton>

            <ErrorMessage error={message} data-testid="address-error-message" />
          </div>
        </form>
      ) : (
        <div>
          {cart?.shipping_address ? (
            <div className="grid grid-cols-1 gap-4 medium:grid-cols-3">
              <SummaryBox title={dictionary.checkout.address.recipient}>
                <p>
                  {cart.shipping_address.first_name}{" "}
                  {cart.shipping_address.last_name}
                </p>

                <p className="mt-2">{cart.shipping_address.address_1}</p>

                <p>
                  {cart.shipping_address.city}
                  {locale === "fa" ? "، " : ", "}
                  {cart.shipping_address.province}
                </p>

                <p>
                  {dictionary.checkout.address.postalCode}{" "}
                  {cart.shipping_address.postal_code}
                </p>
              </SummaryBox>

              <SummaryBox title={dictionary.checkout.address.contact}>
                <p>
                  {dictionary.checkout.address.mobile}{" "}
                  {cart.shipping_address.phone ||
                    dictionary.checkout.address.notProvided}
                </p>

                <p className="mt-2">
                  {dictionary.checkout.address.email}{" "}
                  {cart.email || dictionary.checkout.address.notProvided}
                </p>
              </SummaryBox>

              <SummaryBox title={dictionary.checkout.address.billingTitle}>
                {sameAsBilling ? (
                  <p>{dictionary.checkout.address.sameBillingSummary}</p>
                ) : (
                  <>
                    <p>
                      {cart.billing_address?.first_name}{" "}
                      {cart.billing_address?.last_name}
                    </p>

                    <p className="mt-2">{cart.billing_address?.address_1}</p>

                    <p>
                      {cart.billing_address?.city}
                      {locale === "fa" ? "، " : ", "}
                      {cart.billing_address?.province}
                    </p>
                  </>
                )}
              </SummaryBox>
            </div>
          ) : (
            <div className="flex min-h-24 items-center justify-center">
              <Spinner />
            </div>
          )}
        </div>
      )}
    </section>
  )
}

const SummaryBox = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0c1219] p-5">
      <p className="mb-3 text-sm font-bold text-white">{title}</p>

      <div className="text-sm leading-7 text-slate-400">{children}</div>
    </div>
  )
}

export default Addresses
