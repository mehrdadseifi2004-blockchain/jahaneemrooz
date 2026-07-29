"use server"

import { cookies as nextCookies } from "next/headers"
import { redirect } from "next/navigation"

const getAdminURL = () => {
  return (
    process.env.NEXT_PUBLIC_MEDUSA_ADMIN_URL || "http://localhost:7001"
  ).replace(/\/$/, "")
}

export async function resetOnboardingState(orderId: string) {
  const cookies = await nextCookies()

  cookies.set("_medusa_onboarding", "false", {
    maxAge: -1,
  })

  redirect(`${getAdminURL()}/a/orders/${orderId}`)
}
