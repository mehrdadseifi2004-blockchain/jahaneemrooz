import { Dictionary } from "@i18n/get-dictionary"

type CustomerReviewsProps = {
  dictionary: Dictionary
}

const CustomerReviews = ({ dictionary }: CustomerReviewsProps) => {
  const reviews = dictionary.home.reviews.items

  return (
    <section className="overflow-hidden bg-white py-[50px] small:py-20">
      <div className="content-container">
        <div className="mb-8 flex items-end justify-between gap-4 small:mb-10">
          <h2 className="max-w-3xl text-[32px] font-black leading-[1.1] tracking-[-0.03em] text-black small:text-5xl">
            {dictionary.home.reviews.title}
          </h2>

          <div
            dir="ltr"
            className="hidden items-center gap-2 small:flex"
            aria-hidden="true"
          >
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-2xl text-black transition hover:bg-black/5"
              tabIndex={-1}
            >
              ←
            </button>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-2xl text-black transition hover:bg-black/5"
              tabIndex={-1}
            >
              →
            </button>
          </div>
        </div>

        <div className="-mx-4 overflow-x-auto px-4 pb-2">
          <div className="flex min-w-max gap-4 small:gap-5">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="flex min-h-[230px] w-[320px] shrink-0 flex-col items-start rounded-[20px] border border-black/10 bg-white p-6 text-start small:w-[400px] small:px-8 small:py-7"
              >
                <div
                  dir="ltr"
                  className="mb-3 flex items-center gap-1 text-[22px] text-[#ffc633] small:mb-4"
                  aria-label={dictionary.home.reviews.ratingLabel}
                >
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>

                <div className="mb-2 flex items-center gap-2 small:mb-3">
                  <strong className="text-base text-black small:text-xl">
                    {review.name}
                  </strong>

                  <span
                    className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#01ab31] text-xs font-bold text-white small:h-6 small:w-6"
                    aria-label={dictionary.home.reviews.verifiedBuyer}
                    title={dictionary.home.reviews.verifiedBuyer}
                  >
                    ✓
                  </span>
                </div>

                <p className="text-sm leading-7 text-black/60 small:text-base">
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
