import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type OrderSummaryProps = {
  order: HttpTypes.StoreOrder
}

const OrderSummary = ({ order }: OrderSummaryProps) => {
  const getAmount = (amount?: number | null) =>
    convertToLocale({
      amount: amount ?? 0,
      currency_code: order.currency_code,
    })

  return (
    <div>
      <h2 className="text-xl font-bold text-black small:text-2xl">
        خلاصه مبلغ سفارش
      </h2>

      <div className="mt-6 space-y-5">
        <div className="flex items-center justify-between gap-4">
          <span className="text-black/60">جمع محصولات</span>
          <span className="font-bold text-black">
            {getAmount(order.subtotal)}
          </span>
        </div>

        {order.discount_total > 0 && (
          <div className="flex items-center justify-between gap-4">
            <span className="text-black/60">تخفیف</span>
            <span className="font-bold text-[#ff3333]">
              -{getAmount(order.discount_total)}
            </span>
          </div>
        )}

        {order.gift_card_total > 0 && (
          <div className="flex items-center justify-between gap-4">
            <span className="text-black/60">اعتبار گیفت‌کارت</span>
            <span className="font-bold text-[#ff3333]">
              -{getAmount(order.gift_card_total)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between gap-4">
          <span className="text-black/60">هزینه ارسال</span>
          <span className="font-bold text-black">
            {getAmount(order.shipping_total)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-black/60">مالیات</span>
          <span className="font-bold text-black">
            {getAmount(order.tax_total)}
          </span>
        </div>

        <div className="h-px bg-black/10" />

        <div className="flex items-center justify-between gap-4">
          <span className="text-lg text-black">مبلغ نهایی</span>

          <span
            className="text-xl font-black text-black small:text-2xl"
            data-testid="order-total"
          >
            {getAmount(order.total)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
