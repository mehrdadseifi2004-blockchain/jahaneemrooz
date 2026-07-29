import Image from "next/image"

import { Dictionary } from "@i18n/get-dictionary"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type HeroProps = {
  dictionary: Dictionary
}

const Hero = ({ dictionary }: HeroProps) => {
  const hero = dictionary.home.hero

  const statistics = [
    {
      value: hero.productsCount,
      label: hero.productsLabel,
    },
    {
      value: hero.qualityCount,
      label: hero.qualityLabel,
    },
    {
      value: hero.customersCount,
      label: hero.customersLabel,
    },
  ]

  return (
    <section className="overflow-hidden bg-[#f2f0f1] text-[#0b0b0b]">
      <div className="content-container">
        <div className="grid grid-cols-1 items-stretch medium:grid-cols-2">
          <div className="relative z-10 flex flex-col justify-center px-0 py-12 medium:min-h-[620px] medium:py-20">
            <h1 className="max-w-[650px] text-[42px] font-black leading-[1.08] tracking-[-0.03em] text-black small:text-[54px] medium:text-[64px]">
              {hero.titleLine1}

              <span className="block">{hero.titleLine2}</span>

              <span className="block">{hero.titleLine3}</span>
            </h1>

            <p className="mt-6 max-w-[545px] text-sm leading-7 text-black/60 small:text-base">
              {hero.description}
            </p>

            <div className="mt-7">
              <LocalizedClientLink
                href="/store"
                className="inline-flex h-14 w-full items-center justify-center rounded-full bg-black px-14 text-sm font-medium text-white transition hover:bg-black/80 small:w-auto"
              >
                {hero.cta}
              </LocalizedClientLink>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-y-6 small:flex-nowrap medium:mt-12">
              {statistics.map((statistic, index) => (
                <div key={statistic.label} className="contents">
                  <div
                    className={
                      index === 2
                        ? "w-full pt-2 small:w-auto small:px-6 small:pt-0"
                        : index === 0
                          ? "min-w-[145px] pe-6"
                          : "min-w-[160px] px-6"
                    }
                  >
                    <p className="text-3xl font-bold leading-none medium:text-[40px]">
                      {statistic.value}
                    </p>

                    <p className="mt-2 whitespace-nowrap text-xs text-black/60 medium:text-sm">
                      {statistic.label}
                    </p>
                  </div>

                  {index < statistics.length - 1 && (
                    <div
                      className={
                        index === 1
                          ? "hidden h-14 w-px bg-black/10 small:block"
                          : "h-14 w-px bg-black/10"
                      }
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

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
              className="absolute start-5 top-14 h-[76px] w-[76px] medium:start-0 medium:top-24 medium:h-[104px] medium:w-[104px]"
            />

            <Image
              priority
              src="/icons/small-star.svg"
              alt=""
              width={56}
              height={56}
              aria-hidden="true"
              className="absolute end-5 top-40 h-11 w-11 medium:end-0 medium:top-56 medium:h-14 medium:w-14"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
