import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Heading, Text } from "@modules/common/components/ui"

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.28),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(124,58,237,0.22),transparent_30%)]" />

      <div className="content-container relative z-10 py-20 small:py-28">
        <div className="grid items-center gap-12 small:grid-cols-2">
          <div className="max-w-2xl">
            <span className="mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-slate-200 backdrop-blur">
              فروشگاه آنلاین محصولات دیجیتال
            </span>

            <Heading
              level="h1"
              className="text-4xl font-bold leading-tight text-white small:text-6xl small:leading-[1.15]"
            >
              دنیای دیجیتال را
              <span className="block bg-gradient-to-l from-blue-400 to-violet-400 bg-clip-text text-transparent">
                با جهان امروز تجربه کن
              </span>
            </Heading>

            <Text className="mt-6 max-w-xl text-base leading-8 text-slate-300 small:text-lg">
              خرید محصولات دیجیتال، لوازم جانبی، تجهیزات گیمینگ، گیفت کارت،
              اکانت و نرم‌افزار با تجربه‌ای سریع، مطمئن و حرفه‌ای.
            </Text>

            <div className="mt-8 flex flex-col gap-3 xsmall:flex-row">
              <LocalizedClientLink
                href="/store"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-blue-600 px-7 font-semibold text-white transition hover:bg-blue-500"
              >
                مشاهده محصولات
              </LocalizedClientLink>

              <a
                href="#categories"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-7 font-semibold text-white transition hover:bg-white/10"
              >
                مشاهده دسته‌بندی‌ها
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
              <div>
                <p className="text-xl font-bold small:text-2xl">ارسال سریع</p>
                <p className="mt-1 text-xs text-slate-400 small:text-sm">
                  برای کالاهای فیزیکی
                </p>
              </div>

              <div>
                <p className="text-xl font-bold small:text-2xl">تحویل فوری</p>
                <p className="mt-1 text-xs text-slate-400 small:text-sm">
                  برای محصولات دیجیتال
                </p>
              </div>

              <div>
                <p className="text-xl font-bold small:text-2xl">خرید امن</p>
                <p className="mt-1 text-xs text-slate-400 small:text-sm">
                  تجربه‌ای مطمئن
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-blue-600/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl small:p-8">
              <div className="mb-8">
                <p className="text-sm font-medium text-blue-300">
                  انتخاب‌های محبوب
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  هر چیزی که برای دنیای دیجیتال نیاز داری
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-300">
                  از تجهیزات ذخیره‌سازی و لوازم جانبی تا محصولات گیمینگ،
                  گیفت کارت و نرم‌افزار.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <LocalizedClientLink
                  href="/store"
                  className="group rounded-2xl border border-white/10 bg-slate-900/70 p-5 transition hover:border-blue-400/50 hover:bg-slate-900"
                >
                  <div className="mb-4 text-3xl">🎧</div>
                  <p className="font-semibold">هدفون و هندزفری</p>
                  <p className="mt-1 text-xs text-slate-400">
                    صدا با کیفیت حرفه‌ای
                  </p>
                </LocalizedClientLink>

                <LocalizedClientLink
                  href="/store"
                  className="group rounded-2xl border border-white/10 bg-slate-900/70 p-5 transition hover:border-blue-400/50 hover:bg-slate-900"
                >
                  <div className="mb-4 text-3xl">🎮</div>
                  <p className="font-semibold">گیمینگ</p>
                  <p className="mt-1 text-xs text-slate-400">
                    تجهیزات و لوازم بازی
                  </p>
                </LocalizedClientLink>

                <LocalizedClientLink
                  href="/store"
                  className="group rounded-2xl border border-white/10 bg-slate-900/70 p-5 transition hover:border-blue-400/50 hover:bg-slate-900"
                >
                  <div className="mb-4 text-3xl">💾</div>
                  <p className="font-semibold">ذخیره‌سازی</p>
                  <p className="mt-1 text-xs text-slate-400">
                    فلش و هارد اکسترنال
                  </p>
                </LocalizedClientLink>

                <LocalizedClientLink
                  href="/store"
                  className="group rounded-2xl border border-white/10 bg-slate-900/70 p-5 transition hover:border-blue-400/50 hover:bg-slate-900"
                >
                  <div className="mb-4 text-3xl">💳</div>
                  <p className="font-semibold">محصولات دیجیتال</p>
                  <p className="mt-1 text-xs text-slate-400">
                    گیفت کارت و اکانت
                  </p>
                </LocalizedClientLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero