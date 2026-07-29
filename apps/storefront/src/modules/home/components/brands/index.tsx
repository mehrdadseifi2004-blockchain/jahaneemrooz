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
      className="bg-black text-white"
    >
      <div className="content-container">
        <div className="flex min-h-[120px] flex-wrap items-center justify-center gap-x-10 gap-y-6 py-8 small:justify-between medium:gap-x-14">
          {brands.map((brand) => (
            <span
              key={brand}
              className="whitespace-nowrap text-xl font-black tracking-[-0.04em] small:text-2xl medium:text-[30px]"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Brands
