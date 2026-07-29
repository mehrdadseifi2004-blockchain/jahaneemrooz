import "server-only"

import { AppLocale } from "./config"

const dictionaries = {
  fa: () => import("./dictionaries/fa.json").then((module) => module.default),
  en: () => import("./dictionaries/en.json").then((module) => module.default),
}

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["fa"]>>

export async function getDictionary(locale: AppLocale): Promise<Dictionary> {
  return dictionaries[locale]()
}
