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
    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#111923] shadow-[0_22px_70px_rgba(0,0,0,0.28)]">
      <div className="p-5 small:p-7">
        <Addresses cart={cart} customer={customer} />
      </div>

      <div className="border-t border-white/10 p-5 small:p-7">
        <Shipping cart={cart} availableShippingMethods={shippingMethods} />
      </div>

      <div className="border-t border-white/10 p-5 small:p-7">
        <Payment cart={cart} availablePaymentMethods={paymentMethods} />
      </div>

      <div className="border-t border-white/10 p-5 small:p-7">
        <Review cart={cart} />
      </div>
    </div>
  )
}
