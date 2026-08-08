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
      <div className="relative grid gap-8 overflow-hidden rounded-[28px] border border-[#ff5a00]/25 bg-[var(--theme-surface)] px-6 py-8 text-[var(--theme-text)] shadow-[0_25px_80px_var(--theme-shadow)] small:px-10 small:py-10 medium:grid-cols-2 medium:items-center medium:px-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -start-20 -top-20 h-64 w-64 rounded-full bg-[#ff5a00]/15 blur-[90px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 end-0 h-72 w-72 rounded-full bg-[#ff5a00]/10 blur-[100px]"
        />

        <div className="relative">
          <span className="mb-4 inline-flex rounded-full border border-[#ff5a00]/30 bg-[#ff5a00]/10 px-4 py-2 text-xs font-bold text-[#ff7a1a]">
            JAHAN.EMROOZ
          </span>

          <h2
            id="newsletter-title"
            className="max-w-[560px] text-[30px] font-black leading-[1.15] tracking-[-0.03em] text-[var(--theme-text)] small:text-[40px] medium:text-[46px]"
          >
            {dictionary.newsletter.title}
          </h2>
        </div>

        <div className="relative medium:ms-auto medium:w-full medium:max-w-[420px]">
          {isSubmitted ? (
            <div
              role="status"
              className="flex min-h-[132px] flex-col items-center justify-center rounded-[22px] border border-emerald-400/20 bg-emerald-400/10 px-6 text-center text-sm font-semibold leading-7 text-white"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500 text-lg font-black text-white">
                ✓
              </div>

              <strong>{dictionary.newsletter.success}</strong>

              <span className="mt-1 font-normal text-[var(--theme-text-muted)]">
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
                  className="absolute start-5 top-1/2 -translate-y-1/2 text-[var(--theme-text-subtle)]"
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
                  className="h-13 w-full rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface-muted)] ps-12 pe-5 text-sm text-[var(--theme-text)] outline-none transition placeholder:text-[var(--theme-text-subtle)] focus:border-[#ff5a00]/60 focus:ring-4 focus:ring-[#ff5a00]/10"
                />
              </div>

              <button
                type="submit"
                className="h-13 rounded-full bg-[#ff5a00] px-6 text-sm font-bold text-white shadow-[0_12px_35px_rgba(255,90,0,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ff7a1a] hover:shadow-[0_16px_42px_rgba(255,90,0,0.3)]"
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
