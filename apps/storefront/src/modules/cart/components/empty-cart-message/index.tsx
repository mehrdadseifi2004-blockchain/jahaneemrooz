import LocalizedClientLink from "@modules/common/components/localized-client-link"

const EmptyCartMessage = () => {
  return (
    <section
      className="flex min-h-[520px] flex-col items-center justify-center px-4 text-center"
      data-testid="empty-cart-message"
    >
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#f0f0f0]">
        <svg
          width="46"
          height="46"
          viewBox="0 0 24 24"
          fill="none"
          className="text-black/40"
          aria-hidden="true"
        >
          <path
            d="M3 3H5L7.4 14.2C7.6 15.2 8.5 16 9.6 16H17.5C18.5 16 19.4 15.3 19.7 14.3L21 8H6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="10" cy="20" r="1" fill="currentColor" />
          <circle cx="18" cy="20" r="1" fill="currentColor" />
        </svg>
      </div>

      <h1 className="mt-6 text-3xl font-black text-black small:text-4xl">
        سبد خرید شما خالی است
      </h1>

      <p className="mt-4 max-w-lg text-sm leading-7 text-black/60 small:text-base">
        هنوز محصولی به سبد خرید اضافه نکرده‌اید. محصولات فروشگاه را مشاهده کنید
        و خرید خود را آغاز کنید.
      </p>

      <LocalizedClientLink
        href="/store"
        className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-black px-8 text-sm font-medium text-white transition hover:bg-black/80"
      >
        مشاهده محصولات
      </LocalizedClientLink>
    </section>
  )
}

export default EmptyCartMessage
