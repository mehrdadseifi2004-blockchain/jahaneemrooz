"use client"

import { FormEvent, useState } from "react"

const Newsletter = () => {
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
      dir="rtl"
      aria-labelledby="newsletter-title"
      className="content-container relative z-10"
    >
      <div className="grid gap-8 rounded-[20px] bg-black px-6 py-8 text-white small:rounded-[24px] small:px-10 small:py-9 medium:grid-cols-2 medium:items-center medium:px-16">
        <div>
          <h2
            id="newsletter-title"
            className="max-w-[560px] text-[30px] font-black leading-[1.15] tracking-[-0.03em] small:text-[40px] medium:text-[46px]"
          >
            از جدیدترین محصولات و تخفیف‌ها باخبر شوید
          </h2>
        </div>

        <div className="medium:mr-auto medium:w-full medium:max-w-[350px]">
          {isSubmitted ? (
            <div
              role="status"
              className="flex min-h-[112px] items-center justify-center rounded-[20px] bg-white px-6 text-center text-sm font-semibold leading-7 text-black"
            >
              ایمیل شما با موفقیت ثبت شد. پس از اتصال سرویس خبرنامه، جدیدترین
              پیشنهادها برای شما ارسال می‌شود.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <label htmlFor="newsletter-email" className="sr-only">
                آدرس ایمیل
              </label>

              <div className="relative">
                <span
                  aria-hidden="true"
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-black/40"
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
                  placeholder="ایمیل خود را وارد کنید"
                  className="h-12 w-full rounded-full border-0 bg-white px-12 text-sm text-black outline-none placeholder:text-black/40 focus:ring-4 focus:ring-white/20"
                />
              </div>

              <button
                type="submit"
                className="h-12 rounded-full bg-white px-6 text-sm font-medium text-black transition hover:bg-white/85"
              >
                عضویت در خبرنامه
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default Newsletter
