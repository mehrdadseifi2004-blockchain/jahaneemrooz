"use client"

import { FormEvent, useState } from "react"

import { useI18n } from "@i18n/components/i18n-provider"

const Newsletter = () => {
  const { dictionary } = useI18n()

  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!email.trim()) {
      return
    }

    setIsSubmitted(true)
    setEmail("")
  }

  return (
    <section
      aria-labelledby="newsletter-title"
      className="content-container relative z-10"
    >
      <div className="grid gap-8 rounded-[20px] bg-black px-6 py-8 text-white small:rounded-[24px] small:px-10 small:py-9 medium:grid-cols-2 medium:items-center medium:px-16">
        <div>
          <h2
            id="newsletter-title"
            className="max-w-[560px] text-[30px] font-black leading-[1.15] tracking-[-0.03em] small:text-[40px] medium:text-[46px]"
          >
            {dictionary.newsletter.title}
          </h2>
        </div>

        <div className="medium:ms-auto medium:w-full medium:max-w-[390px]">
          {isSubmitted ? (
            <div
              role="status"
              className="flex min-h-[112px] flex-col items-center justify-center rounded-[20px] bg-white px-6 text-center text-sm font-semibold leading-7 text-black"
            >
              <strong>{dictionary.newsletter.success}</strong>

              <span className="mt-1 font-normal text-black/60">
                {dictionary.newsletter.successDescription}
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <label htmlFor="newsletter-email" className="sr-only">
                {dictionary.newsletter.emailLabel}
              </label>

              <div className="relative">
                <span
                  aria-hidden="true"
                  className="absolute start-5 top-1/2 -translate-y-1/2 text-black/40"
                >
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 6.5L12 13L21 6.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                  </svg>
                </span>

                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={dictionary.newsletter.emailPlaceholder}
                  className="h-12 w-full rounded-full border-0 bg-white ps-12 pe-5 text-sm text-black outline-none placeholder:text-black/40 focus:ring-4 focus:ring-white/20"
                />
              </div>

              <button
                type="submit"
                className="h-12 rounded-full bg-white px-6 text-sm font-medium text-black transition hover:bg-white/85"
              >
                {dictionary.newsletter.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default Newsletter
