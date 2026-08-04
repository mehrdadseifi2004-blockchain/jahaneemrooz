import { Metadata } from "next"
import { notFound } from "next/navigation"

import { AppLocale, isAppLocale } from "@i18n/config"
import { getDictionary } from "@i18n/get-dictionary"
import { retrieveCustomer } from "@lib/data/customer"
import { listRegions } from "@lib/data/regions"
import ProfileBillingAddress from "@modules/account/components/profile-billing-address"
import ProfileEmail from "@modules/account/components/profile-email"
import ProfileName from "@modules/account/components/profile-name"
import ProfilePhone from "@modules/account/components/profile-phone"

type Props = {
  params: Promise<{
    locale: string
    countryCode: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  if (!isAppLocale(locale)) {
    return {}
  }

  const dictionary = await getDictionary(locale as AppLocale)

  return {
    title: dictionary.accountPages.metadata.profile.title,
    description: dictionary.accountPages.metadata.profile.description,
  }
}

export default async function Profile({ params }: Props) {
  const { locale } = await params

  if (!isAppLocale(locale)) {
    notFound()
  }

  const [customer, regions, dictionary] = await Promise.all([
    retrieveCustomer(),
    listRegions(),
    getDictionary(locale as AppLocale),
  ])

  if (!customer || !regions) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="profile-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-3 rounded-[20px] border border-white/10 bg-[#111923] p-5 small:p-6">
        <h1 className="text-3xl font-black tracking-[-0.03em] text-white">
          {dictionary.accountPages.profile.title}
        </h1>

        <p className="text-sm leading-7 text-slate-400">
          {dictionary.accountPages.profile.description}
        </p>
      </div>

      <div className="flex w-full flex-col gap-y-8">
        <ProfileName customer={customer} />

        <Divider />

        <ProfileEmail customer={customer} />

        <Divider />

        <ProfilePhone customer={customer} />

        <Divider />

        <ProfileBillingAddress customer={customer} regions={regions} />
      </div>
    </div>
  )
}

const Divider = () => {
  return <div className="h-px w-full bg-white/10" />
}
