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
    <footer className="mt-0 bg-[#05080c] text-white">
      <div className="relative">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[#05080c]" />

        <Newsletter />
      </div>

      <div className="border-t border-white/10 bg-[#05080c] px-4 pb-6 pt-12 small:pt-16">
        <div className="content-container">
          <nav className="grid gap-10 pb-10 medium:grid-cols-12 medium:gap-8">
            <div className="medium:col-span-4">
              <LocalizedClientLink
                href="/"
                className="inline-block text-[28px] font-black tracking-[-0.04em] text-white transition hover:text-[#ff5a00] small:text-[32px]"
              >
                {dictionary.common.brand}
              </LocalizedClientLink>

              <p className="mt-5 max-w-[350px] text-sm leading-7 text-slate-400">
                {dictionary.footer.description}
              </p>

              <div dir="ltr" className="mt-7 flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#111923] text-[10px] font-bold text-slate-300 transition hover:border-[#ff5a00]/60 hover:bg-[#ff5a00] hover:text-white"
                  >
                    {social.text}
                  </a>
                ))}
              </div>
            </div>

            <div className="medium:col-span-2">
              <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.14em] text-white">
                {dictionary.footer.categories}
              </h3>

              <ul className="space-y-4 text-sm text-slate-400">
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
              <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.14em] text-white">
                {dictionary.footer.store}
              </h3>

              <ul className="space-y-4 text-sm text-slate-400">
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
              <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.14em] text-white">
                {dictionary.footer.account}
              </h3>

              <ul className="space-y-4 text-sm text-slate-400">
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
              <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.14em] text-white">
                {dictionary.footer.help}
              </h3>

              <ul className="space-y-4 text-sm text-slate-400">
                <li>{dictionary.footer.purchaseSupport}</li>
                <li>{dictionary.footer.digitalDelivery}</li>
                <li>{dictionary.footer.physicalShipping}</li>
                <li>{dictionary.footer.securePurchase}</li>
              </ul>
            </div>
          </nav>

          <div className="flex flex-col gap-5 border-t border-white/10 pt-6 text-sm text-slate-500 small:flex-row small:items-center small:justify-between">
            <p>
              © {new Date().getFullYear()} {dictionary.footer.copyright}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <span className="flex h-8 items-center justify-center rounded-full border border-white/10 bg-[#111923] px-3 text-xs font-bold text-slate-300">
                {dictionary.footer.securePayment}
              </span>

              <span className="flex h-8 items-center justify-center rounded-full border border-white/10 bg-[#111923] px-3 text-xs font-bold text-slate-300">
                {dictionary.footer.ssl}
              </span>

              <span className="flex h-8 items-center justify-center rounded-full border border-white/10 bg-[#111923] px-3 text-xs font-bold text-slate-300">
                {dictionary.footer.support247}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
