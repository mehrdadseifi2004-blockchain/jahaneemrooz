"use client"

import { useI18n } from "@i18n/components/i18n-provider"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export function Pagination({
  page,
  totalPages,
  "data-testid": dataTestid,
}: {
  page: number
  totalPages: number
  "data-testid"?: string
}) {
  const { dictionary } = useI18n()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const arrayRange = (start: number, stop: number) =>
    Array.from({ length: stop - start + 1 }, (_, index) => start + index)

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === page) {
      return
    }

    const params = new URLSearchParams(searchParams.toString())
    params.set("page", newPage.toString())

    router.push(`${pathname}?${params.toString()}`)
  }

  const renderPageButton = (pageNumber: number) => {
    const isCurrent = pageNumber === page

    return (
      <button
        key={pageNumber}
        type="button"
        disabled={isCurrent}
        onClick={() => handlePageChange(pageNumber)}
        aria-current={isCurrent ? "page" : undefined}
        aria-label={dictionary.store.pagination.pageOf
          .replace("{page}", String(pageNumber))
          .replace("{totalPages}", String(totalPages))}
        className={`flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-bold transition ${
          isCurrent
            ? "border-[#ff5a00] bg-[#ff5a00] text-white"
            : "border-white/10 bg-[#111923] text-slate-400 hover:border-[#ff5a00]/50 hover:text-[#ff7a1a]"
        }`}
      >
        {pageNumber}
      </button>
    )
  }

  const renderEllipsis = (key: string) => (
    <span
      key={key}
      className="flex h-10 min-w-8 items-center justify-center text-slate-600"
      aria-hidden="true"
    >
      …
    </span>
  )

  const renderPageButtons = () => {
    if (totalPages <= 7) {
      return arrayRange(1, totalPages).map(renderPageButton)
    }

    if (page <= 4) {
      return [
        ...arrayRange(1, 5).map(renderPageButton),
        renderEllipsis("end"),
        renderPageButton(totalPages),
      ]
    }

    if (page >= totalPages - 3) {
      return [
        renderPageButton(1),
        renderEllipsis("start"),
        ...arrayRange(totalPages - 4, totalPages).map(renderPageButton),
      ]
    }

    return [
      renderPageButton(1),
      renderEllipsis("start"),
      ...arrayRange(page - 1, page + 1).map(renderPageButton),
      renderEllipsis("end"),
      renderPageButton(totalPages),
    ]
  }

  const mobilePageLabel = dictionary.store.pagination.pageOf
    .replace("{page}", String(page))
    .replace("{totalPages}", String(totalPages))

  const navigationButtonClass =
    "inline-flex h-10 items-center justify-center rounded-xl border border-white/10 bg-[#111923] px-4 text-sm font-bold text-slate-300 transition hover:border-[#ff5a00]/50 hover:bg-[#ff5a00] hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-white/10 disabled:hover:bg-[#111923] disabled:hover:text-slate-300"

  return (
    <nav
      aria-label={dictionary.store.pagination.ariaLabel}
      className="mt-10 flex w-full items-center justify-between border-t border-white/10 pt-5"
      data-testid={dataTestid}
    >
      <button
        type="button"
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
        className={navigationButtonClass}
      >
        {dictionary.store.pagination.previous}
      </button>

      <div dir="ltr" className="hidden items-center gap-1 small:flex">
        {renderPageButtons()}
      </div>

      <span className="text-sm text-slate-400 small:hidden">
        {mobilePageLabel}
      </span>

      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
        className={navigationButtonClass}
      >
        {dictionary.store.pagination.next}
      </button>
    </nav>
  )
}
