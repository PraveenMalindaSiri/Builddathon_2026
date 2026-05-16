import type { SVGProps } from 'react'
import { cn } from '@/lib/cn'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function base({ size = 20, className, ...props }: IconProps) {
  return { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', className: cn('shrink-0', className), ...props }
}

export function IconLogo(props: IconProps) {
  const p = base(props)
  return (
    <svg {...p}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <path
        d="M12 3v4M12 17v4M3 12h4M17 12h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 8l4 8H8l4-8z"
        fill="currentColor"
        opacity="0.9"
      />
    </svg>
  )
}

export function IconPitch(props: IconProps) {
  const p = base(props)
  return (
    <svg {...p}>
      <rect x="4" y="5" width="16" height="3" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="4" y="10" width="12" height="3" rx="1" fill="currentColor" opacity="0.75" />
      <rect x="4" y="15" width="16" height="4" rx="1" fill="currentColor" />
    </svg>
  )
}

export function IconCampaign(props: IconProps) {
  const p = base(props)
  return (
    <svg {...p}>
      <path
        d="M4 10v4c0 1.1.9 2 2 2h1l5 4V4L7 8H6c-1.1 0-2 .9-2 2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M16 8.5c1.5 1 2.5 2.5 2.5 3.5s-1 2.5-2.5 3.5M19 6c2.5 2 4 4.5 4 6s-1.5 4-4 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function IconHistory(props: IconProps) {
  const p = base(props)
  return (
    <svg {...p}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function IconLogout(props: IconProps) {
  const p = base(props)
  return (
    <svg {...p}>
      <path d="M9 4H6a2 2 0 00-2 2v12a2 2 0 002 2h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 8l4 4-4 4M18 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconChevronLeft(props: IconProps) {
  const p = base(props)
  return (
    <svg {...p}>
      <path d="M14 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconChevronRight(props: IconProps) {
  const p = base(props)
  return (
    <svg {...p}>
      <path d="M10 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconChevronDown(props: IconProps) {
  const p = base(props)
  return (
    <svg {...p}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconCheck(props: IconProps) {
  const p = base(props)
  return (
    <svg {...p}>
      <path d="M5 12l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconDot(props: IconProps) {
  const p = base(props)
  return (
    <svg {...p}>
      <circle cx="12" cy="12" r="4" fill="currentColor" />
    </svg>
  )
}

export function IconDownload(props: IconProps) {
  const p = base(props)
  return (
    <svg {...p}>
      <path d="M12 4v10M8 10l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 18h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function IconCopy(props: IconProps) {
  const p = base(props)
  return (
    <svg {...p}>
      <rect x="8" y="8" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 16V6a2 2 0 012-2h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function IconSlides(props: IconProps) {
  const p = base(props)
  return (
    <svg {...p}>
      <rect x="3" y="5" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 16l3-3 2 2 4-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconReport(props: IconProps) {
  const p = base(props)
  return (
    <svg {...p}>
      <path d="M7 4h10v16H7V4z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 9h6M9 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function IconTrash(props: IconProps) {
  const p = base(props)
  return (
    <svg {...p}>
      <path d="M5 7h14M9 7V5h6v2M8 7l1 12h6l1-12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconLaunch(props: IconProps) {
  const p = base(props)
  return (
    <svg {...p}>
      <path d="M12 3l2 7h7l-5.5 4 2 7L12 17l-5.5 4 2-7L3 10h7l2-7z" fill="currentColor" />
    </svg>
  )
}

export function IconMic(props: IconProps) {
  const p = base(props)
  return (
    <svg {...p}>
      <rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 11a6 6 0 0012 0M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function IconChart(props: IconProps) {
  const p = base(props)
  return (
    <svg {...p}>
      <path d="M5 18V8M10 18V5M15 18v-6M20 18v-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function IconShield(props: IconProps) {
  const p = base(props)
  return (
    <svg {...p}>
      <path d="M12 3l8 4v6c0 5-3.5 8-8 8s-8-3-8-8V7l8-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconSpark(props: IconProps) {
  const p = base(props)
  return (
    <svg {...p}>
      <path d="M13 2L11 9 4 11l7 2 2 7 2-7 7-2-7-2-2-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

export function IconIdea(props: IconProps) {
  const p = base(props)
  return (
    <svg {...p}>
      <path d="M12 3a6 6 0 016 6c0 2.2-1.2 4.1-3 5.2V17H9v-2.8C7.2 13.1 6 11.2 6 9a6 6 0 016-6z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 20h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function IconMessage(props: IconProps) {
  const p = base(props)
  return (
    <svg {...p}>
      <path d="M5 6h14v10H9l-4 4V6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

export function IconExpand(props: IconProps) {
  const p = base(props)
  return (
    <svg {...p}>
      <path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconCollapse(props: IconProps) {
  const p = base(props)
  return (
    <svg {...p}>
      <path d="M9 4H4v5M20 9V4h-5M4 15v5h5M15 20h5v-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconGlobe(props: IconProps) {
  const p = base(props)
  return (
    <svg {...p}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 12h18M12 3c2.5 2.8 4 6.2 4 9s-1.5 6.2-4 9M12 3c-2.5 2.8-4 6.2-4 9s1.5 6.2 4 9" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function IconUsers(props: IconProps) {
  const p = base(props)
  return (
    <svg {...p}>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="17" cy="9" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15 19c.5-2 1.8-3.5 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
