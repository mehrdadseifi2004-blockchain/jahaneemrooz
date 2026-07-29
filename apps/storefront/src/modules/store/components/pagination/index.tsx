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
        aria-label={`${dictionary.store.pagination.pageOf
          .replace("{page}", String(pageNumber))
          .replace("{totalPages}", String(totalPages))}`}
        className={`flex h-10 min-w-10 items-center justify-center rounded-lg px-3 text-sm font-medium transition ${
          isCurrent
            ? "bg-black/5 text-black"
            : "text-black/50 hover:bg-black/5 hover:text-black"
        }`}
      >
        {pageNumber}
      </button>
    )
  }

  const renderEllipsis = (key: string) => (
    <span
      key={key}
      className="flex h-10 min-w-8 items-center justify-center text-black/40"
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

  return (
    <nav
      aria-label={dictionary.store.pagination.ariaLabel}
      className="mt-10 flex w-full items-center justify-between border-t border-black/10 pt-5"
      data-testid={dataTestid}
    >
      <button
        type="button"
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
        className="inline-flex h-10 items-center justify-center rounded-lg border border-black/10 px-4 text-sm font-medium text-black transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-black"
      >
        {dictionary.store.pagination.previous}
      </button>

      <div dir="ltr" className="hidden items-center gap-1 small:flex">
        {renderPageButtons()}
      </div>

      <span className="text-sm text-black/60 small:hidden">
        {mobilePageLabel}
      </span>

      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
        className="inline-flex h-10 items-center justify-center rounded-lg border border-black/10 px-4 text-sm font-medium text-black transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-black"
      >
        {dictionary.store.pagination.next}
      </button>
    </nav>
  )
}
