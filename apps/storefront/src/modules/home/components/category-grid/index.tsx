import { Dictionary } from "@i18n/get-dictionary"
import { listCategories } from "@lib/data/categories"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const categoryCards = [
  {
    className:
      "medium:col-span-2 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.95),transparent_30%),linear-gradient(135deg,#e8e8e8,#f7f7f7)]",
    decoration: "🎧",
  },
  {
    className:
      "medium:col-span-3 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.95),transparent_30%),linear-gradient(135deg,#ececec,#fafafa)]",
    decoration: "🎮",
  },
  {
    className:
      "medium:col-span-3 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.95),transparent_30%),linear-gradient(135deg,#ededed,#fafafa)]",
    decoration: "💳",
  },
  {
    className:
      "medium:col-span-2 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.95),transparent_30%),linear-gradient(135deg,#e7e7e7,#f7f7f7)]",
    decoration: "💾",
  },
]

type CategoryGridProps = {
  dictionary: Dictionary
}

export default async function CategoryGrid({ dictionary }: CategoryGridProps) {
  const categories = await listCategories()

  if (!categories?.length) {
    return null
  }

  const visibleCategories = categories.slice(0, 4)

  return (
    <section
      id="categories"
      className="bg-white px-4 py-[50px] small:py-20 xl:px-0"
    >
      <div className="content-container rounded-[40px] bg-[#f0f0f0] px-6 pb-6 pt-10 text-center small:p-10 medium:p-[70px]">
        <h2 className="mb-8 text-[32px] font-black leading-[1.1] tracking-[-0.03em] text-black small:mb-14 small:text-5xl">
          {dictionary.home.categories.title}
        </h2>

        <div className="grid grid-cols-1 gap-4 medium:grid-cols-5 medium:gap-5">
          {visibleCategories.map((category, index) => {
            const card = categoryCards[index]

            return (
              <LocalizedClientLink
                key={category.id}
                href={`/categories/${category.handle}`}
                className={`group relative min-h-[190px] overflow-hidden rounded-[20px] bg-cover bg-center bg-no-repeat text-start medium:min-h-[289px] ${card.className}`}
              >
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/20 rtl:bg-gradient-to-r" />

                <div className="absolute bottom-4 end-5 text-[82px] opacity-90 transition duration-500 group-hover:scale-110 small:text-[110px] medium:bottom-6 medium:end-8 medium:text-[140px]">
                  {card.decoration}
                </div>

                <div className="relative z-10 flex h-full flex-col justify-between p-5 medium:p-8">
                  <div>
                    <h3 className="text-2xl font-bold text-black medium:text-4xl">
                      {category.name}
                    </h3>

                    {category.description && (
                      <p className="mt-3 max-w-sm text-sm leading-7 text-black/55">
                        {category.description}
                      </p>
                    )}
                  </div>

                  <span className="self-start rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white opacity-0 transition duration-300 group-hover:opacity-100">
                    {dictionary.home.categories.viewProducts}
                  </span>
                </div>
              </LocalizedClientLink>
            )
          })}
        </div>
      </div>
    </section>
  )
}
