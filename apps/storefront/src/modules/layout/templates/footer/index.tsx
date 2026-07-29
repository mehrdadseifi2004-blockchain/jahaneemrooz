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
    <footer className="mt-10 text-black">
      <div className="relative">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[#f0f0f0]" />

        <Newsletter />
      </div>

      <div className="bg-[#f0f0f0] px-4 pb-5 pt-10 small:pt-[50px]">
        <div className="content-container">
          <nav className="grid gap-10 pb-10 medium:grid-cols-12 medium:gap-8">
            <div className="medium:col-span-4">
              <LocalizedClientLink
                href="/"
                className="inline-block text-[28px] font-black tracking-[-0.04em] text-black small:text-[32px]"
              >
                {dictionary.common.brand}
              </LocalizedClientLink>

              <p className="mt-5 max-w-[350px] text-sm leading-7 text-black/60">
                {dictionary.footer.description}
              </p>

              <div dir="ltr" className="mt-7 flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-black/20 bg-white text-[10px] font-bold text-black transition hover:border-black hover:bg-black hover:text-white"
                  >
                    {social.text}
                  </a>
                ))}
              </div>
            </div>

            <div className="medium:col-span-2">
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.14em] text-black">
                {dictionary.footer.categories}
              </h3>

              <ul className="space-y-4 text-sm text-black/60">
                {rootCategories.map((category) => (
                  <li key={category.id}>
                    <LocalizedClientLink
                      href={`/categories/${category.handle}`}
                      className="transition hover:text-black"
                    >
                      {category.name}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="medium:col-span-2">
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.14em] text-black">
                {dictionary.footer.store}
              </h3>

              <ul className="space-y-4 text-sm text-black/60">
                <li>
                  <LocalizedClientLink
                    href="/store"
                    className="transition hover:text-black"
                  >
                    {dictionary.footer.allProducts}
                  </LocalizedClientLink>
                </li>

                <li>
                  <LocalizedClientLink
                    href="/store"
                    className="transition hover:text-black"
                  >
                    {dictionary.footer.newProducts}
                  </LocalizedClientLink>
                </li>

                <li>
                  <LocalizedClientLink
                    href="/store"
                    className="transition hover:text-black"
                  >
                    {dictionary.footer.bestSelling}
                  </LocalizedClientLink>
                </li>

                <li>
                  <LocalizedClientLink
                    href="/cart"
                    className="transition hover:text-black"
                  >
                    {dictionary.footer.cart}
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>

            <div className="medium:col-span-2">
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.14em] text-black">
                {dictionary.footer.account}
              </h3>

              <ul className="space-y-4 text-sm text-black/60">
                <li>
                  <LocalizedClientLink
                    href="/account"
                    className="transition hover:text-black"
                  >
                    {dictionary.footer.loginRegister}
                  </LocalizedClientLink>
                </li>

                <li>
                  <LocalizedClientLink
                    href="/account/orders"
                    className="transition hover:text-black"
                  >
                    {dictionary.footer.myOrders}
                  </LocalizedClientLink>
                </li>

                <li>
                  <LocalizedClientLink
                    href="/account/profile"
                    className="transition hover:text-black"
                  >
                    {dictionary.footer.accountInformation}
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>

            <div className="medium:col-span-2">
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.14em] text-black">
                {dictionary.footer.help}
              </h3>

              <ul className="space-y-4 text-sm text-black/60">
                <li>{dictionary.footer.purchaseSupport}</li>
                <li>{dictionary.footer.digitalDelivery}</li>
                <li>{dictionary.footer.physicalShipping}</li>
                <li>{dictionary.footer.securePurchase}</li>
              </ul>
            </div>
          </nav>

          <div className="flex flex-col gap-5 border-t border-black/10 pt-6 text-sm text-black/60 small:flex-row small:items-center small:justify-between">
            <p>
              © {new Date().getFullYear()} {dictionary.footer.copyright}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <span className="flex h-8 items-center justify-center rounded-md border border-[#d6dce5] bg-white px-3 text-xs font-bold text-black">
                {dictionary.footer.securePayment}
              </span>

              <span className="flex h-8 items-center justify-center rounded-md border border-[#d6dce5] bg-white px-3 text-xs font-bold text-black">
                {dictionary.footer.ssl}
              </span>

              <span className="flex h-8 items-center justify-center rounded-md border border-[#d6dce5] bg-white px-3 text-xs font-bold text-black">
                {dictionary.footer.support247}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
