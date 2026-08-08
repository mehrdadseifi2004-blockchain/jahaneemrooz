import { Dictionary } from "@i18n/get-dictionary"

type CustomerReviewsProps = {
  dictionary: Dictionary
}

const CustomerReviews = ({ dictionary }: CustomerReviewsProps) => {
  const reviews = dictionary.home.reviews.items

  return (
    <section className="overflow-hidden border-t border-[var(--theme-border)] bg-[var(--theme-background)] py-[50px] text-[var(--theme-text)] transition-colors duration-300 small:py-20">
      <div className="content-container">
        <div className="mb-8 flex items-end justify-between gap-4 small:mb-12">
          <div>
            <span className="mb-4 inline-flex rounded-full border border-[#ff5a00]/30 bg-[#ff5a00]/10 px-4 py-2 text-xs font-bold text-[#ff7a1a]">
              JAHAN.EMROOZ
            </span>

            <h2 className="max-w-3xl text-[32px] font-black leading-[1.1] tracking-[-0.03em] text-[var(--theme-text)] small:text-5xl">
              {dictionary.home.reviews.title}
            </h2>
          </div>

          <div
            dir="ltr"
            className="hidden items-center gap-2 small:flex"
            aria-hidden="true"
          >
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface)] text-xl text-[var(--theme-text)] transition hover:border-[#ff5a00]/50 hover:bg-[#ff5a00] hover:text-white"
              tabIndex={-1}
            >
              ←
            </button>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface)] text-xl text-[var(--theme-text)] transition hover:border-[#ff5a00]/50 hover:bg-[#ff5a00] hover:text-white"
              tabIndex={-1}
            >
              →
            </button>
          </div>
        </div>

        <div className="-mx-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max gap-4 small:gap-5">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="group relative flex min-h-[250px] w-[320px] shrink-0 flex-col items-start overflow-hidden rounded-[24px] border border-[var(--theme-border)] bg-[var(--theme-surface)] p-6 text-start shadow-[0_18px_50px_var(--theme-shadow)] transition duration-300 hover:-translate-y-1 hover:border-[#ff5a00]/60 hover:shadow-[0_24px_65px_rgba(255,90,0,0.1)] small:w-[400px] small:px-8 small:py-7"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -end-16 -top-16 h-40 w-40 rounded-full bg-[#ff5a00]/10 blur-[55px] transition group-hover:bg-[#ff5a00]/20"
                />

                <div
                  dir="ltr"
                  className="relative mb-4 flex items-center gap-1 text-[22px] text-[#ffb020]"
                  aria-label={dictionary.home.reviews.ratingLabel}
                >
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>

                <div className="relative mb-3 flex items-center gap-2">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#ff5a00]/25 bg-[#ff5a00]/10 text-base font-black text-[#ff7a1a]">
                    {review.name.slice(0, 1)}
                  </div>

                  <div>
                    <strong className="text-base text-[var(--theme-text)] small:text-lg">
                      {review.name}
                    </strong>

                    <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-400">
                      <span
                        className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white"
                        aria-label={dictionary.home.reviews.verifiedBuyer}
                        title={dictionary.home.reviews.verifiedBuyer}
                      >
                        ✓
                      </span>

                      <span>{dictionary.home.reviews.verifiedBuyer}</span>
                    </div>
                  </div>
                </div>

                <p className="relative mt-2 text-sm leading-7 text-[var(--theme-text-muted)] small:text-base">
                  {review.content}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomerReviews
