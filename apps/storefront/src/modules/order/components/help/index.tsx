import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Help = () => {
  return (
    <div className="rounded-[20px] border border-black/10 p-5 small:p-6">
      <h2 className="text-lg font-bold text-black">
        برای سفارش خود به راهنمایی نیاز دارید؟
      </h2>

      <p className="mt-2 text-sm leading-7 text-black/60">
        برای پیگیری سفارش، شرایط ارسال یا درخواست بازگشت کالا با پشتیبانی
        فروشگاه در ارتباط باشید.
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <LocalizedClientLink
          href="/contact"
          className="inline-flex h-11 items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white transition hover:bg-black/80"
        >
          ارتباط با پشتیبانی
        </LocalizedClientLink>

        <LocalizedClientLink
          href="/account/orders"
          className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 px-6 text-sm font-medium text-black transition hover:bg-black hover:text-white"
        >
          سفارش‌های من
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Help
