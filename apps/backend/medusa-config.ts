import { loadEnv, defineConfig } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,

    // Railway Redis connection
    redisUrl: process.env.REDIS_URL,

    // For the first Railway deployment, server and worker run together.
    workerMode:
      (process.env.MEDUSA_WORKER_MODE as
        | "shared"
        | "server"
        | "worker") || "shared",

    http: {
      storeCors:
        process.env.STORE_CORS || "http://localhost:8000",

      adminCors:
        process.env.ADMIN_CORS || "http://localhost:9000",

      authCors:
        process.env.AUTH_CORS ||
        "http://localhost:8000,http://localhost:9000",

      jwtSecret:
        process.env.JWT_SECRET ||
        "development-jwt-secret",

      cookieSecret:
        process.env.COOKIE_SECRET ||
        "development-cookie-secret",
    },
  },

  admin: {
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true",

    backendUrl:
      process.env.MEDUSA_BACKEND_URL ||
      "http://localhost:9000",

    storefrontUrl:
      process.env.MEDUSA_STOREFRONT_URL ||
      "http://localhost:8000",
  },
})