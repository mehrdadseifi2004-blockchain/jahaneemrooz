import { Dictionary } from "@i18n/get-dictionary"
import { listCategories } from "@lib/data/categories"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const categoryLayouts = [
  {
    className: "medium:col-span-2",
    glowPosition: "start-0 top-0",
  },
  {
    className: "medium:col-span-3",
    glowPosition: "end-0 top-0",
  },
  {
    className: "medium:col-span-3",
    glowPosition: "start-0 bottom-0",
  },
  {
    className: "medium:col-span-2",
    glowPosition: "end-0 bottom-0",
  },
]

const getCategoryDecoration = (name: string, handle?: string) => {
  const value = `${name} ${handle ?? ""}`.toLowerCase()

  if (
    value.includes("فلش") ||
    value.includes("ذخیره") ||
    value.includes("storage") ||
    value.includes("flash") ||
    value.includes("hard")
  ) {
    return "💾"
  }

  if (
    value.includes("بازی") ||
    value.includes("گیم") ||
    value.includes("game") ||
    value.includes("gaming")
  ) {
    return "🎮"
  }

  if (
    value.includes("گیفت") ||
    value.includes("کارت") ||
    value.includes("gift") ||
    value.includes("card")
  ) {
    return "💳"
  }

  if (
    value.includes("هدفون") ||
    value.includes("هندزفری") ||
    value.includes("headphone") ||
    value.includes("headset") ||
    value.includes("earphone")
  ) {
    return "🎧"
  }

  if (value.includes("لوازم جانبی") || value.includes("accessor")) {
    return "🖱️"
  }

  return "💻"
}

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
      className="border-t border-[var(--theme-border)] bg-[var(--theme-background)] px-4 py-[50px] transition-colors duration-300 small:py-20 xl:px-0"
    >
      <div className="content-container">
        <div className="overflow-hidden rounded-[34px] border border-[var(--theme-border)] bg-[var(--theme-surface-muted)] px-5 pb-5 pt-10 text-center shadow-[0_25px_80px_var(--theme-shadow)] small:p-10 medium:p-14">
          <div className="mx-auto mb-8 max-w-2xl small:mb-14">
            <span className="mb-4 inline-flex rounded-full border border-[#ff5a00]/30 bg-[#ff5a00]/10 px-4 py-2 text-xs font-bold text-[#ff7a1a]">
              JAHAN.EMROOZ
            </span>

            <h2 className="text-[32px] font-black leading-[1.1] tracking-[-0.03em] text-[var(--theme-text)] small:text-5xl">
              {dictionary.home.categories.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 medium:grid-cols-5 medium:gap-5">
            {visibleCategories.map((category, index) => {
              const card = categoryLayouts[index]
              const decoration = getCategoryDecoration(
                category.name,
                category.handle,
              )
              return (
                <LocalizedClientLink
                  key={category.id}
                  href={`/categories/${category.handle}`}
                  className={`group relative min-h-[210px] overflow-hidden rounded-[24px] border border-[var(--theme-border)] bg-[var(--theme-surface)] text-start shadow-[0_18px_45px_var(--theme-shadow)] transition duration-300 hover:-translate-y-1 hover:border-[#ff5a00]/60 hover:shadow-[0_25px_65px_rgba(255,90,0,0.12)] medium:min-h-[300px] ${card.className}`}
                >
                  <div
                    aria-hidden="true"
                    className={`absolute ${card.glowPosition} h-48 w-48 rounded-full bg-[#ff5a00]/15 blur-[75px] transition duration-500 group-hover:bg-[#ff5a00]/25`}
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:32px_32px]"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute bottom-3 end-4 text-[88px] opacity-70 grayscale-[20%] drop-shadow-[0_15px_28px_rgba(0,0,0,0.45)] transition duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:opacity-100 small:text-[115px] medium:bottom-5 medium:end-7 medium:text-[145px]"
                  >
                    {decoration}
                  </div>

                  <div className="relative z-10 flex h-full flex-col justify-between p-6 medium:p-8">
                    <div className="max-w-[75%]">
                      <h3 className="text-2xl font-black leading-tight text-[var(--theme-text)] transition group-hover:text-[#ff7a1a] medium:text-4xl">
                        {category.name}
                      </h3>

                      {category.description && (
                        <p className="mt-3 line-clamp-3 max-w-sm text-sm leading-7 text-[var(--theme-text-muted)]">
                          {category.description}
                        </p>
                      )}
                    </div>

                    <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-[#ff5a00]/40 bg-[#ff5a00]/10 px-5 py-2.5 text-sm font-bold text-[#ff7a1a] transition duration-300 group-hover:bg-[#ff5a00] group-hover:text-white">
                      {dictionary.home.categories.viewProducts}

                      <ArrowIcon />
                    </span>
                  </div>
                </LocalizedClientLink>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

const ArrowIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M5 12H19M13 6L19 12L13 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
