export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-accent/10 blur-[100px] animate-pulse-glow" />
      <div className="absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-warm/8 blur-[90px] animate-pulse-glow [animation-delay:1.5s]" />
      <div className="absolute bottom-0 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-gold/6 blur-[80px]" />
      <svg className="absolute inset-0 h-full w-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0V48" fill="none" stroke="#f5f2ec" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  )
}
