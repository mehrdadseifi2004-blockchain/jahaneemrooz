import { listCategories } from "@lib/data/categories"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Newsletter from "@modules/layout/components/newsletter"

const socialLinks = [
  {
    label: "Instagram",
    href: "#",
    text: "IG",
  },
  {
    label: "Telegram",
    href: "#",
    text: "TG",
  },
  {
    label: "LinkedIn",
    href: "#",
    text: "IN",
  },
  {
    label: "X",
    href: "#",
    text: "X",
  },
]

export default async function Footer() {
  const productCategories = await listCategories()

  const rootCategories =
    productCategories
      ?.filter((category) => !category.parent_category)
      .slice(0, 5) ?? []

  return (
    <footer className="mt-10 text-black">
      {/* Newsletter overlap */}
      <div className="relative">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[#f0f0f0]" />
        <Newsletter />
      </div>

      {/* Footer content */}
      <div className="bg-[#f0f0f0] px-4 pb-5 pt-10 small:pt-[50px]">
        <div className="content-container">
          <nav className="grid gap-10 pb-10 medium:grid-cols-12 medium:gap-8">
            {/* Brand */}
            <div className="medium:col-span-4">
              <LocalizedClientLink
                href="/"
                className="inline-block text-[28px] font-black tracking-[-0.04em] text-black small:text-[32px]"
              >
                JAHAN.EMROOZ
              </LocalizedClientLink>

              <p className="mt-5 max-w-[330px] text-sm leading-7 text-black/60">
                فروشگاه آنلاین محصولات دیجیتال، تجهیزات گیمینگ، لوازم جانبی،
                گیفت‌کارت، اکانت و نرم‌افزار با تجربه‌ای سریع و مطمئن.
              </p>

              <div dir="ltr" className="mt-7 flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-black/20 bg-white text-[10px] font-bold text-black transition hover:border-black hover:bg-black hover:text-white"
                  >
                    {social.text}
                  </a>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="medium:col-span-2">
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-black">
                دسته‌بندی‌ها
              </h3>

              <ul className="space-y-4 text-sm text-black/60">
                {rootCategories.map((category) => (
                  <li key={category.id}>
                    <LocalizedClientLink
                      href={`/categories/${category.handle}`}
                      className="transition hover:text-black"
                    >
                      {category.name}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Store links */}
            <div className="medium:col-span-2">
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-black">
                فروشگاه
              </h3>

              <ul className="space-y-4 text-sm text-black/60">
                <li>
                  <LocalizedClientLink
                    href="/store"
                    className="transition hover:text-black"
                  >
                    همه محصولات
                  </LocalizedClientLink>
                </li>

                <li>
                  <LocalizedClientLink
                    href="/store"
                    className="transition hover:text-black"
                  >
                    جدیدترین محصولات
                  </LocalizedClientLink>
                </li>

                <li>
                  <LocalizedClientLink
                    href="/store"
                    className="transition hover:text-black"
                  >
                    محصولات پرفروش
                  </LocalizedClientLink>
                </li>

                <li>
                  <LocalizedClientLink
                    href="/cart"
                    className="transition hover:text-black"
                  >
                    سبد خرید
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>

            {/* Account */}
            <div className="medium:col-span-2">
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-black">
                حساب کاربری
              </h3>

              <ul className="space-y-4 text-sm text-black/60">
                <li>
                  <LocalizedClientLink
                    href="/account"
                    className="transition hover:text-black"
                  >
                    ورود یا ثبت‌نام
                  </LocalizedClientLink>
                </li>

                <li>
                  <LocalizedClientLink
                    href="/account/orders"
                    className="transition hover:text-black"
                  >
                    سفارش‌های من
                  </LocalizedClientLink>
                </li>

                <li>
                  <LocalizedClientLink
                    href="/account/profile"
                    className="transition hover:text-black"
                  >
                    اطلاعات حساب
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="medium:col-span-2">
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-black">
                راهنما
              </h3>

              <ul className="space-y-4 text-sm text-black/60">
                <li>پشتیبانی خرید</li>
                <li>تحویل محصولات دیجیتال</li>
                <li>ارسال کالاهای فیزیکی</li>
                <li>خرید امن و مطمئن</li>
              </ul>
            </div>
          </nav>

          <div className="flex flex-col gap-5 border-t border-black/10 pt-6 text-sm text-black/60 small:flex-row small:items-center small:justify-between">
            <p>
              © {new Date().getFullYear()} جهان امروز. تمامی حقوق محفوظ است.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <span className="flex h-8 items-center justify-center rounded-md border border-[#d6dce5] bg-white px-3 text-xs font-bold text-black">
                پرداخت امن
              </span>

              <span className="flex h-8 items-center justify-center rounded-md border border-[#d6dce5] bg-white px-3 text-xs font-bold text-black">
                SSL
              </span>

              <span className="flex h-8 items-center justify-center rounded-md border border-[#d6dce5] bg-white px-3 text-xs font-bold text-black">
                24/7
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
