import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type ShippingDetailsProps = {
  order: HttpTypes.StoreOrder
}

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  const address = order.shipping_address
  const shippingMethod = order.shipping_methods?.[0]

  return (
    <div>
      <h2 className="text-xl font-bold text-black small:text-2xl">
        اطلاعات ارسال
      </h2>

      <div className="mt-6 grid gap-4 medium:grid-cols-3">
        <div
          className="rounded-[16px] bg-[#f0f0f0] p-5"
          data-testid="shipping-address-summary"
        >
          <p className="text-sm font-bold text-black">نشانی دریافت سفارش</p>

          <div className="mt-3 text-sm leading-7 text-black/60">
            <p>
              {address?.first_name} {address?.last_name}
            </p>

            <p>
              {address?.address_1}
              {address?.address_2 ? `، ${address.address_2}` : ""}
            </p>

            <p>
              {address?.province ? `${address.province}، ` : ""}
              {address?.city}
            </p>

            <p>کد پستی: {address?.postal_code || "ثبت نشده"}</p>

            <p>کشور: {address?.country_code?.toUpperCase() || "ثبت نشده"}</p>
          </div>
        </div>

        <div
          className="rounded-[16px] bg-[#f0f0f0] p-5"
          data-testid="shipping-contact-summary"
        >
          <p className="text-sm font-bold text-black">اطلاعات تماس</p>

          <div className="mt-3 text-sm leading-7 text-black/60">
            <p>موبایل: {address?.phone || "ثبت نشده"}</p>
            <p className="break-all">ایمیل: {order.email}</p>
          </div>
        </div>

        <div
          className="rounded-[16px] bg-[#f0f0f0] p-5"
          data-testid="shipping-method-summary"
        >
          <p className="text-sm font-bold text-black">روش دریافت</p>

          <div className="mt-3 text-sm leading-7 text-black/60">
            <p>{shippingMethod?.name || "ثبت نشده"}</p>

            <p>
              هزینه:{" "}
              {convertToLocale({
                amount: shippingMethod?.total ?? 0,
                currency_code: order.currency_code,
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShippingDetails
