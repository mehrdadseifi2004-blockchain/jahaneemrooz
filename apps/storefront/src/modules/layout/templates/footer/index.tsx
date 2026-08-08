import { listCategories } from "@lib/data/categories"
import { Dictionary } from "@i18n/get-dictionary"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Newsletter from "@modules/layout/components/newsletter"

type FooterProps = {
  dictionary: Dictionary
}

const socialLinks = [
  {
    label: "Instagram",
    href: "#",
    text: "IG",
  },
  {
    label: "Telegram",
    href: "#",
    text: "TG",
  },
  {
    label: "LinkedIn",
    href: "#",
    text: "IN",
  },
  {
    label: "X",
    href: "#",
    text: "X",
  },
]

export default async function Footer({ dictionary }: FooterProps) {
  const productCategories = await listCategories()

  const rootCategories =
    productCategories
      ?.filter((category) => !category.parent_category)
      .slice(0, 5) ?? []

  return (
    <footer className="mt-0 bg-[var(--theme-header)] text-[var(--theme-text)] transition-colors duration-300">
      <div className="relative">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[var(--theme-header)]" />

        <Newsletter />
      </div>

      <div className="border-t border-[var(--theme-border)] bg-[var(--theme-header)] px-4 pb-6 pt-12 small:pt-16">
        <div className="content-container">
          <nav className="grid gap-10 pb-10 medium:grid-cols-12 medium:gap-8">
            <div className="medium:col-span-4">
              <LocalizedClientLink
                href="/"
                className="inline-block text-[28px] font-black tracking-[-0.04em] text-[var(--theme-text)] transition hover:text-[#ff5a00] small:text-[32px]"
              >
                {dictionary.common.brand}
              </LocalizedClientLink>

              <p className="mt-5 max-w-[350px] text-sm leading-7 text-[var(--theme-text-muted)]">
                {dictionary.footer.description}
              </p>

              <div dir="ltr" className="mt-7 flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface)] text-[10px] font-bold text-[var(--theme-text-muted)] transition hover:border-[#ff5a00]/60 hover:bg-[#ff5a00] hover:text-white"
                  >
                    {social.text}
                  </a>
                ))}
              </div>
            </div>

            <div className="medium:col-span-2">
              <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.14em] text-[var(--theme-text)]">
                {dictionary.footer.categories}
              </h3>

              <ul className="space-y-4 text-sm text-[var(--theme-text-muted)]">
                {rootCategories.map((category) => (
                  <li key={category.id}>
                    <LocalizedClientLink
                      href={`/categories/${category.handle}`}
                      className="transition hover:text-[#ff7a1a]"
                    >
                      {category.name}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="medium:col-span-2">
              <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.14em] text-[var(--theme-text)]">
                {dictionary.footer.store}
              </h3>

              <ul className="space-y-4 text-sm text-[var(--theme-text-muted)]">
                <li>
                  <LocalizedClientLink
                    href="/store"
                    className="transition hover:text-[#ff7a1a]"
                  >
                    {dictionary.footer.allProducts}
                  </LocalizedClientLink>
                </li>

                <li>
                  <LocalizedClientLink
                    href="/store"
                    className="transition hover:text-[#ff7a1a]"
                  >
                    {dictionary.footer.newProducts}
                  </LocalizedClientLink>
                </li>

                <li>
                  <LocalizedClientLink
                    href="/store"
                    className="transition hover:text-[#ff7a1a]"
                  >
                    {dictionary.footer.bestSelling}
                  </LocalizedClientLink>
                </li>

                <li>
                  <LocalizedClientLink
                    href="/cart"
                    className="transition hover:text-[#ff7a1a]"
                  >
                    {dictionary.footer.cart}
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>

            <div className="medium:col-span-2">
              <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.14em] text-[var(--theme-text)]">
                {dictionary.footer.account}
              </h3>

              <ul className="space-y-4 text-sm text-[var(--theme-text-muted)]">
                <li>
                  <LocalizedClientLink
                    href="/account"
                    className="transition hover:text-[#ff7a1a]"
                  >
                    {dictionary.footer.loginRegister}
                  </LocalizedClientLink>
                </li>

                <li>
                  <LocalizedClientLink
                    href="/account/orders"
                    className="transition hover:text-[#ff7a1a]"
                  >
                    {dictionary.footer.myOrders}
                  </LocalizedClientLink>
                </li>

                <li>
                  <LocalizedClientLink
                    href="/account/profile"
                    className="transition hover:text-[#ff7a1a]"
                  >
                    {dictionary.footer.accountInformation}
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>

            <div className="medium:col-span-2">
              <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.14em] text-[var(--theme-text)]">
                {dictionary.footer.help}
              </h3>

              <ul className="space-y-4 text-sm text-[var(--theme-text-muted)]">
                <li>{dictionary.footer.purchaseSupport}</li>
                <li>{dictionary.footer.digitalDelivery}</li>
                <li>{dictionary.footer.physicalShipping}</li>
                <li>{dictionary.footer.securePurchase}</li>
              </ul>
            </div>
          </nav>

          <div className="flex flex-col gap-5 border-t border-[var(--theme-border)] pt-6 text-sm text-[var(--theme-text-subtle)] small:flex-row small:items-center small:justify-between">
            <p>
              © {new Date().getFullYear()} {dictionary.footer.copyright}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <span className="flex h-8 items-center justify-center rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface)] px-3 text-xs font-bold text-[var(--theme-text-muted)]">
                {dictionary.footer.securePayment}
              </span>

              <span className="flex h-8 items-center justify-center rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface)] px-3 text-xs font-bold text-[var(--theme-text-muted)]">
                {dictionary.footer.ssl}
              </span>

              <span className="flex h-8 items-center justify-center rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface)] px-3 text-xs font-bold text-[var(--theme-text-muted)]">
                {dictionary.footer.support247}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
