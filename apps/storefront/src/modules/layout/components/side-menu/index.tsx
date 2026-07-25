"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import useToggleState from "@lib/hooks/use-toggle-state"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Text, clx } from "@modules/common/components/ui"
import { Fragment } from "react"
import CountrySelect from "../country-select"
import LanguageSelect from "../language-select"
import { Locale } from "@lib/data/locales"

const SideMenuItems = {
  "صفحه اصلی": "/",
  "فروشگاه": "/store",
  "گیفت کارت‌ها": "/store",
  "محصولات دیجیتال": "/store",
  "حساب کاربری": "/account",
  "سبد خرید": "/cart",
}

type SideMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
}

const SideMenu = ({ regions, locales, currentLocale }: SideMenuProps) => {
  const countryToggleState = useToggleState()
  const languageToggleState = useToggleState()

  return (
    <div className="h-full">
      <div className="flex h-full items-center">
        <Popover className="flex h-full">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full items-center">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 focus:outline-none"
                >
                  <span className="text-lg leading-none">☰</span>
                  <span>منو</span>
                </Popover.Button>
              </div>

              {open && (
                <div
                  className="fixed inset-0 z-[50] bg-slate-950/45 backdrop-blur-sm"
                  onClick={close}
                  data-testid="side-menu-backdrop"
                />
              )}

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-x-6"
                enterTo="opacity-100 translate-x-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-6"
              >
                <PopoverPanel className="fixed right-0 top-0 z-[51] h-screen w-full max-w-sm p-3">
                  <div
                    data-testid="nav-menu-popup"
                    className="flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-slate-950 p-6 text-white shadow-2xl"
                  >
                    <div>
                      <div className="mb-8 flex items-center justify-between">
                        <div>
                          <p className="text-lg font-bold">جهان امروز</p>
                          <p className="mt-1 text-xs text-slate-400">
                            فروشگاه آنلاین محصولات دیجیتال
                          </p>
                        </div>

                        <button
                          data-testid="close-menu-button"
                          onClick={close}
                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:bg-white/10"
                        >
                          <XMark />
                        </button>
                      </div>

                      <ul className="flex flex-col gap-2">
                        {Object.entries(SideMenuItems).map(([name, href]) => (
                          <li key={name}>
                            <LocalizedClientLink
                              href={href}
                              className="flex items-center justify-between rounded-xl px-4 py-3 text-lg font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
                              onClick={close}
                              data-testid={`${name.toLowerCase()}-link`}
                            >
                              <span>{name}</span>
                              <span className="text-slate-500">←</span>
                            </LocalizedClientLink>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-5 border-t border-white/10 pt-6">
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
                              languageToggleState.state ? "-rotate-90" : ""
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
                            countryToggleState.state ? "-rotate-90" : ""
                          )}
                        />
                      </div>

                      <Text className="text-xs text-slate-500">
                        © {new Date().getFullYear()} Jahan Emrooz. All rights reserved.
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