const ErrorMessage = ({
  error,
  "data-testid": dataTestid,
}: {
  error?: string | null
  "data-testid"?: string
}) => {
  if (!error) {
    return null
  }

  return (
    <div
      className="mt-3 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-400"
      data-testid={dataTestid}
    >
      <span>{error}</span>
    </div>
  )
}

export default ErrorMessage
