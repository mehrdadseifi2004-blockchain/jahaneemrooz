"use client"

import { HttpTypes } from "@medusajs/types"
import { clx } from "@modules/common/components/ui"
import { useSearchParams } from "next/navigation"

import PaymentButton from "../payment-button"

const Review = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  const searchParams = useSearchParams()
  const isOpen = searchParams.get("step") === "review"

  const paidByGiftcard = Boolean(
    (cart as unknown as { gift_cards?: unknown[] }).gift_cards?.length &&
    cart.total === 0,
  )

  const previousStepsCompleted =
    Boolean(cart.shipping_address) &&
    Boolean(cart.shipping_methods?.length) &&
    Boolean(cart.payment_collection || paidByGiftcard)

  return (
    <section dir="rtl">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <span
            className={clx(
              "flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold",
              isOpen ? "bg-black text-white" : "bg-[#f0f0f0] text-black/35",
            )}
          >
            ۴
          </span>

          <h2
            className={clx(
              "text-xl font-bold small:text-2xl",
              isOpen ? "text-black" : "text-black/40",
            )}
          >
            مرور و ثبت سفارش
          </h2>
        </div>

        <p className="mr-12 mt-2 text-sm leading-7 text-black/50">
          پیش از ثبت نهایی، اطلاعات سفارش را بررسی کنید.
        </p>
      </div>

      {isOpen && previousStepsCompleted && (
        <div>
          <div className="rounded-2xl border border-black/10 bg-[#f0f0f0] p-5">
            <p className="font-bold text-black">
              سفارش شما آماده ثبت نهایی است
            </p>

            <p className="mt-2 text-sm leading-7 text-black/60">
              با انتخاب دکمه ثبت سفارش، تأیید می‌کنید که اطلاعات واردشده صحیح
              است و قوانین خرید، ارسال، بازگشت کالا و حریم خصوصی فروشگاه «جهان
              امروز» را پذیرفته‌اید.
            </p>
          </div>

          <div className="mt-6">
            <PaymentButton cart={cart} data-testid="submit-order-button" />
          </div>
        </div>
      )}

      {isOpen && !previousStepsCompleted && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <p className="font-bold text-amber-700">
            مراحل قبلی هنوز کامل نشده‌اند.
          </p>

          <p className="mt-2 text-sm text-amber-600">
            ابتدا آدرس، روش ارسال و روش پرداخت را تکمیل کنید.
          </p>
        </div>
      )}
    </section>
  )
}

export default Review
