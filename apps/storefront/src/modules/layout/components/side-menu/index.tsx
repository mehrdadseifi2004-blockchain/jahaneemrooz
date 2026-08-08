"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { AppLocale } from "@i18n/config"
import { Dictionary } from "@i18n/get-dictionary"
import { Locale } from "@lib/data/locales"
import useToggleState from "@lib/hooks/use-toggle-state"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Text, clx } from "@modules/common/components/ui"
import { Fragment } from "react"

import CountrySelect from "../country-select"
import LanguageSelect from "../language-select"

type SideMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
  locale: AppLocale
  dictionary: Dictionary
}

const SideMenu = ({
  regions,
  locales,
  currentLocale,
  locale,
  dictionary,
}: SideMenuProps) => {
  const countryToggleState = useToggleState()
  const languageToggleState = useToggleState()

  const isRtl = locale === "fa"

  const sideMenuItems = [
    {
      key: "home",
      name: dictionary.sideMenu.home,
      href: "/",
    },
    {
      key: "store",
      name: dictionary.sideMenu.store,
      href: "/store",
    },
    {
      key: "gift-cards",
      name: dictionary.sideMenu.giftCards,
      href: "/store",
    },
    {
      key: "digital-products",
      name: dictionary.sideMenu.digitalProducts,
      href: "/store",
    },
    {
      key: "account",
      name: dictionary.sideMenu.account,
      href: "/account",
    },
    {
      key: "cart",
      name: dictionary.sideMenu.cart,
      href: "/cart",
    },
  ]

  return (
    <div className="h-full">
      <div className="flex h-full items-center">
        <Popover className="flex h-full">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full items-center">
                <Popover.Button
                  data-testid="nav-menu-button"
                  aria-label={dictionary.sideMenu.menu}
                  className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 focus:outline-none"
                >
                  <span className="text-lg leading-none" aria-hidden="true">
                    ☰
                  </span>

                  <span>{dictionary.sideMenu.menu}</span>
                </Popover.Button>
              </div>

              {open && (
                <div
                  className="fixed inset-0 z-[50] bg-[var(--theme-surface)]/45 backdrop-blur-sm"
                  onClick={close}
                  data-testid="side-menu-backdrop"
                />
              )}

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom={clx(
                  "opacity-0",
                  isRtl ? "translate-x-6" : "-translate-x-6",
                )}
                enterTo="translate-x-0 opacity-100"
                leave="transition ease-in duration-150"
                leaveFrom="translate-x-0 opacity-100"
                leaveTo={clx(
                  "opacity-0",
                  isRtl ? "translate-x-6" : "-translate-x-6",
                )}
              >
                <PopoverPanel
                  className={clx(
                    "fixed top-0 z-[51] h-screen w-full max-w-sm p-3",
                    isRtl ? "right-0" : "left-0",
                  )}
                >
                  <div
                    data-testid="nav-menu-popup"
                    className="flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-6 text-white shadow-2xl"
                  >
                    <div>
                      <div className="mb-8 flex items-center justify-between">
                        <div>
                          <p className="text-lg font-bold">
                            {dictionary.common.brand}
                          </p>

                          <p className="mt-1 text-xs text-[var(--theme-text-muted)]">
                            {dictionary.sideMenu.brandDescription}
                          </p>
                        </div>

                        <button
                          type="button"
                          data-testid="close-menu-button"
                          onClick={close}
                          aria-label={dictionary.sideMenu.closeMenu}
                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface-muted)] transition hover:bg-[var(--theme-accent)]/10"
                        >
                          <XMark />
                        </button>
                      </div>

                      <ul className="flex flex-col gap-2">
                        {sideMenuItems.map(({ key, name, href }) => (
                          <li key={key}>
                            <LocalizedClientLink
                              href={href}
                              className="flex items-center justify-between rounded-xl px-4 py-3 text-lg font-medium text-[var(--theme-text)] transition hover:bg-[var(--theme-accent)]/10 hover:text-[var(--theme-text)]"
                              onClick={close}
                              data-testid={`${key}-link`}
                            >
                              <span>{name}</span>

                              <span
                                className="text-[var(--theme-text-subtle)]"
                                aria-hidden="true"
                              >
                                {isRtl ? "←" : "→"}
                              </span>
                            </LocalizedClientLink>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-5 border-t border-[var(--theme-border)] pt-6">
                      {!!locales?.length && (
                        <div
                          className="flex justify-between"
                          onMouseEnter={languageToggleState.open}
                          onMouseLeave={languageToggleState.close}
                        >
                          <LanguageSelect
                            toggleState={languageToggleState}
                            locales={locales}
                            currentLocale={currentLocale}
                          />

                          <ArrowRightMini
                            className={clx(
                              "transition-transform duration-150",
                              languageToggleState.state ? "-rotate-90" : "",
                            )}
                          />
                        </div>
                      )}

                      <div
                        className="flex justify-between"
                        onMouseEnter={countryToggleState.open}
                        onMouseLeave={countryToggleState.close}
                      >
                        {regions && (
                          <CountrySelect
                            toggleState={countryToggleState}
                            regions={regions}
                          />
                        )}

                        <ArrowRightMini
                          className={clx(
                            "transition-transform duration-150",
                            countryToggleState.state ? "-rotate-90" : "",
                          )}
                        />
                      </div>

                      <Text className="text-xs text-[var(--theme-text-subtle)]">
                        © {new Date().getFullYear()}{" "}
                        {dictionary.footer.copyright}
                      </Text>
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
