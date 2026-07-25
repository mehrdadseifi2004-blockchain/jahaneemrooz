"use client"

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
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"

  const { state: sameAsBilling, toggle: toggleSameAsBilling } =
    useToggleState(
      cart?.shipping_address && cart?.billing_address
        ? compareAddresses(
            cart.shipping_address,
            cart.billing_address
          )
        : true
    )

  const handleEdit = () => {
    router.push(`${pathname}?step=address`)
  }

  const [message, formAction] = useActionState(setAddresses, null)

  return (
    <section dir="rtl">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                isOpen
                  ? "bg-blue-600 text-white"
                  : "bg-emerald-50 text-emerald-600"
              }`}
            >
              {isOpen ? "۱" : <CheckCircleSolid />}
            </span>

            <h2 className="text-xl font-bold text-slate-950 small:text-2xl">
              اطلاعات گیرنده و آدرس
            </h2>
          </div>

          <p className="mr-12 mt-2 text-sm leading-7 text-slate-500">
            اطلاعات تماس و نشانی دریافت سفارش را وارد کنید.
          </p>
        </div>

        {!isOpen && cart?.shipping_address && (
          <button
            type="button"
            onClick={handleEdit}
            className="shrink-0 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
            data-testid="edit-address-button"
          >
            ویرایش اطلاعات
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
            <div className="mt-8 border-t border-slate-100 pt-8">
              <h3 className="mb-6 text-lg font-bold text-slate-900">
                آدرس صورتحساب
              </h3>

              <BillingAddress cart={cart} />
            </div>
          )}

          <div className="mt-8 flex flex-col items-start gap-4 border-t border-slate-100 pt-6">
            <SubmitButton
              className="h-12 w-full rounded-xl bg-blue-600 px-7 text-base font-bold text-white transition hover:bg-blue-500 small:w-auto"
              data-testid="submit-address-button"
            >
              ثبت اطلاعات و ادامه
            </SubmitButton>

            <ErrorMessage
              error={message}
              data-testid="address-error-message"
            />
          </div>
        </form>
      ) : (
        <div>
          {cart?.shipping_address ? (
            <div className="grid grid-cols-1 gap-4 medium:grid-cols-3">
              <SummaryBox title="گیرنده">
                <p>
                  {cart.shipping_address.first_name}{" "}
                  {cart.shipping_address.last_name}
                </p>

                <p className="mt-2">
                  {cart.shipping_address.address_1}
                </p>

                <p>
                  {cart.shipping_address.city}،{" "}
                  {cart.shipping_address.province}
                </p>

                <p>
                  کد پستی: {cart.shipping_address.postal_code}
                </p>
              </SummaryBox>

              <SummaryBox title="اطلاعات تماس">
                <p>
                  موبایل: {cart.shipping_address.phone || "ثبت نشده"}
                </p>

                <p className="mt-2">
                  ایمیل: {cart.email || "ثبت نشده"}
                </p>
              </SummaryBox>

              <SummaryBox title="آدرس صورتحساب">
                {sameAsBilling ? (
                  <p>
                    آدرس صورتحساب با آدرس دریافت سفارش یکسان است.
                  </p>
                ) : (
                  <>
                    <p>
                      {cart.billing_address?.first_name}{" "}
                      {cart.billing_address?.last_name}
                    </p>

                    <p className="mt-2">
                      {cart.billing_address?.address_1}
                    </p>

                    <p>
                      {cart.billing_address?.city}،{" "}
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
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <p className="mb-3 text-sm font-bold text-slate-800">
        {title}
      </p>

      <div className="text-sm leading-7 text-slate-500">
        {children}
      </div>
    </div>
  )
}

export default Addresses