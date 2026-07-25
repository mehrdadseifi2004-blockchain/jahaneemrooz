import { listCategories } from "@lib/data/categories"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const productCategories = await listCategories()

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-white">
      <div className="content-container py-14 small:py-16">
        <div className="grid gap-10 medium:grid-cols-4">
          {/* Brand */}
          <div className="medium:col-span-1">
            <LocalizedClientLink href="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 font-bold text-white">
                JO
              </div>

              <div>
                <p className="text-lg font-bold">
                  جهان امروز
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  فروشگاه آنلاین محصولات دیجیتال
                </p>
              </div>
            </LocalizedClientLink>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              فروش آنلاین محصولات دیجیتال، لوازم جانبی، تجهیزات گیمینگ،
              گیفت کارت، اکانت و نرم‌افزار با تجربه‌ای سریع و مطمئن.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-5 font-bold text-white">
              دسته‌بندی‌ها
            </h3>

            <ul className="space-y-3 text-sm text-slate-400">
              {productCategories
                ?.filter((category) => !category.parent_category)
                .slice(0, 6)
                .map((category) => (
                  <li key={category.id}>
                    <LocalizedClientLink
                      href={`/categories/${category.handle}`}
                      className="transition hover:text-blue-400"
                    >
                      {category.name}
                    </LocalizedClientLink>
                  </li>
                ))}
            </ul>
          </div>

          {/* Quick access */}
          <div>
            <h3 className="mb-5 font-bold text-white">
              دسترسی سریع
            </h3>

            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <LocalizedClientLink
                  href="/store"
                  className="transition hover:text-blue-400"
                >
                  همه محصولات
                </LocalizedClientLink>
              </li>

              <li>
                <LocalizedClientLink
                  href="/account"
                  className="transition hover:text-blue-400"
                >
                  حساب کاربری
                </LocalizedClientLink>
              </li>

              <li>
                <LocalizedClientLink
                  href="/cart"
                  className="transition hover:text-blue-400"
                >
                  سبد خرید
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-5 font-bold text-white">
              پشتیبانی
            </h3>

            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                پاسخ‌گویی و پشتیبانی خرید
              </li>

              <li>
                تحویل سریع محصولات دیجیتال
              </li>

              <li>
                ارسال کالاهای فیزیکی
              </li>

              <li>
                خرید امن و مطمئن
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-800 pt-6 text-sm text-slate-500 small:flex-row small:items-center small:justify-between">
          <p>
            © {new Date().getFullYear()} جهان امروز. تمامی حقوق محفوظ است.
          </p>

          <div className="flex items-center gap-4">
            <span>FA</span>
            <span>EN</span>
          </div>
        </div>
      </div>
    </footer>
  )
}