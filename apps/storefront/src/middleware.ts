import { HttpTypes } from "@medusajs/types"
import { NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "ir"

const SUPPORTED_LOCALES = ["fa", "en"] as const
type AppLocale = (typeof SUPPORTED_LOCALES)[number]

const DEFAULT_LOCALE: AppLocale = "fa"
const LOCALE_COOKIE_NAME = "_medusa_locale"

const MEDUSA_LOCALE_MAP: Record<AppLocale, string> = {
  fa: "fa-IR",
  en: "en-US",
}

const regionMapCache = {
  regionMap: new Map<string, HttpTypes.StoreRegion>(),
  regionMapUpdated: Date.now(),
}

function isSupportedLocale(value?: string): value is AppLocale {
  return SUPPORTED_LOCALES.includes(value as AppLocale)
}

function getLocaleFromCookie(request: NextRequest): AppLocale {
  const cookieLocale = request.cookies
    .get(LOCALE_COOKIE_NAME)
    ?.value.toLowerCase()

  if (cookieLocale === "en" || cookieLocale?.startsWith("en-")) {
    return "en"
  }

  if (cookieLocale === "fa" || cookieLocale?.startsWith("fa-")) {
    return "fa"
  }

  return DEFAULT_LOCALE
}

async function getRegionMap(cacheId: string) {
  const { regionMap, regionMapUpdated } = regionMapCache

  if (!BACKEND_URL) {
    throw new Error(
      "Middleware: NEXT_PUBLIC_MEDUSA_BACKEND_URL is not configured.",
    )
  }

  if (
    !regionMap.keys().next().value ||
    regionMapUpdated < Date.now() - 3600 * 1000
  ) {
    const response = await fetch(`${BACKEND_URL}/store/regions`, {
      method: "GET",
      headers: {
        "x-publishable-api-key": PUBLISHABLE_API_KEY!,
      },
      next: {
        revalidate: 3600,
        tags: [`regions-${cacheId}`],
      },
      cache: "force-cache",
    })

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`)
    }

    const { regions } = await response.json()

    regionMapCache.regionMap.clear()

    regions?.forEach((region: HttpTypes.StoreRegion) => {
      region.countries?.forEach((country) => {
        if (country.iso_2) {
          regionMapCache.regionMap.set(country.iso_2.toLowerCase(), region)
        }
      })
    })

    regionMapCache.regionMapUpdated = Date.now()
  }

  return regionMapCache.regionMap
}

function detectCountryCode(
  request: NextRequest,
  regionMap: Map<string, HttpTypes.StoreRegion>,
  urlCountryCode?: string,
) {
  if (urlCountryCode && regionMap.has(urlCountryCode)) {
    return urlCountryCode
  }

  const cloudflareCountryCode = (
    request as NextRequest & {
      cf?: { country?: string }
    }
  ).cf?.country?.toLowerCase()

  if (cloudflareCountryCode && regionMap.has(cloudflareCountryCode)) {
    return cloudflareCountryCode
  }

  const vercelCountryCode = request.headers
    .get("x-vercel-ip-country")
    ?.toLowerCase()

  if (vercelCountryCode && regionMap.has(vercelCountryCode)) {
    return vercelCountryCode
  }

  if (regionMap.has(DEFAULT_REGION)) {
    return DEFAULT_REGION
  }

  return regionMap.keys().next().value || DEFAULT_REGION
}

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.includes(".")) {
    return NextResponse.next()
  }

  const cacheIdCookie = request.cookies.get("_medusa_cache_id")
  const cacheId = cacheIdCookie?.value || crypto.randomUUID()
  const regionMap = await getRegionMap(cacheId)

  const pathSegments = request.nextUrl.pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => segment.toLowerCase())

  const possibleLocale = pathSegments[0]
  const urlHasLocale = isSupportedLocale(possibleLocale)

  const locale = urlHasLocale ? possibleLocale : getLocaleFromCookie(request)

  const possibleCountry = urlHasLocale ? pathSegments[1] : pathSegments[0]

  const urlHasCountry =
    Boolean(possibleCountry) && regionMap.has(possibleCountry)

  const countryCode = detectCountryCode(
    request,
    regionMap,
    urlHasCountry ? possibleCountry : undefined,
  )

  if (urlHasLocale && urlHasCountry) {
    const response = NextResponse.next()

    if (!cacheIdCookie) {
      response.cookies.set("_medusa_cache_id", cacheId, {
        maxAge: 60 * 60 * 24,
      })
    }

    response.cookies.set(LOCALE_COOKIE_NAME, MEDUSA_LOCALE_MAP[locale], {
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    })

    return response
  }

  let remainingSegments = [...pathSegments]

  if (urlHasLocale) {
    remainingSegments = remainingSegments.slice(1)
  }

  if (remainingSegments[0] && regionMap.has(remainingSegments[0])) {
    remainingSegments = remainingSegments.slice(1)
  }

  const remainingPath = remainingSegments.length
    ? `/${remainingSegments.join("/")}`
    : ""

  const redirectUrl = request.nextUrl.clone()

  redirectUrl.pathname = `/${locale}/${countryCode}${remainingPath}`

  const response = NextResponse.redirect(redirectUrl, 307)

  response.cookies.set("_medusa_cache_id", cacheId, {
    maxAge: 60 * 60 * 24,
  })

  response.cookies.set(LOCALE_COOKIE_NAME, MEDUSA_LOCALE_MAP[locale], {
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  })

  return response
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp).*)",
  ],
}
