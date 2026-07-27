import { HttpTypes } from "@medusajs/types"
import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const formatPrice = (
  amount: number | null | undefined,
  currencyCode: string,
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
    <div className="rounded-[20px] border border-black/10 bg-white p-5 small:p-6">
      <div className="flex items-start justify-between gap-4 border-b border-black/10 pb-5">
        <div>
          <h2 className="text-xl font-bold text-black small:text-2xl">
            خلاصه سفارش
          </h2>

          <p className="mt-2 text-sm text-black/50">
            {itemCount.toLocaleString("fa-IR")} کالا در سفارش شما
          </p>
        </div>

        <LocalizedClientLink
          href="/cart"
          className="text-sm font-medium text-black/60 underline underline-offset-4 transition hover:text-black"
        >
          ویرایش
        </LocalizedClientLink>
      </div>

      <div className="max-h-[330px] overflow-y-auto border-b border-black/10 py-3">
        <ItemsPreviewTemplate cart={cart} />
      </div>

      <div className="space-y-5 py-6">
        <div className="flex items-center justify-between gap-4">
          <span className="text-black/60">جمع محصولات</span>

          <span className="font-bold text-black">
            {formatPrice(cart.subtotal, currencyCode)}
          </span>
        </div>

        {(cart.discount_total || 0) > 0 && (
          <div className="flex items-center justify-between gap-4">
            <span className="text-black/60">تخفیف</span>

            <span className="font-bold text-[#ff3333]">
              -{formatPrice(cart.discount_total, currencyCode)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between gap-4">
          <span className="text-black/60">هزینه ارسال</span>

          <span className="text-left font-bold text-black">
            {cart.shipping_total
              ? formatPrice(cart.shipping_total, currencyCode)
              : "هنوز انتخاب نشده"}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-black/60">مالیات</span>

          <span className="font-bold text-black">
            {formatPrice(cart.tax_total, currencyCode)}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-black/10 pt-6">
        <span className="text-lg text-black">مبلغ نهایی</span>

        <span
          className="text-xl font-bold text-black small:text-2xl"
          data-testid="checkout-summary-total"
        >
          {formatPrice(cart.total, currencyCode)}
        </span>
      </div>

      <div className="mt-6 rounded-[16px] bg-[#f0f0f0] p-4">
        <div className="flex items-start gap-3">
          <span aria-hidden="true">🔒</span>

          <p className="text-xs leading-6 text-black/50">
            اطلاعات سفارش و پرداخت شما به‌صورت امن پردازش می‌شود.
          </p>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
