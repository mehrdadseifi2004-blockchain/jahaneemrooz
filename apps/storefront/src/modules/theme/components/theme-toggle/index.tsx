"use client"

import { AppLocale } from "@i18n/config"
import { useTheme } from "@modules/theme/components/theme-provider"

type ThemeToggleProps = {
  locale: AppLocale
}

const ThemeToggle = ({ locale }: ThemeToggleProps) => {
  const { theme, mounted, toggleTheme } = useTheme()

  const isDark = theme === "dark"

  const label =
    locale === "fa"
      ? isDark
        ? "فعال‌کردن حالت روشن"
        : "فعال‌کردن حالت تیره"
      : isDark
        ? "Enable light mode"
        : "Enable dark mode"

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      disabled={!mounted}
      className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-text)] transition duration-300 hover:border-[#ff5a00]/50 hover:text-[#ff5a00] disabled:cursor-wait disabled:opacity-50"
    >
      <SunIcon
        className={`absolute transition duration-300 ${
          mounted && !isDark
            ? "scale-100 rotate-0 opacity-100"
            : "scale-50 -rotate-90 opacity-0"
        }`}
      />

      <MoonIcon
        className={`absolute transition duration-300 ${
          mounted && isDark
            ? "scale-100 rotate-0 opacity-100"
            : "scale-50 rotate-90 opacity-0"
        }`}
      />
    </button>
  )
}

const SunIcon = ({ className }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M12 2V4M12 20V22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 12H4M20 12H22M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
)

const MoonIcon = ({ className }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    <path
      d="M20.5 14.2A8.3 8.3 0 0 1 9.8 3.5A8.5 8.5 0 1 0 20.5 14.2Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default ThemeToggle
