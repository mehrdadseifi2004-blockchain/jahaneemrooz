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
      icon: <BoxIcon />,
    },
    {
      value: hero.qualityCount,
      label: hero.qualityLabel,
      icon: <QualityIcon />,
    },
    {
      value: hero.customersCount,
      label: hero.customersLabel,
      icon: <CustomersIcon />,
    },
  ]

  return (
    <section className="relative overflow-hidden bg-[#070b10] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(255,90,0,0.18),transparent_35%),radial-gradient(circle_at_80%_15%,rgba(255,90,0,0.08),transparent_28%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -start-20 top-24 h-72 w-72 rounded-full bg-[#ff5a00]/10 blur-[110px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute end-[-100px] top-[-80px] h-[420px] w-[420px] rounded-full bg-[#ff5a00]/5 blur-[130px]"
      />

      <div className="content-container relative z-10">
      <div className="grid min-h-[650px] grid-cols-1 items-center gap-10 py-14 medium:grid-cols-[0.42fr_0.58fr] medium:gap-14 medium:py-20">
          <div className="order-2 flex flex-col justify-center medium:order-1">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#ff5a00]/30 bg-[#ff5a00]/10 px-4 py-2 text-xs font-semibold text-[#ff7a1a]">
              <span className="h-2 w-2 rounded-full bg-[#ff5a00] shadow-[0_0_14px_rgba(255,90,0,0.9)]" />
              {hero.productsLabel}
            </div>

            <h1 className="max-w-[650px] text-[42px] font-black leading-[1.1] tracking-[-0.03em] text-white small:text-[54px] medium:text-[64px]">
              {hero.titleLine1}

              <span className="block">{hero.titleLine2}</span>

              <span className="block text-[#ff5a00]">{hero.titleLine3}</span>
            </h1>

            <p className="mt-6 max-w-[570px] text-sm leading-8 text-slate-400 small:text-base">
              {hero.description}
            </p>

            <div className="mt-8">
              <LocalizedClientLink
                href="/store"
                className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#ff5a00] px-12 text-sm font-bold text-white shadow-[0_14px_40px_rgba(255,90,0,0.24)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ff7a1a] hover:shadow-[0_18px_48px_rgba(255,90,0,0.34)] small:w-auto"
              >
                {hero.cta}

                <ArrowIcon />
              </LocalizedClientLink>
            </div>
          </div>

          <div className="order-1 medium:order-2">
  <div className="relative mx-auto w-full max-w-[920px] overflow-hidden medium:-ms-14">
    <img
      src="/images/hero-tech-products.png"
      alt="محصولات دیجیتال جهان امروز"
      className="block h-[390px] w-full scale-x-[1.18] object-cover object-center medium:h-[540px] medium:scale-x-[1.38]"
    />
  </div>
</div>
 </div>

        <div className="relative mb-14 grid grid-cols-1 overflow-hidden rounded-[28px] border border-white/10 bg-[#0c1219]/90 shadow-[0_20px_70px_rgba(0,0,0,0.28)] backdrop-blur medium:mb-20 medium:grid-cols-3">
          {statistics.map((statistic, index) => (
            <div
              key={statistic.label}
              className={`flex items-center gap-5 px-7 py-7 medium:px-9 ${
                index < statistics.length - 1
                  ? "border-b border-white/10 medium:border-b-0 medium:border-e"
                  : ""
              }`}
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#ff5a00]/25 bg-[#ff5a00]/10 text-[#ff5a00]">
                {statistic.icon}
              </div>

              <div>
                <p className="text-3xl font-black leading-none text-white medium:text-[38px]">
                  {statistic.value}
                </p>

                <p className="mt-2 whitespace-nowrap text-sm text-slate-400">
                  {statistic.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const ArrowIcon = () => (
  <svg
    width="19"
    height="19"
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

const BoxIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M4 7L12 3L20 7L12 11L4 7Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M4 7V17L12 21M20 7V17L12 21M12 11V21"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
)

const QualityIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M12 3L14.2 5.1L17.2 4.8L18.2 7.6L20.8 9.2L19.8 12L20.8 14.8L18.2 16.4L17.2 19.2L14.2 18.9L12 21L9.8 18.9L6.8 19.2L5.8 16.4L3.2 14.8L4.2 12L3.2 9.2L5.8 7.6L6.8 4.8L9.8 5.1L12 3Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path
      d="M9 12L11 14L15.5 9.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const CustomersIcon = () => (
  <svg
    width="29"
    height="29"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M3.5 20C3.5 16.7 5.9 14 9 14C12.1 14 14.5 16.7 14.5 20"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M15 5.5C17 5.7 18.5 7.3 18.5 9.3C18.5 11.2 17.2 12.8 15.4 13.2"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M17 14.5C19.2 15.5 20.5 17.4 20.5 20"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
)

const TechIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <rect
      x="3"
      y="4"
      width="18"
      height="12"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.7"
    />
    <path
      d="M8 20H16M12 16V20"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
    <path
      d="M7 10H9L10.3 7L12.7 13L14 10H17"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const Hexagon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    <path
      d="M25 7H75L97 50L75 93H25L3 50L25 7Z"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
)

export default Hero
