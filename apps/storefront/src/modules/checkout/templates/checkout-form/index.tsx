import { listCartShippingMethods } from "@lib/data/fulfillment"
import { listCartPaymentMethods } from "@lib/data/payment"
import { HttpTypes } from "@medusajs/types"
import Addresses from "@modules/checkout/components/addresses"
import Payment from "@modules/checkout/components/payment"
import Review from "@modules/checkout/components/review"
import Shipping from "@modules/checkout/components/shipping"

export default async function CheckoutForm({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) {
  if (!cart) {
    return null
  }

  const shippingMethods = await listCartShippingMethods(cart.id)
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "")

  if (!shippingMethods || !paymentMethods) {
    return null
  }

  return (
    <div className="grid w-full grid-cols-1 gap-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm small:p-7">
        <Addresses cart={cart} customer={customer} />
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm small:p-7">
        <Shipping
          cart={cart}
          availableShippingMethods={shippingMethods}
        />
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm small:p-7">
        <Payment
          cart={cart}
          availablePaymentMethods={paymentMethods}
        />
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm small:p-7">
        <Review cart={cart} />
      </div>
    </div>
  )
}