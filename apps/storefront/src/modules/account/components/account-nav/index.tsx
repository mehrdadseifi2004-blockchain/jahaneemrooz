"use client"

import { useI18n } from "@i18n/components/i18n-provider"
import { signout } from "@lib/data/customer"
import { ArrowRightOnRectangle } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import MapPin from "@modules/common/icons/map-pin"
import Package from "@modules/common/icons/package"
import User from "@modules/common/icons/user"
import { clx } from "@modules/common/components/ui"
import { useParams, usePathname } from "next/navigation"

type AccountNavProps = {
  customer: HttpTypes.StoreCustomer | null
}

const AccountNav = ({ customer }: AccountNavProps) => {
  const route = usePathname()
  const params = useParams<{
    locale?: string
    countryCode?: string
  }>()

  const { locale, dictionary } = useI18n()

  const countryCode = params.countryCode || "ir"
  const routeLocale = params.locale || locale || "fa"
  const isRtl = routeLocale === "fa"

  const accountRoot = `/${routeLocale}/${countryCode}/account`

  const isAccountRoot = route === accountRoot || route === `${accountRoot}/`

  const customerName = customer?.first_name || customer?.email || ""

  const greeting = dictionary.accountNavigation.hello.replace(
    "{name}",
    customerName,
  )

  const handleLogout = async () => {
    await signout(countryCode)
  }

  return (
    <div>
      <div className="small:hidden" data-testid="mobile-account-nav">
        {!isAccountRoot ? (
          <LocalizedClientLink
            href="/account"
            className="flex items-center gap-x-2 py-2 text-small-regular"
            data-testid="account-main-link"
          >
            <ChevronDown
              className={clx("transform", isRtl ? "-rotate-90" : "rotate-90")}
            />

            <span>{dictionary.accountNavigation.backToAccount}</span>
          </LocalizedClientLink>
        ) : (
          <>
            <div className="mb-4 px-8 text-xl-semi">{greeting}</div>

            <div className="text-base-regular">
              <ul>
                <li>
                  <LocalizedClientLink
                    href="/account/profile"
                    className="flex items-center justify-between border-b border-gray-200 px-8 py-4"
                    data-testid="profile-link"
                  >
                    <div className="flex items-center gap-x-2">
                      <User size={20} />

                      <span>{dictionary.accountNavigation.profile}</span>
                    </div>

                    <NavigationChevron isRtl={isRtl} />
                  </LocalizedClientLink>
                </li>

                <li>
                  <LocalizedClientLink
                    href="/account/addresses"
                    className="flex items-center justify-between border-b border-gray-200 px-8 py-4"
                    data-testid="addresses-link"
                  >
                    <div className="flex items-center gap-x-2">
                      <MapPin size={20} />

                      <span>{dictionary.accountNavigation.addresses}</span>
                    </div>

                    <NavigationChevron isRtl={isRtl} />
                  </LocalizedClientLink>
                </li>

                <li>
                  <LocalizedClientLink
                    href="/account/orders"
                    className="flex items-center justify-between border-b border-gray-200 px-8 py-4"
                    data-testid="orders-link"
                  >
                    <div className="flex items-center gap-x-2">
                      <Package size={20} />

                      <span>{dictionary.accountNavigation.orders}</span>
                    </div>

                    <NavigationChevron isRtl={isRtl} />
                  </LocalizedClientLink>
                </li>

                <li>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between border-b border-gray-200 px-8 py-4"
                    onClick={handleLogout}
                    data-testid="logout-button"
                  >
                    <div className="flex items-center gap-x-2">
                      <ArrowRightOnRectangle />

                      <span>{dictionary.accountNavigation.logout}</span>
                    </div>

                    <NavigationChevron isRtl={isRtl} />
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>

      <div className="hidden small:block" data-testid="account-nav">
        <div>
          <div className="pb-4">
            <h3 className="text-base-semi">
              {dictionary.accountNavigation.title}
            </h3>
          </div>

          <div className="text-base-regular">
            <ul className="mb-0 flex flex-col items-start justify-start gap-y-4">
              <li>
                <AccountNavLink
                  href="/account"
                  route={route}
                  locale={routeLocale}
                  countryCode={countryCode}
                  data-testid="overview-link"
                >
                  {dictionary.accountNavigation.overview}
                </AccountNavLink>
              </li>

              <li>
                <AccountNavLink
                  href="/account/profile"
                  route={route}
                  locale={routeLocale}
                  countryCode={countryCode}
                  data-testid="profile-link"
                >
                  {dictionary.accountNavigation.profile}
                </AccountNavLink>
              </li>

              <li>
                <AccountNavLink
                  href="/account/addresses"
                  route={route}
                  locale={routeLocale}
                  countryCode={countryCode}
                  data-testid="addresses-link"
                >
                  {dictionary.accountNavigation.addresses}
                </AccountNavLink>
              </li>

              <li>
                <AccountNavLink
                  href="/account/orders"
                  route={route}
                  locale={routeLocale}
                  countryCode={countryCode}
                  data-testid="orders-link"
                >
                  {dictionary.accountNavigation.orders}
                </AccountNavLink>
              </li>

              <li className="text-grey-700">
                <button
                  type="button"
                  onClick={handleLogout}
                  data-testid="logout-button"
                >
                  {dictionary.accountNavigation.logout}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

type NavigationChevronProps = {
  isRtl: boolean
}

const NavigationChevron = ({ isRtl }: NavigationChevronProps) => {
  return (
    <ChevronDown
      className={clx("transform", isRtl ? "rotate-90" : "-rotate-90")}
    />
  )
}

type AccountNavLinkProps = {
  href: string
  route: string
  locale: string
  countryCode: string
  children: React.ReactNode
  "data-testid"?: string
}

const AccountNavLink = ({
  href,
  route,
  locale,
  countryCode,
  children,
  "data-testid": dataTestId,
}: AccountNavLinkProps) => {
  const localizedHref = `/${locale}/${countryCode}${href}`

  const normalizedRoute =
    route.length > 1 && route.endsWith("/") ? route.slice(0, -1) : route

  const active = normalizedRoute === localizedHref

  return (
    <LocalizedClientLink
      href={href}
      className={clx("text-ui-fg-subtle hover:text-ui-fg-base", {
        "font-semibold text-ui-fg-base": active,
      })}
      data-testid={dataTestId}
    >
      {children}
    </LocalizedClientLink>
  )
}

export default AccountNav
