"use client"

import { useI18n } from "@i18n/components/i18n-provider"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Container, clx } from "@modules/common/components/ui"
import ChevronDown from "@modules/common/icons/chevron-down"

type OverviewProps = {
  customer: HttpTypes.StoreCustomer | null
  orders: HttpTypes.StoreOrder[] | null
}

const Overview = ({ customer, orders }: OverviewProps) => {
  const { locale, dictionary } = useI18n()

  const dateLocale = locale === "fa" ? "fa-IR" : "en-US"
  const isRtl = locale === "fa"

  const customerName = customer?.first_name || customer?.email || ""

  const greeting = dictionary.accountOverview.hello.replace(
    "{name}",
    customerName,
  )

  return (
    <div data-testid="overview-page-wrapper">
      <div className="hidden small:block">
        <div className="mb-4 flex items-center justify-between text-xl-semi">
          <span data-testid="welcome-message" data-value={customer?.first_name}>
            {greeting}
          </span>

          <span className="text-small-regular text-ui-fg-base">
            {dictionary.accountOverview.signedInAs}{" "}
            <span
              className="font-semibold"
              data-testid="customer-email"
              data-value={customer?.email}
            >
              {customer?.email}
            </span>
          </span>
        </div>

        <div className="flex flex-col border-t border-gray-200 py-8">
          <div className="col-span-1 row-span-2 flex h-full flex-1 flex-col gap-y-4">
            <div className="mb-6 flex items-start gap-x-16">
              <div className="flex flex-col gap-y-4">
                <h3 className="text-large-semi">
                  {dictionary.accountOverview.profile}
                </h3>

                <div className="flex items-end gap-x-2">
                  <span
                    className="text-3xl-semi leading-none"
                    data-testid="customer-profile-completion"
                    data-value={getProfileCompletion(customer)}
                  >
                    {getProfileCompletion(customer).toLocaleString(dateLocale)}%
                  </span>

                  <span className="uppercase text-base-regular text-ui-fg-subtle">
                    {dictionary.accountOverview.completed}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-y-4">
                <h3 className="text-large-semi">
                  {dictionary.accountOverview.addresses}
                </h3>

                <div className="flex items-end gap-x-2">
                  <span
                    className="text-3xl-semi leading-none"
                    data-testid="addresses-count"
                    data-value={customer?.addresses?.length || 0}
                  >
                    {(customer?.addresses?.length || 0).toLocaleString(
                      dateLocale,
                    )}
                  </span>

                  <span className="uppercase text-base-regular text-ui-fg-subtle">
                    {dictionary.accountOverview.saved}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-y-4">
              <h3 className="text-large-semi">
                {dictionary.accountOverview.recentOrders}
              </h3>

              <ul
                className="flex flex-col gap-y-4"
                data-testid="orders-wrapper"
              >
                {orders?.length ? (
                  orders.slice(0, 5).map((order) => (
                    <li
                      key={order.id}
                      data-testid="order-wrapper"
                      data-value={order.id}
                    >
                      <LocalizedClientLink
                        href={`/account/orders/details/${order.id}`}
                      >
                        <Container className="flex items-center justify-between bg-gray-50 p-4">
                          <div className="grid flex-1 grid-cols-3 grid-rows-2 gap-x-4 text-small-regular">
                            <span className="font-semibold">
                              {dictionary.accountOverview.datePlaced}
                            </span>

                            <span className="font-semibold">
                              {dictionary.accountOverview.orderNumber}
                            </span>

                            <span className="font-semibold">
                              {dictionary.accountOverview.totalAmount}
                            </span>

                            <span data-testid="order-created-date">
                              {new Intl.DateTimeFormat(dateLocale, {
                                dateStyle: "medium",
                              }).format(new Date(order.created_at))}
                            </span>

                            <span
                              data-testid="order-id"
                              data-value={order.display_id}
                            >
                              #{order.display_id}
                            </span>

                            <span data-testid="order-amount">
                              {convertToLocale({
                                amount: order.total,
                                currency_code: order.currency_code,
                              })}
                            </span>
                          </div>

                          <span
                            className="flex items-center justify-between"
                            aria-hidden="true"
                          >
                            <ChevronDown
                              className={clx(
                                isRtl ? "rotate-90" : "-rotate-90",
                              )}
                            />
                          </span>

                          <span className="sr-only">
                            {dictionary.accountOverview.goToOrder.replace(
                              "{number}",
                              String(order.display_id),
                            )}
                          </span>
                        </Container>
                      </LocalizedClientLink>
                    </li>
                  ))
                ) : (
                  <span data-testid="no-orders-message">
                    {dictionary.accountOverview.noRecentOrders}
                  </span>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const getProfileCompletion = (customer: HttpTypes.StoreCustomer | null) => {
  let count = 0

  if (!customer) {
    return 0
  }

  if (customer.email) count++
  if (customer.first_name && customer.last_name) count++
  if (customer.phone) count++

  const billingAddress = customer.addresses?.find(
    (address) => address.is_default_billing,
  )

  if (billingAddress) count++

  return (count / 4) * 100
}

export default Overview
