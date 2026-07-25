import { listCategories } from "@lib/data/categories"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const categoryStyles = [
  {
    gradient: "from-blue-600 to-cyan-500",
    icon: "🎧",
  },
  {
    gradient: "from-violet-600 to-fuchsia-500",
    icon: "💾",
  },
  {
    gradient: "from-emerald-600 to-teal-500",
    icon: "🎮",
  },
  {
    gradient: "from-orange-500 to-amber-400",
    icon: "🕹️",
  },
  {
    gradient: "from-rose-600 to-pink-500",
    icon: "👾",
  },
  {
    gradient: "from-slate-700 to-slate-950",
    icon: "🔑",
  },
  {
    gradient: "from-sky-600 to-blue-500",
    icon: "💳",
  },
  {
    gradient: "from-indigo-600 to-violet-500",
    icon: "💻",
  },
  {
    gradient: "from-red-600 to-orange-500",
    icon: "🔌",
  },
]

export default async function CategoryGrid() {
  const categories = await listCategories()

  if (!categories?.length) {
    return null
  }

  return (
    <section
      id="categories"
      className="bg-slate-50 py-16 small:py-24"
    >
      <div className="content-container">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold text-blue-600">
            دسته‌بندی محصولات
          </p>

          <h2 className="text-3xl font-bold text-slate-950 small:text-4xl">
            هر چیزی برای دنیای دیجیتال
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 small:text-base">
            از لوازم جانبی و تجهیزات گیمینگ تا گیفت کارت، اکانت، نرم‌افزار و
            محصولات ذخیره‌سازی؛ همه‌چیز را از یکجا پیدا کن.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 xsmall:grid-cols-2 medium:grid-cols-3">
          {categories.slice(0, 9).map((category, index) => {
            const style =
              categoryStyles[index % categoryStyles.length]

            return (
              <LocalizedClientLink
                key={category.id}
                href={`/categories/${category.handle}`}
                className="group relative min-h-52 overflow-hidden rounded-3xl shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${style.gradient}`}
                />

                <div className="absolute inset-0 bg-black/10 transition duration-300 group-hover:bg-black/20" />

                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

                <div className="relative z-10 flex h-full min-h-52 flex-col justify-between p-6 text-white">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-2xl backdrop-blur">
                      {style.icon}
                    </div>

                    <span className="text-xs font-semibold text-white/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="mt-10">
                    <h3 className="text-xl font-bold small:text-2xl">
                      {category.name}
                    </h3>

                    {category.description && (
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/75">
                        {category.description}
                      </p>
                    )}

                    <div className="mt-5 flex items-center gap-2 text-sm font-semibold">
                      <span>مشاهده محصولات</span>
                      <span className="transition-transform duration-300 group-hover:-translate-x-1">
                        ←
                      </span>
                    </div>
                  </div>
                </div>
              </LocalizedClientLink>
            )
          })}
        </div>
      </div>
    </section>
  )
}