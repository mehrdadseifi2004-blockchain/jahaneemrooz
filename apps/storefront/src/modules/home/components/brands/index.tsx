import { Dictionary } from "@i18n/get-dictionary"

const brands = ["SONY", "SAMSUNG", "XIAOMI", "MICROSOFT", "APPLE"]

type BrandsProps = {
  dictionary: Dictionary
}

const Brands = ({ dictionary }: BrandsProps) => {
  return (
    <section
      dir="ltr"
      aria-label={dictionary.home.brands.ariaLabel}
      className="border-y border-[var(--theme-border)] bg-[var(--theme-header)] text-[var(--theme-text)] transition-colors duration-300"
    >
      <div className="content-container">
        <div className="flex min-h-[120px] flex-wrap items-center justify-center gap-x-7 gap-y-4 py-7 small:justify-between medium:gap-x-10">
          {brands.map((brand) => (
            <span
              key={brand}
              className="group inline-flex items-center gap-3 whitespace-nowrap text-lg font-black tracking-[-0.04em] text-[var(--theme-text-muted)] transition duration-300 hover:text-[var(--theme-text)] small:text-2xl medium:text-[28px]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a00] opacity-40 shadow-[0_0_10px_rgba(255,90,0,0.8)] transition group-hover:opacity-100" />

              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Brands
