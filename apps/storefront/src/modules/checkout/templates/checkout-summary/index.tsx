import { HttpTypes } from "@medusajs/types"
import ItemsPreviewTemplate from "@modules/cart/templates/preview"

const formatPrice = (
  amount: number | null | undefined,
  currencyCode: string
) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode.toUpperCase(),
    maximumFractionDigits: 0,
  }).format(amount || 0)
}

const CheckoutSummary = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  const currencyCode = cart.currency_code || "IRR"
  const itemCount =
    cart.items?.reduce((total, item) => total + item.quantity, 0) || 0

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="border-b border-slate-100 pb-5">
        <h2 className="text-xl font-bold text-slate-950">
          خلاصه سفارش
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          {itemCount.toLocaleString("fa-IR")} کالا در سفارش شما
        </p>
      </div>

      <div className="max-h-[320px] overflow-y-auto border-b border-slate-100 py-5">
        <ItemsPreviewTemplate cart={cart} />
      </div>

      <div className="space-y-4 py-6 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-slate-500">
            جمع قیمت کالاها
          </span>

          <span className="font-semibold text-slate-800">
            {formatPrice(cart.subtotal, currencyCode)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-500">
            هزینه ارسال
          </span>

          <span className="font-semibold text-slate-800">
            {cart.shipping_total
              ? formatPrice(cart.shipping_total, currencyCode)
              : "هنوز انتخاب نشده"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-500">
            مالیات
          </span>

          <span className="font-semibold text-slate-800">
            {formatPrice(cart.tax_total, currencyCode)}
          </span>
        </div>

        {(cart.discount_total || 0) > 0 && (
          <div className="flex items-center justify-between text-emerald-600">
            <span>تخفیف</span>

            <span className="font-semibold">
              -{formatPrice(cart.discount_total, currencyCode)}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-end justify-between border-t border-slate-100 pt-6">
        <div>
          <p className="font-medium text-slate-600">
            مبلغ قابل پرداخت
          </p>

          <p className="mt-1 text-xs text-slate-400">
            مبلغ نهایی سفارش
          </p>
        </div>

        <span className="text-xl font-bold text-slate-950">
          {formatPrice(cart.total, currencyCode)}
        </span>
      </div>

      <div className="mt-6 rounded-2xl bg-slate-50 p-4">
        <div className="flex items-start gap-3">
          <span>🔒</span>

          <p className="text-xs leading-6 text-slate-500">
            اطلاعات سفارش و پرداخت شما با امنیت کامل پردازش می‌شود.
          </p>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary