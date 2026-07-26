import Image from "next/image"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <section dir="rtl" className="overflow-hidden bg-[#f2f0f1] text-[#0b0b0b]">
      <div className="content-container">
        <div className="grid grid-cols-1 items-stretch medium:grid-cols-2">
          {/* Text content */}
          <div className="relative z-10 flex flex-col justify-center px-0 py-12 medium:min-h-[620px] medium:py-20">
            <h1 className="max-w-[620px] text-[42px] font-black leading-[1.08] tracking-[-0.03em] text-black small:text-[54px] medium:text-[64px]">
              محصولاتی را پیدا کن
              <span className="block">که با دنیای دیجیتال</span>
              <span className="block">تو هماهنگ هستند</span>
            </h1>

            <p className="mt-6 max-w-[545px] text-sm leading-7 text-black/60 small:text-base">
              مجموعه‌ای متنوع از محصولات دیجیتال، تجهیزات گیمینگ، لوازم جانبی،
              حافظه‌های ذخیره‌سازی و خدمات نرم‌افزاری را بررسی کن.
            </p>

            <div className="mt-7">
              <LocalizedClientLink
                href="/store"
                className="inline-flex h-14 w-full items-center justify-center rounded-full bg-black px-14 text-sm font-medium text-white transition hover:bg-black/80 small:w-auto"
              >
                مشاهده محصولات
              </LocalizedClientLink>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-y-6 small:flex-nowrap medium:mt-12">
              <div className="min-w-[145px] pl-6">
                <p className="text-3xl font-bold leading-none medium:text-[40px]">
                  +۱۰۰
                </p>

                <p className="mt-2 whitespace-nowrap text-xs text-black/60 medium:text-sm">
                  محصول متنوع
                </p>
              </div>

              <div className="h-14 w-px bg-black/10" />

              <div className="min-w-[160px] px-6">
                <p className="text-3xl font-bold leading-none medium:text-[40px]">
                  +۵۰
                </p>

                <p className="mt-2 whitespace-nowrap text-xs text-black/60 medium:text-sm">
                  محصول باکیفیت
                </p>
              </div>

              <div className="hidden h-14 w-px bg-black/10 small:block" />

              <div className="w-full pt-2 small:w-auto small:px-6 small:pt-0">
                <p className="text-3xl font-bold leading-none medium:text-[40px]">
                  +۱۰۰۰
                </p>

                <p className="mt-2 whitespace-nowrap text-xs text-black/60 medium:text-sm">
                  مشتری راضی
                </p>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative min-h-[450px] medium:min-h-[620px]">
            <div className="absolute inset-0 hidden bg-[url('/images/header-homepage.png')] bg-cover bg-top bg-no-repeat medium:block" />

            <div className="absolute inset-0 bg-[url('/images/header-res-homepage.png')] bg-cover bg-top bg-no-repeat medium:hidden" />

            <Image
              priority
              src="/icons/big-star.svg"
              alt=""
              width={104}
              height={104}
              aria-hidden="true"
              className="absolute left-5 top-14 h-[76px] w-[76px] medium:left-0 medium:top-24 medium:h-[104px] medium:w-[104px]"
            />

            <Image
              priority
              src="/icons/small-star.svg"
              alt=""
              width={56}
              height={56}
              aria-hidden="true"
              className="absolute right-5 top-40 h-11 w-11 medium:right-0 medium:top-56 medium:h-14 medium:w-14"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
