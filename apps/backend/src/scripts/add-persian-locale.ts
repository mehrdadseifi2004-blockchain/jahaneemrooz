import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";

export default async function addPersianLocale({
  container,
}: {
  container: any;
}) {
  const translationModuleService = container.resolve(Modules.TRANSLATION);

  const storeModuleService = container.resolve(Modules.STORE);

  const query = container.resolve(ContainerRegistrationKeys.QUERY);

  console.log("Checking fa-IR locale...");

  const existingLocales = await translationModuleService.listLocales({
    code: "fa-IR",
  });

  if (!existingLocales.length) {
    await translationModuleService.createLocales({
      code: "fa-IR",
      name: "Persian (Iran)",
    });

    console.log("Created locale: fa-IR / Persian (Iran)");
  } else {
    console.log("Locale fa-IR already exists");
  }

  const { data: stores } = await query.graph({
    entity: "store",
    fields: ["id", "supported_locales.id", "supported_locales.locale_code"],
  });

  const store = stores[0];

  if (!store) {
    throw new Error("No store found");
  }

  const currentLocales =
    store.supported_locales?.map((locale: { locale_code: string }) => ({
      locale_code: locale.locale_code,
    })) ?? [];

  const alreadySupported = currentLocales.some(
    (locale: { locale_code: string }) => locale.locale_code === "fa-IR",
  );

  if (alreadySupported) {
    console.log("Store already supports fa-IR");
    return;
  }

  await storeModuleService.updateStores(store.id, {
    supported_locales: [
      ...currentLocales,
      {
        locale_code: "fa-IR",
      },
    ],
  });

  console.log("Added fa-IR to store supported locales");
}
